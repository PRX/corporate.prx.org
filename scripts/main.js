// Load all images via Squarespace's Responsive ImageLoader
function loadAllImages() {
  var images = document.querySelectorAll('img[data-src]' );
  for (var i = 0; i < images.length; i++) {
    ImageLoader.load(images[i], { load: true });
  }
}

function affixCompanyNav(e) {
  var companyAboutNav = document.getElementsByClassName('fixed-nav-container')[0];
  var scrollY = window.scrollY;

  if (companyAboutNav) {
    if (scrollY > 100) {
      // TODO this is a little jumpy
      companyAboutNav.className = 'fixed-nav-container no-scroll';
    } else {
      companyAboutNav.className = 'fixed-nav-container';
    }
  }
}

// The event subscription that loads images when the page is ready
document.addEventListener('DOMContentLoaded', loadAllImages);

// The event subscription that reloads images on resize
window.addEventListener('resize', loadAllImages);

// On vertical scrolling, we want to fix the About-Company side navigation in place
window.addEventListener('scroll', affixCompanyNav)
