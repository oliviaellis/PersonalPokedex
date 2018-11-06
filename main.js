var newPoke = ['lickitung', 'rowlet', 'exeggutor'];

// NEXT STEP: Figure out how to loop over all Pokemon to add them all to the trainer object.
for (i = 0; i < newPoke.length; i++) {
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = addPokemon;
httpRequest.open('GET', 'http://fizal.me/pokeapi/api/v2/name/' + newPoke[i] + '.json');
httpRequest.send();
}

function addPokemon() {
if (httpRequest.readyState === XMLHttpRequest.DONE) {
  if (httpRequest.status === 200) {
    var info = JSON.parse(httpRequest.responseText);
    var pokeName = info['forms'][0]['name'];
    var hp = info['stats'][5]['base_stat'];
    var attack = info['stats'][4]['base_stat'];
    var defense = info['stats'][3]['base_stat']
    var abilities = [];
    ability1 = info['abilities'][0]['ability']['name'];
    abilities.push(ability1);
    new Pokemon(pokeName, hp, attack, defense, abilities);
    // console.log(info);
  } else {
    console.log('There was an error retrieving your request.');
  }
}
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
    this.abilities = [];
    trainer.team.push(this);
    }
}

trainer = new Trainer('Olivia');
