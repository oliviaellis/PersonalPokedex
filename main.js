var pokemon1 = 'lickitung';
var pokemon2 = 'rowlet';
var pokemon3 = 'exeggutor';

function newPokemon(pokemon) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var info = JSON.parse(xhttp.responseText);
      var pokeName = info['name'];
      var hp = info['stats'][5]['base_stat'];
      var attack = info['stats'][4]['base_stat'];
      var defense = info['stats'][3]['base_stat']
      var abilities = [];
      ability1 = info['abilities'][0]['ability']['name'];
      ability2 = info['abilities'][1]['ability']['name'];
      ability3 = info['abilities'][2];
      if (ability3 != undefined) {
        abilities.push(ability3['ability']['name']);
      }
      abilities.push(ability1, ability2);
      pokemon = new Pokemon(pokeName, hp, attack, defense, abilities);
    }
  }
  xhttp.open('GET', 'http://fizal.me/pokeapi/api/v2/name/' + pokemon + '.json', true);
  xhttp.send();
}

class Trainer {
  constructor(name) {
    this.name = name;
    this.team = [];
  }

  all() {
    console.log(this.team);
  }

  get(name) {
    for (let i = 0; i < this.team.length; i++) {
      if (name == this.team[i].name) {
        console.log(this.team[i]);
      }
    }
  }
}

class Pokemon {
  constructor(name, hp, attack, defense, abilities) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.abilities = abilities;
    trainer.team.push(this);
    }
}

trainer = new Trainer('Olivia');
newPokemon(pokemon1);
newPokemon(pokemon2);
newPokemon(pokemon3);

// This is throwing an error
setTimeout(function(){
  var h2 = document.createElement('h2');
  var pokemonName = document.createTextNode(trainer.team[0]['name']);
  h2.appendChild(pokemonName);
  document.getElementById('p1').appendChild(h2);
}, 100);


var h3 = document.createElement('h3');
var nameText = document.createTextNode(trainer.name);
h3.appendChild(nameText);
document.getElementById('trainer').appendChild(h3);
