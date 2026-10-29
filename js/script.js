// Array que guarda as despesas cadastradas
let despesas = [];

// Número usado para identificar cada despesa
let proximoId = 1;

// Pega os elementos do HTML que vamos usar no código
const form = document.getElementById("form-despesa");
const inputDescricao = document.getElementById("descricao");
const inputValor = document.getElementById("valor");
const selectCategoria = document.getElementById("categoria");
const lista = document.getElementById("lista-despesas");
const msgErro = document.getElementById("erro");
const selectFiltro = document.getElementById("filtro");

// Função que adiciona uma nova despesa
function adicionarDespesa(descricao, valor, categoria) {

    // Cria um objeto com as informações da despesa
    const despesa = {
        id: proximoId++,
        descricao: descricao,
        valor: valor,
        categoria: categoria
    };

    // Adiciona a despesa na lista
    despesas.push(despesa);
}

// Função que mostra as despesas na tela
function renderizar() {

    // Limpa a lista para atualizar as informações
    lista.innerHTML = "";

    // Pega a categoria escolhida no filtro
    const categoriaSelecionada = selectFiltro.value;

    // Se escolher "Todas", mostra todas as despesas
    // Caso contrário, mostra apenas a categoria escolhida
    const despesasFiltradas = categoriaSelecionada === "Todas"
        ? despesas
        : despesas.filter(function(d) {
            return d.categoria === categoriaSelecionada;
        });

    // Percorre as despesas que passaram pelo filtro
    despesasFiltradas.forEach(function(d) {

        // Cria um novo item para mostrar a despesa
        const li = document.createElement("li");

        // Define a classe CSS de acordo com a categoria
        const classe = "cat-" + d.categoria.toLowerCase();
        li.classList.add(classe);

        // Mostra a descrição, o valor, a categoria e o botão
        li.innerHTML = `
            <span>${d.descricao} — R$ ${d.valor.toFixed(2)}</span>
            <span>${d.categoria}</span>
            <button class="btn-excluir" data-id="${d.id}">Excluir</button>
        `;

        // Coloca a despesa dentro da lista do HTML
        lista.appendChild(li);
    });

    // Atualiza a quantidade total de despesas cadastradas
    const contador = document.getElementById("contador");
    contador.textContent = despesas.length;
}

// Detecta quando o usuário envia o formulário
form.addEventListener("submit", function(evento) {

    // Impede a página de recarregar
    evento.preventDefault();

    // Pega os dados digitados no formulário
    const descricao = inputDescricao.value;
    const valor = parseFloat(inputValor.value);
    const categoria = selectCategoria.value;

    // Adiciona a despesa usando os dados informados
    adicionarDespesa(descricao, valor, categoria);

    // Limpa os campos depois do cadastro
    form.reset();

    // Atualiza a lista para mostrar a nova despesa
    renderizar();
});

// Detecta quando o usuário clica em algum botão da lista
lista.addEventListener("click", function(evento) {

    // Verifica se o botão clicado é o de excluir
    if (evento.target.classList.contains("btn-excluir")) {

        // Pega o ID da despesa selecionada
        const id = Number(evento.target.dataset.id);

        // Remove da lista a despesa que tem esse ID
        despesas = despesas.filter(function(d) {
            return d.id !== id;
        });

        // Atualiza a tela depois de excluir
        renderizar();
    }
});

// Detecta quando o usuário muda a categoria do filtro
selectFiltro.addEventListener("change", function() {

    // Atualiza a lista de acordo com o filtro escolhido
    renderizar();
});
