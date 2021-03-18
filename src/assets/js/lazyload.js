function lazyload() {
  const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        if(lazyImage.hasAttribute("data-src")) {
          lazyImage.src = lazyImage.dataset.src;    
        } else {
          lazyImage.srcset = lazyImage.dataset.srcset;
        }
        lazyImage.classList.remove("lazy");
        imgObserver.unobserve(lazyImage);
      }
    });
  });

  const images = document.querySelectorAll(".lazy");
  images.forEach((image) => {
    imageObserver.observe(image);
  });
}

window.onload = lazyload;
