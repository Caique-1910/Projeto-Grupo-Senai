const aparecerLayout = document.getElementById('add-baixo-esq');
const botaoAdicionar = document.getElementById('botao-add');
const aparecerLayoutExcluir = document.getElementById('add-baixo-dir');
const botaoExcluir = document.getElementById('botao-excluir');
const botaoCancelar = document.getElementById('botao-cancelar');

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

botaoCancelar.addEventListener('click', function () {
    aparecerLayoutExcluir.style.display = 'none';
});