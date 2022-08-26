// Some containers of Squarespace CMS content are considered to have
// "backdrops", which are the banner/thumbnail image associated with that
// content in the CMS. These could be pages or posts.
//
// In order for the image to correctly cover the container, but still take
// advantage of the Squarespace ImageLoader, the images are rendered in <img>
// tags within the containers, and then transposed to be the background-image
// of the container through CSS.

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img.prx-backdrop').forEach(function (el) {
    const url = el.getAttribute('src') || el.getAttribute('data-src');

    el.style.display = 'none';
    el.parentNode.style.backgroundImage = 'url(' + url + ')';
  });

  document.querySelectorAll('iframe.prx-backdrop').forEach(function (el) {
    const inputUrl = new URL(el.getAttribute('data-src'));
    const outputUrl = new URL('https://youtube.com/');

    // Add video ID to the output URL
    if (inputUrl.hostname === 'youtu.be') {
      const videoId = inputUrl.pathname.match(/\/([A-Za-z0-9_-]+)/)[1];
      console.log(videoId);
      outputUrl.pathname = `/embed/${videoId}`;
    }

    // Copy any query params from the input URL to the output URL
    for (const key of inputUrl.searchParams.keys()) {
      outputUrl.searchParams.set(key, inputUrl.searchParams.get(key));

      if (key === 't') {
        outputUrl.searchParams.set('start', inputUrl.searchParams.get(key));
      }
    }

    // Set required query params on output URL
    outputUrl.searchParams.set('autoplay', '1');
    outputUrl.searchParams.set('controls', '0');
    outputUrl.searchParams.set('showinfo', '0');
    outputUrl.searchParams.set('autohide', '1');
    outputUrl.searchParams.set('mute', '1');

    console.log(outputUrl.toString());
    el.src = outputUrl.toString();
  });
});
