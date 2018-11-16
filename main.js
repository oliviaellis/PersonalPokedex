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

trainer_count = 1;
TRAINERS = [];

class Trainer {
   constructor(name) {
     this.id = trainer_count;
     this.name = name;
     this.team = {};
     trainer_count++;
     TRAINERS.push(this);
   }
}

pk_order = 1;

class Pokemon {
  constructor(trainer, name, id, hp, attack, defense, types, abilities, bio) {
    this.name = name;
    this.id = id;
    this.order = pk_order;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.types = types;
    this.abilities = abilities;
    this.bio = bio;
    pk_order++;
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

      let newPokemon = new Pokemon(trainer, pokeName, id, hp, attack, defense, types, abilities, getFlavorText(pokemon, trainer));
    }
  }
  xhttp.open('GET', 'http://fizal.me/pokeapi/api/v2/name/' + pokemon + '.json', true);
  xhttp.send();
}

function getFlavorText(pokemon, trainer) {
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

let freddy = new Trainer('Freddy');
let christel = new Trainer('Christel');
let ahmet = new Trainer('Ahmet');
let olivia = new Trainer('Olivia');

newPokemon('rowlet', olivia);
newPokemon('diglett', olivia);
newPokemon('lickitung', olivia);
newPokemon('flareon', christel);
newPokemon('kadabra', christel);
newPokemon('dewgong', christel);
newPokemon('squirtle', ahmet);
newPokemon('charmander', ahmet);
newPokemon('bulbasaur', ahmet);
newPokemon('lugia', freddy);
newPokemon('pichu', freddy);
newPokemon('entei', freddy);

// writes pokemon grid things to the page

setTimeout(function() {
    writeToScreen(freddy, 'row2');
}, 200);
setTimeout(function() {
    writeToScreen(christel, 'row4');
}, 200);
setTimeout(function() {
    writeToScreen(ahmet, 'row6');
}, 200);
setTimeout(function() {
    writeToScreen(olivia, 'row8');
}, 200);

function writeToScreen(trainer, placement) {
  // let counter = 0;
  var h3 = document.createElement('h3');
  var nameText = document.createTextNode(trainer.name);
  h3.appendChild(nameText);
  h3.class = 'animated slideInRight delay-0.8s';
  h3.addEventListener('click', revertColumns);
  if (trainer.name == 'Freddy') {
    document.getElementById('title1').appendChild(h3);
  } else if (trainer.name == 'Christel') {
    document.getElementById('title2').appendChild(h3);
  } else if (trainer.name == 'Ahmet') {
    document.getElementById('title3').appendChild(h3);
  } else if (trainer.name == 'Olivia') {
    document.getElementById('title4').appendChild(h3);
  }
  console.log(trainer.team);
  for (i in trainer.team) {
    let grid = document.getElementById(placement);
    let div = document.createElement('div');
    div.classList.add('col-md-4');
    div.classList.add('p-4');
    div.style.transition = 'all 2s';
    div.setAttribute('id', 'pokemon' + trainer.team[i].order);
    div.setAttribute('onclick', 'selectPokemon('+'this'+')');
    div.style.backgroundImage = 'url(https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + trainer.team[i]['id'] + '.png)';
    let h2 = document.createElement('h2');
    h2.innerHTML = trainer.team[i]['name'];
    div.appendChild(h2);
    grid.appendChild(div);
    // counter++;

    switch (trainer.team[i]['types'][0]) {
      case 'water':
        div.style.backgroundColor = 'rgba(45, 88, 144, 0.9)';
        div.style.color = 'white';
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
        div.style.color = 'white';
        break;
      case 'normal':
        div.style.backgroundColor = 'rgba(140, 140, 140, 0.9)';
        break;
      case 'poison':
        div.style.backgroundColor = 'rgba(100, 0, 125, 0.9)';
        div.style.color = 'white';
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
        div.style.backgroundColor = 'rgba(195, 219, 255, 0.9)';
        break;
      case 'bug':
        div.style.backgroundColor = 'rgba(109, 166, 28, 0.9)';
        break;
      case 'dragon':
        div.style.backgroundColor = 'rgba(165, 25, 172, 0.9)';
        break;
      case 'ghost':
        div.style.backgroundColor = 'rgba(78, 57, 102, 0.9)';
        div.style.color = 'white';
        break;
      case 'dark':
        div.style.backgroundColor = 'rgba(31, 27, 42, 0.9)';
        div.style.color = 'white';
        break;
      case 'steel':
        div.style.backgroundColor = 'rgba(208, 255, 255, 0.9)';
        break;
      case 'fairy':
        div.style.backgroundColor = 'rgba(255, 166, 193, 0.9)';
        break;
      default:
        div.style.backgroundColor = 'rgba(54, 54, 54, 0.9)'
        div.style.color = 'white';
    }
    // write stats to page
    let ul = document.createElement('ul');
    ul.class = 'hidden animated zoomIn delay-1s';
    // ul.classList.add('fadeOutUp');
    let fighter = trainer.team[i]
    for (stat in fighter) {
      if (stat != ['name'] && stat != ['id'] && stat != ['bio']) {
        if (stat != ['abilities'] ) {
          let li = document.createElement('li');
          li.innerHTML = "<span>" + stat + "</span>" + "                                              " + fighter[stat];
          ul.appendChild(li);
        } else {
          let li = document.createElement('li');
          li.innerHTML = '<span>' + stat + '</span>';
          ul.appendChild(li);
          for (i in fighter[stat]) {
          let li = document.createElement('li');
          li.innerHTML = fighter[stat][i];
          ul.appendChild(li);
    }
  }
  }
}
div.appendChild(ul);
let p = document.createElement('p');
p.class = 'hidden animated zoomIn delay-1s';
p.innerHTML = fighter['bio'];
div.appendChild(p);
}
}

