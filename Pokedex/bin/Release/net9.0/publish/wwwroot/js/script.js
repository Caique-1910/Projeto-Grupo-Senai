let text = document.querySelector('.nome')
let typeinfo = document.querySelector('.tipo')
let table = document.querySelector('.tabela')

async function urls(itens) {
    const resposta2 = await fetch(`${itens}`);
    const obj2 = await resposta2.json()

    let Tipo1
    let Tipo2
    let Nome = obj2.name
    let urlImagem

    if (obj2.sprites.other.dream_world.front_default == null) {
        urlImagem = '../assets/pokemon-bookgame-04eb-capa.jpg'
    }

    else {
        urlImagem = obj2.sprites.other.dream_world.front_default
    }
    if (obj2.types.length === 1) {
        Tipo1 = obj2.types[0].type.name;
        Tipo2 = "";
    } else {
        Tipo1 = obj2.types[0].type.name;
        Tipo2 = obj2.types[1].type.name;
    }

    let linha = document.createElement('tr')
    let coluna1 = document.createElement('td')
    let coluna2 = document.createElement('td')
    let coluna3 = document.createElement('td')
    let coluna4 = document.createElement('td')
    let imagem = document.createElement('img')
    let infotextN = document.createElement('p')
    let infotextT1 = document.createElement('p')
    let infotextT2 = document.createElement('p')

    infotextN.textContent = Nome
    infotextT1.textContent = Tipo1
    infotextT2.textContent = Tipo2
    imagem.src = urlImagem


    coluna1.appendChild(imagem)
    coluna2.appendChild(infotextN)
    coluna3.appendChild(infotextT1)
    coluna4.appendChild(infotextT2)
    linha.appendChild(coluna1)
    linha.appendChild(coluna2)
    linha.appendChild(coluna3)
    linha.appendChild(coluna4)
    table.appendChild(linha)
}


document.addEventListener('keydown', function (evento) {
    if (evento.key == 'Enter') {
        evento.preventDefault()
        var texto = text.value
        var tipo = typeinfo.value
        if (texto != "" && tipo == "") {
            document.querySelector('.tabela').innerHTML = "";
            APITX(texto)
        }
        else if (texto == "" && tipo != "") {
            document.querySelector('.tabela').innerHTML = "";
            APITY(tipo)
        }
        else if (texto != "" && tipo != "") {
            document.querySelector('.tabela').innerHTML = "";
            APITX(texto)
        }
        else if (texto == "" && tipo == "") {
            document.querySelector('.tabela').innerHTML = "";
        }


    }
})

async function APITX(texto) {
    texto = texto.split(' ').join('-');
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon/' + texto);
    const obj = await resposta.json()

    let Tipo1
    let Tipo2
    let Nome = obj.name
    let urlImagem
    if (obj.sprites.other.dream_world.front_default == null) {
        urlImagem = null
    }

    else {
        urlImagem = obj.sprites.other.dream_world.front_default
    }

     if (obj.types.length === 1) {
        Tipo1 = obj.types[0].type.name;
        Tipo2 = "";
    } else {
        Tipo1 = obj.types[0].type.name;
        Tipo2 = obj.types[1].type.name;
    }


    let linha = document.createElement('tr')
    let coluna1 = document.createElement('td')
    let coluna2 = document.createElement('td')
    let coluna3 = document.createElement('td')
    let coluna4 = document.createElement('td')
    let imagem = document.createElement('img')
    let infotextN = document.createElement('p')
    let infotextT1 = document.createElement('p')
    let infotextT2 = document.createElement('p')

    infotextN.textContent = Nome
    infotextT1.textContent = Tipo1
    infotextT2.textContent = Tipo2
    imagem.src = urlImagem


    coluna1.appendChild(imagem)
    coluna2.appendChild(infotextN)
    coluna3.appendChild(infotextT1)
    coluna4.appendChild(infotextT2)
    linha.appendChild(coluna1)
    linha.appendChild(coluna2)
    linha.appendChild(coluna3)
    linha.appendChild(coluna4)
    table.appendChild(linha)

}


async function APITY(tipo) {
    tipo = tipo.split(' ').join('-');
    const resposta1 = await fetch('https://pokeapi.co/api/v2/type/' + tipo);
    const obj1 = await resposta1.json()

    obj1.pokemon.forEach(poke => {
        urls(poke.pokemon.url)

    })
}

