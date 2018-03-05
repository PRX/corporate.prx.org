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

function activateCompanyLinkInMainNav(e) {
  var onCompanyPages = !!window.location.href.match(/company/);
  if (onCompanyPages) {
    var companyLinkInNav = document.getElementsByClassName('ext-link')[0];
    companyLinkInNav.className = 'ext-link active'
  }
}

function activateAboutCompanyLink(e) {
  var onCompanyAbout = !!window.location.href.match(/company\/about/);

  if (onCompanyAbout && window.location.hash) {
    var hashLocation = window.location.hash.slice(1);
    var companyAboutNav = document.getElementsByClassName('fixed-nav-container')[0];
    for (var i = 0; i < companyAboutNav.children.length; i++) {
      if (companyAboutNav.children[i].className.match(hashLocation)) {
        companyAboutNav.children[i].className = hashLocation + ' active';
      } else {
        companyAboutNav.children[i].className = companyAboutNav.children[i].className.replace(/active/, '')
      }
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
var passiveSupported = false;

try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;
    }
  });

  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch(err) {
  passiveSupported = false;
}


// The event subscription that loads images when the page is ready
document.addEventListener('DOMContentLoaded', loadAllImages);

// The event subscription that reloads images on resize
window.addEventListener('resize', loadAllImages);

// On vertical scrolling, we want to fix the About-Company side navigation in place
window.addEventListener('scroll', affixCompanyNav, passiveSupported ? { passive: true } : false);

// Rather hacky way to apply active link styling to Company link in main nav
window.addEventListener('DOMContentLoaded', activateCompanyLinkInMainNav, passiveSupported ? { passive: true } : false);
// Ditto for current link in About Company side nav
window.addEventListener('hashchange', activateAboutCompanyLink, passiveSupported ? { passive: true } : false);
