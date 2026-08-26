/* ===================================================
   soymarcusdev — Link in Bio
   Script: Entrance animations & micro-interactions
   =================================================== */

(function () {
  'use strict';

  // ===== ENTRANCE ANIMATIONS (Intersection Observer) =====
  const animatedElements = document.querySelectorAll('.animate-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    animatedElements.forEach((el) => el.classList.add('visible'));
  }

  // ===== RIPPLE EFFECT ON BUTTONS =====
  const interactiveElements = document.querySelectorAll('.social-icon, .resource-card');

  interactiveElements.forEach((el) => {
    el.addEventListener('click', function (e) {
      // Create ripple element
      const ripple = document.createElement('span');
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: rgba(255, 114, 98, 0.25);
        transform: scale(0);
        animation: ripple-effect 0.5s ease-out;
        pointer-events: none;
        z-index: 0;
      `;

      el.appendChild(ripple);

      // Remove ripple after animation
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });

  // Inject ripple keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-effect {
      to {
        transform: scale(2.5);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ===== FAVICON FALLBACK =====
  document.querySelectorAll('.resource-favicon').forEach(img => {
    img.addEventListener('error', function () {
      this.onerror = null;
      this.style.display = 'none';
    });
  });

  // ===== VIDEO CAROUSEL =====
  const carousel = document.querySelector('.video-carousel');
  if (carousel) {
    const track = carousel.querySelector('.video-carousel-track');
    const slides = carousel.querySelectorAll('.video-carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-btn-prev');
    const nextBtn = carousel.querySelector('.carousel-btn-next');
    let currentIndex = 0;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;

      // Pause all videos
      slides.forEach(slide => {
        const iframe = slide.querySelector('iframe');
        if (iframe) {
          const src = iframe.src;
          iframe.src = '';
          iframe.src = src;
        }
      });

      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goToSlide(i));
    });

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      isDragging = false;
    });
  }

  // ===== BACK TO TOP =====
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
