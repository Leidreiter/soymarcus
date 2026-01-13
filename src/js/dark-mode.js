document.addEventListener('DOMContentLoaded', initDarkMode);

/* dark-mode.js
 * Responsabilidad única: gestión del tema (dark / light)
 * Reglas:
 * 1. Preferencia manual del usuario (localStorage)
 * 2. Preferencia del sistema operativo
 * 3. Horario local (20:00 a 06:59)
 */

document.addEventListener('DOMContentLoaded', initDarkMode);

function initDarkMode() {
  const checkbox = document.getElementById('checkbox');
  const body = document.body;

  // Si no existe el toggle, no inicializar
  if (!checkbox) return;

  const savedTheme = localStorage.getItem('theme');

  // Horario local
  const hour = new Date().getHours();
  const isNight = hour >= 20 || hour < 7;

  // Preferencia del sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  /**
   * Prioridad:
   * 1. Elección manual del usuario
   * 2. Preferencia del sistema
   * 3. Horario
   */
  let isDark;

  if (savedTheme) {
    isDark = savedTheme === 'dark';
  } else if (prefersDark) {
    isDark = true;
  } else {
    isDark = isNight;
  }

  applyTheme(isDark);

  // Toggle manual
  checkbox.addEventListener('change', () => {
    const darkEnabled = checkbox.checked;
    applyTheme(darkEnabled);
    localStorage.setItem('theme', darkEnabled ? 'dark' : 'light');
  });

  function applyTheme(dark) {
    if (dark) {
      body.classList.remove('light-mode');
      checkbox.checked = true;
    } else {
      body.classList.add('light-mode');
      checkbox.checked = false;
    }
  }
}