// https://stackoverflow.com/questions/8578617/inject-a-script-tag-with-remote-src-and-wait-for-it-to-execute
function prxInjectScript(src, callback) {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.async = false;
  script.src = src;

  script.onload = function () { script.onload = null; callback(); }

  document.getElementsByTagName('head')[0].appendChild(script);
}

document.addEventListener('DOMContentLoaded', function () {
  const idHost = 'https://id.prx.org';
  const scriptUrl = idHost + '/widget.js';

  prxInjectScript(scriptUrl, function () {
    const signIn = new PRXSignIn(idHost);

    signIn.signedIn(function (prx) {
      const widget = document.getElementById('prx-user-widget');
      const account = document.getElementById('prx-user-widget-menu-account');

      if (!prx.userinfo) {
        // Not logged in
        widget.classList.add('no-user-info');

        const url = idHost + '/session?return_to=' + encodeURIComponent(window.location);

        account.innerHTML = '<a class=sign-in href="' + url + '">Sign in</a>';
      } else {
        // Logged in
        widget.classList.add('user-info');

        // const account = document.getElementById('prx-user-widget-menu-account');
        account.innerText = prx.userinfo.email;

        signIn.listApps('prx-user-widget-menu-apps');
      }
    });
  });
});
