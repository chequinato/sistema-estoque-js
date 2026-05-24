// ==================== INTERFACE E CONTROLE ====================

// Função para abrir um modal específico, adicionando a classe 'active' para exibir o modal e a classe 'blur' para aplicar o efeito de desfoque no fundo
function abrirAdicionarProduto() {
    document.getElementById('form-add-product').reset();
    abrirModal('modal-add-product');
}

// Função para renderizar a lista completa de produtos, exibindo um estado vazio se não houver produtos cadastrados
function abrirRemoverProduto(id = null) {
    document.getElementById('form-remove-product').reset();
    if (id) {
        document.getElementById('remove-product-id').value = id;
    }
    abrirModal('modal-remove-product');
}

// Função para abrir o modal de atualização de produto, preenchendo os campos com as informações do produto selecionado para facilitar a edição
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

// Função para abrir o modal de busca de produtos, permitindo ao usuário escolher o tipo de busca e inserir o valor correspondente para encontrar os produtos desejados
function abrirBuscarProduto() {
    document.getElementById('form-search-product').reset();
    abrirModal('modal-search-product');
}

// Função que adiciona um produto ao estoque, validando os campos de entrada e registrando a ação para fins de log, além de atualizar a interface para refletir a adição do novo produto
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

// Função que remove um produto do estoque, validando o ID de entrada e registrando a ação para fins de log, além de atualizar a interface para refletir a remoção do produto
function submitRemoveProduct() {
    const id = document.getElementById('remove-product-id').value;
    if (removerProduto(id)) {
        closeModal('modal-remove-product');
        document.getElementById('form-remove-product').reset();
    }
}

// Função que atualiza as informações de um produto, validando os campos de entrada e registrando as alterações para fins de log, além de atualizar a interface para refletir as mudanças realizadas no produto
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

// Função que realiza a busca de produtos com base em diferentes critérios (ID, nome ou categoria), validando a entrada e registrando os resultados da busca para fins de log, além de atualizar a interface para exibir os produtos encontrados
function submitSearchProduct() {
    const tipo = document.getElementById('search-type').value;
    const valor = document.getElementById('search-value').value;
    buscarProduto(tipo, valor);
    closeModal('modal-search-product');
}

// Função para atualizar os campos de busca dinamicamente com base no tipo de busca selecionado, adaptando o placeholder ou a interface conforme necessário para melhorar a experiência do usuário
function updateSearchFields() {
    const tipo = document.getElementById('search-type').value;
    const valorInput = document.getElementById('search-value');
    if (tipo === 'id') {
        valorInput.placeholder = 'Digite o ID do produto';
    }
        else if (tipo === 'nome') {
        valorInput.placeholder = 'Digite o nome do produto';
    } else if (tipo === 'categoria') {
        valorInput.placeholder = 'Digite a categoria do produto';
    } else {
        valorInput.placeholder = 'Digite o valor de busca';
    }


}

// Função para realizar o login do usuário, validando os campos de entrada e verificando as credenciais, além de atualizar a interface para refletir o estado de autenticação do usuário e registrar as ações para fins de log
function submitLogin() {
    const usuario = document.getElementById('login-user').value;
    const senha = document.getElementById('login-password').value;
    if (loginUsuario(usuario, senha)) {
        closeModal('modal-login');
        document.getElementById('form-login').reset();
    }
}

