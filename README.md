# 📦 Sistema de Estoque em JavaScript

Um sistema completo de gerenciamento de estoque desenvolvido com **HTML, CSS e JavaScript puro**. Sem frameworks, apenas lógica de programação pura para aprender e dominar os conceitos fundamentais.

## ✨ Características Principais

- ✅ **Menu interativo** com 10 opções diferentes
- ✅ **Interface inspirada em terminal/dashboard** com tema dark moderno
- ✅ **CRUD completo** (Create, Read, Update, Delete)
- ✅ **Sistema de busca** avançada
- ✅ **Alertas de estoque baixo** com visual diferenciado
- ✅ **Relatórios detalhados** do estoque
- ✅ **Sistema de login/cadastro** com usuários
- ✅ **Notificações visuais** para feedback imediato
- ✅ **Terminal de logs** para acompanhar ações
- ✅ **Design responsivo** para todos os dispositivos

## 🎯 Objetivo Educacional

Este projeto foi desenvolvido com foco em **praticar lógica de programação** e estrutura de código, utilizando:

- 🔄 `do while` - Loops contínuos
- 🎛️ `switch case` - Estruturas de decisão
- 🔧 **Funções** - Modularização de código
- 📊 **Arrays** - Armazenamento de dados
- 🏗️ **Objetos** - Estruturação de dados complexos
- 🖱️ **Manipulação DOM** - Interação com HTML
- 💾 **Gestão de estado** - Controle de aplicação

## 📁 Estrutura do Projeto

```
sistema-estoque/
│
├── 📄 index.html          # Estrutura HTML da aplicação
├── 🎨 style.css           # Estilos CSS (tema dark)
├── 📦 js/                # Códigos JavaScript organizados
│   ├── data.js           # Estado global e dados inicias
│   ├── utils.js          # Logs, notificações e modais
│   ├── products.js       # Funções de CRUD e relatório
│   ├── auth.js           # Login, logout e cadastro
│   ├── ui.js             # Abas, formulários e controles de interface
│   └── app.js            # Inicialização e eventos
│
├── 📦 assets/
│   ├── icons/             # Ícones (expansível)
│   └── images/            # Imagens (expansível)
│
├── 🔧 components/
│   └── cards.js           # Renderização de cards
│
└── 📚 README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Abrir o projeto
Abra o arquivo `index.html` em um navegador web moderno (Chrome, Firefox, Safari, Edge).

### 2. Menu Principal
Na barra lateral, você encontrará as seguintes opções:

| Opção | Funcionalidade |
|-------|---------------|
| ➕ **Adicionar Produto** | Cadastra um novo produto no estoque |
| 📋 **Ver Estoque** | Lista todos os produtos cadastrados |
| 🗑️ **Remover Produto** | Remove um produto pelo ID |
| 🔄 **Atualizar Quantidade** | Altera a quantidade de um produto |
| 🔍 **Buscar Produto** | Busca por ID, nome ou categoria |
| ⚠️ **Estoque Baixo** | Mostra produtos com menos de 5 unidades |
| 📊 **Relatório** | Gera relatório completo do estoque |
| 🔐 **Login** | Faz login no sistema |
| 👤 **Cadastro** | Cadastra novo usuário |
| 🚪 **Sair** | Encerra a sessão |

### 3. Adicionar Produto

```javascript
// Clique em "➕ Adicionar Produto" e preencha:
Nome: Mouse Gamer
Quantidade: 10
Preço: 150.00
Categoria: Periféricos
```

### 4. Dados de Login

Usuários pré-cadastrados para teste:

```
Usuário: admin
Senha: 123456

Usuário: gerente
Senha: senha123
```

## 💻 Estrutura de Código

### Dados Globais

```javascript
// Array de usuários
let usuarios = [
    { usuario: "admin", senha: "123456" },
    { usuario: "gerente", senha: "senha123" }
];

// Array de produtos
let estoque = [
    {
        id: 1,
        nome: "Mouse Gamer",
        quantidade: 10,
        preco: 150.00,
        categoria: "Periféricos",
        status: "Disponível"
    }
];

// Usuário atualmente logado
let usuarioLogado = null;
```

### Funções Principais

#### Gerenciamento de Produtos

```javascript
adicionarProduto(nome, quantidade, preco, categoria)
// Adiciona um novo produto ao estoque

removerProduto(id)
// Remove um produto pelo ID

atualizarQuantidade(id, novaQuantidade)
// Atualiza quantidade de um produto

buscarProduto(tipo, valor)
// Busca produto por id, nome ou categoria

mostrarEstoqueBaixo()
// Exibe produtos com estoque baixo

gerarRelatorio()
// Gera relatório completo
```

#### Autenticação

```javascript
loginUsuario(usuario, senha)
// Realiza login no sistema

logoutUsuario()
// Faz logout

cadastrarUsuario(usuario, senha)
// Cria novo usuário
```

#### Interface

```javascript
adicionarLog(mensagem, tipo)
// Adiciona mensagem ao terminal

mostrarNotificacao(mensagem, tipo, duracao)
// Exibe notificação visual

renderizarProdutos(produtos)
// Renderiza cards de produtos

createProductCard(produto)
// Cria um card individual
```

## 🎨 Tema Visual

### Cores

- 🟢 **Verde Neon**: `#00ff41` - Cor primária
- 🔵 **Azul**: `#0099ff` - Cor secundária
- 🔴 **Vermelho**: `#ff3333` - Alertas e erros
- 🟠 **Laranja**: `#ffaa00` - Avisos
- ⚫ **Dark**: `#0a0a0a` - Fundo principal

### Elementos

