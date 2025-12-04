const API = "http://localhost:3000/api/admin";

// ======================
// Carrega pendentes
// ======================
async function carregarPendentes() {
    const tbody = document.getElementById("listaPendentes");
    tbody.innerHTML = "<tr><td colspan='4'>Carregando...</td></tr>";

    try {
        const req = await fetch(`${API}/pendentes`);
        const lista = await req.json();

        if (lista.length === 0) {
            tbody.innerHTML = "<tr><td colspan='4'>Nenhum usuário pendente.</td></tr>";
            return;
        }

        tbody.innerHTML = "";

        lista.forEach(u => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${u.nome}</td>
                <td>${u.email}</td>
                <td>${u.tipo}</td>
                <td>
                    <button class="btn btn-aprovar" onclick="aprovar('${u.tipo}', ${u.id})">
                        Aprovar
                    </button>

                    <button class="btn btn-rejeitar" onclick="rejeitar('${u.tipo}', ${u.id})">
                        Rejeitar
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });

    } catch (e) {
        tbody.innerHTML = "<tr><td colspan='4'>Erro ao carregar.</td></tr>";
    }
}

// ======================
// Aprovar usuário
// ======================
async function aprovar(tipo, id) {
    const res = await fetch(`${API}/aprovar/${tipo}/${id}`, {
        method: "PUT"
    });

    const json = await res.json();
    mostrarMensagem(json.msg || json.error, json.ok);
    carregarPendentes();
}

// ======================
// Rejeitar usuário
// ======================
async function rejeitar(tipo, id) {
    const res = await fetch(`${API}/rejeitar/${tipo}/${id}`, {
        method: "PUT"
    });

    const json = await res.json();
    mostrarMensagem(json.msg || json.error, json.ok);
    carregarPendentes();
}

// ======================
// Mensagem visual
// ======================
function mostrarMensagem(texto, ok = true) {
    const msg = document.getElementById("mensagem");
    msg.textContent = texto;
    msg.className = "msg " + (ok ? "ok" : "error");

    setTimeout(() => msg.textContent = "", 3000);
}

carregarPendentes();
