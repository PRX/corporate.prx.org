window.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('prx-station-program-grid')) {
    // Justify programs grid
    const grid = document.getElementById('prx-station-program-grid');
    const tiles = grid.getElementsByTagName('li');

    const fillerCount = (6 - (tiles.length % 6));

    for (let index = 0; index < fillerCount; index++) {
      const li = document.createElement('li');
      li.classList.add('filler');

      grid.appendChild(li);
    }

    // Audio players
    document.querySelectorAll('.program-audio-preview-control').forEach(el => {
      el.addEventListener('click', event => {
        event.preventDefault();

        document.querySelectorAll('.program-audio-preview-control.playing').forEach(otherEl => {
          if (otherEl !== el) {
            otherEl.classList.remove('playing');
            otherEl.parentElement.querySelector('audio').pause();
            otherEl.setAttribute('src', '/assets/volume.svg');
          }
        });

        let audioEl;
        if (el.parentElement.querySelector('audio')) {
          audioEl = el.parentElement.querySelector('audio');
        } else {
          audioEl = document.createElement('audio');
          audioEl.setAttribute('src', el.getAttribute('data-audio-url'));
          el.parentElement.appendChild(audioEl);
        }

        if (audioEl.paused) {
          audioEl.play();
          el.setAttribute('src', '/assets/pause.svg');
          el.classList.add('playing');
        } else {
          audioEl.pause();
          el.setAttribute('src', '/assets/volume.svg');
          el.classList.remove('playing');
        }
      });
    });
  }
});
