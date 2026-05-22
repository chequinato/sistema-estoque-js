// ==================== PRODUTOS ====================

function adicionarProduto(nome, quantidade, preco, categoria) {
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

    const novoProduto = {
        id: proximoID++,
        nome: nome.trim(),
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        categoria: categoria,
        status: quantidade > 0 ? 'Disponível' : 'Indisponível',
        dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    estoque.push(novoProduto);
    adicionarLog(`Produto "${novoProduto.nome}" adicionado com sucesso (ID: ${novoProduto.id})`, 'success');
    mostrarNotificacao(`✅ "${novoProduto.nome}" adicionado ao estoque`, 'success');
    renderizarProdutos(estoque);
    return true;
}

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

    adicionarLog(`Quantidade de "${produto.nome}" atualizada: ${quantidadeAnterior} → ${novaQuantidade}`, 'success');
    mostrarNotificacao(`🔄 "${produto.nome}" atualizado: ${quantidadeAnterior} → ${novaQuantidade}`, 'success');
    renderizarProdutos(estoque);
    return true;
}

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
            resultados = estoque.filter(p => p.nome.toLowerCase().includes(valor.toLowerCase()));
            break;
        case 'categoria':
            resultados = estoque.filter(p => p.categoria.toLowerCase().includes(valor.toLowerCase()));
            break;
        default:
            mostrarNotificacao('❌ Tipo de busca inválido', 'error');
            return [];
    }

    if (resultados.length === 0) {
        adicionarLog(`Nenhum produto encontrado ao buscar ${tipo}: "${valor}"`, 'warning');
        mostrarNotificacao('❌ Nenhum produto encontrado', 'warning');
    } else {
        adicionarLog(`Busca por ${tipo} "${valor}": ${resultados.length} resultado(s) encontrado(s)`, 'success');
        mostrarNotificacao(`🔍 ${resultados.length} produto(s) encontrado(s)`, 'info');
    }

    renderizarResultadosBusca(resultados, tipo);
    return resultados;
}

function mostrarEstoqueBaixo() {
    const produtosBaixos = estoque.filter(p => p.quantidade < 5);
    if (produtosBaixos.length === 0) {
        adicionarLog('Nenhum produto com estoque baixo', 'info');
        mostrarNotificacao('✅ Estoque OK - Nenhum produto com quantidade baixa', 'success');
    } else {
        adicionarLog(`${produtosBaixos.length} produto(s) com estoque baixo`, 'warning');
        mostrarNotificacao(`⚠️ ${produtosBaixos.length} produto(s) com estoque baixo`, 'warning');
    }
    renderizarEstoqueBaixo(estoque);
}

function gerarRelatorio() {
    if (estoque.length === 0) {
        adicionarLog('Relatório solicitado - estoque vazio', 'info');
        mostrarNotificacao('❌ Nenhum produto para gerar relatório', 'error');
        return;
    }

    const totalProdutos = estoque.length;
    const totalEmEstoque = estoque.reduce((sum, p) => sum + p.quantidade, 0);
    const produtosBaixos = estoque.filter(p => p.quantidade < 5).length;
    const valorTotal = estoque.reduce((sum, p) => sum + (p.preco * p.quantidade), 0);
    const produtoMaisCaro = estoque.reduce((max, p) => p.preco > max.preco ? p : max);
    const produtoMaisBarato = estoque.reduce((min, p) => p.preco < min.preco ? p : min);
    const categorias = [...new Set(estoque.map(p => p.categoria))];

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
