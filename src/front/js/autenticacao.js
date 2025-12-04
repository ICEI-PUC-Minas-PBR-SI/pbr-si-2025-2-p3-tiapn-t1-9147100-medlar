document.addEventListener('DOMContentLoaded', () => {

    // --- REFERÊNCIAS AOS ELEMENTOS VISUAIS ---
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn'); // Botão que leva para o registro
    const loginBtn = document.querySelector('.login-btn');       // Botão que leva para o login
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');

    // --- ALTERNAR ENTRE LOGIN E CADASTRO (UI) ---
    const updateStateFromHash = () => {
        // Se a URL tiver #register, mostra o form de cadastro
        if (window.location.hash === '#register') {
            container.classList.add('active');
            document.querySelector('.form-box.register').style.visibility = 'visible';
            document.querySelector('.form-box.login').style.visibility = 'hidden';
        } else {
            // Caso contrário, mostra o login
            container.classList.remove('active');
            document.querySelector('.form-box.register').style.visibility = 'hidden';
            document.querySelector('.form-box.login').style.visibility = 'visible';
        }
    };

    // Escuta os cliques e a mudança na URL
    if (registerBtn) registerBtn.addEventListener('click', () => window.location.hash = 'register');
    if (loginBtn) loginBtn.addEventListener('click', () => window.location.hash = 'login');
    window.addEventListener('hashchange', updateStateFromHash);
    
    // Executa ao carregar a página para garantir o estado correto
    updateStateFromHash();


    // --- LÓGICA DE LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            // Captura dos inputs (assumindo ordem: 0=email, 1=senha)
            const inputs = loginForm.querySelectorAll('input');
            const email = inputs[0].value;
            const senha = inputs[1].value;

            try {
                // Requisição ao Backend Java (Porta 8080)
                const response = await fetch('http://localhost:8080/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, senha: senha })
                });

                const data = await response.json();

                if (response.ok) {
                    // SUCESSO!
                    // O Java retorna algo como: { "matricula": "123", "nome": "Fulano", "tipo": "Aluno" }
                    // NÃO retorna { "user": { ... } }, então acessamos direto:
                    
                    localStorage.setItem('usuarioMatricula', data.matricula);
                    localStorage.setItem('usuarioNome', data.nome);
                    localStorage.setItem('usuarioTipo', data.tipo);

                    alert(`Bem-vindo(a), ${data.nome}!`);

                    // Redirecionamento
                    window.location.href = "perfil.html"; // Ou 'homepage.html' dependendo da sua estrutura
                } else {
                    // ERRO (Ex: Senha incorreta)
                    // O Java retorna: { "error": "Mensagem de erro" }
                    alert(data.error || 'Falha na autenticação.');
                }

            } catch (error) {
                console.error("Erro na requisição:", error);
                alert('Erro ao conectar com o servidor. Verifique se o backend está rodando na porta 8080.');
            }
        });
    }


    // --- LÓGICA DE CADASTRO ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const inputs = registerForm.querySelectorAll('input');
            
            // Certifique-se que a ordem dos inputs no HTML bate com estes índices:
            const nome = inputs[0].value;
            const cpf = inputs[1].value;
            const matricula = inputs[2].value;
            const email = inputs[3].value;
            const senha = inputs[4].value;
            
            // Verifica qual radio button está marcado (Aluno ou Professor)
            // Certifique-se que no HTML os radios têm name="tipo_usuario" e value="Aluno"/"Professor"
            const tipoInput = registerForm.querySelector('input[name="tipo_usuario"]:checked');
            const tipoPessoa = tipoInput ? tipoInput.value : 'Aluno'; 

            try {
                // Ajustado para porta 8080 (Java) e endpoint provável
                const response = await fetch('http://localhost:8080/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        nome, 
                        cpf, 
                        matricula, 
                        emailInstitucional: email, // O Java espera 'emailInstitucional' na entidade Pessoa
                        senha, 
                        tipoPessoa: tipoPessoa     // O Java espera 'tipoPessoa' (Enum)
                    })
                });

                if (response.ok) {
                    alert("Cadastro realizado com sucesso! Faça login para continuar.");
                    window.location.hash = 'login'; // Muda a tela para login automaticamente
                } else {
                    const errorText = await response.text();
                    alert("Erro ao cadastrar: " + errorText);
                }
            } catch (error) { 
                console.error(error);
                alert("Erro de conexão ao tentar cadastrar."); 
            }
        });
    }
});