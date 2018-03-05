// Load all images via Squarespace's Responsive ImageLoader
function loadAllImages() {
  var images = document.querySelectorAll('img[data-src]' );
  for (var i = 0; i < images.length; i++) {
    ImageLoader.load(images[i], { load: true });
  }
}

function affixCompanyNav(e) {
  var companyAboutNav = document.getElementsByClassName('fixed-nav-container')[0];

  if (companyAboutNav) {
    var scrollY = window.scrollY;
    if (scrollY > 140) {
      companyAboutNav.className = 'fixed-nav-container no-scroll';
    } else {
      companyAboutNav.className = 'fixed-nav-container';
    }
  }
}

function activateCompanyLinkInNav(e) {
  var onCompanyPages = !!window.location.href.match(/company/);
  if (onCompanyPages) {
    var companyLinkInNav = document.getElementsByClassName('ext-link')[0];
    companyLinkInNav.className = 'ext-link active'
  }
}

// The event subscription that loads images when the page is ready
document.addEventListener('DOMContentLoaded', loadAllImages);

// The event subscription that reloads images on resize
window.addEventListener('resize', loadAllImages);

// On vertical scrolling, we want to fix the About-Company side navigation in place
window.addEventListener('scroll', affixCompanyNav)

// Rather hacky way to apply active link styling to Company link in main nav
window.addEventListener('DOMContentLoaded', activateCompanyLinkInNav)
