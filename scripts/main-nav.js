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
function injectScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.addEventListener('load', resolve);
        script.addEventListener('error', () => reject('Error loading script.'));
        script.addEventListener('abort', () => reject('Script loading aborted.'));
        document.head.appendChild(script);
    });
}

function addSignInLinkToNav() {
  let idHost = 'https://id.prx.org';
  injectScript(idHost + '/widget.js')
    .then(() => {
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
    }).catch(error => {
      console.log("ERROR:", error);
    });
}

document.addEventListener('DOMContentLoaded', addSignInLinkToNav);
