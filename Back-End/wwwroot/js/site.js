   // Elementos 
   const aparecerLayout = document.getElementById('add-baixo-esq');
   const botaoAdicionar = document.getElementById('botao-add');  
   const botaoAdicionarInterno = document.getElementById('botao-add-interno');  // Novo botão interno para criação
   const botaoSalvar = document.getElementById('botao-salvar');  
   const botaoCancelar1 = document.getElementById('botao-cancelar1');
   const botaoCancelar2 = document.getElementById('botao-cancelar2');
   const exclusaoElement = document.getElementById('botao-confirmacao');
   const formAdicionar = document.querySelector('form[action="/Pokemon/Create"]');
   const formExcluir = document.getElementById('form-excluir');
   const inputPokemonIdExcluir = document.getElementById('pokemon-id-excluir');
   const layoutExcluir = document.getElementById('add-baixo-dir');
   const layoutConfirmar = document.getElementById('confirm-layer');
   // Inputs do form
   const inputNome = document.querySelector('input[name="Nome"]');
   const inputTipo = document.querySelector('input[name="Tipo"]');
   const inputTipo2 = document.querySelector('input[name="Tipo2"]');
   const inputPokemonId = document.querySelector('input[name="PokemonId"]');


function editarPokemon(pokemonId) {
    const pokemon = pokemons.find(p => p.PokemonId === pokemonId);  
    if (pokemon) {
        inputNome.value = pokemon.Nome; 
        inputTipo.value = pokemon.Tipo; 
        inputTipo2.value = pokemon.Tipo2 || '';  
        inputPokemonId.value = pokemonId; 
        aparecerLayout.style.display = 'flex'; 
        botaoAdicionarInterno.style.display = 'none';
        layoutConfirmar.style.display = 'flex';
    } else {
        alert('Pokémon não encontrado.');
    }
}

   function excluirPokemon(pokemonId) {
       inputPokemonIdExcluir.value = pokemonId;
       layoutExcluir.style.display = 'flex';
   }

   
   botaoAdicionar.addEventListener('click', function () {
       if (aparecerLayout.style.display === 'flex') {
           const nome = inputNome.value.trim();
           const tipo = inputTipo.value.trim();
           if (!nome || !tipo) {
               alert('Nome e Tipo são obrigatórios.');
               return;
           }
           // Para criação, garantir PokemonId = 0
           inputPokemonId.value = '0';
           formAdicionar.submit();
       } else {
           aparecerLayout.style.display = 'flex';
           layoutConfirmar.style.display = 'none';
           botaoAdicionarInterno.style.display = 'flex';
       }
   });


   botaoAdicionarInterno.addEventListener('click', function () {
       if (parseInt(inputPokemonId.value) === 0) {
           const nome = inputNome.value.trim();
           const tipo = inputTipo.value.trim();
           if (!nome || !tipo) {
               alert('Nome e Tipo são obrigatórios.');
               return;
           }
           formAdicionar.submit();  
       } else {
           alert('Este botão é apenas para adicionar novos Pokémons. Use "Salvar" para editar.');
       }
   });

   
   botaoSalvar.addEventListener('click', function () {
       if (parseInt(inputPokemonId.value) > 0) {
           formAdicionar.submit();  
       } else {
           alert('Este botão é apenas para editar Pokémons existentes. Use "+ adicionar pokemon" para criar.');
       }
   });

   botaoCancelar1.addEventListener('click', function () {
       aparecerLayout.style.display = 'none';
       inputNome.value = '';
       inputTipo.value = '';
       inputTipo2.value = '';
       inputPokemonId.value = '0';
   });

   botaoCancelar2.addEventListener('click', function () {
       layoutExcluir.style.display = 'none';
   });

   exclusaoElement.addEventListener('click', function () {
       formExcluir.submit();
   });
   
   
