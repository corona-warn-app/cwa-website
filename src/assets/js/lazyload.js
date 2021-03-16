function lazyload() {
  const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
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
