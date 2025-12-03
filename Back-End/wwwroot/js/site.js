const aparecerLayout = document.getElementById('add-baixo-esq');
const aparecerLayoutBotao = document.getElementById('edit-add-layer');
const botaoAdicionar = document.getElementById('botao-add');
const botaoAdicionar2 = document.getElementById('botao-add2');
const aparecerLayoutExcluir = document.getElementById('add-baixo-dir');
const botaoExcluir = document.getElementById('botao-excluir');
const botaoCancelar1 = document.getElementById('botao-cancelar1');
const botaoCancelar2 = document.getElementById('botao-cancelar2');
const botaoEditar = document.getElementById('botao-editar');

botaoAdicionar.addEventListener('click', function () {
    if (aparecerLayout.style.display === 'none' || !aparecerLayout.style.display) {
        aparecerLayout.style.display = 'block';
        aparecerLayoutBotao.style.display = 'flex';
    } else {
        aparecerLayout.style.display = 'none';
    }
});

botaoExcluir.addEventListener('click', function () {
    if (aparecerLayoutExcluir.style.display === 'none' || !aparecerLayoutExcluir.style.display) {
        aparecerLayoutExcluir.style.display = 'flex';
    } else {
        aparecerLayoutExcluir.style.display = 'none';
    }
});

botaoCancelar1.addEventListener('click', function () {
    aparecerLayout.style.display = 'none';
});

botaoCancelar2.addEventListener('click', function () {
    aparecerLayoutExcluir.style.display = 'none';
}); 

botaoEditar.addEventListener('click', function () {
        if(aparecerLayout.style.display === 'none' || !aparecerLayout.style.display) {
            aparecerLayout.style.display = 'block';
            botaoAdicionar2.textContent = "Editar Pokemon";
        }
    });