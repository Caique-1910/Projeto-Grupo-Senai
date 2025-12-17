let text = document.querySelector('.nome');
let typeinfo = document.querySelector('.tipo');
let table = document.querySelector('.tabela');

/* ===== CRIA CARD ===== */
async function criarCard(url) {
    const resposta = await fetch(url);
    const obj = await resposta.json();

    let nome = obj.name;
    let tipo1 = obj.types[0].type.name;
    let tipo2 = obj.types[1] ? obj.types[1].type.name : "";

    let imagemUrl =
        obj.sprites.other.dream_world.front_default ??
        obj.sprites.front_default ??
        "assets/pokemon-bookgame-04eb-capa.jpg";

    let card = document.createElement('div');
    card.classList.add('pokemon-card');

    let img = document.createElement('img');
    img.src = imagemUrl;

    let pNome = document.createElement('p');
    pNome.textContent = nome;

    let pTipo1 = document.createElement('p');
    pTipo1.textContent = tipo1;

    card.appendChild(img);
    card.appendChild(pNome);
    card.appendChild(pTipo1);

    if (tipo2 !== "") {
        let pTipo2 = document.createElement('p');
        pTipo2.textContent = tipo2;
        card.appendChild(pTipo2);
    }

    table.appendChild(card);
}

/* ===== POKÉMONS INICIAIS ===== */
function carregarPokemonsIniciais() {
    table.innerHTML = "";

    const pokemonsMaisUsados = [
        "mewtwo",
        "mudkip",
        "darkrai",
        "lapras",
        "chandelure",
        "tyranitar",
        "gardevoir",
        "lucario",
        "dragonite",
        "swampert",
        "rayquaza",
        "lopunny",
        "vaporeon",
        "haxorus",
        "greninja"
    ];

    pokemonsMaisUsados.forEach(nome => {
        criarCard(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    });
}

/* ===== BUSCA ===== */
document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        table.innerHTML = "";

        let nome = text.value.trim();
        let tipo = typeinfo.value;

        if (nome !== "") {
            buscarPorNome(nome);
        } else if (tipo !== "") {
            buscarPorTipo(tipo);
        } else {
            carregarPokemonsIniciais();
        }
    }
});

/* ===== BUSCAR POR NOME ===== */
function buscarPorNome(nome) {
    nome = nome.toLowerCase().replace(" ", "-");
    criarCard(`https://pokeapi.co/api/v2/pokemon/${nome}`);
}

/* ===== BUSCAR POR TIPO ===== */
async function buscarPorTipo(tipo) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const obj = await resposta.json();

    obj.pokemon.forEach(p => {
        criarCard(p.pokemon.url);
    });
}

/* ===== AO ENTRAR NA PÁGINA ===== */
document.addEventListener('DOMContentLoaded', () => {
    carregarPokemonsIniciais();
});
