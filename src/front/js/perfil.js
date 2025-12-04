document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONFIGURAÇÃO IMEDIATA DA UI (Abas e Botões)
    
    // Abas (Perguntas vs Interações)
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove ativo de todos
            tabs.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            
            // Ativa o atual
            btn.classList.add('active');
            const targetId = btn.dataset.tab + '-tab'; 
            const targetEl = document.getElementById(targetId);
            if(targetEl) targetEl.style.display = 'block';
        });
    });

    // Logout (Botão da Sidebar)
    const btnLogoutSidebar = document.getElementById('btn-logout-sidebar');
    if(btnLogoutSidebar) {
        btnLogoutSidebar.addEventListener('click', (e) => {
            e.preventDefault();
            window.logout(); // Chama a função global definida no final
        });
    }

    // Modal de Edição
    const modal = document.getElementById('edit-modal');
    const openModalBtn = document.getElementById('btn-open-edit');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if(openModalBtn) openModalBtn.onclick = () => modal.style.display = 'flex';
    if(closeModalBtn) closeModalBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }


    // 2. VERIFICAÇÃO DE LOGIN E DADOS
    const userMatricula = localStorage.getItem('usuarioMatricula');
    if (!userMatricula) {
        window.location.href = "/html/autenticacao.html#login";
        return;
    }

    // Elementos de Dados
    const dom = {
        name: document.getElementById('user-name-display'),
        handle: document.getElementById('user-matricula-display'),
        type: document.getElementById('user-type-display'), // Badge de tipo
        bio: document.getElementById('user-bio-display'),
        img: document.getElementById('profile-img-display'),
        statQ: document.getElementById('stat-questions'),
        statA: document.getElementById('stat-answers'),
        questionsList: document.getElementById('questions-list'),
        interactionsList: document.getElementById('interactions-list'),
        formEdit: document.getElementById('edit-profile-form')
    };

    // 3. CARREGAR PERFIL (Usuario)
    async function loadProfile() {
        try {
            const res = await fetch(`http://localhost:8080/api/profile/${userMatricula}`);
            if (res.ok) {
                const data = await res.json();
                const user = data.user;
                const stats = data.stats;

                dom.name.innerText = user.nome || "Usuário";
                dom.handle.innerText = `@${userMatricula}`;
                
                // --- EXIBE O TIPO DE USUÁRIO ---
                if (dom.type) {
                    dom.type.innerText = user.tipoPessoa || "Aluno"; 
                    if (user.tipoPessoa === 'Professor') {
                        dom.type.style.background = '#ffc107'; // Amarelo
                        dom.type.style.color = '#000';
                    } else {
                        dom.type.style.background = '#e9ecef'; // Cinza
                        dom.type.style.color = '#555';
                    }
                }
                
                dom.bio.innerText = user.biografia || "Sem biografia.";
                
                if (user.fotoPerfil) {
                    dom.img.src = `http://localhost:8080${user.fotoPerfil}?t=${new Date().getTime()}`;
                }

                dom.statQ.innerText = stats.questions || 0;
                dom.statA.innerText = stats.answers || 0;

                // Preenche form de edição
                if(document.getElementById('edit-name-input')) {
                    document.getElementById('edit-name-input').value = user.nome || "";
                    document.getElementById('edit-bio-input').value = user.biografia || "";
                }
            }
        } catch (err) { console.error("Erro perfil:", err); }
    }

    // 4. CARREGAR LISTAS (Perguntas e Interações)
    async function loadFeed() {
        
        // A. Minhas Perguntas
        try {
            const resQ = await fetch(`http://localhost:8080/api/users/${userMatricula}/questions`);
            if (resQ.ok) {
                const questions = await resQ.json();
                dom.questionsList.innerHTML = '';
                if (questions.length === 0) dom.questionsList.innerHTML = '<p class="empty-msg">Nenhuma pergunta feita.</p>';
                else questions.forEach(q => dom.questionsList.innerHTML += createItemCard(q, 'question'));
            }
        } catch(e) { console.error(e); }

        // B. Minhas Interações (Respostas + Reações)
        let items = [];
        try {
            // Busca Respostas
            const resA = await fetch(`http://localhost:8080/api/users/${userMatricula}/answers`);
            if (resA.ok) {
                const answers = await resA.json();
                answers.forEach(a => items.push({ ...a, type: 'answer', dateObj: new Date(a.dataCriacao) }));
            }

            // Busca Reações (Likes)
            const resR = await fetch(`http://localhost:8080/api/reacoes/usuario/${userMatricula}`);
            if (resR.ok) {
                const reactions = await resR.json();
                // Mapeia DTO do Java para objeto local
                reactions.forEach(r => items.push({
                    id: r.id,
                    type: 'reaction',
                    reactionType: r.tipo, // LIKE ou DISLIKE
                    tituloAlvo: r.titulo,
                    dateObj: new Date(r.data)
                }));
            }

            // Ordena e Renderiza
            items.sort((a, b) => b.dateObj - a.dateObj);
            
            dom.interactionsList.innerHTML = '';
            if (items.length === 0) {
                dom.interactionsList.innerHTML = '<p class="empty-msg">Nenhuma interação encontrada.</p>';
            } else {
                items.forEach(item => dom.interactionsList.innerHTML += createItemCard(item, item.type));
            }

        } catch(e) { console.error("Erro interações:", e); }
    }

    // 5. HTML GENERATOR
    function createItemCard(item, type) {
        let iconHtml = '', titleHtml = '', contentHtml = '';
        let dateStr = item.dateObj ? item.dateObj.toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR');

        if (type === 'question') {
            iconHtml = '<i class="fas fa-question-circle" style="color:#0056b3"></i>';
            titleHtml = `Você perguntou: <strong>${item.titulo}</strong>`;
            contentHtml = item.conteudo || "";
        } 
        else if (type === 'answer') {
            iconHtml = '<i class="fas fa-comment" style="color:#6c757d"></i>';
            titleHtml = `Você respondeu na discussão #${item.idPergunta}`;
            contentHtml = item.conteudo || "";
        }
        else if (type === 'reaction') {
            const isLike = (item.reactionType === 'LIKE'); 
            iconHtml = isLike 
                ? '<i class="fas fa-thumbs-up" style="color:#28a745"></i>' 
                : '<i class="fas fa-thumbs-down" style="color:#dc3545"></i>';
            titleHtml = `${isLike ? 'Curtiu' : 'Não curtiu'} uma resposta em: <strong>${item.tituloAlvo}</strong>`;
        }

        return `
            <div class="item-card" style="padding:15px; border-bottom:1px solid #eee; background:white; margin-bottom:10px; border-radius:5px;">
                <div class="item-content">
                    <h4 style="display:flex; align-items:center; gap:10px; margin:0 0 5px 0; font-size:1rem;">
                        ${iconHtml} <span>${titleHtml}</span>
                    </h4>
                    ${contentHtml ? `<p style="color:#555; font-size:0.9rem; margin:0;">${contentHtml}</p>` : ''}
                    <small style="color:#999; font-size:0.8rem; display:block; margin-top:5px;">${dateStr}</small>
                </div>
            </div>
        `;
    }

    // 6. SALVAR PERFIL
    if (dom.formEdit) {
        dom.formEdit.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Lógica de salvar simplificada para não travar
            alert("Funcionalidade de edição simulada."); 
            dom.modal.style.display = 'none';
        });
    }

    // Inicializa
    loadProfile();
    loadFeed();
});

// Funções Globais (Logout)
window.logout = function() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/html/autenticacao.html#login';
}