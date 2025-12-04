// public/js/admin-panel.js
const API_BASE = "/api";
let adminToken = localStorage.getItem("adminToken") || "";

document.addEventListener("DOMContentLoaded", () => {
  const tInput = document.getElementById("adminToken");
  const tSave = document.getElementById("saveToken");
  tInput.value = adminToken;

  tSave.addEventListener("click", () => {
    adminToken = tInput.value.trim();
    localStorage.setItem("adminToken", adminToken);
    refreshAll();
  });

  refreshAll();
});

function headers() {
  return {
    "Content-Type": "application/json",
    "x-admin-token": adminToken
  };
}

async function refreshAll() {
  await Promise.all([loadPacientes(), loadProfissionais()]);
}

function renderList(containerId, arr, type) {
  const cont = document.getElementById(containerId);
  if (!arr) { cont.innerHTML = "<p>Erro ao carregar</p>"; return; }
  if (arr.length === 0) { cont.innerHTML = "<p>Nenhum registro pendente</p>"; return; }

  cont.innerHTML = arr.map(item => `
    <div style="border:1px solid #ddd; padding:10px; margin:6px;">
      <strong>${item.nome}</strong> (<em>${item.email}</em>)<br/>
      CPF: ${item.cpf || ""} — Tel: ${item.telefone || ""} <br/>
      Endereço: ${item.endereco || ""} <br/>
      <div style="margin-top:6px;">
        <button data-action="aprovar" data-type="${type}" data-id="${item.id}">Aprovar</button>
        <button data-action="rejeitar" data-type="${type}" data-id="${item.id}">Rejeitar</button>
        <button data-action="deletar" data-type="${type}" data-id="${item.id}">Excluir</button>
      </div>
    </div>
  `).join("");

  cont.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", onActionClick);
  });
}

async function onActionClick(e) {
  const btn = e.currentTarget;
  const action = btn.getAttribute("data-action");
  const type = btn.getAttribute("data-type"); // paciente | profissional
  const id = btn.getAttribute("data-id");

  if (!confirm(`Confirma ${action} ${type} #${id}?`)) return;

  try {
    let res;
    const headersObj = headers();
    if (action === "aprovar") {
      res = await fetch(`${API_BASE}/admin/${type}s/${id}/aprovar`, { method: "PUT", headers: headersObj });
    } else if (action === "rejeitar") {
      res = await fetch(`${API_BASE}/admin/${type}s/${id}/rejeitar`, { method: "PUT", headers: headersObj });
    } else if (action === "deletar") {
      res = await fetch(`${API_BASE}/admin/${type}s/${id}`, { method: "DELETE", headers: headersObj });
    }
    if (!res.ok) {
      const j = await res.json();
      alert("Erro: " + (j.error || res.statusText));
    } else {
      alert("Sucesso");
      refreshAll();
    }
  } catch (err) {
    alert("Erro na requisição: " + err.message);
  }
}

async function loadPacientes() {
  try {
    const res = await fetch(`${API_BASE}/admin/pacientes/pendentes`, { headers: headers() });
    if (!res.ok) { renderList("pacientesPendentes", [], "paciente"); return; }
    const data = await res.json();
    renderList("pacientesPendentes", data, "paciente");
  } catch (err) {
    renderList("pacientesPendentes", [], "paciente");
  }
}

async function loadProfissionais() {
  try {
    const res = await fetch(`${API_BASE}/admin/profissionais/pendentes`, { headers: headers() });
    if (!res.ok) { renderList("profissionaisPendentes", [], "profissional"); return; }
    const data = await res.json();
    renderList("profissionaisPendentes", data, "profissional");
  } catch (err) {
    renderList("profissionaisPendentes", [], "profissional");
  }
}
