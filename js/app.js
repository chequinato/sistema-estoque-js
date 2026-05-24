// ==================== INICIALIZAÇÃO ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Estoque inicializado');

    bloquearSistema();
    atualizarVisibilidadeMenu();

    document.querySelectorAll('.btn-menu').forEach(btn => {
        btn.addEventListener('click', function() {
            const opcao = parseInt(this.getAttribute('data-option'));
            
            // Permitir login (8), cadastro (9) e logout (0) sem autenticação
            // Logout (0) é permitido sempre, mas a função verifica se há usuário logado
            const opcaoPublica = [0, 8, 9];
            
            if (!usuarioLogado && !opcaoPublica.includes(opcao)) {
                mostrarNotificacao('❌ Você precisa fazer login primeiro', 'error');
                adicionarLog('Tentativa de acesso sem autenticação', 'error');
                return;
            }
            
            processarOpcaoMenu(opcao);
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
