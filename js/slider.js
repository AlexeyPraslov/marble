document.addEventListener('DOMContentLoaded', function() {
  const stack = document.getElementById('stack');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dots__dot'));

  let current = 0;
  let isAnimating = false;

  function goTo(index) {
    if (isAnimating || index === current || index < 0 || index >= slides.length) return;

    isAnimating = true;

    const currentSlide = slides[current];
    const nextSlide = slides[index];

    nextSlide.classList.add('slide--active', 'slide--under');
    
    dots.forEach(dot => dot.classList.remove('dots__dot--active'));
    dots[index].classList.add('dots__dot--active');

    requestAnimationFrame(() => {
      currentSlide.classList.add('slide--exiting');
    });

    setTimeout(() => {
      currentSlide.classList.remove('slide--active', 'slide--exiting');
      nextSlide.classList.remove('slide--under');
      current = index;
      isAnimating = false;
    }, 800);
  }

  let startX = 0;
  let isSwiping = false;

  stack.addEventListener('touchstart', function (e) {
    if (isAnimating || e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    isSwiping = true;
    stack.style.touchAction = 'none';
  }, { passive: false });

  stack.addEventListener('touchend', function (e) {
    if (!isSwiping) return;

    try {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const threshold = 100;

      if (Math.abs(diff) > threshold) {
        if (diff > 0 && current < slides.length - 1) {
          goTo(current + 1);
        } else if (diff < 0 && current > 0) {
          goTo(current - 1);
        }
      }
    } finally {
      isSwiping = false;
      stack.style.touchAction = '';
    }
  });

  stack.addEventListener('touchcancel', function () {
    isSwiping = false;
    stack.style.touchAction = '';
  });

  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const target = parseInt(this.dataset.target, 10);
      goTo(target);
    });
  });
});
