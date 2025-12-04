document.addEventListener('DOMContentLoaded', () => {
    
    // 1. OBTER ID DA PERGUNTA DA URL
    const params = new URLSearchParams(window.location.search);
    const questionId = params.get('id');
    const userMatricula = localStorage.getItem('usuarioMatricula');

    if (!userMatricula) {
        alert("Faça login para participar.");
        window.location.href = "/html/autenticacao.html#login";
        return;
    }
    if (!questionId) {
        alert("Nenhuma pergunta selecionada.");
        window.location.href = "/html/feed.html";
        return;
    }

    // 2. CONFIGURAR EDITOR (Simples)
    const editorArea = document.createElement('div');
    editorArea.contentEditable = 'true';
    editorArea.className = 'editor-area';
    editorArea.style.cssText = "background:transparent; min-height:220px; padding:10px; outline:none; border:1px solid #ccc; border-radius:5px;";
    
    const placeholder = document.getElementById('editor-placeholder');
    if(placeholder) placeholder.replaceWith(editorArea);

    // Toolbar básica
    document.querySelectorAll('.toolbar-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Pega o ícone para saber qual comando executar
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-bold')) document.execCommand('bold');
            if (icon.classList.contains('fa-italic')) document.execCommand('italic');
            if (icon.classList.contains('fa-list-ul')) document.execCommand('insertUnorderedList');
            editorArea.focus();
        });
    });

    // 3. CARREGAR DADOS (Pergunta e Respostas)
    async function loadData() {
        // A. Busca a Pergunta
        try {
            const resQ = await fetch(`http://localhost:8080/api/feed/questions`); // Usa o feed pra pegar detalhe (ou cria endpoint especifico)
            // Como não criamos um endpoint de detalhe único, vamos buscar todas e filtrar no JS (Rápido para o prazo)
            // Se tiver tempo, use o endpoint /api/questions/{id} que sugeri no controller
            
            // Tenta endpoint direto (Melhor)
            const resDetail = await fetch(`http://localhost:8080/api/questions/${questionId}`);
            if(resDetail.ok) {
                const q = await resDetail.json();
                renderQuestion(q);
            }
        } catch(e) { console.error("Erro pergunta", e); }

        // B. Busca as Respostas
        try {
            const resA = await fetch(`http://localhost:8080/api/questions/${questionId}/answers`);
            if(resA.ok) {
                const answers = await resA.json();
                renderAnswers(answers);
            }
        } catch(e) { console.error("Erro respostas", e); }
    }

    function renderQuestion(q) {
        const box = document.getElementById('question-display-area');
        const data = new Date(q.dataCriacao).toLocaleDateString('pt-BR');
        box.innerHTML = `
            <small>Postado em ${data} por ${q.matriculaAluno}</small>
            <h2 style="margin:10px 0;">${q.titulo}</h2>
            <div style="font-size:1rem; line-height:1.6;">${q.conteudo}</div>
        `;
    }

    function renderAnswers(list) {
        const area = document.getElementById('answers-list-area');
        if(list.length === 0) {
            area.innerHTML = '<p>Seja o primeiro a responder!</p>';
            return;
        }
        area.innerHTML = '';
        list.forEach(a => {
            const div = document.createElement('div');
            div.className = 'answer-card';
            div.innerHTML = `
                <div class="answer-header">
                    <strong>${a.matriculaPessoa}</strong>
                    <span>${new Date(a.dataCriacao).toLocaleDateString('pt-BR')}</span>
                </div>
                <div class="answer-body">${a.conteudo}</div>
                <div class="answer-actions">
                    <button class="btn-action-sm" onclick="reactToAnswer(${a.idResposta}, 'LIKE')">
                        <i class="fas fa-thumbs-up"></i> Útil
                    </button>
                    <button class="btn-action-sm" onclick="reactToAnswer(${a.idResposta}, 'DISLIKE')">
                        <i class="fas fa-thumbs-down"></i> Não útil
                    </button>
                </div>
            `;
            area.appendChild(div);
        });
    }

    // 4. ENVIAR RESPOSTA
    document.getElementById('btn-submit-answer').addEventListener('click', async (e) => {
        e.preventDefault();
        const texto = editorArea.innerHTML;
        if(texto.trim().length < 5) {
            alert("Escreva uma resposta mais completa.");
            return;
        }

        const payload = {
            idPergunta: questionId, // Campo Long
            matriculaPessoa: userMatricula,
            conteudo: texto,
            status: "Visivel"
        };

        try {
            // OBS: Verifique se você tem o controller de POST /api/answers ou se está no PerguntaController
            // Se não tiver, crie rapidinho. Vou assumir que você tem ou vai criar um RespostaController simples
            // OU usar o endpoint que já existe se houver.
            
            // Como não vi um endpoint de salvar resposta nos seus arquivos, vou sugerir usar /api/reacoes como base
            // mas o correto é criar um endpoint. 
            // VOU ADICIONAR O ENDPOINT NO PASSO SEGUINTE
            
            const res = await fetch('http://localhost:8080/api/answers', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });

            if(res.ok) {
                alert("Resposta enviada!");
                loadData(); // Recarrega a lista
                editorArea.innerHTML = '';
            } else {
                alert("Erro ao enviar resposta.");
            }
        } catch(err) { alert("Erro de conexão."); }
    });

    // 5. REAGIR A RESPOSTA (LIKE REAL)
    window.reactToAnswer = async (idResp, tipo) => {
        try {
            const res = await fetch('http://localhost:8080/api/reacoes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    idResposta: idResp,
                    matriculaPessoa: userMatricula,
                    tipoReacao: tipo
                })
            });
            if(res.ok) {
                alert("Reação registrada! (Verifique seu perfil)");
            } else {
                alert("Você já reagiu ou houve um erro.");
            }
        } catch(e) { alert("Erro de conexão."); }
    }

    // Inicializa
    loadData();
});