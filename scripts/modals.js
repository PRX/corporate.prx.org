document.addEventListener('DOMContentLoaded', function () {
  const modals = document.querySelectorAll('.prx-modal-wrapper');

  // Add some behavior to the modals themselves
  modals.forEach(function (modal) {
    const buttons = modal.querySelectorAll('.prx-modal-dismiss-button')

    buttons.forEach(function (button) {
      button.addEventListener('click', function (ev) {
        modal.classList.remove('active');

        switch (modal.getAttribute('data-persistence')) {
        case 'once':
          document.cookie = modal.id + '=1';
          break;
        default:
          break;
        }
      });
    });
  });

  // There are often cases where a button that is managed through the CMS needs
  // to trigger a modal. Those buttons can be tough to target, since there's no
  // way to predict or define the ID/class/etc. Instead we use the href, and
  // build specially-constructed anchors, that can trigger modals by name.
  // eg, href="#prx-modal_prx-exchange-donate-form"
  document.querySelectorAll('a[href^="#prx-modal_"]').forEach(function (link) {
    link.addEventListener('click', function (ev) {
      ev.preventDefault();

      const modalId = link.getAttribute('href').replace('#prx-modal_', '');
      document.getElementById(modalId).classList.add('active');
    });
  });
});
