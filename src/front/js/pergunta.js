document.addEventListener('DOMContentLoaded', () => {
    
    // 1. VERIFICAÇÃO DE LOGIN (CORRIGIDO: Agora usa localStorage)
    const userMatricula = localStorage.getItem('usuarioMatricula');
    
    if (!userMatricula) {
        alert("Sessão expirada. Por favor, faça login novamente.");
        const currentUrl = encodeURIComponent(window.location.pathname);
        window.location.href = `/html/autenticacao.html#login?returnUrl=${currentUrl}`;
        return; 
    }

    // 2. ANEXOS
    const fileInput = document.getElementById('file-input');
    const btnAttach = document.getElementById('btn-attach-trigger');
    const attachmentsPreview = document.getElementById('attachments-preview');
    const fileCountSpan = document.getElementById('file-count');
    let selectedFiles = [];

    if (btnAttach && fileInput) {
        btnAttach.addEventListener('click', (e) => {
            e.preventDefault(); 
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            if (selectedFiles.length + files.length > 3) {
                alert("Máximo de 3 arquivos permitidos.");
                return;
            }
            files.forEach(f => selectedFiles.push(f));
            renderAttachments();
            fileInput.value = '';
        });
    }

    function renderAttachments() {
        attachmentsPreview.innerHTML = '';
        if(fileCountSpan) fileCountSpan.innerText = selectedFiles.length;

        selectedFiles.forEach((file, index) => {
            const div = document.createElement('div');
            div.className = 'attachment-item';
            div.style.cssText = "background:#f0f0f0; padding:8px; margin-bottom:5px; border-radius:4px; display:flex; justify-content:space-between; font-size:0.9rem;";
            div.innerHTML = `
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:80%;">${file.name}</span>
                <button type="button" onclick="removeFile(${index})" style="border:none; background:none; color:red; cursor:pointer; font-weight:bold;">&times;</button>
            `;
            attachmentsPreview.appendChild(div);
        });
    }

    window.removeFile = (index) => {
        selectedFiles.splice(index, 1);
        renderAttachments();
    };

    // 3 LÓGICA DE PALAVRAS-CHAVE (TAGS)
    const tagInput = document.getElementById('tag-input'); // O campo onde digita
    const tagsList = document.getElementById('tags-list'); // Onde as tags aparecem
    const hiddenTagsInput = document.getElementById('hidden-tags'); // O input invisível que vai pro Java
    let tagsArray = [];

    if (tagInput) {
        tagInput.addEventListener('keydown', (e) => {
            // Se apertou ENTER (código 13)
            if (e.key === 'Enter') {
                e.preventDefault(); // <--- ISSO IMPEDE O FORMULÁRIO DE SER ENVIADO!
                
                const valor = tagInput.value.trim();
                
                // Adiciona se não estiver vazio e não for duplicado
                if (valor && !tagsArray.includes(valor)) {
                    tagsArray.push(valor);
                    renderTags();
                }
                
                tagInput.value = ''; // Limpa o campo para a próxima tag
            }
        });
    }

    function renderTags() {
        tagsList.innerHTML = '';
        // Atualiza o input escondido separando por vírgulas (ex: "Java,SQL,Web")
        hiddenTagsInput.value = tagsArray.join(','); 

        tagsArray.forEach((tag, index) => {
            const tagEl = document.createElement('span');
            tagEl.className = 'tag-badge';
            // Estilo inline para garantir visual rápido (pode mover pro CSS depois)
            tagEl.style.cssText = "background:#e9ecef; padding:5px 10px; border-radius:15px; font-size:0.85rem; display:inline-flex; align-items:center; gap:5px; margin-right:5px; margin-bottom:5px;";
            
            tagEl.innerHTML = `
                ${tag} 
                <button type="button" onclick="removeTag(${index})" style="border:none; background:transparent; cursor:pointer; color:#666; font-weight:bold;">&times;</button>
            `;
            tagsList.appendChild(tagEl);
        });
    }

    // Função global para remover tag ao clicar no X
    window.removeTag = (index) => {
        tagsArray.splice(index, 1);
        renderTags();
    };

    // 4. EDITOR DE TEXTO
    const toolbarBtns = document.querySelectorAll('.editor-toolbar button[data-cmd]');
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cmd = btn.getAttribute('data-cmd');
            document.execCommand(cmd, false, null);
        });
    });

    // 5. SUBMISSÃO
    const form = document.getElementById('question-form');
    const submitBtn = document.getElementById('btn-submit-publish');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            const titulo = document.getElementById('titulo').value.trim();
            const disciplina = document.getElementById('disciplina').value;
            const conteudo = document.getElementById('descricao-editor').innerHTML;
            const tagInput = document.getElementById('hidden-tags'); 
            const tags = tagInput ? tagInput.value : "";

            if (!titulo || !disciplina || !conteudo || conteudo === '<br>') {
                alert("Por favor, preencha Título, Disciplina e Descrição.");
                submitBtn.innerText = 'Publicar Dúvida';
                submitBtn.disabled = false;
                return;
            }

            const formData = new FormData();
            formData.append('matricula_aluno', userMatricula);
            formData.append('id_disciplina', disciplina);
            formData.append('titulo', titulo);
            formData.append('conteudo', conteudo);
            formData.append('palavras_chave', tags);

            selectedFiles.forEach(file => {
                formData.append('anexos', file);
            });

            try {
                // CORREÇÃO: Porta 8080 e Rota Correta
                const response = await fetch('http://localhost:8080/api/questions', {
                    method: 'POST',
                    body: formData 
                });

                if (response.ok) {
                    alert("Pergunta publicada com sucesso!");
                    window.location.href = '/html/feed.html';
                } else {
                    const result = await response.json();
                    alert(`Erro ao publicar: ${result.message || 'Erro desconhecido'}`);
                }
            } catch (error) {
                console.error("Erro de rede:", error);
                alert("Erro de conexão com o servidor Backend (8080).");
            } finally {
                submitBtn.innerText = 'Publicar Dúvida';
                submitBtn.disabled = false;
            }
        });
    }
});