
// Função para criar um card de produto com base nos dados do produto
function createProductCard(produto) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-id', produto.id);

    if (produto.quantidade < 5) {
        card.classList.add('low-stock');
    }

    // Determina o status de disponibilidade com base na quantidade
    const statusDisponivel = produto.quantidade > 0;
    const statusText = statusDisponivel ? 'Disponível' : 'Indisponível';
    const statusClass = statusDisponivel ? '' : 'unavailable';
    const valorTotal = (produto.preco * produto.quantidade).toFixed(2);

    // Define o conteúdo HTML do card, incluindo informações do produto e ações
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

// Função para ordenar uma lista de produtos por ID usando o algoritmo de ordenação por inserção
function ordenarPorID(lista) {
    for (let i = 1; i < lista.length; i++) {
        let atual = lista[i];
        let j = i - 1;
        while (j >= 0 && lista[j].id > atual.id) {
            lista[j + 1] = lista[j];
            j--;
        }
        lista[j + 1] = atual;
    }
    return lista;
}

// Função para renderizar a lista de produtos na interface, exibindo um estado vazio se não houver produtos cadastrados
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

    const ordenados = ordenarPorID(produtos.slice());

    for (let i = 0; i < ordenados.length; i++) {
        const card = createProductCard(ordenados[i]);
        grid.appendChild(card);
    }

    contador.textContent = `Total: ${produtos.length}`;
}


// Função para renderizar apenas os produtos com estoque baixo, exibindo um estado vazio se não houver produtos nessa condição
function renderizarEstoqueBaixo(produtos) {
    let produtosBaixos = [];
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].quantidade < 5) {
            produtosBaixos.push(produtos[i]);
        }
    }

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

    const ordenados = ordenarPorID(produtosBaixos);

    for (let i = 0; i < ordenados.length; i++) {
        const card = createProductCard(ordenados[i]);
        grid.appendChild(card);
    }

    contador.textContent = `Baixo Estoque: ${produtosBaixos.length}`;
}

// Função para renderizar os resultados de uma busca, exibindo um estado vazio se não houver resultados encontrados
function renderizarResultadosBusca(resultados) {
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

    const ordenados = ordenarPorID(resultados.slice());

    for (let i = 0; i < ordenados.length; i++) {
        const card = createProductCard(ordenados[i]);
        grid.appendChild(card);
    }

    contador.textContent = `Resultados: ${resultados.length}`;
}
