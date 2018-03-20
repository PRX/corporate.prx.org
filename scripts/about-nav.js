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
    sideNav.className = 'fixed-nav-container no-scroll';
  } else {
    sideNav.className = 'fixed-nav-container';
  }
}

var companyAboutNav = document.getElementsByClassName('fixed-nav-container')[0];
var contentSections = document.querySelectorAll('.prx-about-content section');
var navLinks = document.querySelectorAll('.fixed-nav-container a');

function styleCompanyAboutNav(e) {
  if (!companyAboutNav) {
    companyAboutNav = document.getElementsByClassName('fixed-nav-container')[0];
    contentSections = document.querySelectorAll('.prx-about-content section');
    navLinks = document.querySelectorAll('.fixed-nav-container a');
  }

  keepInWindow(companyAboutNav)

  // Clear previously active link
  Array.from(navLinks).forEach(el => { el.classList.remove('active'); });

  for (let i = 0; i < contentSections.length; i++) {
    if (isElementInViewport(contentSections[i])) {
      // ordering is consistent between sections & side nav, so just use same index
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

