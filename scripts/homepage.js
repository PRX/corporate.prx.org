function homepageUpdateDots() {
  const dots = document.querySelectorAll('#prx-homepage-features-dots li');

  if (dots.length === 1) {
    // Never show only one dot
    dots[0].classList.add('hidden');
  } else {
    // Makre sure the correct dot is active
    const currentDot = document.querySelector('#prx-homepage-features-dots li.active');
    if (currentDot) {
      currentDot.classList.remove('active');
    }

    const currentSlide = document.getElementById('prx-homepage-features').getAttribute('data-slide');

    dots[+currentSlide - 1].classList.add('active');
  }
}

function homepageRotate(step) {
  const container = document.getElementById('prx-homepage-features');
  const currentSlide = container.getAttribute('data-slide');

  const features = document.querySelectorAll('#prx-homepage-features .prx-homepage-feature');

  if (+currentSlide + step > +features.length) {
    console.log('reset')
    container.setAttribute('data-slide', '1');
  } else if (+currentSlide + step < 1) {
    console.log('end')
    container.setAttribute('data-slide', features.length);
  } else {
    console.log('normal')
    container.setAttribute('data-slide', +currentSlide + step);
  }

  homepageUpdateDots()
}

function homepageRotateLeft() { homepageRotate(-1); }
function homepageRotateRight() { homepageRotate(1); }

function initHomepageFeatures() {
  const features = document.querySelectorAll('#prx-homepage-features .prx-homepage-feature');

  const left = document.getElementById('prx-homepage-features-rotate-left');
  const right = document.getElementById('prx-homepage-features-rotate-right');

  left.addEventListener('click', homepageRotateLeft);
  right.addEventListener('click', homepageRotateRight);

  homepageUpdateDots();
}

document.addEventListener('DOMContentLoaded', initHomepageFeatures, false);
