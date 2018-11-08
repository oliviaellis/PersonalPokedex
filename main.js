var pokemon1 = 'lickitung';
var pokemon2 = 'rowlet';
var pokemon3 = 'wailmer';

var openButton = document.getElementById('inner-circle');
openButton.addEventListener('click', openScreen);

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

function newPokemon(pokemon) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var info = JSON.parse(xhttp.responseText);
      var pokeName = info['name'];
      var hp = info['stats'][5]['base_stat'];
      var attack = info['stats'][4]['base_stat'];
      var defense = info['stats'][3]['base_stat'];
      var type = info['types'][0]['type']['name'];
      var abilities = [];
      ability1 = info['abilities'][0]['ability']['name'];
      ability2 = info['abilities'][1]['ability']['name'];
      ability3 = info['abilities'][2];
      if (ability3 != undefined) {
        abilities.push(ability3['ability']['name']);
      }
      abilities.push(ability1, ability2);
      pokemon = new Pokemon(pokeName, hp, attack, defense, type, abilities);
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
  constructor(name, hp, attack, defense, type, abilities) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.type = type;
    this.abilities = abilities;
    trainer.team.push(this);
    }
}

trainer = new Trainer('Olivia');
newPokemon(pokemon1);
newPokemon(pokemon2);
newPokemon(pokemon3);

setTimeout(function(){
  for (i in trainer.team) {
  let grid = document.getElementById('row2');
  let div = document.createElement('div');
  div.classList.add('col-md-4');
  div.classList.add('p-4');
  div.style.transition = 'transform 0.2s';
  div.setAttribute('id', 'p'+[i]);
  div.setAttribute('onclick', 'selectPokemon(p'+[i]+')')
  div.style.backgroundImage = 'url(images/' + trainer.team[i]['name'] + '.png)'
  let h2 = document.createElement('h2');
  h2.innerHTML = trainer.team[i]['name'];
  div.appendChild(h2);
  grid.appendChild(div);
  if (trainer.team[i]['type'] == 'water') {
    div.style.backgroundColor = 'blue';
  } else if (trainer.team[i]['type'] == 'fire') {
    div.style.backgroundColor = 'red';
  } else if (trainer.team[i]['type'] == 'psychic') {
    div.style.backgroundColor = 'pink';
  } else if (trainer.team[i]['type'] == 'grass') {
    div.style.backgroundColor = 'green';
  } else if (trainer.team[i]['type'] == 'flying') {
    div.style.backgroundColor = 'lightblue';
  } else if (trainer.team[i]['type'] == 'normal') {
    div.style.backgroundColor = 'gray';
  }
  let ul = document.createElement('ul');
  ul.classList.add('hidden');
  let fighter = trainer.team[i]
  console.log(fighter);
  for (stat in fighter) {
    if (stat != ['name']) {
    let li = document.createElement('li');
    li.innerHTML = stat + "     " + fighter[stat];
    ul.appendChild(li);
  }
  }
  div.appendChild(ul);
}
}, 100);

function selectPokemon(divID) {
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
}, 150);

// generate trainer name
var h3 = document.createElement('h3');
var nameText = document.createTextNode(trainer.name);
h3.appendChild(nameText);
document.getElementById('trainer').appendChild(h3);
