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
