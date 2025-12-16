// =====================
// ELEMENTOS DO FORMULÁRIO
// =====================
const aparecerLayout = document.getElementById('add-baixo-esq');
const botaoAdicionar = document.getElementById('botao-add');
const botaoAdicionarInterno = document.getElementById('botao-add-interno');
const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar1 = document.getElementById('botao-cancelar1');
const botaoCancelar2 = document.getElementById('botao-cancelar2');
const botaoCancelaradd = document.getElementById('botao-cancelar-add');
const exclusaoElement = document.getElementById('botao-confirmacao');

const formAdicionar = document.querySelector('form[action="/Pokemon/Create"]');
const formExcluir = document.getElementById('form-excluir');

const inputPokemonIdExcluir = document.getElementById('pokemon-id-excluir');
const layoutExcluir = document.getElementById('add-baixo-dir');
const layoutConfirmar = document.getElementById('confirm-layer');

const inputNome = document.querySelector('input[name="Nome"]');
const inputTipo = document.querySelector('input[name="Tipo"]');
const inputTipo2 = document.querySelector('input[name="Tipo2"]');
const inputPokemonId = document.querySelector('input[name="PokemonId"]');

const texto1 = document.getElementById('texto1');
const texto2 = document.getElementById('texto2');



// 1 — DELEGAÇÃO DE EVENTO PARA EDITAR / EXCLUIR

document.querySelector('.pokemon-layer-1').addEventListener('click', function (e) {

    const card = e.target.closest('.pokemon-1');
    if (!card) return;

    const pokemonId = parseInt(card.dataset.id);

    if (e.target.classList.contains('botao-editar')) {
        editarPokemon(pokemonId);
    }

    if (e.target.classList.contains('botao-excluir')) {
        excluirPokemon(pokemonId);
    }
});


// 2 — FUNÇÃO EDITAR

function editarPokemon(id) {
    const pokemon = pokemons.find(p => p.PokemonId === id);

    if (!pokemon) {
        alert('Pokémon não encontrado.');
        return;
    }

    inputNome.value = pokemon.Nome;
    inputTipo.value = pokemon.Tipo;
    inputTipo2.value = pokemon.Tipo2 ?? "";
    inputPokemonId.value = id;

    // Mostrar layout
    aparecerLayout.style.display = 'flex';

    // Mostrar botões de salvar
    layoutConfirmar.style.display = 'flex';

    // Esconder botões de adicionar
    botaoAdicionarInterno.style.display = 'none';
    botaoCancelaradd.style.display = 'none';

    // Texto correto
    texto2.style.display = 'flex'; // editando
    texto1.style.display = 'none'; // adicionando

    scrollParaAdicionar();
}


// 3 — FUNÇÃO EXCLUIR

function excluirPokemon(id) {
    inputPokemonIdExcluir.value = id;
    layoutExcluir.style.display = 'flex';
    scrollParaExcluir();
}


// 4 — BOTÃO: “ADICIONAR POKEMON” (DE FORA)

botaoAdicionar.addEventListener('click', () => {
    limparFormulario();

    aparecerLayout.style.display = 'flex';
    layoutConfirmar.style.display = 'none';
    botaoAdicionarInterno.style.display = 'flex';
    botaoCancelaradd.style.display = 'flex';
    texto1.style.display = 'flex';
    texto2.style.display = 'none';
    scrollParaAdicionar();
});


// 5 — BOTÃO: “+ adicionar pokemon” (INTERNAMENTE)

botaoAdicionarInterno.addEventListener('click', () => {
    inputPokemonId.value = 0; // criação
    formAdicionar.submit();
});


// 6 — BOTÃO: “SALVAR” (EDIÇÃO)

botaoSalvar.addEventListener('click', () => {
    formAdicionar.submit();
});

// 7 — CANCELAR (FORMULÁRIO)

botaoCancelar1.addEventListener('click', () => {
    limparFormulario();
    aparecerLayout.style.display = 'none';
});


