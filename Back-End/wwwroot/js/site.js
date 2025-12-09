// =====================
// ELEMENTOS DO FORMULÁRIO
// =====================
const aparecerLayout = document.getElementById('add-baixo-esq');
const botaoAdicionar = document.getElementById('botao-add');
const botaoAdicionarInterno = document.getElementById('botao-add-interno');
const botaoSalvar = document.getElementById('botao-salvar');
const botaoCancelar1 = document.getElementById('botao-cancelar1');
const botaoCancelar2 = document.getElementById('botao-cancelar2');
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

    // Mostra o form de edição
    aparecerLayout.style.display = 'flex';

    // Mostrar área de salvar/editar
    layoutConfirmar.style.display = 'flex';

    // Esconder botão de adicionar interno
    botaoAdicionarInterno.style.display = 'none';

    texto2.style.display = 'flex';
    texto1.style.display = 'none';
}


// 3 — FUNÇÃO EXCLUIR

function excluirPokemon(id) {
    inputPokemonIdExcluir.value = id;
    layoutExcluir.style.display = 'flex';
}


// 4 — BOTÃO: “ADICIONAR POKEMON” (DE FORA)

botaoAdicionar.addEventListener('click', () => {
    limparFormulario();

    aparecerLayout.style.display = 'flex';
    layoutConfirmar.style.display = 'none';
    botaoAdicionarInterno.style.display = 'flex';
    texto1.style.display = 'flex';
    texto2.style.display = 'none';
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


botaoSidebar.addEventListener('click', function () {
    sidebar.classList.toggle('active');

    if (aConfig.classList.toggle('active')) {
        aConfig.classList.remove('active');
    }
});

// Fechar ao clicar fora da sidebar
document.addEventListener('click', function (event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickInsideConf = aConfig.contains(event.target);
    const isClickOnButton = botaoSidebar.contains(event.target);


    if (!isClickInsideSidebar && !isClickOnButton && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }

    if (!isClickInsideConf && !isClickOnButton && aConfig.classList.contains('active')) {
        aConfig.classList.remove('active');
    }
});


const aConfig = document.getElementById('config');
const configuracoes = document.getElementById('configuracoes');
const mudarTemaBtn = document.getElementById("muda-tema");
const exitConf = document.getElementById('exitConf');
const body = document.body;


aConfig.addEventListener('click', function (event) {
    sidebar.classList.remove('active');
    configuracoes.classList.toggle('active');
});


const btnTema = document.getElementById("muda-tema");

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

exitConf.addEventListener("click", function () {
    aConfig.classList.remove('active');
    sidebar.classList.toggle('active');
})



