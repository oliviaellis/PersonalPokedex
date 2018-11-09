var pokemon1 = 'lickitung';
var pokemon2 = 'rowlet';
var pokemon3 = 'spoink';

// function that opens pokemon screen
var openButton = document.getElementById('inner-circle');
openButton.addEventListener('click', openScreen);


// opens pokemon screen
function openScreen() {
  let top = document.getElementById('top');
  let bottom = document.getElementById('bottom');
  let stripe = document.getElementById('stripe');
  let outerCircle = document.getElementById('outer-circle');
  top.style.top = '-100%';
  bottom.style.bottom = '-100%';
  stripe.style.top = '-100%';
  outerCircle.style.top = '-100%';
  openButton.style.top = '-100%';

}

// makes a new pokemon object
function newPokemon(pokemon) {
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
      ability2 = info['abilities'][1]['ability']['name'];
      ability3 = info['abilities'][2];
      if (ability3 != undefined) {
        abilities.push(ability3['ability']['name']);
      }
      abilities.push(ability1, ability2);
      pokemon = new Pokemon(pokeName, id, hp, attack, defense, types, abilities);
    }
  }
  xhttp.open('GET', 'http://fizal.me/pokeapi/api/v2/name/' + pokemon + '.json', true);
  xhttp.send();
}

// new trainer
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
  constructor(name, id, hp, attack, defense, types, abilities) {
    this.name = name;
    this.id = id;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.types = types;
    this.abilities = abilities;
    trainer.team.push(this);
    }
}

trainer = new Trainer('olivia');
newPokemon(pokemon1);
newPokemon(pokemon2);
newPokemon(pokemon3);

// writes pokemon grid things to the page
setTimeout(function(){
  for (i in trainer.team) {
  let grid = document.getElementById('row2');
  let div = document.createElement('div');
  div.classList.add('col-md-4');
  div.classList.add('p-4');
  div.style.transition = 'all 2s';
  div.setAttribute('id', 'p'+[i]);
  div.setAttribute('onclick', 'selectPokemon(p'+[i]+')')
  div.style.backgroundImage = 'url(https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + trainer.team[i]['id'] + '.png)'
  let h2 = document.createElement('h2');
  h2.innerHTML = trainer.team[i]['name'];
  div.appendChild(h2);
  grid.appendChild(div);

  // Look into switch case for this (and thank Camille)
  switch (trainer.team[i]['types'][0]) {
    case 'water':
      div.style.backgroundColor = 'rgba(45, 88, 144, 0.9)';
      break;
    case 'fire':
      div.style.backgroundColor = 'rgba(224, 108, 34, 0.9)';
      break;
    case 'psychic':
      div.style.backgroundColor = 'rgba(221, 114, 171, 0.9)';
      break;
    case 'grass':
      div.style.backgroundColor = 'rgba(60, 111, 62, 0.9)';
      break;
    case 'flying':
      div.style.backgroundColor = 'rgba(126, 166, 232, 0.9)';
      break;
    case 'fighting':
      div.style.backgroundColor = 'rgba(130, 12, 0, 0.9)';
      break;
    case 'normal':
      div.style.backgroundColor = 'rgba(140, 140, 140, 0.9)';
      break;
    case 'poison':
      div.style.backgroundColor = 'rgba(100, 0, 125, 0.9)';
      break;
    case 'electric':
      div.style.backgroundColor = 'rgba(255, 207, 0, 0.9)';
      break;
    case 'ground':
      div.style.backgroundColor = 'rgba(209, 168, 87, 0.9)';
      break;
    case 'rock':
      div.style.backgroundColor = 'rgba(84, 62, 19, 0.9)';
      break;
    case 'ice':
      div.style.backgroundColor = 'rgba(109, 186, 207, 0.9)';
      break;
    case 'bug':
      div.style.backgroundColor = 'rgba(109, 166, 28, 0.9)';
      break;
    case 'dragon':
      div.style.backgroundColor = 'rgba(165, 25, 172, 0.9)';
      break;
    case 'ghost':
      div.style.backgroundColor = 'rgba(78, 57, 102, 0.9)';
      break;
    case 'dark':
      div.style.backgroundColor = 'rgba(31, 27, 42, 0.9)';
      break;
    case 'steel':
      div.style.backgroundColor = 'rgba(208, 255, 255, 0.9)';
      break;
    case 'fairy':
      div.style.backgroundColor = 'rgba(255, 166, 193, 0.9)';
      break;
    default:
      div.style.backgroundColor = 'rgba(54, 54, 54, 0.9)'
  }
  // write stats to page
  let ul = document.createElement('ul');
  ul.classList.add('hidden');
  let fighter = trainer.team[i]
  console.log(fighter);
  for (stat in fighter) {
    if (stat != ['name'] && stat != ['id']) {
        let li = document.createElement('li');
        li.innerHTML = "<span>" + stat + "</span>" + "                                              " + fighter[stat];
        ul.appendChild(li);
      }
  }
  div.appendChild(ul);
}
}, 200);

