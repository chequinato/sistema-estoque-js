// ==================== UTILITÁRIOS ====================

// Função para adicionar uma mensagem de log ao terminal, com um tipo opcional para diferenciar mensagens de sucesso, erro, aviso ou informação
function adicionarLog(mensagem, tipo = 'info') {
    const terminal = document.getElementById('terminal');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${tipo}`;
    logEntry.textContent = `> ${mensagem}`;

    terminal.appendChild(logEntry);
    terminal.scrollTop = terminal.scrollHeight;

    const entries = terminal.querySelectorAll('.log-entry');
    for (let i = 0; i < entries.length - 100; i++) {
        entries[i].remove();
    }
}

// Função para limpar o terminal de logs, removendo todas as entradas e adicionando um log indicando que os logs foram limpos
function limparLogs() {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '';
    adicionarLog('Logs limpos pelo usuário', 'info');
}

// Função para criar um card de produto, exibindo as informações do produto e destacando visualmente os produtos com estoque baixo
function mostrarNotificacao(mensagem, tipo = 'info', duracao = 3000) {
    const container = document.getElementById('notifications');
    const notif = document.createElement('div');
    notif.className = `notification ${tipo}`;

    const icone = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    }[tipo] || 'ℹ️';

    notif.innerHTML = `
        <span>${icone}</span>
        <span>${mensagem}</span>
    `;

    container.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'notificationSlide 0.4s ease reverse';
        setTimeout(() => notif.remove(), 400);
    }, duracao);
}

// Função para realizar o login do usuário, validando os campos e verificando as credenciais
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

// Função para fechar um modal, removendo a classe que o torna visível
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}
