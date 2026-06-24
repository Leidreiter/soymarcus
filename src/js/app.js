document.addEventListener('DOMContentLoaded', function () {
  animarCirculos();
  animarNumeros();
  // crearGaleria();
  type();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* Menu hamburguesa (optimizado solo para escritorio) */
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main-content');
  const hamburger = document.querySelector('.hamburger-menu');

  if (!main || !hamburger) return;

  function toggleMain() {
    main.classList.toggle('open');
  }

  function setupMenuBehavior(e) {
    if (e.matches) {
      // Escritorio (mayor a 1024px)
      hamburger.addEventListener('click', toggleMain);
    } else {
      // Móvil: remueve clase y listener
      hamburger.removeEventListener('click', toggleMain);
      main.classList.remove('open');
    }
  }

  const mediaQuery = window.matchMedia('(min-width: 1024px)');
  setupMenuBehavior(mediaQuery);
  mediaQuery.addEventListener('change', setupMenuBehavior);
});

/* Texto type hero */
let texts = [
  "creo marcas memorables.",
  "diseño interfaces únicas.",
  "programo código limpio.",
];

let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;
const speed = 100;   // velocidad de tipeo
const eraseSpeed = 50; // velocidad de borrado
const delay = 1500;  // pausa antes de borrar
let typeTimeout = null; // Variable para almacenar el timeout actual

function type() {
  const element = document.getElementById("typewriter");
  if (!element) return;

  // Limpiar timeout anterior si existe
  if (typeTimeout) {
    clearTimeout(typeTimeout);
    typeTimeout = null;
  }

  if (i < texts.length) {
    if (!isDeleting && j <= texts[i].length) {
      currentText = texts[i].substring(0, j++);
      element.textContent = currentText;
      typeTimeout = setTimeout(type, speed);
    } else if (isDeleting && j >= 0) {
      currentText = texts[i].substring(0, j--);
      element.textContent = currentText;
      typeTimeout = setTimeout(type, eraseSpeed);
    } else if (!isDeleting && j > texts[i].length) {
      isDeleting = true;
      typeTimeout = setTimeout(type, delay);
    } else if (isDeleting && j < 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
      typeTimeout = setTimeout(type, speed);
    }
  }
}

// Función para actualizar los textos del typewriter (usada por idiomas.js)
window.updateTypewriterTexts = function(newTexts) {
  // Cancelar cualquier timeout activo
  if (typeTimeout) {
    clearTimeout(typeTimeout);
    typeTimeout = null;
  }
  
  texts = newTexts;
  // Reiniciar el typewriter con los nuevos textos
  i = 0;
  j = 0;
  currentText = "";
  isDeleting = false;
  const element = document.getElementById("typewriter");
  if (element) {
    element.textContent = "";
    // Iniciar el typewriter de nuevo
    type();
  }
};

/* Números */
function animarNumeros() {
  const numeros = document.querySelectorAll(".numero span");

  numeros.forEach((el, idx) => {
    const target = +el.getAttribute("data-numero"); // tomamos el número final
    let count = 0;
    const increment = Math.ceil(target / 100); // pasos del conteo
    const delay = 20; // ms entre pasos

    setTimeout(() => {
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        el.textContent = `+${count}`;
      }, delay);
    }, idx * 300); // retraso escalonado por cada número
  });
}

function animarCirculos() {
  const items = document.querySelectorAll(".idioma");

  items.forEach((el, idx) => {
    const percentageText = el.querySelector(".percentage");
    const target = +el.dataset.percentage;
    let count = 0;
    const delay = 15;
    const increment = 1;

    setTimeout(() => {
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        percentageText.textContent = `${count}%`;
        const ringSize = (count / target) * 4;
        el.style.boxShadow = `0 0 0 ${ringSize}px #F24E1E`;
      }, delay);
    }, idx * 300);
  });
}

/* Carrusel testimoniales con swipe */
const track = document.querySelector('.testimonial-track');
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

// Variables para swipe
let startX = 0;
let currentX = 0;
let isDragging = false;
let startTransform = 0;

function testimoniosPorVista() {
  return window.innerWidth <= 768 ? 1 : 2;
}

function crearDots() {
  dotsContainer.innerHTML = '';
  const cantidad = Math.ceil(testimonials.length / testimoniosPorVista());
  for (let i = 0; i < cantidad; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => moverA(i));
    dotsContainer.appendChild(dot);
  }
}

function actualizarDots() {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === Math.floor(index / testimoniosPorVista()));
  });
}

function moverA(pos) {
  index = pos * testimoniosPorVista();
  moverCarrusel();
}

function moverCarrusel(suave = true) {
  const ancho = testimonials[0].clientWidth;
  if (suave) {
    track.style.transition = 'transform 0.3s ease-out';
  }
  track.style.transform = `translateX(-${index * ancho}px)`;
  actualizarDots();
}

// Event listeners para swipe en móvil
track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  const ancho = testimonials[0].clientWidth;
  startTransform = index * ancho;
  track.style.transition = 'none';
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const diff = startX - currentX;
  track.style.transform = `translateX(-${startTransform + diff}px)`;
});

track.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  isDragging = false;
  
  const diff = startX - currentX;
  const threshold = 50; // píxeles mínimos para considerar un swipe
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // Swipe izquierda - siguiente
      if (index < testimonials.length - 1) index++;
      else index = 0;
    } else {
      // Swipe derecha - anterior
      if (index > 0) index--;
      else index = testimonials.length - 1;
    }
  }
  
  moverCarrusel();
});

// Soporte para mouse (opcional, útil para testing en escritorio)
track.addEventListener('mousedown', (e) => {
  startX = e.clientX;
  isDragging = true;
  const ancho = testimonials[0].clientWidth;
  startTransform = index * ancho;
  track.style.transition = 'none';
  track.style.cursor = 'grabbing';
});

track.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  currentX = e.clientX;
  const diff = startX - currentX;
  track.style.transform = `translateX(-${startTransform + diff}px)`;
});

track.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  track.style.cursor = 'grab';
  
  const diff = startX - currentX;
  const threshold = 50;
  
  if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      if (index < testimonials.length - 1) index++;
      else index = 0;
    } else {
      if (index > 0) index--;
      else index = testimonials.length - 1;
    }
  }
  
  moverCarrusel();
});

track.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    track.style.cursor = 'grab';
    moverCarrusel();
  }
});

// Botones originales
nextBtn.addEventListener('click', () => {
  if (index < testimonials.length - 1) index++;
  else index = 0;
  moverCarrusel();
});

prevBtn.addEventListener('click', () => {
  if (index > 0) index--;
  else index = testimonials.length - 1;
  moverCarrusel();
});

let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  // Solo actuamos si el ancho cambió (ignora cambios de altura por barras de navegación en móvil)
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    crearDots();
    moverCarrusel(false);
  }
});

// Agregar cursor visual
track.style.cursor = 'grab';

crearDots();