document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="https://give.prx.org/give/"]').forEach(a => {
    a.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
  });
});
