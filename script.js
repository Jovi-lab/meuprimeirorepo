document.getElementById('formAgendamento').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById('nome').value.trim();
    const servico = document.getElementById('servico').value;
    const dataHoraInput = document.getElementById('dataHora').value;
    const telefone = document.getElementById('telefone').value.trim();
    const mensagemDiv = document.getElementById('mensagem');

    // 1. Limpar mensagens anteriores
    mensagemDiv.textContent = '';
    mensagemDiv.className = 'mensagem-oculta';

    // 2. Validação básica de campos
    if (!nome || !servico || !dataHoraInput || !telefone) {
        exibirMensagem('Por favor, preencha todos os campos do formulário.', 'erro');
        return;
    }

    // 3. Validação de Data e Hora (Novo campo datetime-local)
    const dataAgendamento = new Date(dataHoraInput);
    const agora = new Date();

    // Remove segundos e milissegundos para comparação mais limpa
    agora.setSeconds(0, 0); 
    dataAgendamento.setSeconds(0, 0);

    if (dataAgendamento <= agora) {
        exibirMensagem('A data e hora do agendamento deve ser futura. Por favor, escolha um horário válido.', 'erro');
        return;
    }

    // 4. Se todas as validações passarem
    
    // Formatação da mensagem de sucesso
    const dataFormatada = dataAgendamento.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const horaFormatada = dataAgendamento.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const mensagemSucesso = `
        Agendamento realizado com sucesso!
        Cliente: ${nome}. 
        Serviço: ${servico}. 
        Data: ${dataFormatada} às ${horaFormatada}.
        Aguarde o contato pelo telefone: ${telefone}.
    `;

    exibirMensagem(mensagemSucesso, 'sucesso');
    
    // Limpar o formulário após o sucesso (opcional)
    document.getElementById('formAgendamento').reset();
});

/**
 * Função para exibir mensagens de feedback ao usuário
 * @param {string} texto - O texto da mensagem.
 * @param {string} tipo - 'sucesso' ou 'erro'.
 */
function exibirMensagem(texto, tipo) {
    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = texto;
    // Adiciona a classe de estilo apropriada
    mensagemDiv.classList.remove('mensagem-sucesso', 'mensagem-erro');
    mensagemDiv.classList.add(`mensagem-${tipo}`);
}
