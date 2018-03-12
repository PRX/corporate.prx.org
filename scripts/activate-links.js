// event listeners for the Company pages and Company - About page, to apply "active" classes
// to nav links and to affix the About page side nav in place on scroll

function activateCompanyLinkInMainNav(e) {
  var onCompanyPages = !!window.location.href.match(/company/);
  if (onCompanyPages) {
    var companyLinkInNav = document.getElementsByClassName('ext-link')[0];
    companyLinkInNav.className = 'ext-link active';
    styleCompanyAboutNav();
  }
}

function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function affixNavPosition(sideNav) {
  var mainNav = document.getElementById('prx-main-nav');
  var companyNav = document.getElementById('prx-company-nav');
  var maxAllowedScroll = mainNav.offsetHeight + companyNav.offsetHeight;

  if (window.scrollY > maxAllowedScroll) {
    sideNav.className = 'fixed-nav-container no-scroll';
  } else {
    sideNav.className = 'fixed-nav-container';
  }
}

function removeActiveClassFromAll(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].className = elements[i].className.replace(/active/, '');
  }
}

function styleCompanyAboutNav(e) {
  var onCompanyAbout = !!window.location.href.match(/company\/about/);
  if (onCompanyAbout) {
    var companyAboutNav = document.getElementsByClassName('fixed-nav-container')[0];
    affixNavPosition(companyAboutNav)

    var contentLinks = companyAboutNav.children;
    removeActiveClassFromAll(contentLinks);

    var contentSections = document.getElementsByClassName('prx-about-company-content')[0].children;

    for (var i = 0; i < contentSections.length; i++) {
      if (isElementInViewport(contentSections[i])) {
        // ordering is consistent between sections & side nav, so just use same index
        var activeLink = contentLinks[i];
        if (activeLink && !activeLink.className.match(/active/)) {
          activeLink.className = activeLink.className + ' active';
        }
        // don't add active styles to others that might be on page
        break;
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

window.addEventListener('DOMContentLoaded', activateCompanyLinkInMainNav, passiveSupported ? { passive: true } : false);
window.addEventListener('scroll', styleCompanyAboutNav, passiveSupported ? { passive: true } : false);
