function fetchMonsterData(monster){
    let url = monster.url
    fetch(url)
    .then(response => response.json())
    .then(function(chosen){
        renderMonster(chosen)
    })
}
function toTitleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }
function createImage(ID, pokeBallDiv, name){
    let pokeBall = document.createElement('div')
    pokeBall.classList.add('image')
    let pokenPhoto = document.createElement('img')
    pokenPhoto.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png`
    pokeBall.append(pokenPhoto);
    let pokemon = document.createElement('h5') 
    pokemon.innerText = toTitleCase(name)  
    pokeBall.append(pokemon);
    pokeBallDiv.append(pokeBall);
}
function renderMonster(chosen){
    let basket = document.getElementById('features');
    let pokeBall = document.createElement("div") 
    pokeBall.classList.add('cards');

    createImage(chosen.id, pokeBall, chosen.name);

    basket.appendChild(pokeBall);
}
catchAllPokemon = function () {
        let pokeBalls = document.querySelector('#features');
        fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then(response => response.json())
        .then(function(pokemons){
            pokemons.results.forEach(function(pokemon){
                fetchMonsterData(pokemon);
            })
        });
};


catchAllPokemon();