// Função para realizar o cadastro de um novo usuário, validando os campos de entrada, verificando a força da senha e evitando usuários duplicados, além de atualizar a interface para refletir o sucesso do cadastro e registrar as ações para fins de log
function submitRegister() {
    const usuario = document.getElementById('register-user').value;
    const senha = document.getElementById('register-password').value;
    const confirmSenha = document.getElementById('register-confirm-password').value;
    
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

// Função que atualiza a visibilidade dos botões de menu conforme o estado de autenticação do usuário
function atualizarVisibilidadeMenu() {
    const btnLogin = document.querySelector('[data-option="8"]');
    const btnCadastro = document.querySelector('[data-option="9"]');
    const btnLogout = document.querySelector('[data-option="0"]');
    
    if (usuarioLogado) {
        // Usuário logado: esconde login e cadastro, mostra logout
        if (btnLogin) btnLogin.style.display = 'none';
        if (btnCadastro) btnCadastro.style.display = 'none';
        if (btnLogout) btnLogout.style.display = 'flex';
    } else {
        // Usuário não logado: mostra login e cadastro, esconde logout
        if (btnLogin) btnLogin.style.display = 'flex';
        if (btnCadastro) btnCadastro.style.display = 'flex';
        if (btnLogout) btnLogout.style.display = 'none';
    }
}

// Função que bloqueia o sistema, exibindo a tela de login e ocultando o restante da interface, garantindo que apenas usuários autenticados possam acessar as funcionalidades do sistema
function bloquearSistema() {
    const loginScreen = document.getElementById('login-screen');
    const container = document.querySelector('.container');
    if (!usuarioLogado) {
        loginScreen.classList.remove('hidden');
        container.style.display = 'none';
        atualizarVisibilidadeMenu();
    }
}

// Função que desbloqueia o sistema, ocultando a tela de login e exibindo o restante da interface, além de carregar os dados iniciais do estoque para que o usuário possa começar a utilizar o sistema imediatamente após o login
function desbloquearSistema() {
    const loginScreen = document.getElementById('login-screen');
    const container = document.querySelector('.container');
    if (usuarioLogado) {
        loginScreen.classList.add('hidden');
        container.style.display = 'flex';
        carregarDadosIniciais();
        atualizarVisibilidadeMenu();
    }
}

// Função que carrega os dados iniciais do estoque, verificando se o estoque está vazio e, se estiver, adicionando um conjunto de produtos pré-definidos para que o usuário tenha uma base de dados para interagir ao utilizar o sistema pela primeira vez
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

// Função que limpa a tela do sistema, esvaziando o estoque e o terminal de logs, além de adicionar um log indicando que os dados foram limpos e o sistema está aguardando um novo login para começar a ser utilizado novamente
function limparTela() {
    estoque = [];
    renderizarProdutos(estoque);
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '';
    adicionarLog('Aguardando novo login...', 'info');
}

// Função que faz um submit da tela de login, validando os campos de entrada e verificando as credenciais do usuário, além de atualizar a interface para refletir o estado de autenticação do usuário e registrar as ações para fins de log
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

// Função que muda de aba na tela de login/cadastro, alternando entre as interfaces de login e registro de usuário para permitir que o usuário escolha a ação desejada ao acessar o sistema
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

// Função que da um submit da tela de registro, validando os campos de entrada, verificando a força da senha e evitando usuários duplicados, além de atualizar a interface para refletir o sucesso do cadastro e registrar as ações para fins de log
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

// Função que processa a opção selecionada no menu principal, chamando a função correspondente para cada ação (adicionar produto, ver estoque, remover produto, atualizar produto, buscar produto, mostrar estoque baixo, gerar relatório, login, cadastro ou sair do sistema), além de registrar as ações realizadas para fins de log e exibir notificações apropriadas para cada ação
// Vamos substituir os switch por ifs para evitar o uso de estruturas de controle mais complexas, mantendo a lógica simples e direta para cada opção do menu, facilitando a leitura e manutenção do código

function processarOpcaoMenu(opcao) {
    if (opcao === 1) {
        abrirAdicionarProduto();
        adicionarLog('Menu: Adicionar Produto', 'info');
    } else if (opcao === 2) {
        renderizarProdutos(estoque);
        adicionarLog('Menu: Ver Estoque', 'info');
    } else if (opcao === 3) {
        abrirRemoverProduto();
        adicionarLog('Menu: Remover Produto', 'info');
    }
    else if (opcao === 4) {
        abrirAtualizarProduto();
        adicionarLog('Menu: Atualizar Produto', 'info');
    }
    else if (opcao === 5) {
        abrirBuscarProduto();
        adicionarLog('Menu: Buscar Produto', 'info');
    }
    else if (opcao === 6) {
        mostrarEstoqueBaixo();
        adicionarLog('Menu: Mostrar Estoque Baixo', 'info');
    }
    else if (opcao === 7) {
        gerarRelatorio();
        adicionarLog('Menu: Gerar Relatório', 'info');
    }
    else if (opcao === 8) {
        abrirModal('modal-login');
        adicionarLog('Menu: Login', 'info');
    }
    else if (opcao === 9) {
        abrirModal('modal-register');
        adicionarLog('Menu: Cadastro', 'info');
    }
    else if (opcao === 0) {
        logoutUsuario();
        adicionarLog('Menu: Logout', 'info');
    }
}


