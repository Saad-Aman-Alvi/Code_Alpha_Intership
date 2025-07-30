   const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentIndex = 0;

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentIndex = index;
        openLightbox(item.querySelector('img').src);
      });
    });

    function openLightbox(src) {
      lightbox.style.display = 'flex';
      lightboxImg.src = src;
    }

    function closeLightbox() {
      lightbox.style.display = 'none';
    }

    function navigateLightbox(direction) {
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = galleryItems.length - 1;
      if (currentIndex >= galleryItems.length) currentIndex = 0;
      const img = galleryItems[currentIndex].querySelector('img');
      lightboxImg.src = img.src;
    }

    function filterGallery(category) {
      galleryItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }