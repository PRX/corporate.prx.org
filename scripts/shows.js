function justifyShowGrid() {
  if (document.getElementById('prx-show-grid')) {
    const grid = document.getElementById('prx-show-grid');
    const tiles = grid.getElementsByTagName('li');

    const fillerCount = (3 - (tiles.length % 3));

    for (let index = 0; index < fillerCount; index++) {
      const li = document.createElement('li');
      li.classList.add('filler');

      grid.appendChild(li);
    }
  }
}

window.addEventListener('DOMContentLoaded', justifyShowGrid);
