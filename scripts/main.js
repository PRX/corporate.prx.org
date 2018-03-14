// Load all images via Squarespace's Responsive ImageLoader
function loadAllImages() {
  var images = document.querySelectorAll('img[data-src]' );
  for (var i = 0; i < images.length; i++) {
    ImageLoader.load(images[i], { load: true });
  }
}

function addHamburgerClickListener(e) {
  document.getElementById("prx-main-nav-menu-button").addEventListener("click", function(){
    showCompanyNav();
  });
}

function showCompanyNav() {
  var currentlyCheckingShowMenu = document.getElementById("prx-show-menu").checked === false;
  var companyNavParentEl = document.getElementById("prx-company-nav").parentElement;
  if (currentlyCheckingShowMenu) {
    companyNavParentEl.className = companyNavParentEl.className + " revealed";
  } else {
    companyNavParentEl.className = companyNavParentEl.className.replace(/revealed/, '');
  }
}

// The event subscription that loads images when the page is ready
document.addEventListener('DOMContentLoaded', loadAllImages);

// The event subscription that reloads images on resize
window.addEventListener('resize', loadAllImages);

// add click listener for hamburger menu button
document.addEventListener('DOMContentLoaded', addHamburgerClickListener);
