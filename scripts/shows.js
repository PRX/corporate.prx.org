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


function featuredContentScroll(ev) {
  const min = 0;
  const max = 100;
  const ratio = (ev.target.value / (max - min));

  const cont = document.getElementById('prx-homepage-content-shows');
  const list = document.querySelector('#prx-homepage-content-shows ul');
  const width = list.offsetWidth;

  cont.scrollLeft = ((width - document.documentElement.clientWidth) * ratio);
}

function initFeaturedContentScroll() {
  document.querySelector('#prx-homepage-content-shows-scroll-control').addEventListener('input', featuredContentScroll);
}

document.addEventListener('DOMContentLoaded', initFeaturedContentScroll, false);


// $('input[type=range]').on('change input', function() {
//   var max = 100;
//   var value = $(this).val();
//   var percent = value / max;
//   var parent_height = $('.tooltip').parent().height();
//   var height = $('.tooltip').height();
//   //console.log("p:" + parent_height + " s:" + height + " %:" + percent);
//   var top = (parent_height - height) * percent;
//   //console.log("t", top, "h", parent_height - height);
//   if(percent <= 1)
//     $('.tooltip').css('top', top + "px");
// })
