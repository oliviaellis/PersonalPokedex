class Trainer {
  constructor(name) {
    this.name = name;
    this.team = {};
  }
}

class Pokemon {
  constructor(name, id, hp, attack, defense, types, abilities, bio) {
    this.name = name;
    this.id = id;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.types = types;
    this.abilities = abilities;
    this.bio = bio;
    trainer.team[this.name] = this;
    }
}

function newPokemon(pokemon, trainer) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var info = JSON.parse(xhttp.responseText);
      var pokeName = info['name'];
      var id = info['id'];
      id = parseInt(id);
      if (id > 9 && id < 100) {
        id = id.toString();
        id = '0' + id;
      } else if (id < 10) {
        id = id.toString();
        id = '00' + id;
      }
      var hp = info['stats'][5]['base_stat'];
      var attack = info['stats'][4]['base_stat'];
      var defense = info['stats'][3]['base_stat'];
      var types = [];
      var type = info['types'][0]['type']['name'];
      types.push(type);
      var type2 = info['types'][1];
      var abilities = [];
      if (type2 != undefined) {
        types.push(type2['type']['name']);
      }
      ability1 = info['abilities'][0]['ability']['name'];
      abilities.push(ability1);
      ability2 = info['abilities'][1];
      if (ability2 != undefined) {
        abilities.push(ability2['ability']['name']);
      }
      ability3 = info['abilities'][2];
      if (ability3 != undefined) {
        abilities.push(ability3['ability']['name']);
      }
      if (ability2 == undefined) {
        abilities.push('<br>');
      }

      let newPokemon = new Pokemon(pokeName, id, hp, attack, defense, types, abilities, getFlavorText(pokemon));
      trainer.team[pokemon] = this;
    }
  }
  xhttp.open('GET', 'http://fizal.me/pokeapi/api/v2/name/' + pokemon + '.json', true);
  xhttp.send();
}

function getFlavorText(pokemon) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var info = JSON.parse(xhttp.responseText);
      var entries = info['flavor_text_entries'];
      for (item of entries) {
        if (item['language']['name'] === 'en') {
          var flavorText = item['flavor_text'];
          trainer.team[pokemon].bio = flavorText;
      }
      }
    }
  }
  xhttp.open('GET', 'https://pokeapi.co/api/v2/pokemon-species/' + pokemon + '/', true);
  xhttp.send();
}

let olivia = new Trainer('Olivia');
let christel = new Trainer('Christel');
let ahmet = new Trainer('Ahmet');
let freddy = new Trainer('Freddy');

newPokemon('rowlet', olivia);
newPokemon('diglett', olivia);
newPokemon('lickitung', olivia);
newPokemon('flareon', christel);
newPokemon('kadabra', christel);
newPokemon('dewgong', christel);
