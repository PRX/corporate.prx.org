// Justify shows grid
window.addEventListener('DOMContentLoaded', function () {
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
});

document.addEventListener('DOMContentLoaded', function () {
  const el = document.querySelector('#prx-homepage-content-shows-scroll-control');

  if (el) {
    el.addEventListener('input', function (ev) {
      const min = 0;
      const max = 100;
      const ratio = (ev.target.value / (max - min));

      const cont = document.getElementById('prx-homepage-content-shows');
      const list = document.querySelector('#prx-homepage-content-shows ul');
      const width = list.offsetWidth;

      cont.scrollLeft = ((width - document.documentElement.clientWidth) * ratio);
    });
  }
});
