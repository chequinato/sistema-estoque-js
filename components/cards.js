// ==================== RENDERIZAÇÃO DE CARDS ====================

/**
 * Cria um card de produto
 * @param {Object} produto - Objeto contendo dados do produto
 * @returns {HTMLElement} - Elemento do card
 */
function createProductCard(produto) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', produto.id);

    // Verificar se estoque está baixo
    if (produto.quantidade < 5) {
        card.classList.add('low-stock');
    }

    // Determinar status
    const statusDisponivel = produto.quantidade > 0;
    const statusText = statusDisponivel ? 'Disponível' : 'Indisponível';
    const statusClass = statusDisponivel ? '' : 'unavailable';

    // Calcular valor total do produto
    const valorTotal = (produto.preco * produto.quantidade).toFixed(2);

    card.innerHTML = `
        <div class="card-header">
            <div class="card-title">${produto.nome}</div>
            <div class="card-status ${statusClass}">
                ${statusText}
            </div>
        </div>

        <div class="card-info">
            <span><strong>ID:</strong> ${produto.id}</span>
            <span><strong>Cat:</strong> ${produto.categoria}</span>
        </div>

        <div class="card-quantity ${produto.quantidade < 5 ? 'critical' : ''}">
            <span>
                <strong>Estoque:</strong> ${produto.quantidade} un.
            </span>
            ${produto.quantidade < 5 ? '<span>⚠️ BAIXO</span>' : ''}
        </div>

        <div class="card-price">
            R$ ${produto.preco.toFixed(2)} (Total: R$ ${valorTotal})
        </div>

        <div class="card-actions">
            <button class="card-btn-edit" onclick="abrirAtualizarProduto(${produto.id})">
                ✏️ Editar
            </button>
            <button class="card-btn-delete" onclick="abrirRemoverProduto(${produto.id})">
                🗑️ Remover
            </button>
        </div>
    `;

    return card;
}

/**
 * Renderiza todos os produtos na grid
 * @param {Array} produtos - Array de produtos
 */
function renderizarProdutos(produtos) {
    const grid = document.getElementById('products-grid');
    const contador = document.getElementById('product-count');

    grid.innerHTML = '';

    if (produtos.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>Nenhum produto cadastrado</p>
                <small>Clique em "Adicionar Produto" para começar</small>
            </div>
        `;
        contador.textContent = 'Total: 0';
        return;
    }

    // Adicionar cada produto como card
    produtos.forEach(produto => {
        const card = createProductCard(produto);
        grid.appendChild(card);
    });

    contador.textContent = `Total: ${produtos.length}`;
}

/**
 * Renderiza apenas produtos com estoque baixo
 * @param {Array} produtos - Array de produtos
 */
function renderizarEstoqueBaixo(produtos) {
    const produtosBaixos = produtos.filter(p => p.quantidade < 5);
    const grid = document.getElementById('products-grid');
    const contador = document.getElementById('product-count');

    grid.innerHTML = '';

    if (produtosBaixos.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>✅ Nenhum produto com estoque baixo</p>
                <small>Todos os produtos estão com quantidade adequada</small>
            </div>
        `;
        contador.textContent = 'Baixo Estoque: 0';
        return;
    }

    produtosBaixos.forEach(produto => {
        const card = createProductCard(produto);
        grid.appendChild(card);
    });

    contador.textContent = `Baixo Estoque: ${produtosBaixos.length}`;
}

/**
 * Renderiza resultados de busca
 * @param {Array} resultados - Array de produtos encontrados
 * @param {string} tipoResultado - Tipo da busca realizada
 */
function renderizarResultadosBusca(resultados, tipoResultado) {
    const grid = document.getElementById('products-grid');
    const contador = document.getElementById('product-count');

    grid.innerHTML = '';

    if (resultados.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <p>❌ Nenhum resultado encontrado</p>
                <small>Tente buscar com outros critérios</small>
            </div>
        `;
        contador.textContent = 'Resultados: 0';
        return;
    }

    resultados.forEach(produto => {
        const card = createProductCard(produto);
        grid.appendChild(card);
    });

    contador.textContent = `Resultados: ${resultados.length}`;
}
