// Load all images via Squarespace's Responsive ImageLoader
function loadAllImages() {
  var images = document.querySelectorAll('img[data-src]' );
  for (var i = 0; i < images.length; i++) {
    ImageLoader.load(images[i], { load: true });
  }
  window.setTimeout(redoHomepageImages, 0);
}

function redoHomepageImages() {
  if (!document.getElementById('prx-homepage-index-list')) {
    return;
  }
  var homepageSections = document.getElementById('prx-homepage-index-list').children;
  if (homepageSections.length) {
    for (let i = 0; i < homepageSections.length; i++) {
      var section = homepageSections[i];
      var img = section.getElementsByClassName("thumb-image loaded")[0];
      if (!img) {
        return;
      }
      if (window.innerWidth < 640) { // 640 == @smallScreenWidth from style vars
        section.style.backgroundImage = `url(${img.src})`;
        img.style.display = "none"
      } else {
        section.style.backgroundImage = '';
        img.style.display = "block"
      }
    }

  }

}

// The event subscription that loads images when the page is ready
document.addEventListener('DOMContentLoaded', loadAllImages);

// The event subscription that reloads images on resize
window.addEventListener('resize', loadAllImages);
window.addEventListener('resize', redoHomepageImages);
