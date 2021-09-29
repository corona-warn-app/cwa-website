function lazyload() {
  const images = Array.prototype.slice.call(document.querySelectorAll(".lazy"));

  if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      for (let i=0; i<entries.length; i++) {
        let entry = entries[i];
//      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          if(lazyImage.hasAttribute("data-src")) {
            lazyImage.src = lazyImage.dataset.src;    
          } else {
            lazyImage.srcset = lazyImage.dataset.srcset;
          }
          lazyImage.classList.remove("lazy");
          imageObserver.unobserve(lazyImage);
        }
      }
    });

    for (let i=0; i<images.length; i++) {
      let image = images[i];
      imageObserver.observe(image);
    }
  } else {
    console.log("No IntersectionObserver - no lazy loading");
    //images.forEach((image) => {
    for (let i=0; i<images.length; i++) {
      let image = images[i];
      if(image.hasAttribute("data-src")) {
        image.src = image.dataset.src;    
      } else {
        image.srcset = image.dataset.srcset;
      }
      image.classList.remove("lazy");
    }
  }
}

window.onload = lazyload;