- Terminal com logs em tempo real
- Cards modernos com efeitos de hover
- Modais elegantes com animações
- Notificações flutuantes
- Scrollbar personalizada
- Transições suaves

## 🔄 Fluxo de Execução

```
┌─────────────────────────────────────┐
│  Usuário clica em opção do menu     │
├─────────────────────────────────────┤
│  processarOpcaoMenu(opcao)          │
├─────────────────────────────────────┤
│  Switch Case → Executa função       │
├─────────────────────────────────────┤
│  Valida dados                       │
├─────────────────────────────────────┤
│  Modifica array de estoque          │
├─────────────────────────────────────┤
│  Atualiza interface (DOM)           │
├─────────────────────────────────────┤
│  Exibe log + notificação            │
└─────────────────────────────────────┘
```

## 📊 Exemplo de Relatório

```
RESUMO GERAL
Total de Produtos: 5
Total em Estoque: 28 un.
Produtos com Estoque Baixo: 2
Valor Total do Estoque: R$ 2.130,00

PREÇOS
Produto Mais Caro: Monitor 27" (R$ 1.200,00)
Produto Mais Barato: Webcam HD (R$ 180,00)
Preço Médio: R$ 426,00

CATEGORIAS
Total de Categorias: 2
Periféricos: 3 produto(s)
Hardware: 2 produto(s)
```

## 🎓 Conceitos Aprendidos

### 1. Estrutura de Controle
```javascript
do {
    switch(opcao) {
        case 1:
            adicionarProduto();
            break;
        // ... outros cases
    }
} while(opcao !== 0);
```

### 2. Manipulação de Arrays
```javascript
// Adicionar
estoque.push(novoProduto);

// Remover
estoque.splice(indice, 1);

// Buscar
estoque.find(p => p.id === id);
estoque.filter(p => p.quantidade < 5);

// Mapear
estoque.map(p => p.preco);
```

### 3. Objetos
```javascript
const produto = {
    id: 1,
    nome: "Mouse",
    quantidade: 10,
    preco: 150,
    categoria: "Periféricos",
    status: "Disponível"
};
```

### 4. Funções
```javascript
// Padrão de função com validação
function adicionarProduto(nome, quantidade, preco, categoria) {
    // Validações
    if (!nome || nome.trim() === '') return false;
    
    // Lógica
    estoque.push({ /* ... */ });
    
    // Feedback
    mostrarNotificacao('Sucesso', 'success');
    
    return true;
}
```

### 5. Manipulação DOM
```javascript
// Selecionar elementos
document.getElementById('product-count');
document.querySelectorAll('.btn-menu');

// Criar elementos
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = `<h1>${produto.nome}</h1>`;

// Modificar atributos
element.setAttribute('data-id', id);
element.classList.add('active');

// Event listeners
element.addEventListener('click', funcao);
```

## 🐛 Tratamento de Erros

Todas as funções incluem validações:

```javascript
// Validar entrada
if (!nome || nome.trim() === '') {
    mostrarNotificacao('Nome obrigatório', 'error');
    adicionarLog('Erro: nome vazio', 'error');
    return false;
}

// Validar quantidade
if (quantidade <= 0) {
    mostrarNotificacao('Quantidade inválida', 'error');
    return false;
}

// Validar encontro de recurso
if (!produto) {
    mostrarNotificacao('Produto não encontrado', 'error');
    return false;
}
```

## 🔒 Segurança

- ✅ Validação de entrada em todas as funções
- ✅ Tratamento de erros
- ✅ Prevenção de IDs duplicados
- ✅ Verificação de senhas no login
- ✅ Proteção contra valores negativos

## 📱 Responsividade

O projeto é 100% responsivo:

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 🚀 Melhorias Futuras

- [ ] Persistência de dados (LocalStorage)
- [ ] Export para CSV/PDF
- [ ] Gráficos e dashboards
- [ ] Filtros avançados
- [ ] Histórico de movimentações
- [ ] Backup automático
- [ ] Dark/Light mode toggle
- [ ] Multi-idioma
- [ ] Sincronização em nuvem

## 📝 Notas de Desenvolvimento

### Padrões de Código

```javascript
// ✅ BOM: Nomes descritivos e comentários
function adicionarProdutoAoEstoque(nome, quantidade, preco) {
    // Validar entrada
    if (!validarEntrada(nome, quantidade, preco)) {
        return false;
    }
    // ... resto do código
}

// ❌ RUIM: Nomes genéricos sem clareza
function add(n, q, p) {
    // ... código sem comentários
}
```

### Estrutura de Funções

```javascript
/**
 * Descrição clara da função
 * @param {tipo} parametro - Descrição do parâmetro
 * @returns {tipo} - O que a função retorna
 */
function minhaFuncao(parametro) {
    // Validações
    // Lógica principal
    // Retorno e feedback
}
```

## 👨‍💼 Autor

Desenvolvido como projeto educacional para praticar **JavaScript puro** e conceitos fundamentais de programação.

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais.

---

**Versão:** 1.0.0  
**Última atualização:** 2026  
**Navegadores suportados:** Chrome, Firefox, Safari, Edge (versões recentes)

---

### 🎯 Objetivo Cumprido ✅

✅ HTML estruturado e semântico  
✅ CSS com tema dark e animações  
✅ JavaScript com lógica completa  
✅ Menu com `do while` e `switch case`  
✅ Funções modularizadas  
✅ Arrays e objetos  
✅ CRUD funcionando  
✅ Manipulação DOM  
✅ Sistema de notificações  
✅ Validação de dados  
✅ Código bem organizado e documentado  

**🎊 Sistema pronto para uso!**
