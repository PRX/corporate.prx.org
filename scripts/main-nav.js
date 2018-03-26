function activateCompanyItem() {
  if (window.location.href.includes('company/')) {
    const nav = document.getElementById('prx-main-nav');
    const links = nav.getElementsByTagName('a');

    Array.from(links).forEach(el => {
      if (el.href.includes('company/')) {
        el.parentElement.classList.add('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', activateCompanyItem);

// https://stackoverflow.com/questions/8578617/inject-a-script-tag-with-remote-src-and-wait-for-it-to-execute
function injectScript(src, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = false;
  script.onload = function() {
    script.onload = null;
    callback();
  }
  script.src = src;

  (document.getElementsByTagName( "head" )[ 0 ]).appendChild( script );
}

function addSignInLinkToNav() {
  let idHost = 'https://id.prx.org';
  injectScript(idHost + '/widget.js', function() {
    let mainNavEl = document.getElementById('prx-main-nav');
    let navList = mainNavEl.getElementsByTagName('UL')[0];
    let widget = new PRXSignIn(idHost);
    widget.signedIn(function(prx) {
      let signInLI = document.createElement('template');
      if (prx.userinfo) {
        let userMenu = '<li class="ext-link prx-userinfo">';
        userMenu += '<button>' + prx.userinfo.email + '</button>';
        userMenu += '<div id="prx-apps"></div>';
        userMenu += '</li>';
        signInLI.innerHTML = userMenu;
      }
      else {
        let signInUrl = idHost + '/session?return_to=' + encodeURIComponent(window.location);
        let signInLink = '<li class="ext-link"><a href="'+signInUrl+'">Sign In</a></li>';
        signInLI.innerHTML = signInLink;
      }
      let docFrag = document.createDocumentFragment();
      let newNodes = signInLI.content.childNodes;
      for (let i = 0; i < newNodes.length; i++) {
        docFrag.appendChild(newNodes[i]);
      }
      navList.appendChild(docFrag);
      // must wait for DOM insertion to populate apps list
      if (prx.userinfo) {
        widget.listApps('prx-apps');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', addSignInLinkToNav);
