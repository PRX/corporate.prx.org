// Some containers of Squarespace CMS content are considered to have
// "backdrops", which are the banner/thumbnail image associated with that
// content in the CMS. These could be pages or posts.
//
// In order for the image to correctly cover the container, but still take
// advantage of the Squarespace ImageLoader, the images are rendered in <img>
// tags within the containers, and then transposed to be the background-image
// of the container through CSS.

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img.prx-backdrop').forEach(function (el) {
    const url = el.getAttribute('src') || el.getAttribute('data-src');

    el.style.display = 'none';
    el.parentNode.style.backgroundImage = 'url(' + url + ')';
  });
});