function selectPokemon(divID) {
  // let container = divID.parentNode;
  // console.log(container);
  let otherPokemon = divID.childNodes;
  console.log(otherPokemon);


  // container.classList.remove('col-md-1');
  divID.classList.toggle('col-md-1', false);
  divID.classList.toggle('col-md-4', false);
  divID.classList.toggle('col-md-10', true);
  otherPokemon[0].classList.toggle('rotate', false);
  let ul = otherPokemon[1];
  let p = otherPokemon[2];
  // console.log(ul, p);
  ul.classList.toggle('hidden', false);
  p.classList.toggle('hidden', false);

  // if (divID == pk_order) {
  //   p1.classList.toggle('col-md-4', false);
  //   p1.classList.toggle('col-md-1', true);
  //   p1.classList.toggle('col-md-10', false);
  //   p1.firstChild.classList.toggle('rotate', true);
  //   let ul = p1.children[1];
  //   let p = p1.children[2]
  //   ul.classList.toggle('hidden', true);
  //   p.classList.toggle('hidden', true);
  //   p2.classList.toggle('col-md-4', false);
  //   p2.classList.toggle('col-md-1', true);
  //   p2.classList.toggle('col-md-10', false);
  //   p2.firstChild.classList.toggle('rotate', true);
  //   let ul_2 = p2.children[1];
  //   let p_2 = p2.children[2]
  //   ul_2.classList.toggle('hidden', true);
  //   p_2.classList.toggle('hidden', true);
  // } else if (divID == p1) {
  //   pk_order.classList.toggle('col-md-4', false);
  //   pk_order.classList.toggle('col-md-1', true);
  //   pk_order.classList.toggle('col-md-10', false);
  //   pk_order.firstChild.classList.toggle('rotate', true);
  //   let ul = pk_order.children[1];
  //   let p = pk_order.children[2]
  //   ul.classList.toggle('hidden', true);
  //   p.classList.toggle('hidden', true);
  //   p2.classList.toggle('col-md-4', false);
  //   p2.classList.toggle('col-md-1', true);
  //   p2.classList.toggle('col-md-10', false);
  //   p2.firstChild.classList.toggle('rotate', true);
  //   let ul_2 = p2.children[1];
  //   let p_2 = p2.children[2]
  //   ul_2.classList.toggle('hidden', true);
  //   p_2.classList.toggle('hidden', true);
  // } else if (divID == p2) {
  //   pk_order.classList.toggle('col-md-4', false);
  //   pk_order.classList.toggle('col-md-1', true);
  //   pk_order.classList.toggle('col-md-10', false);
  //   pk_order.firstChild.classList.toggle('rotate', true);
  //   let ul = pk_order.children[1];
  //   let p = pk_order.children[2]
  //   ul.classList.toggle('hidden', true);
  //   p.classList.toggle('hidden', true);
  //   p1.classList.toggle('col-md-4', false);
  //   p1.classList.toggle('col-md-1', true);
  //   p1.classList.toggle('col-md-10', false);
  //   p1.firstChild.classList.toggle('rotate', true);
  //   let ul_2 = p1.children[1];
  //   let p_2 = p1.children[2]
  //   ul_2.classList.toggle('hidden', true);
  //   p_2.classList.toggle('hidden', true);
  // }
// }
}

setTimeout (function() {
  var p0 = document.getElementById('pokemon');
  // var p1 = document.getElementById('pokemon');
  // var p2 = document.getElementById('pokemon');
}, 200);

function revertColumns() {
  p0.classList.toggle('col-md-4', true);
  p0.classList.toggle('col-md-10', false);
  p0.classList.toggle('col-md-1', false);
  // p1.classList.toggle('col-md-4', true);
  // p1.classList.toggle('col-md-10', false);
  // p1.classList.toggle('col-md-1', false);
  // p2.classList.toggle('col-md-4', true);
  // p2.classList.toggle('col-md-10', false);
  // p2.classList.toggle('col-md-1', false);
  otherPokemon[1].classList.toggle('hidden', true);
  otherPokemon[2].classList.toggle('hidden', true);
  // p1.children[1].classList.toggle('hidden', true);
  // p1.children[2].classList.toggle('hidden', true);
  // p2.children[1].classList.toggle('hidden', true);
  // p2.children[2].classList.toggle('hidden', true);
}
trainer_display = 0;

function carouselArrow(direction) {
  currTrainer = direction.target.id;
  // alert(direction.target .id);
  // for(;trainer_display < TRAINERS.length;) {
  //   console.log(TRAINERS[trainer_display]);
  // }
  if(direction.target.id == 'next') {
    // currTrainer = TRAINERS[trainer_display];
    var nextTrainer = TRAINERS[trainer_display + 1];
    // console.log(TRAINERS[trainer_display]);
    console.log(nextTrainer);
    // var nextTrainer = currTrainer + 1;
  }
  else if(direction.target.id == 'prev') {
    var prevTrainer = TRAINERS[trainer_display - 1];
    console.log(prevTrainer);
  }
}

let nextarrow = document.getElementById('next');
let prevarrow = document.getElementById('prev');

nextarrow.addEventListener('click', carouselArrow);
prevarrow.addEventListener('click', carouselArrow);
