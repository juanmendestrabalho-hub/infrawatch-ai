const API = "https://SEU-BACKEND.onrender.com";

async function carregar() {
  const maquinas = await fetch(`${API}/maquinas`).then(r => r.json());
  const chamados = await fetch(`${API}/chamados`).then(r => r.json());

  const cards = document.getElementById("cards");
  cards.innerHTML = "";

  maquinas.forEach(m => {
    cards.innerHTML += `
      <div class="card">
        <h3>${m.nome}</h3>
        <p>CPU: ${m.cpu}%</p>
        <p>Status: ${m.status}</p>
      </div>
    `;
  });

  const lista = document.getElementById("chamados");
  lista.innerHTML = "";

  chamados.reverse().forEach(c => {
    lista.innerHTML += `
      <div class="alerta">
        ${c.mensagem} - ${c.data}
      </div>
    `;
  });
}

setInterval(carregar, 3000);
carregar();
