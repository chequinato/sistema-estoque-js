// ==================== AUTENTICAÇÃO ====================

function loginUsuario(usuario, senha) {
    if (!usuario || !senha) {
        mostrarNotificacao('❌ Usuário e senha são obrigatórios', 'error');
        adicionarLog('Tentativa de login com campos vazios', 'error');
        return false;
    }

    const user = usuarios.find(u => u.usuario === usuario && u.senha === senha);
    if (!user) {
        adicionarLog(`Tentativa de login falhou: usuário "${usuario}"`, 'error');
        mostrarNotificacao('❌ Usuário ou senha inválidos', 'error');
        return false;
    }

    usuarioLogado = usuario;
    document.getElementById('user-info').textContent = `Usuário: ${usuario}`;
    adicionarLog(`Usuário "${usuario}" fez login com sucesso`, 'success');
    mostrarNotificacao(`🔓 Bem-vindo, ${usuario}!`, 'success');
    return true;
}

function logoutUsuario() {
    if (!usuarioLogado) {
        mostrarNotificacao('❌ Nenhum usuário logado', 'error');
        return false;
    }

    const usuario = usuarioLogado;
    usuarioLogado = null;
    document.getElementById('user-info').textContent = 'Usuário: Não autenticado';
    adicionarLog(`Usuário "${usuario}" fez logout`, 'info');
    mostrarNotificacao(`👋 Até logo, ${usuario}!`, 'info');

    setTimeout(() => {
        bloquearSistema();
        limparTela();
    }, 1000);
    return true;
}

function cadastrarUsuario(usuario, senha) {
    if (!usuario || !senha) {
        mostrarNotificacao('❌ Usuário e senha são obrigatórios', 'error');
        adicionarLog('Tentativa de cadastro com campos vazios', 'error');
        return false;
    }

    if (usuario.trim().length < 3) {
        mostrarNotificacao('❌ Usuário deve ter pelo menos 3 caracteres', 'error');
        adicionarLog('Tentativa de cadastro com usuário muito curto', 'error');
        return false;
    }

    if (senha.trim().length < 5) {
        mostrarNotificacao('❌ Senha deve ter pelo menos 5 caracteres', 'error');
        adicionarLog('Tentativa de cadastro com senha fraca', 'error');
        return false;
    }

    if (usuarios.find(u => u.usuario === usuario)) {
        mostrarNotificacao('❌ Usuário já existe', 'error');
        adicionarLog(`Tentativa de cadastro com usuário duplicado: "${usuario}"`, 'error');
        return false;
    }

    usuarios.push({ usuario: usuario, senha: senha });
    adicionarLog(`Novo usuário cadastrado: "${usuario}"`, 'success');
    mostrarNotificacao(`👤 Usuário "${usuario}" cadastrado com sucesso!`, 'success');
    return true;
}
