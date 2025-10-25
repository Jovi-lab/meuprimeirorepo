document.getElementById('agendamentoForm').onsubmit = function(event) {
    event.preventDefault();
    const procedimento = document.getElementById('procedimento').value;
    const data = document.getElementById('data').value;
    const nome = document.getElementById('nome').value;
    const numeroWhatsApp = "5544996680702"; // Exemplo: 5599999999999

    if (!procedimento || !data || !nome) {
        alert("Preencha todos os campos!");
        return;
    }

    const dataFormatada = data.split('-').reverse().join('/');
    const mensagem = `Olá, meu nome é ${nome}. Gostaria de agendar: ${procedimento} para o dia ${dataFormatada}.`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}