function selectPokemon(divID) {
  divID.classList.toggle('col-md-1', false);
  divID.classList.toggle('col-md-4', false);
  divID.classList.toggle('col-md-10', true);
  divID.firstChild.classList.toggle('rotate', false);
  divID.lastChild.classList.toggle('hidden', false);
  if (divID == p0) {
    p1.classList.toggle('col-md-4', false);
    p1.classList.toggle('col-md-1', true);
    p1.classList.toggle('col-md-10', false);
    p1.firstChild.classList.toggle('rotate', true);
    p1.lastChild.classList.toggle('hidden', true);
    p2.classList.toggle('col-md-4', false);
    p2.classList.toggle('col-md-1', true);
    p2.classList.toggle('col-md-10', false);
    p2.firstChild.classList.toggle('rotate', true);
    p2.lastChild.classList.toggle('hidden', true);
  } else if (divID == p1) {
    p0.classList.toggle('col-md-4', false);
    p0.classList.toggle('col-md-1', true);
    p0.classList.toggle('col-md-10', false);
    p0.firstChild.classList.toggle('rotate', true);
    p0.lastChild.classList.toggle('hidden', true);
    p2.classList.toggle('col-md-4', false);
    p2.classList.toggle('col-md-1', true);
    p2.classList.toggle('col-md-10', false);
    p2.firstChild.classList.toggle('rotate', true);
    p2.lastChild.classList.toggle('hidden', true);
  } else if (divID == p2) {
    p0.classList.toggle('col-md-4', false);
    p0.classList.toggle('col-md-1', true);
    p0.classList.toggle('col-md-10', false);
    p0.firstChild.classList.toggle('rotate', true);
    p0.lastChild.classList.toggle('hidden', true);
    p1.classList.toggle('col-md-4', false);
    p1.classList.toggle('col-md-1', true);
    p1.classList.toggle('col-md-10', false);
    p1.firstChild.classList.toggle('rotate', true);
    p1.lastChild.classList.toggle('hidden', true);
  }
}

setTimeout (function() {
  var p0 = document.getElementById('p0');
  var p1 = document.getElementById('p1');
  var p2 = document.getElementById('p2');
}, 200);


function revertColumns() {
  p0.classList.toggle('col-md-4', true);
  p0.classList.toggle('col-md-10', false);
  p0.classList.toggle('col-md-1', false);
  p1.classList.toggle('col-md-4', true);
  p1.classList.toggle('col-md-10', false);
  p1.classList.toggle('col-md-1', false);
  p2.classList.toggle('col-md-4', true);
  p2.classList.toggle('col-md-10', false);
  p2.classList.toggle('col-md-1', false);
  p0.lastChild.classList.toggle('hidden', true);
  p1.lastChild.classList.toggle('hidden', true);
  p2.lastChild.classList.toggle('hidden', true);
}

// generate trainer name
var h3 = document.createElement('h3');
var nameText = document.createTextNode(trainer.name);
h3.appendChild(nameText);
document.getElementById('title').appendChild(h3);
h3.addEventListener('click', revertColumns);
