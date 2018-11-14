function selectPokemon(divID) {
  divID.classList.toggle('col-md-4', false);
  divID.classList.toggle('col-md-10', true);
  divID.firstChild.classList.toggle('rotate', false);
  divID.lastChild.classList.toggle('hidden', false);

  switch (divID) {
    case p0:
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

    case p1:
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

    case p2:
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
}
