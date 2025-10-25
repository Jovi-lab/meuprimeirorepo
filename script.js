const cards = document.querySelectorAll('.card');
let servicoSelecionado = "";

cards.forEach(card => {
  card.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    servicoSelecionado = card.dataset.servico;
  });
});

document.getElementById('agendamentoForm').onsubmit = function (e) {
  e.preventDefault();
  
  const data = document.getElementById('data').value;
  const horario = document.getElementById('horario').value;
  const nome = document.getElementById('nome').value;
  const statusMsg = document.getElementById('mensagem-status');
  const numeroWhatsApp = "5544996680702";

  if (!servicoSelecionado) {
    alert("Selecione um serviço primeiro!");
    return;
  }
  if (!data || !horario || !nome) {
    alert("Preencha todos os campos!");
    return;
  }

  const dataFormatada = data.split('-').reverse().join('/');
  const mensagem = `Olá! Meu nome é ${nome}. Gostaria de agendar ${servicoSelecionado} para o dia ${dataFormatada}, às ${horario}.`;
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  statusMsg.textContent = "Abrindo o WhatsApp...";
  statusMsg.classList.add("show");

  setTimeout(() => {
    window.open(url, "_blank");
    statusMsg.textContent = "Mensagem enviada ✅";
    setTimeout(() => statusMsg.classList.remove("show"), 2500);
  }, 900);
};
