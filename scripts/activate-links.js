// event listeners for the Company pages and Company - About page, to apply "active" classes
// to nav links and to affix the About page side nav in place on scroll

function affixCompanyNav(e) {
  var companyAboutNav = document.getElementsByClassName('fixed-nav-container')[0];
  if (companyAboutNav) {
    if (window.scrollY > 140) {
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

function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function activateAboutCompanyLink(e) {

  var onCompanyAbout = !!window.location.href.match(/company\/about/);
  if (onCompanyAbout) {

    var contentSections = document.getElementsByClassName('prx-about-company-content')[0].children;
    var contentLinks = document.getElementsByClassName('fixed-nav-container')[0].children;

    // remove active styling for every link in side nav
    for (var i = 0; i < contentLinks.length; i++) {
      contentLinks[i].className = contentLinks[i].className.replace(/active/, '');
    }

    // find the first section of page that has top in focus
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

window.addEventListener('scroll', affixCompanyNav, passiveSupported ? { passive: true } : false);

window.addEventListener('DOMContentLoaded', activateCompanyLinkInMainNav, passiveSupported ? { passive: true } : false);

window.addEventListener('scroll', activateAboutCompanyLink, passiveSupported ? { passive: true } : false);