// 8 — CANCELAR (EXCLUSÃO)

botaoCancelar2.addEventListener('click', () => {
    layoutExcluir.style.display = 'none';
});


botaoCancelaradd.addEventListener('click', () => {
    aparecerLayout.style.display = 'none';
})


// 9 — CONFIRMAR EXCLUSÃO

exclusaoElement.addEventListener('click', () => {
    formExcluir.submit();
});


// 10 — LIMPAR FORM

function limparFormulario() {
    inputNome.value = '';
    inputTipo.value = '';
    inputTipo2.value = '';
    inputPokemonId.value = 0;
}

const botaoSidebar = document.querySelector('.botaoSidebar');
const sidebar = document.getElementById('sidebar');

// Botao sidebar na logo
botaoSidebar.addEventListener('click', function () {
    sidebar.classList.toggle('active');

    if (aConfig.classList.toggle('active')) {
        configuracoes.classList.remove('active');
    }
});

// Fechar ao clicar fora da sidebar
document.addEventListener('click', function (event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnButton = botaoSidebar.contains(event.target);


    if (!isClickInsideSidebar && !isClickOnButton && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }

});




const aConfig = document.getElementById('config');
const configuracoes = document.getElementById('configuracoes');
const mudarTemaBtn = document.getElementById("muda-tema");
const exitConf = document.getElementById('exitConf');

// Parte da configuracao dentro do sidebar
aConfig.addEventListener('click', function (event) {
    sidebar.classList.remove('active');
    configuracoes.classList.toggle('active');
});


const btnTema = document.getElementById("muda-tema");

// Botao para mudar de escuro(padrao) para claro
btnTema.addEventListener("click", () => {
    const body = document.body;

    const temaAtual = body.getAttribute("data-tema");

    if (temaAtual === "claro") {
        body.setAttribute("data-tema", "escuro");
        localStorage.setItem("tema", "escuro");
    } else {
        body.setAttribute("data-tema", "claro");
        localStorage.setItem("tema", "claro");
    }
});

// Fechar as configuracoes
exitConf.addEventListener("click", function () {
    configuracoes.classList.remove('active');
})



// FILTRO POR NOME - Explicando de forma meio porca e o seguinte
// ele faz uma vusca em cada card oque bate o nome ""nomePokemon.includes(texto)"" ele deixa flex o resto esconde 
// pensei que seria mais dificil
// agora so faco a mesma coisa com o do tipo e marcha e boa 

const inputBuscaNome = document.getElementById("input-busca-nome");
const cardsPokemons = document.querySelectorAll(".pokemon-1");

inputBuscaNome.addEventListener("input", () => {
    const texto = inputBuscaNome.value.toLowerCase().trim();

    cardsPokemons.forEach(card => {
        const nomePokemon = card.querySelector(".poke-cima p:first-child").textContent
            .replace("Nome:", "")
            .trim()
            .toLowerCase();

        if (nomePokemon.includes(texto)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});

// Serve para 
// nth-child(1)  primeiro ou p:first-child

// nth-child(2)  segundo

// nth-child(3)  terceiro

const inputBuscaTipo = document.getElementById("input-busca-tipo");

inputBuscaTipo.addEventListener("input", () => {
    const textoTipo = inputBuscaTipo.value.toLowerCase().trim();

    cardsPokemons.forEach(card => {
        const tipoPokemon = card.querySelector(".poke-cima p:nth-child(2)")
            .textContent.replace("Tipo:", "").trim().toLowerCase();

        const tipoPokemon2 = card.querySelector(".poke-cima p:nth-child(3)")
            .textContent.replace("Tipo 2:", "").trim().toLowerCase();

        if (tipoPokemon.includes(textoTipo) || tipoPokemon2.includes(textoTipo)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
});


function scrollParaAdicionar() {
    aparecerLayout.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function scrollParaExcluir() {
    layoutExcluir.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}
