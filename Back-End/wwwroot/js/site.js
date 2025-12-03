const aparecerLayout = document.getElementById('add-baixo-esq');
const botaoAdicionar = document.getElementById('botao-add');
const aparecerLayoutExcluir = document.getElementById('add-baixo-dir');
const botaoExcluir = document.getElementById('botao-excluir');

botaoAdicionar.addEventListener('click', function () {
    if (aparecerLayout.style.display === 'none' || !aparecerLayout.style.display) {
        aparecerLayout.style.display = 'block';
    } else {
        aparecerLayout.style.display = 'none';
    }
});

botaoExcluir.addEventListener('click', function () {
    if (aparecerLayoutExcluir.style.display === 'none' || !aparecerLayoutExcluir.style.display) {
        aparecerLayoutExcluir.style.display = 'block';
    } else {
        aparecerLayoutExcluir.style.display = 'none';
    }
});