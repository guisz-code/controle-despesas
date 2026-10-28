// Array que guarda as despesas cadastradas
let despesas = [];

// Identificador usado para cada nova despesa
let proximoId = 1;

// Pega os elementos do HTML que serão usados no código
const form = document.getElementById("form-despesa");
const inputDescricao = document.getElementById("descricao");
const inputValor = document.getElementById("valor");
const selectCategoria = document.getElementById("categoria");
const lista = document.getElementById("lista-despesas");
const msgErro = document.getElementById("erro");

// Função responsável por adicionar uma despesa ao array
function adicionarDespesa(descricao, valor, categoria) {

    // Cria um objeto com os dados da despesa
    const despesa = {
        id: proximoId++,
        descricao: descricao,
        valor: valor,
        categoria: categoria
    };

    // Guarda a despesa no array
    despesas.push(despesa);
}

// Função que atualiza a lista exibida na página
function renderizar() {

    // Limpa a lista antes de mostrar os dados novamente
    lista.innerHTML = "";

    // Percorre todas as despesas cadastradas
    despesas.forEach(function(d) {

        // Cria um item para a lista
        const li = document.createElement("li");

        // Monta a classe CSS usando a categoria
        const classe = "cat-" + d.categoria.toLowerCase();
        li.classList.add(classe);

        // Mostra a descrição, o valor, a categoria e o botão
        li.innerHTML = `
            <span>${d.descricao} — R$ ${d.valor.toFixed(2)}</span>
            <span>${d.categoria}</span>
            <button class="btn-excluir" data-id="${d.id}">Excluir</button>
        `;

        // Adiciona o item criado dentro da lista
        lista.appendChild(li);
    });

    // Atualiza a quantidade de despesas cadastradas
    const contador = document.getElementById("contador");
    contador.textContent = despesas.length;
}

// Detecta quando o formulário é enviado
form.addEventListener("submit", function(evento) {

    // Impede a página de recarregar ao cadastrar
    evento.preventDefault();

    // Pega os valores digitados pelo usuário
    const descricao = inputDescricao.value;
    const valor = parseFloat(inputValor.value);
    const categoria = selectCategoria.value;

    // Cadastra a despesa com os dados informados
    adicionarDespesa(descricao, valor, categoria);

    // Limpa os campos do formulário
    form.reset();

    // Atualiza a lista na tela
    renderizar();
});

// Detecta cliques dentro da lista de despesas
lista.addEventListener("click", function(evento) {

    // Verifica se o botão clicado é o de excluir
    if (evento.target.classList.contains("btn-excluir")) {

        // Pega o ID da despesa que será excluída
        const id = Number(evento.target.dataset.id);

        // Cria uma lista sem a despesa selecionada
        despesas = despesas.filter(function(d) {
            return d.id !== id;
        });

        // Atualiza a lista depois da exclusão
        renderizar();
    }
});
