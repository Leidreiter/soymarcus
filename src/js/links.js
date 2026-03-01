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
        background: rgba(2, 195, 154, 0.25);
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
})();
