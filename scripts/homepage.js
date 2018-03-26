function homepageRotate(step) {
  const carousel = document.getElementById('prx-homepage-features-wrapper');
  const currentSlide = +carousel.getAttribute('data-slide');
  const count = document.querySelectorAll('#prx-homepage-features .prx-homepage-feature').length;

  if (currentSlide + step > count) {
    // Go back to the beginning
    carousel.setAttribute('data-slide', '1');
  } else if (currentSlide + step < 1) {
    // Wrap around to the end
    carousel.setAttribute('data-slide', count);
  } else {
    // One step left or right
    carousel.setAttribute('data-slide', currentSlide + step);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const featuresCount = document.querySelectorAll('#prx-homepage-features .prx-homepage-feature').length;

  if (featuresCount > 1) {
    document
      .getElementById('prx-homepage-features-rotate-left')
      .addEventListener('click', function () { homepageRotate(-1); });

    document
      .getElementById('prx-homepage-features-rotate-right')
      .addEventListener('click', function () { homepageRotate(1); });
  } else {
    document.getElementById('prx-homepage-features-dots').classList.add('hidden');
    document.getElementById('prx-homepage-features-rotate-left').classList.add('hidden');
    document.getElementById('prx-homepage-features-rotate-right').classList.add('hidden');
  }
});
