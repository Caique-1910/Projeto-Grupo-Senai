const aparecerLayout = document.getElementById('add-baixo-esq');
const botaoAdicionar = document.getElementById('botao-add');
const botaoAdicionar2 = document.getElementById('botao-add2');
const aparecerLayoutExcluir = document.getElementById('add-baixo-dir');
const botoesExcluir = document.querySelectorAll('.botao-excluir');
const botaoCancelar1 = document.getElementById('botao-cancelar1');
const botaoCancelar2 = document.getElementById('botao-cancelar2');
const botoesEditar = document.querySelectorAll('.botao-editar');

botaoAdicionar.addEventListener('click', function () {
    if (aparecerLayout.style.display === 'none' || !aparecerLayout.style.display) {
        aparecerLayout.style.display = 'flex';
        botaoAdicionar2.style.display = 'flex';
    } else {
        aparecerLayout.style.display = 'none';
        botaoAdicionar2.style.display = 'none';
    }
});

botoesExcluir.forEach(btn => {
    btn.addEventListener('click', function () {
        if (aparecerLayoutExcluir.style.display === 'none' || !aparecerLayoutExcluir.style.display) {
            aparecerLayoutExcluir.style.display = 'flex';
        } else {
            aparecerLayoutExcluir.style.display = 'none';
        }
    });
});

botaoCancelar1.addEventListener('click', function () {
    aparecerLayout.style.display = 'none';
    botaoAdicionar2.style.display = 'none';
});

botaoCancelar2.addEventListener('click', function () {
    aparecerLayoutExcluir.style.display = 'none';
});

botoesEditar.forEach(btn => {
    btn.addEventListener('click', function () {
        if (aparecerLayout.style.display === 'none' || !aparecerLayout.style.display) {
            aparecerLayout.style.display = 'flex';
        }
    });
});


const adicaoElement = document.getElementById('botao-add2');
const exclusaoElement = document.getElementById('botao-confirmacao');
const edicaoElement = document.getElementById('botao-salvar');


adicaoElement.addEventListener('click', function () {

    // Aqui criamos um novo "card" de Pokémon usando createElement.
    // Ele cria a estrutura abaixo de forma dinâmica:

    // <div class="pokemon-1">
    //     <div class="poke-cima">
    //         <p>Nome:</p>
    //         <p>tipo:</p>
    //         <p>tipo 2:</p>
    //     </div>
    //     <div class="poke-baixo">
    //         <button class="botao-editar">Editar</button>
    //         <button class="botao-excluir">Excluir</button>
    //     </div>
    // </div>

    const novoQuadro = createElement('div', { className: 'pokemon-1' },

        // PARTE DE CIMA (texto com nome e tipo)
        createElement('div', { className: 'poke-cima' },
            createElement('p', null, 'Nome:'),       // Nome vazio
            createElement('p', null, 'tipo:'),       // Tipo 1 vazio
            createElement('p', null, 'tipo 2:')      // Tipo 2 vazio
        ),

        // PARTE DE BAIXO (botões)
        createElement('div', { className: 'poke-baixo' },
            createElement('button', { className: 'botao-editar' }, 'Editar'),
            createElement('button', { className: 'botao-excluir' }, 'Excluir')
        )
    );

    // Escolhe o container onde os novos pokemons vão ser colocados
    const container = document.querySelector('.pokemon-layer-1');

    // Finalmente adiciona o novo card dentro do container
    container.appendChild(novoQuadro);
});


exclusaoElement.addEventListener('click', function () {
    const elementoParaRemover = document.querySelector('.pokemon-1');
    elementoParaRemover.remove();
});


edicaoElement.addEventListener('click', function () {
    
});
