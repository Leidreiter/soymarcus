document.addEventListener('DOMContentLoaded', function () {
  animarCirculos();
  animarNumeros();
  // crearGaleria();
  type();
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
const texts = [
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

function type() {
  const element = document.getElementById("typewriter");

  if (i < texts.length) {
    if (!isDeleting && j <= texts[i].length) {
      currentText = texts[i].substring(0, j++);
      element.textContent = currentText;
      setTimeout(type, speed);
    } else if (isDeleting && j >= 0) {
      currentText = texts[i].substring(0, j--);
      element.textContent = currentText;
      setTimeout(type, eraseSpeed);
    } else if (!isDeleting && j > texts[i].length) {
      isDeleting = true;
      setTimeout(type, delay);
    } else if (isDeleting && j < 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
      setTimeout(type, speed);
    }
  }
}

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
  const circulos = document.querySelectorAll(".circulo_idioma");

  circulos.forEach((el, idx) => {
    const progress = el.querySelector(".progress");
    const percentageText = el.querySelector(".percentage");

    const target = +percentageText.textContent.replace("%", "");
    let count = 0;
    const delay = 15; // ms entre pasos
    const increment = 1; // aumento por paso

    setTimeout(() => {
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }

        percentageText.textContent = `${count}%`;
        progress.setAttribute("stroke-dasharray", `${count}, 100`);
      }, delay);
    }, idx * 300); // retraso escalonado
  });
}

/* Carrusel testimoniales */
const track = document.querySelector('.testimonial-track');
const testimonials = Array.from(document.querySelectorAll('.testimonial'));
const dotsContainer = document.querySelector('.dots');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

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

function moverCarrusel() {
  const ancho = testimonials[0].clientWidth;
  track.style.transform = `translateX(-${index * ancho}px)`;
  actualizarDots();
}

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

window.addEventListener('resize', () => {
  crearDots();
  moverCarrusel();
});

crearDots();