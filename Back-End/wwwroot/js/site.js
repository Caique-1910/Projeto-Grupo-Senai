// Elementos
const aparecerLayout = document.getElementById('add-baixo-esq');
const botaoAdicionar = document.getElementById('botao-add');
const botaoSalvar = document.querySelector('.botao-salvar');
const botaoCancelar1 = document.getElementById('botao-cancelar1');
const botaoCancelar2 = document.getElementById('botao-cancelar2');
const exclusaoElement = document.getElementById('botao-confirmacao');
const formAdicionar = document.querySelector('form[action="/Pokemon/Create"]');
const formExcluir = document.getElementById('form-excluir');
const inputPokemonIdExcluir = document.getElementById('pokemon-id-excluir');
const layoutExcluir = document.getElementById('add-baixo-dir');

// Inputs do form
const inputNome = document.querySelector('input[name="Nome"]');
const inputTipo = document.querySelector('input[name="Tipo"]');
const inputTipo2 = document.querySelector('input[name="Tipo2"]');
const inputPokemonId = document.querySelector('input[name="PokemonId"]');

// Função para editar Pokémon
function editarPokemon(pokemonId) {
    const pokemon = pokemons.find(p => p.pokemonId === pokemonId);
    if (pokemon) {
        // Preenche os campos com os dados do Pokémon
        inputNome.value = pokemon.nome;
        inputTipo.value = pokemon.tipo;
        inputTipo2.value = pokemon.tipo2 || '';
        inputPokemonId.value = pokemonId; // Define o ID para edição
        aparecerLayout.style.display = 'flex'; // Mostra o layout de edição
    }
}

// Função para excluir Pokémon
function excluirPokemon(pokemonId) {
    inputPokemonIdExcluir.value = pokemonId; // Define o ID no form de exclusão
    layoutExcluir.style.display = 'flex'; // Mostra o layout de confirmação
}

// Evento para "botao-add": Se layout visível, valide e submeta o form (POST); senão, mostre o layout
botaoAdicionar.addEventListener('click', function () {
    if (aparecerLayout.style.display === 'flex') {
        const nome = inputNome.value.trim();
        const tipo = inputTipo.value.trim();
        if (!nome || !tipo) {
            alert('Nome e Tipo são obrigatórios.');
            return;
        }
        formAdicionar.submit();
    } else {
        aparecerLayout.style.display = 'flex';
    }
});

// Evento para salvar (submete o form)
botaoSalvar.addEventListener('click', function () {
    formAdicionar.submit();
});

// Eventos de cancelar
botaoCancelar1.addEventListener('click', function () {
    aparecerLayout.style.display = 'none';
    // Limpa os campos ao cancelar
    inputNome.value = '';
    inputTipo.value = '';
    inputTipo2.value = '';
    inputPokemonId.value = '0';
});

botaoCancelar2.addEventListener('click', function () {
    layoutExcluir.style.display = 'none';
});

// Evento para confirmar exclusão
exclusaoElement.addEventListener('click', function () {
    formExcluir.submit();
});