function selectPokemon(divID) {
  divID.classList.toggle('col-md-1', false);
  divID.classList.toggle('col-md-4', false);
  divID.classList.toggle('col-md-10', true);
  divID.firstChild.classList.toggle('rotate', false);
  let ul = divID.children[1];
  let p = divID.children[2];
  ul.classList.toggle('hidden', false);
  p.classList.toggle('hidden', false);
  if (divID) {
    case 'p0':
    case 'p1':
    case 'p2':
      var p0 = document.getElementById('p0');
      var p1 = document.getElementById('p1');
      var p2 = document.getElementById('p2');
      break;
    case 'p3':
    case 'p4':
    case 'p5':
      var p0 = document.getElementById('p3');
      var p1 = document.getElementById('p4');
      var p2 = document.getElementById('p5');
      break;
    case 'p6':
    case 'p7':
    case 'p8':
      var p0 = document.getElementById('p6');
      var p1 = document.getElementById('p7');
      var p2 = document.getElementById('p8');
      break;
    case 'p9':
    case 'p10':
    case 'p11':
      var p0 = document.getElementById('p9');
      var p1 = document.getElementById('p10');
      var p2 = document.getElementById('p11');
      break;
  }
  if (divID == p0) {
    p1.classList.toggle('col-md-4', false);
    p1.classList.toggle('col-md-1', true);
    p1.classList.toggle('col-md-10', false);
    p1.firstChild.classList.toggle('rotate', true);
    let ul = p1.children[1];
    let p = p1.children[2]
    ul.classList.toggle('hidden', true);
    p.classList.toggle('hidden', true);
    p2.classList.toggle('col-md-4', false);
    p2.classList.toggle('col-md-1', true);
    p2.classList.toggle('col-md-10', false);
    p2.firstChild.classList.toggle('rotate', true);
    let ul_2 = p2.children[1];
    let p_2 = p2.children[2]
    ul_2.classList.toggle('hidden', true);
    p_2.classList.toggle('hidden', true);
  } else if (divID == p1) {
    p0.classList.toggle('col-md-4', false);
    p0.classList.toggle('col-md-1', true);
    p0.classList.toggle('col-md-10', false);
    p0.firstChild.classList.toggle('rotate', true);
    let ul = p0.children[1];
    let p = p0.children[2]
    ul.classList.toggle('hidden', true);
    p.classList.toggle('hidden', true);
    p2.classList.toggle('col-md-4', false);
    p2.classList.toggle('col-md-1', true);
    p2.classList.toggle('col-md-10', false);
    p2.firstChild.classList.toggle('rotate', true);
    let ul_2 = p2.children[1];
    let p_2 = p2.children[2]
    ul_2.classList.toggle('hidden', true);
    p_2.classList.toggle('hidden', true);
  } else if (divID == p2) {
    p0.classList.toggle('col-md-4', false);
    p0.classList.toggle('col-md-1', true);
    p0.classList.toggle('col-md-10', false);
    p0.firstChild.classList.toggle('rotate', true);
    let ul = p0.children[1];
    let p = p0.children[2]
    ul.classList.toggle('hidden', true);
    p.classList.toggle('hidden', true);
    p1.classList.toggle('col-md-4', false);
    p1.classList.toggle('col-md-1', true);
    p1.classList.toggle('col-md-10', false);
    p1.firstChild.classList.toggle('rotate', true);
    let ul_2 = p1.children[1];
    let p_2 = p1.children[2]
    ul_2.classList.toggle('hidden', true);
    p_2.classList.toggle('hidden', true);
  }
}
