// <script
//   src="https://cdnjs.cloudflare.com/ajax/libs/cookie-banner/1.2.2/cookiebanner.min.js"
//   type="text/javascript"
//   id="cookiebanner"
//   data-position="top"
//   data-moreinfo="https://www.prx.org/privacy-policy"
// ></script>
document.addEventListener('DOMContentLoaded', function () {
  const src = 'https://cdnjs.cloudflare.com/ajax/libs/cookie-banner/1.2.2/cookiebanner.min.js';

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.id = "cookiebanner";
  script.setAttribute("data-position", "top");
  script.setAttribute("data-moreinfo", "https://www.prx.org/privacy-policy");

  document.getElementsByTagName('head')[0].appendChild(script);
});
