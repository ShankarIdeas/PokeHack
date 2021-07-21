function fetchMonsterData(monster) {
  let url = monster.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (chosen) {
      renderMonster(chosen);
    });
}

function toTitleCase(str) {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

function acquireAbilities(chosen, abilityUl){
    var abilities = [];
    abilities = chosen.abilities;
    for (let index = 0; index < abilities.length; index++) {
        const element = abilities[index];
            for (const key in element) {
                if (Object.hasOwnProperty.call(element, key)) {
                    const item = element[key];
                    if(key == "ability"){
                        let abilityLi = document.createElement('li');
                        abilityLi.innerText = item.name;
                        abilityUl.append(abilityLi)
                    }
                    

                }
            }
        
    }
}
// To create the card with pokemon image with the name
function createImage(ID, pokeBallDiv, name) {
  let pokeBall = document.createElement("tr");
  pokeBall.classList.add("image");
  let pokenPhoto = document.createElement("img");
  pokenPhoto.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png`;
  pokenPhoto.alt = `${name}`;
  pokeBall.append(pokenPhoto);
  let pokemon = document.createElement("h2");
  pokemon.innerText = toTitleCase(name);
  pokeBall.append(pokemon);
  pokeBallDiv.append(pokeBall);
}


function renderMonster(chosen) {
  let basket = document.getElementById("features");
  let pokeBall = document.createElement("div");
  let weightRow = document.createElement("tr");
  weightRow.classList.add("weights");
  let weightBadge = document.createElement("span");
  //create the cards
  pokeBall.classList.add("cards");
  //add the weights using W3C Badges
  weightBadge.classList.add("w3-badge");
  weightBadge.classList.add("w3-tiny")
  weightBadge.classList.add("w3-right");
  weightBadge.classList.add("w3-margin-right");
  //weightBadge.classList.add("w3-padding");
  let weight = chosen.weight; 
  if(weight < 50 ){
    weightBadge.classList.add("w3-yellow");
  }else if(weight < 75 && weight >= 50 ){
    weightBadge.classList.add("w3-green");
  }else if(weight < 100 && weight >= 75){
    weightBadge.classList.add("w3-red");
  }else if(weight < 200 && weight >= 100){
    weightBadge.classList.add("w3-dark-grey");
  }else if(weight < 300 && weight >= 200){
    weightBadge.classList.add("w3-brown");
  }else if(weight < 400 && weight >= 300){
    weightBadge.classList.add("w3-light-grey");
  }else if (weight >=400){
    weightBadge.classList.add("w3-amber");
  }else{
    weightBadge.classList.add("w3-pale-green");
  }
  weightBadge.innerHTML=weight;
  weightRow.appendChild(weightBadge);

  pokeBall.appendChild(weightRow); 
  //add the abilities
    let abilityUl = document.createElement('ul');
    abilityUl.innerHTML = "<strong>Abilities</strong>";
    abilityUl.classList.add("small");
  acquireAbilities(chosen, abilityUl);
  let pokenCharsRow = document.createElement("tr");
  pokenCharsRow.classList.add("spreadOut");
  let pokenAbleTd = document.createElement('td');
  pokenAbleTd.append(abilityUl);
  //capture the moves
  let movesUl = document.createElement('ul');
  movesUl.innerHTML = "<strong>Moves</strong>";
  movesUl.classList.add("movesLi");
  captureTop5Moves(chosen, movesUl);
  let pokenMovesTd = document.createElement('td');
  pokenMovesTd.append(movesUl);
  pokenCharsRow.append(pokenAbleTd,pokenMovesTd);
  createImage(chosen.id, pokeBall, chosen.name);
  pokeBall.append(pokenCharsRow);
  basket.appendChild(pokeBall);
}
//Restrict move capturing to 5 as some have extensive moves learnt
function captureTop5Moves(chosen, movesUl){
  var moves = [];
  moves = chosen.moves
  for (let index = 0; index < moves.length; index++) {
      const element = moves[index];
          for (const key in element) {
              if (Object.hasOwnProperty.call(element, key)) {
                  const item = element[key];
                  if(key == "move" && index < 5){// restricting to just 5 first of the list moves
                      let moveLi = document.createElement('li');
                      moveLi.innerText = item.name;
                      movesUl.append(moveLi)
                  }
                  

              }
          }
      
  }
}

catchAllPokemon = function () {
  let pokeBalls = document.querySelector("#features");
  fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
    .then((response) => response.json())
    .then(function (pokemons) {
      pokemons.results.forEach(function (pokemon) {
        fetchMonsterData(pokemon);
      });
    });
};

catchAllPokemon();
