// ==================== INTERFACE E CONTROLE ====================

function abrirAdicionarProduto() {
    document.getElementById('form-add-product').reset();
    abrirModal('modal-add-product');
}

function abrirRemoverProduto(id = null) {
    document.getElementById('form-remove-product').reset();
    if (id) {
        document.getElementById('remove-product-id').value = id;
    }
    abrirModal('modal-remove-product');
}

function abrirAtualizarProduto(id = null) {
    document.getElementById('form-update-product').reset();

    if (id) {
        let produtoEncontrado = null;
        for (let i = 0; i < estoque.length; i++) {
            if (estoque[i].id === parseInt(id)) {
                produtoEncontrado = estoque[i];
                break;
            }
        }

        if (produtoEncontrado) {
            document.getElementById('update-product-id').value = produtoEncontrado.id;
            document.getElementById('update-product-name').value = produtoEncontrado.nome;
            document.getElementById('update-quantity').value = produtoEncontrado.quantidade;
            document.getElementById('update-price').value = produtoEncontrado.preco.toFixed(2);
            document.getElementById('update-category').value = produtoEncontrado.categoria;
        } else {
            document.getElementById('update-product-id').value = id;
        }
    }

    abrirModal('modal-update-product');
}

function abrirBuscarProduto() {
    document.getElementById('form-search-product').reset();
    abrirModal('modal-search-product');
}

function submitAddProduct() {
    const nome = document.getElementById('product-name').value;
    const quantidade = document.getElementById('product-quantity').value;
    const preco = document.getElementById('product-price').value;
    const categoria = document.getElementById('product-category').value;

    if (adicionarProduto(nome, quantidade, preco, categoria)) {
        closeModal('modal-add-product');
        document.getElementById('form-add-product').reset();
    }
}

function submitRemoveProduct() {
    const id = document.getElementById('remove-product-id').value;
    if (removerProduto(id)) {
        closeModal('modal-remove-product');
        document.getElementById('form-remove-product').reset();
    }
}

function submitUpdateProduct() {
    const id = document.getElementById('update-product-id').value;
    const nome = document.getElementById('update-product-name').value;
    const quantidade = document.getElementById('update-quantity').value;
    const preco = document.getElementById('update-price').value;
    const categoria = document.getElementById('update-category').value;

    if (atualizarProduto(id, nome, quantidade, preco, categoria)) {
        closeModal('modal-update-product');
        document.getElementById('form-update-product').reset();
    }
}

function submitSearchProduct() {
    const tipo = document.getElementById('search-type').value;
    const valor = document.getElementById('search-value').value;
    buscarProduto(tipo, valor);
    closeModal('modal-search-product');
}

function updateSearchFields() {
    // fazer no futuro: adaptar placeholder ou UI com base no tipo
}

function submitLogin() {
    const usuario = document.getElementById('login-user').value;
    const senha = document.getElementById('login-password').value;
    if (loginUsuario(usuario, senha)) {
        closeModal('modal-login');
        document.getElementById('form-login').reset();
    }
}

function submitRegister() {
    const usuario = document.getElementById('register-user').value;
    const senha = document.getElementById('register-password').value;
    const confirmSenha = document.getElementById('register-confirm-password').value;

    let senhasIguais;
    do {
        senhasIguais = senha === confirmSenha;
        if (!senhasIguais) {
            mostrarNotificacao('❌ Senhas não coincidem', 'error');
            adicionarLog('Tentativa de cadastro com senhas diferentes', 'error');
            return;
        }
    } while (false);

    if (cadastrarUsuario(usuario, senha)) {
        closeModal('modal-register');
        document.getElementById('form-register').reset();
    }
}

function bloquearSistema() {
    const loginScreen = document.getElementById('login-screen');
    const container = document.querySelector('.container');
    if (!usuarioLogado) {
        loginScreen.classList.remove('hidden');
        container.style.display = 'none';
    }
}

function desbloquearSistema() {
    const loginScreen = document.getElementById('login-screen');
    const container = document.querySelector('.container');
    if (usuarioLogado) {
        loginScreen.classList.add('hidden');
        container.style.display = 'flex';
        carregarDadosIniciais();
    }
}

