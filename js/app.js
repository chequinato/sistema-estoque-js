// ==================== INICIALIZAÇÃO ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Estoque inicializado');

    bloquearSistema();

    document.querySelectorAll('.btn-menu').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!usuarioLogado) {
                mostrarNotificacao('❌ Você precisa fazer login primeiro', 'error');
                adicionarLog('Tentativa de acesso sem autenticação', 'error');
                return;
            }
            const opcao = this.getAttribute('data-option');
            processarOpcaoMenu(parseInt(opcao));
        });
    });

    document.getElementById('btn-clear-logs').addEventListener('click', limparLogs);

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    document.getElementById('form-login-screen').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitLoginScreen();
        }
    });

    document.getElementById('form-register-screen').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitRegisterScreen();
        }
    });
});

console.log(`
╔════════════════════════════════════════╗
║     SISTEMA DE ESTOQUE v1.0.0         ║
║   Desenvolvido em JavaScript puro     ║
╚════════════════════════════════════════╝
`);
