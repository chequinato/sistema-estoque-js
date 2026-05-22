// ==================== SISTEMA DE ESTOQUE EM JAVASCRIPT ====================
// Sistema completo de gerenciamento de estoque
// Utiliza: do while, switch case, funções, arrays, objetos e manipulação DOM

// ==================== DADOS GLOBAIS ====================

// Array para armazenar usuários
let usuarios = [
    {
        usuario: "admin",
        senha: "123456"
    },
    {
        usuario: "gerente",
        senha: "senha123"
    }
];

// Array para armazenar produtos
let estoque = [];

// Array para armazenar histórico de logs
let logs = [];

// Controle de usuário logado
let usuarioLogado = null;

// ID único para produtos
let proximoID = 1;

// ==================== FUNÇÕES DE LOG ====================

/**
 * Adiciona uma mensagem ao terminal/logs
 * @param {string} mensagem - Mensagem a ser exibida
 * @param {string} tipo - Tipo de mensagem: 'info', 'success', 'error', 'warning'
 */
function adicionarLog(mensagem, tipo = 'info') {
    const terminal = document.getElementById('terminal');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${tipo}`;
    logEntry.textContent = `> ${mensagem}`;

    terminal.appendChild(logEntry);
    terminal.scrollTop = terminal.scrollHeight;

    // Manter apenas os últimos 100 logs
    const entries = terminal.querySelectorAll('.log-entry');
    if (entries.length > 100) {
        entries[0].remove();
    }
}

/**
 * Limpa todos os logs do terminal
 */
function limparLogs() {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '';
    adicionarLog('Logs limpos pelo usuário', 'info');
}

// ==================== FUNÇÕES DE NOTIFICAÇÃO ====================

/**
 * Exibe uma notificação visual na tela
 * @param {string} mensagem - Mensagem da notificação
 * @param {string} tipo - Tipo: 'success', 'error', 'warning', 'info'
 * @param {number} duracao - Duração em ms (padrão 3000)
 */
function mostrarNotificacao(mensagem, tipo = 'info', duracao = 3000) {
    const container = document.getElementById('notifications');
    const notif = document.createElement('div');
    notif.className = `notification ${tipo}`;

    // Adicionar ícone apropriado
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

    // Remover após duração
    setTimeout(() => {
        notif.style.animation = 'notificationSlide 0.4s ease reverse';
        setTimeout(() => notif.remove(), 400);
    }, duracao);
}

// ==================== FUNÇÕES DE MODAL ====================

/**
 * Abre um modal
 * @param {string} modalId - ID do modal
 */
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Fecha um modal
 * @param {string} modalId - ID do modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// ==================== FUNÇÕES DE PRODUTO ====================

/**
 * Adiciona um novo produto ao estoque
 * @param {string} nome - Nome do produto
 * @param {number} quantidade - Quantidade inicial
 * @param {number} preco - Preço do produto
 * @param {string} categoria - Categoria do produto
 */
function adicionarProduto(nome, quantidade, preco, categoria) {
    // Validações
    if (!nome || nome.trim() === '') {
        mostrarNotificacao('Nome do produto é obrigatório', 'error');
        adicionarLog('Tentativa de adicionar produto sem nome', 'error');
        return false;
    }

    if (quantidade <= 0) {
        mostrarNotificacao('Quantidade deve ser maior que zero', 'error');
        adicionarLog('Tentativa de adicionar produto com quantidade inválida', 'error');
        return false;
    }

    if (preco < 0) {
        mostrarNotificacao('Preço não pode ser negativo', 'error');
        adicionarLog('Tentativa de adicionar produto com preço negativo', 'error');
        return false;
    }

    // Criar objeto do produto
    const novoProduto = {
        id: proximoID++,
        nome: nome.trim(),
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        categoria: categoria,
        status: quantidade > 0 ? 'Disponível' : 'Indisponível',
        dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    // Adicionar ao array
    estoque.push(novoProduto);

    // Logs e notificações
    adicionarLog(`Produto "${novoProduto.nome}" adicionado com sucesso (ID: ${novoProduto.id})`, 'success');
    mostrarNotificacao(`✅ "${novoProduto.nome}" adicionado ao estoque`, 'success');

    // Atualizar visualização
    renderizarProdutos(estoque);

    return true;
}

/**
 * Remove um produto pelo ID
 * @param {number} id - ID do produto
 */
function removerProduto(id) {
    const indice = estoque.findIndex(p => p.id === parseInt(id));

    if (indice === -1) {
        mostrarNotificacao('❌ Produto não encontrado', 'error');
        adicionarLog(`Tentativa de remover produto ID ${id} (não encontrado)`, 'error');
        return false;
    }

    const produto = estoque[indice];
    estoque.splice(indice, 1);

    adicionarLog(`Produto "${produto.nome}" removido do estoque`, 'success');
    mostrarNotificacao(`🗑️ "${produto.nome}" removido`, 'success');

    renderizarProdutos(estoque);
    return true;
}

/**
 * Atualiza a quantidade de um produto
 * @param {number} id - ID do produto
 * @param {number} novaQuantidade - Nova quantidade
 */
function atualizarQuantidade(id, novaQuantidade) {
    const produto = estoque.find(p => p.id === parseInt(id));

    if (!produto) {
        mostrarNotificacao('❌ Produto não encontrado', 'error');
        adicionarLog(`Tentativa de atualizar produto ID ${id} (não encontrado)`, 'error');
        return false;
    }

    if (novaQuantidade < 0) {
        mostrarNotificacao('❌ Quantidade não pode ser negativa', 'error');
        adicionarLog('Tentativa de quantidade negativa', 'error');
        return false;
    }

    const quantidadeAnterior = produto.quantidade;
    produto.quantidade = parseInt(novaQuantidade);
    produto.status = novaQuantidade > 0 ? 'Disponível' : 'Indisponível';

    adicionarLog(
        `Quantidade de "${produto.nome}" atualizada: ${quantidadeAnterior} → ${novaQuantidade}`,
        'success'
    );
    mostrarNotificacao(
        `🔄 "${produto.nome}" atualizado: ${quantidadeAnterior} → ${novaQuantidade}`,
        'success'
    );

    renderizarProdutos(estoque);
    return true;
}

/**
 * Busca produtos por diferentes critérios
 * @param {string} tipo - Tipo de busca: 'id', 'nome', 'categoria'
 * @param {string} valor - Valor a buscar
 */
function buscarProduto(tipo, valor) {
    if (!valor || valor.trim() === '') {
        mostrarNotificacao('❌ Digite um valor para buscar', 'error');
        adicionarLog('Tentativa de busca com valor vazio', 'error');
        return [];
    }

    let resultados = [];

    switch (tipo) {
        case 'id':
            resultados = estoque.filter(p => p.id === parseInt(valor));
            break;
        case 'nome':
            resultados = estoque.filter(p =>
                p.nome.toLowerCase().includes(valor.toLowerCase())
            );
            break;
        case 'categoria':
            resultados = estoque.filter(p =>
                p.categoria.toLowerCase().includes(valor.toLowerCase())
            );
            break;
        default:
            mostrarNotificacao('❌ Tipo de busca inválido', 'error');
            return [];
    }

    if (resultados.length === 0) {
        adicionarLog(
            `Nenhum produto encontrado ao buscar ${tipo}: "${valor}"`,
            'warning'
        );
        mostrarNotificacao('❌ Nenhum produto encontrado', 'warning');
    } else {
        adicionarLog(
            `Busca por ${tipo} "${valor}": ${resultados.length} resultado(s) encontrado(s)`,
            'success'
        );
        mostrarNotificacao(`🔍 ${resultados.length} produto(s) encontrado(s)`, 'info');
    }

    renderizarResultadosBusca(resultados, tipo);
    return resultados;
}

/**
 * Exibe todos os produtos com estoque baixo (< 5 unidades)
 */
function mostrarEstoqueBaixo() {
    const produtosBaixos = estoque.filter(p => p.quantidade < 5);

    if (produtosBaixos.length === 0) {
        adicionarLog('Nenhum produto com estoque baixo', 'info');
        mostrarNotificacao('✅ Estoque OK - Nenhum produto com quantidade baixa', 'success');
    } else {
        adicionarLog(
            `${produtosBaixos.length} produto(s) com estoque baixo`,
            'warning'
        );
        mostrarNotificacao(
            `⚠️ ${produtosBaixos.length} produto(s) com estoque baixo`,
            'warning'
        );
    }

    renderizarEstoqueBaixo(estoque);
}

/**
 * Gera um relatório completo do estoque
 */
function gerarRelatorio() {
    if (estoque.length === 0) {
        adicionarLog('Relatório solicitado - estoque vazio', 'info');
        mostrarNotificacao('❌ Nenhum produto para gerar relatório', 'error');
        return;
    }

    // Calcular dados
    const totalProdutos = estoque.length;
    const totalEmEstoque = estoque.reduce((sum, p) => sum + p.quantidade, 0);
    const produtosBaixos = estoque.filter(p => p.quantidade < 5).length;
    const valorTotal = estoque.reduce((sum, p) => sum + (p.preco * p.quantidade), 0);
    const produtoMaisCaro = estoque.reduce((max, p) => p.preco > max.preco ? p : max);
    const produtoMaisBarato = estoque.reduce((min, p) => p.preco < min.preco ? p : min);
    const categorias = [...new Set(estoque.map(p => p.categoria))];

    // Renderizar relatório
    const modal = document.getElementById('modal-report');
    const content = document.getElementById('report-content');

    let html = `
        <div class="report-section">
            <h3>📊 RESUMO GERAL</h3>
            <div class="report-item">
                <span class="report-item-label">Total de Produtos:</span>
                <span class="report-item-value">${totalProdutos}</span>
            </div>
            <div class="report-item">
                <span class="report-item-label">Total em Estoque:</span>
                <span class="report-item-value">${totalEmEstoque} un.</span>
            </div>
            <div class="report-item">
                <span class="report-item-label">Produtos com Estoque Baixo:</span>
                <span class="report-item-value">${produtosBaixos}</span>
            </div>
            <div class="report-item">
                <span class="report-item-label">Valor Total do Estoque:</span>
                <span class="report-item-value">R$ ${valorTotal.toFixed(2)}</span>
            </div>
        </div>

        <div class="report-section">
            <h3>💰 PREÇOS</h3>
            <div class="report-item">
                <span class="report-item-label">Produto Mais Caro:</span>
                <span class="report-item-value">${produtoMaisCaro.nome} (R$ ${produtoMaisCaro.preco.toFixed(2)})</span>
            </div>
            <div class="report-item">
                <span class="report-item-label">Produto Mais Barato:</span>
                <span class="report-item-value">${produtoMaisBarato.nome} (R$ ${produtoMaisBarato.preco.toFixed(2)})</span>
            </div>
            <div class="report-item">
                <span class="report-item-label">Preço Médio:</span>
                <span class="report-item-value">R$ ${(valorTotal / totalProdutos).toFixed(2)}</span>
            </div>
        </div>

        <div class="report-section">
            <h3>📦 CATEGORIAS</h3>
            <div class="report-item">
                <span class="report-item-label">Total de Categorias:</span>
                <span class="report-item-value">${categorias.length}</span>
            </div>
    `;

    // Listar produtos por categoria
    categorias.forEach(cat => {
        const qtd = estoque.filter(p => p.categoria === cat).length;
        html += `
            <div class="report-item">
                <span class="report-item-label">${cat}:</span>
                <span class="report-item-value">${qtd} produto(s)</span>
            </div>
        `;
    });

    html += '</div>';

    content.innerHTML = html;
    abrirModal('modal-report');

    adicionarLog('Relatório do estoque gerado com sucesso', 'success');
    mostrarNotificacao('📊 Relatório gerado', 'info');
}

// ==================== FUNÇÕES DE AUTENTICAÇÃO ====================

/**
 * Realiza login do usuário
 * @param {string} usuario - Usuário
 * @param {string} senha - Senha
 */
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

/**
 * Realiza logout do usuário
 */
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

    // BLOQUEAR o sistema novamente após logout
    setTimeout(() => {
        bloquearSistema();
        limparTela();
    }, 1000);

    return true;
}

/**
 * Cadastra um novo usuário
 * @param {string} usuario - Nome de usuário
 * @param {string} senha - Senha
 */
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

    // Verificar se usuário já existe
    if (usuarios.find(u => u.usuario === usuario)) {
        mostrarNotificacao('❌ Usuário já existe', 'error');
        adicionarLog(`Tentativa de cadastro com usuário duplicado: "${usuario}"`, 'error');
        return false;
    }

    // Adicionar novo usuário
    usuarios.push({
        usuario: usuario,
        senha: senha
    });

    adicionarLog(`Novo usuário cadastrado: "${usuario}"`, 'success');
    mostrarNotificacao(`👤 Usuário "${usuario}" cadastrado com sucesso!`, 'success');

    return true;
}

// ==================== FUNÇÕES DE ABRIR FORMULÁRIOS ====================

function abrirAdicionarProduto() {
    // Limpar formulário
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

function abrirAtualizarQuantidade(id = null) {
    document.getElementById('form-update-quantity').reset();
    if (id) {
        document.getElementById('update-product-id').value = id;
    }
    abrirModal('modal-update-quantity');
}

function abrirBuscarProduto() {
    document.getElementById('form-search-product').reset();
    abrirModal('modal-search-product');
}

function abrirLogin() {
    document.getElementById('form-login').reset();
    abrirModal('modal-login');
}

function abrirCadastro() {
    document.getElementById('form-register').reset();
    abrirModal('modal-register');
}

// ==================== FUNÇÕES DE SUBMISSÃO ====================

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

function submitUpdateQuantity() {
    const id = document.getElementById('update-product-id').value;
    const novaQuantidade = document.getElementById('update-quantity').value;

    if (atualizarQuantidade(id, novaQuantidade)) {
        closeModal('modal-update-quantity');
        document.getElementById('form-update-quantity').reset();
    }
}

function submitSearchProduct() {
    const tipo = document.getElementById('search-type').value;
    const valor = document.getElementById('search-value').value;

    buscarProduto(tipo, valor);
    closeModal('modal-search-product');
}

function updateSearchFields() {
    // Permite mudança dinâmica se necessário
    // Pode ser expandido no futuro
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

    if (senha !== confirmSenha) {
        mostrarNotificacao('❌ Senhas não coincidem', 'error');
        adicionarLog('Tentativa de cadastro com senhas diferentes', 'error');
        return;
    }

    if (cadastrarUsuario(usuario, senha)) {
        closeModal('modal-register');
        document.getElementById('form-register').reset();
    }
}

// ==================== INICIALIZAÇÃO E EVENT LISTENERS ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Estoque inicializado');

    // NÃO carrega produtos automaticamente - exige login primeiro
    // Esta seção foi removida para exigir autenticação obrigatória
    /*
    adicionarProduto('Mouse Gamer RGB', 10, 150.00, 'Periféricos');
    adicionarProduto('Teclado Mecânico', 5, 350.00, 'Periféricos');
    adicionarProduto('Monitor 27"', 3, 1200.00, 'Hardware');
    adicionarProduto('Headset Gamer', 8, 250.00, 'Periféricos');
    adicionarProduto('Webcam HD', 2, 180.00, 'Hardware');
    */

    // Bloquear acesso até fazer login
    bloquearSistema();

    // Event listeners para menu
    document.querySelectorAll('.btn-menu').forEach(btn => {
        btn.addEventListener('click', function() {
            // Verificar se está autenticado
            if (!usuarioLogado) {
                mostrarNotificacao('❌ Você precisa fazer login primeiro', 'error');
                adicionarLog('Tentativa de acesso sem autenticação', 'error');
                return;
            }

            const opcao = this.getAttribute('data-option');
            processarOpcaoMenu(parseInt(opcao));
        });
    });

    // Botão limpar logs
    document.getElementById('btn-clear-logs').addEventListener('click', limparLogs);

    // Fechar modal ao clicar fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Enter no formulário de login da tela de bloqueio
    document.getElementById('form-login-screen').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitLoginScreen();
        }
    });

    // Enter no formulário de cadastro da tela de bloqueio
    document.getElementById('form-register-screen').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitRegisterScreen();
        }
    });
});

// ==================== PROCESSAMENTO DO MENU ====================

/**
 * BLOQUEIA o sistema - mostra tela de login obrigatória
 * Usa if/else para controlar o acesso
 */
function bloquearSistema() {
    const loginScreen = document.getElementById('login-screen');
    const container = document.querySelector('.container');

    // IF: se não há usuário logado, BLOQUEIA
    if (!usuarioLogado) {
        loginScreen.classList.remove('hidden');
        container.style.display = 'none';
    }
}

/**
 * DESBLOQUEIA o sistema - permite acesso à aplicação
 * Usa if/else para controlar o acesso
 */
function desbloquearSistema() {
    const loginScreen = document.getElementById('login-screen');
    const container = document.querySelector('.container');

    // IF: se há usuário logado, DESBLOQUEIA
    if (usuarioLogado) {
        loginScreen.classList.add('hidden');
        container.style.display = 'flex';
        
        // Carrega dados de exemplo ao fazer login
        carregarDadosIniciais();
    }
}

/**
 * Carrega dados iniciais do estoque
 */
function carregarDadosIniciais() {
    if (estoque.length === 0) {
        adicionarProduto('Mouse Gamer RGB', 10, 150.00, 'Periféricos');
        adicionarProduto('Teclado Mecânico', 5, 350.00, 'Periféricos');
        adicionarProduto('Monitor 27"', 3, 1200.00, 'Hardware');
        adicionarProduto('Headset Gamer', 8, 250.00, 'Periféricos');
        adicionarProduto('Webcam HD', 2, 180.00, 'Hardware');
        
        adicionarLog('Dados de exemplo carregados', 'info');
    }
}

/**
 * Limpa a tela ao fazer logout
 */
function limparTela() {
    // Limpar produtos
    estoque = [];
    proximoID = 1;
    renderizarProdutos(estoque);
    
    // Limpar logs
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '';
    adicionarLog('Aguardando novo login...', 'info');
}

/**
 * Submete login da tela de bloqueio
 */
function submitLoginScreen() {
    const usuario = document.getElementById('login-user-screen').value;
    const senha = document.getElementById('login-password-screen').value;

    // IF: Verifica credenciais
    if (!usuario || !senha) {
        mostrarNotificacao('❌ Digite usuário e senha', 'error');
        return;
    }

    // IF: Tenta fazer login
    if (loginUsuario(usuario, senha)) {
        // Após login bem-sucedido, desbloqueia o sistema
        setTimeout(() => {
            desbloquearSistema();
        }, 500);

        // Limpar formulário
        document.getElementById('form-login-screen').reset();
    }
}

/**
 * Muda entre abas de Login e Cadastro
 * Usa IF/ELSE para controlar qual aba aparece
 */
function mudarAba(aba) {
    // IF/ELSE: Controla qual aba é exibida
    if (aba === 'login') {
        // Mostrar aba de login
        document.getElementById('aba-login').classList.add('active');
        document.getElementById('aba-register').classList.remove('active');
        
        // Ativar botão de login
        document.getElementById('tab-login').classList.add('active');
        document.getElementById('tab-register').classList.remove('active');
        
    } else if (aba === 'register') {
        // Mostrar aba de cadastro
        document.getElementById('aba-register').classList.add('active');
        document.getElementById('aba-login').classList.remove('active');
        
        // Ativar botão de cadastro
        document.getElementById('tab-register').classList.add('active');
        document.getElementById('tab-login').classList.remove('active');
    }
}

/**
 * Submete cadastro da tela de bloqueio
 */
function submitRegisterScreen() {
    const usuario = document.getElementById('register-user-screen').value;
    const senha = document.getElementById('register-password-screen').value;
    const confirmSenha = document.getElementById('register-confirm-screen').value;

    // IF: Verifica se campos estão preenchidos
    if (!usuario || !senha || !confirmSenha) {
        mostrarNotificacao('❌ Preencha todos os campos', 'error');
        return;
    }

    // IF: Verifica se senhas coincidem
    if (senha !== confirmSenha) {
        mostrarNotificacao('❌ Senhas não coincidem', 'error');
        adicionarLog('Tentativa de cadastro com senhas diferentes', 'error');
        return;
    }

    // IF: Tenta cadastrar novo usuário
    if (cadastrarUsuario(usuario, senha)) {
        mostrarNotificacao(`✅ Usuário "${usuario}" cadastrado! Faça login para continuar`, 'success');
        
        // Limpar formulário
        document.getElementById('form-register-screen').reset();
        
        // Voltar para aba de login
        setTimeout(() => {
            mudarAba('login');
        }, 1500);
    }
}

/**
 * Processa a opção selecionada do menu
 * @param {number} opcao - Número da opção
 */
function processarOpcaoMenu(opcao) {
    // Simular estrutura do while
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
            abrirAtualizarQuantidade();
            adicionarLog('Menu: Atualizar Quantidade', 'info');
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

console.log(`
╔════════════════════════════════════════╗
║     SISTEMA DE ESTOQUE v1.0.0         ║
║   Desenvolvido em JavaScript puro     ║
╚════════════════════════════════════════╝
`);
