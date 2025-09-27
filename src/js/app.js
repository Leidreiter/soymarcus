document.addEventListener('DOMContentLoaded', function () {
    
    animarCirculos()
    animarNumeros()
    crearGaleria()
    type()
    
})

/* Menu hamburguesa */

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main-content');
  const hamburger = document.querySelector('.hamburger-menu');

  hamburger.addEventListener('click', () => {
    main.classList.toggle('open');
  });
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

/* Galería trabajos */

function crearGaleria() {

    const CANTIDAD_IMG = 1
    const galeria = document.querySelector('.galeria-imagenes')

    for (let i = 1; i <= CANTIDAD_IMG; i++) {
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.png`
        imagen.alt = 'imagen galería'

        // Event Handler
        imagen.onclick = function () {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i) {

    // Mostrar imagen en modal
    const imagen = document.createElement('IMG')
    imagen.src = `src/img/gallery/full/${i}.png`
    imagen.alt = 'imagen galería'

    // Generar Modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    // Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(cerrarModalBtn)

    // Agregar al HTML
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 500);
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

    // obtener el valor final desde el stroke-dasharray o del texto
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

        // actualizar texto
        percentageText.textContent = `${count}%`;

        // actualizar stroke-dasharray
        progress.setAttribute("stroke-dasharray", `${count}, 100`);
      }, delay);
    }, idx * 300); // retraso escalonado
  });
}
