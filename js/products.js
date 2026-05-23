// ==================== PRODUTOS ====================

function obterProximoID() {
    let candidato = 1;
    for (let i = 0; i < estoque.length; i++) {
        let idEmUso = false;
        for (let j = 0; j < estoque.length; j++) {
            if (estoque[j].id === candidato) {
                idEmUso = true;
                break;
            }
        }
        if (idEmUso) {
            candidato++;
        } else {
            break; 
        }
    }
    return candidato;
}

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
        id: obterProximoID(),
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
    let indice = -1;
    for (let i = 0; i < estoque.length; i++) {
        if (estoque[i].id === parseInt(id)) {
            indice = i;
            break;
        }
    }

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

function atualizarProduto(id, nome, quantidade, preco, categoria) {
    let produto = null;
    for (let i = 0; i < estoque.length; i++) {
        if (estoque[i].id === parseInt(id)) {
            produto = estoque[i];
            break;
        }
    }

    if (!produto) {
        mostrarNotificacao('❌ Produto não encontrado', 'error');
        adicionarLog(`Tentativa de atualizar produto ID ${id} (não encontrado)`, 'error');
        return false;
    }

    const atualizacoes = [];
    const valorQuantidade = parseInt(quantidade);
    const valorPreco = parseFloat(preco);

    if (!nome || nome.trim() === '') {
        mostrarNotificacao('❌ Nome do produto é obrigatório', 'error');
        adicionarLog('Tentativa de atualizar produto sem nome', 'error');
        return false;
    }

    if (Number.isNaN(valorQuantidade) || valorQuantidade < 0) {
        mostrarNotificacao('❌ Quantidade inválida', 'error');
        adicionarLog('Tentativa de atualizar produto com quantidade inválida', 'error');
        return false;
    }

    if (Number.isNaN(valorPreco) || valorPreco < 0) {
        mostrarNotificacao('❌ Preço inválido', 'error');
        adicionarLog('Tentativa de atualizar produto com preço inválido', 'error');
        return false;
    }

    if (!categoria || categoria.trim() === '') {
        mostrarNotificacao('❌ Categoria é obrigatória', 'error');
        adicionarLog('Tentativa de atualizar produto sem categoria', 'error');
        return false;
    }

    if (nome.trim() !== produto.nome) {
        atualizacoes.push(`nome: "${produto.nome}" → "${nome.trim()}"`);
        produto.nome = nome.trim();
    }

    if (valorQuantidade !== produto.quantidade) {
        atualizacoes.push(`quantidade: ${produto.quantidade} → ${valorQuantidade}`);
        produto.quantidade = valorQuantidade;
    }

    if (valorPreco !== produto.preco) {
        atualizacoes.push(`preço: R$ ${produto.preco.toFixed(2)} → R$ ${valorPreco.toFixed(2)}`);
        produto.preco = valorPreco;
    }

    if (categoria !== produto.categoria) {
        atualizacoes.push(`categoria: "${produto.categoria}" → "${categoria}"`);
        produto.categoria = categoria;
    }

    produto.status = produto.quantidade > 0 ? 'Disponível' : 'Indisponível';

    if (atualizacoes.length === 0) {
        mostrarNotificacao('⚠️ Nenhuma alteração realizada', 'warning');
        return false;
    }

    adicionarLog(`Produto "${produto.nome}" atualizado: ${atualizacoes.join(', ')}`, 'success');
    mostrarNotificacao(`🔄 "${produto.nome}" atualizado com sucesso`, 'success');
    renderizarProdutos(estoque);
    return true;
}


function buscarProduto(tipo, valor) {
    let valorValidado;
    do {
        valorValidado = valor ? valor.trim() : '';
        if (valorValidado === '') {
            mostrarNotificacao('❌ Digite um valor para buscar', 'error');
            adicionarLog('Tentativa de busca com valor vazio', 'error');
            return [];
        }
    } while (false); 

    let resultados = [];

    if (tipo === 'id') {
        for (let i = 0; i < estoque.length; i++) {
            if (estoque[i].id === parseInt(valorValidado)) {
                resultados.push(estoque[i]);
            }
        }
    } else if (tipo === 'nome') {
        for (let i = 0; i < estoque.length; i++) {
            if (estoque[i].nome.toLowerCase().includes(valorValidado.toLowerCase())) {
                resultados.push(estoque[i]);
            }
        }
    } else if (tipo === 'categoria') {
        for (let i = 0; i < estoque.length; i++) {
            if (estoque[i].categoria.toLowerCase().includes(valorValidado.toLowerCase())) {
                resultados.push(estoque[i]);
            }
        }
    } else {
        mostrarNotificacao('❌ Tipo de busca inválido', 'error');
        return [];
    }

    if (resultados.length === 0) {
        adicionarLog(`Nenhum produto encontrado ao buscar ${tipo}: "${valorValidado}"`, 'warning');
        mostrarNotificacao('❌ Nenhum produto encontrado', 'warning');
    } else {
        adicionarLog(`Busca por ${tipo} "${valorValidado}": ${resultados.length} resultado(s) encontrado(s)`, 'success');
        mostrarNotificacao(`🔍 ${resultados.length} produto(s) encontrado(s)`, 'info');
    }

    renderizarResultadosBusca(resultados, tipo);
    return resultados;
}

function mostrarEstoqueBaixo() {
    let produtosBaixos = [];
    for (let i = 0; i < estoque.length; i++) {
        if (estoque[i].quantidade < 5) {
            produtosBaixos.push(estoque[i]);
        }
    }

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

    let totalEmEstoque = 0;
    let valorTotal = 0;
    let produtosBaixos = 0;
    let produtoMaisCaro = estoque[0];
    let produtoMaisBarato = estoque[0];

    for (let i = 0; i < estoque.length; i++) {
        totalEmEstoque += estoque[i].quantidade;
        valorTotal += estoque[i].preco * estoque[i].quantidade;

        if (estoque[i].quantidade < 5) {
            produtosBaixos++;
        }
        if (estoque[i].preco > produtoMaisCaro.preco) {
            produtoMaisCaro = estoque[i];
        }
        if (estoque[i].preco < produtoMaisBarato.preco) {
            produtoMaisBarato = estoque[i];
        }
    }


    let categorias = [];
    for (let i = 0; i < estoque.length; i++) {
        let jaExiste = false;
        for (let j = 0; j < categorias.length; j++) {
            if (categorias[j] === estoque[i].categoria) {
                jaExiste = true;
                break;
            }
        }
        if (!jaExiste) {
            categorias.push(estoque[i].categoria);
        }
    }

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
    for (let i = 0; i < categorias.length; i++) {
        let qtd = 0;
        for (let j = 0; j < estoque.length; j++) {
            if (estoque[j].categoria === categorias[i]) {
                qtd++;
            }
        }
        html += `
            <div class="report-item">
                <span class="report-item-label">${categorias[i]}:</span>
                <span class="report-item-value">${qtd} produto(s)</span>
            </div>
        `;
    }

    html += '</div>';
    content.innerHTML = html;
    abrirModal('modal-report');
    adicionarLog('Relatório do estoque gerado com sucesso', 'success');
    mostrarNotificacao('📊 Relatório gerado', 'info');
}
