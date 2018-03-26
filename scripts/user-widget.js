// https://stackoverflow.com/questions/8578617/inject-a-script-tag-with-remote-src-and-wait-for-it-to-execute
function prxInjectScript(src, callback) {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.async = false;
  script.src = src;

  script.onload = function () { script.onload = null; callback(); }

  document.getElementsByTagName('head')[0].appendChild(script);
}

// function addUserWidgetToNav() {

      // let signInLI = document.createElement('template');

      // if (prx.userinfo) {
      //   let userMenu = '<li class="ext-link prx-userinfo">';
      //   userMenu += '<button>' + prx.userinfo.email + '</button>';
      //   userMenu += '<div id="prx-apps"></div>';
      //   userMenu += '</li>';
      //   signInLI.innerHTML = userMenu;

      // let docFrag = document.createDocumentFragment();
      // let newNodes = signInLI.content.childNodes;

      // for (let i = 0; i < newNodes.length; i++) {
      //   docFrag.appendChild(newNodes[i]);
      // }

      // navList.appendChild(docFrag);
      // // must wait for DOM insertion to populate apps list
      // if (prx.userinfo) {
      //   signIn.listApps('prx-apps');
      // }
    // });
  // });
// }

document.addEventListener('DOMContentLoaded', function () {
  const idHost = 'https://id.prx.org';
  const scriptUrl = idHost + '/widget.js';

  prxInjectScript(scriptUrl, function () {
    const signIn = new PRXSignIn(idHost);

    signIn.signedIn(function (prx) {
      const widget = document.getElementById('prx-user-widget');

      if (!prx.userinfo) {
        // Not logged in
        widget.classList.add('no-user-info');

        const url = idHost + '/session?return_to=' + encodeURIComponent(window.location);

        widget.innerHTML = '<a class=sign-in href="' + url + '">Sign in</a>';
      } else {
        // Logged in
        widget.classList.add('user-info');

        const icon = document.createElement('img');
        icon.classList.add('user-icon');
        icon.src = '/assets/user.svg';

        widget.appendChild(icon);

        const account = document.getElementById('prx-user-widget-menu-account');
        account.innerText = prx.userinfo.email;

        signIn.listApps('prx-user-widget-menu-apps');
      }

      // Unhide the widget
      widget.classList.add('loaded');
    });
  });
});
