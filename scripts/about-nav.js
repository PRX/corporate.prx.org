function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function keepInWindow(sideNav) {
  var navGroup = document.getElementById('prx-nav-group');
  var maxAllowedScroll = navGroup.offsetHeight + 100; // 30px of padding-top on page

  if (window.scrollY > maxAllowedScroll) {
    sideNav.classList.add('fixed');
  } else {
    sideNav.classList.remove('fixed');
  }
}

var companyAboutNav;
var contentSections;
var navLinks;

function styleCompanyAboutNav(e) {
  if (!companyAboutNav) {
    companyAboutNav = document.getElementById('prx-about-nav');
    contentSections = document.querySelectorAll('#prx-index-list-about .prx-index-list-section');
    navLinks = document.querySelectorAll('#prx-about-nav a');
  }

  keepInWindow(companyAboutNav)

  // Clear previously active link
  Array.from(navLinks).forEach(function (el) { el.classList.remove('active'); });

  for (let i = 0; i < contentSections.length; i++) {
    if (isElementInViewport(contentSections[i])) {
      navLinks[i].classList.add('active')
      break;
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
let passiveSupported = false;

try {
  const options = Object.defineProperty({}, 'passive', {
    get: function() {
      passiveSupported = true;
    }
  });

  window.addEventListener('prx-test', options, options);
  window.removeEventListener('prx-test', options, options);
} catch (err) {
  passiveSupported = false;
}

if (window.location.href.includes('company/about')) {
  window.addEventListener('DOMContentLoaded', styleCompanyAboutNav);
  window.addEventListener('scroll', styleCompanyAboutNav, passiveSupported ? { passive: true } : false);
}

