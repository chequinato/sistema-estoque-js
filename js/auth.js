// ==================== AUTENTICAÇÃO ====================

// Função para realizar o login do usuário, validando os campos e verificando as credenciais
function loginUsuario(usuario, senha) {
    let camposValidos;
    do {
        camposValidos = usuario && senha;
        if (!camposValidos) {
            mostrarNotificacao('❌ Usuário e senha são obrigatórios', 'error');
            adicionarLog('Tentativa de login com campos vazios', 'error');
            return false;
        }
    } while (false);
    let userEncontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === usuario && usuarios[i].senha === senha) {
            userEncontrado = usuarios[i];
            break;
        }
    }

    if (!userEncontrado) {
        adicionarLog(`Tentativa de login falhou: usuário "${usuario}"`, 'error');
        mostrarNotificacao('❌ Usuário ou senha inválidos', 'error');
        return false;
    }

    usuarioLogado = usuario;
    document.getElementById('user-info').textContent = `Usuário: ${usuario}`;
    adicionarLog(`Usuário "${usuario}" fez login com sucesso`, 'success');
    mostrarNotificacao(`🔓 Bem-vindo, ${usuario}!`, 'success');
    atualizarVisibilidadeMenu();
    return true;
}

// Função para realizar o logout do usuário, verificando se há um usuário logado e atualizando a interface
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
    atualizarVisibilidadeMenu();

    setTimeout(() => {
        bloquearSistema();
        limparTela();
    }, 1000);
    return true;
}

// Função para cadastrar um novo usuário, validando os campos, verificando a força da senha e evitando usuários duplicados
function cadastrarUsuario(usuario, senha) {
    let dadosValidos;
    do {
        dadosValidos = usuario && senha;
        if (!dadosValidos) {
            mostrarNotificacao('❌ Usuário e senha são obrigatórios', 'error');
            adicionarLog('Tentativa de cadastro com campos vazios', 'error');
            return false;
        }
    } while (false);

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
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === usuario) {
            mostrarNotificacao('❌ Usuário já existe', 'error');
            adicionarLog(`Tentativa de cadastro com usuário duplicado: "${usuario}"`, 'error');
            return false;
        }

        // Aqui, não precisamos de verificação adicional de senha, pois o requisito mínimo já foi validado acima
    }

    usuarios.push({ usuario: usuario, senha: senha });
    adicionarLog(`Novo usuário cadastrado: "${usuario}"`, 'success');
    mostrarNotificacao(`👤 Usuário "${usuario}" cadastrado com sucesso!`, 'success');
    return true;
}