function carregarDadosIniciais() {
    if (estoque.length === 0) {
        // Dados iniciais presentes no array assim que executar o código.
        const produtosIniciais = [
            { nome: 'Mouse Gamer RGB',   quantidade: 10, preco: 150.00, categoria: 'Periféricos' },
            { nome: 'Teclado Mecânico',  quantidade: 5,  preco: 350.00, categoria: 'Periféricos' },
            { nome: 'Monitor 27"',       quantidade: 3,  preco: 1200.00, categoria: 'Hardware'   },
            { nome: 'Headset Gamer',     quantidade: 8,  preco: 250.00, categoria: 'Periféricos' },
            { nome: 'Webcam HD',         quantidade: 2,  preco: 180.00, categoria: 'Hardware'    }
        ];

        for (let i = 0; i < produtosIniciais.length; i++) {
            const p = produtosIniciais[i];
            adicionarProduto(p.nome, p.quantidade, p.preco, p.categoria);
        }

        adicionarLog('Dados de exemplo carregados', 'info');
    }
}

function limparTela() {
    estoque = [];
    renderizarProdutos(estoque);
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '';
    adicionarLog('Aguardando novo login...', 'info');
}

function submitLoginScreen() {
    const usuario = document.getElementById('login-user-screen').value;
    const senha = document.getElementById('login-password-screen').value;

    let camposPreenchidos;
    do {
        camposPreenchidos = usuario && senha;
        if (!camposPreenchidos) {
            mostrarNotificacao('❌ Digite usuário e senha', 'error');
            return;
        }
    } while (false);

    if (loginUsuario(usuario, senha)) {
        setTimeout(() => desbloquearSistema(), 500);
        document.getElementById('form-login-screen').reset();
    }
}

function mudarAba(aba) {
    if (aba === 'login') {
        document.getElementById('aba-login').classList.add('active');
        document.getElementById('aba-register').classList.remove('active');
        document.getElementById('tab-login').classList.add('active');
        document.getElementById('tab-register').classList.remove('active');
    } else if (aba === 'register') {
        document.getElementById('aba-register').classList.add('active');
        document.getElementById('aba-login').classList.remove('active');
        document.getElementById('tab-register').classList.add('active');
        document.getElementById('tab-login').classList.remove('active');
    }
}

function submitRegisterScreen() {
    const usuario = document.getElementById('register-user-screen').value;
    const senha = document.getElementById('register-password-screen').value;
    const confirmSenha = document.getElementById('register-confirm-screen').value;

    let todosPreenchidos;
    do {
        todosPreenchidos = usuario && senha && confirmSenha;
        if (!todosPreenchidos) {
            mostrarNotificacao('❌ Preencha todos os campos', 'error');
            return;
        }
    } while (false);

    if (senha !== confirmSenha) {
        mostrarNotificacao('❌ Senhas não coincidem', 'error');
        adicionarLog('Tentativa de cadastro com senhas diferentes', 'error');
        return;
    }
    if (cadastrarUsuario(usuario, senha)) {
        mostrarNotificacao(`✅ Usuário "${usuario}" cadastrado! Faça login para continuar`, 'success');
        document.getElementById('form-register-screen').reset();
        setTimeout(() => mudarAba('login'), 1500);
    }
}

function processarOpcaoMenu(opcao) {
    switch (opcao) {
        case 1:
            abrirAdicionarProduto();
            adicionarLog('Menu: Adicionar Produto', 'info');
            break;
        case 2:
            renderizarProdutos(estoque);
            adicionarLog('Menu: Ver Estoque', 'info');
            break;
        case 3:
            abrirRemoverProduto();
            adicionarLog('Menu: Remover Produto', 'info');
            break;
        case 4:
            abrirAtualizarProduto();
            adicionarLog('Menu: Atualizar Produto', 'info');
            break;
        case 5:
            abrirBuscarProduto();
            adicionarLog('Menu: Buscar Produto', 'info');
            break;
        case 6:
            mostrarEstoqueBaixo();
            adicionarLog('Menu: Estoque Baixo', 'info');
            break;
        case 7:
            gerarRelatorio();
            adicionarLog('Menu: Gerar Relatório', 'info');
            break;
        case 8:
            abrirLogin();
            adicionarLog('Menu: Login', 'info');
            break;
        case 9:
            abrirCadastro();
            adicionarLog('Menu: Cadastro de Usuário', 'info');
            break;
        case 0:
            if (usuarioLogado) {
                logoutUsuario();
            }
            mostrarNotificacao('👋 Obrigado por usar o Sistema de Estoque!', 'info');
            adicionarLog('Sistema finalizado pelo usuário', 'info');
            break;
        default:
            mostrarNotificacao('❌ Opção inválida', 'error');
            adicionarLog('Opção inválida selecionada', 'error');
    }
}
