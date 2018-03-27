document.addEventListener('DOMContentLoaded', function () {
  const modals = document.querySelectorAll('.prx-modal-wrapper');

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
});
