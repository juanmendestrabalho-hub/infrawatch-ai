const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let maquinas = [
  { id: 1, nome: "SRV-01", cpu: 45, status: "online" },
  { id: 2, nome: "SRV-02", cpu: 92, status: "online" },
  { id: 3, nome: "SRV-03", cpu: 15, status: "offline" }
];

let chamados = [];

function gerarAlerta(maquina) {
  if (maquina.cpu > 85) {
    chamados.push({
      id: Date.now(),
      mensagem: `🔥 CPU crítica em ${maquina.nome} (${maquina.cpu}%)`,
      status: "aberto"
    });
  }
}

setInterval(() => {
  maquinas.forEach(m => {
    m.cpu = Math.floor(Math.random() * 100);
    gerarAlerta(m);
  });
}, 4000);

app.get("/maquinas", (req, res) => {
  res.json(maquinas);
});

app.get("/chamados", (req, res) => {
  res.json(chamados);
});

app.listen(3000, () => {
  console.log("🚀 API rodando em http://localhost:3000");
});
