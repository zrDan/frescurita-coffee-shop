/**
 * La Frescurita Café & Tostaduría
 * Interacciones del Menú y Especialidades (menu-y-especialidades.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMenuPage();
});

function initMenuPage() {
  initMenuCategoryFilter();
  initMenuScrollSpy();
  initGrindSelector();
  initWeightPriceCalculator();
  initAddToCartToast();
}

/**
 * Desplaza suavemente hacia un elemento compensando la altura del encabezado con animación gradual
 */
function smoothScrollToElement(targetElement, duration = 800) {
  if (!targetElement) return;

  window._menuIsClickScrolling = true;

  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 105;
  // Compensación de la altura del encabezado + margen de holgura para no tapar los títulos
  const offset = headerHeight - 7;

  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const elementPosition = targetElement.getBoundingClientRect().top;
  const targetPosition = Math.max(0, elementPosition + startPosition - offset);
  const distance = targetPosition - startPosition;

  let startTime = null;

  // Curva de aceleración/desaceleración suave (easeInOutCubic) para un deslizamiento fluido
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animationStep(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationStep);
    } else {
      setTimeout(() => {
        window._menuIsClickScrolling = false;
      }, 150);
    }
  }

  requestAnimationFrame(animationStep);
}

/**
 * Filtra y se desplaza suavemente a las secciones del menú (Todos, Café, Panadería, Bebidas frescas, Algo dulce)
 */
function initMenuCategoryFilter() {
  const categoryButtons = document.querySelectorAll('.cat-pill');
  const allSections = document.querySelectorAll('.menu-section');

  categoryButtons.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();

      // Actualizar estado activo de los botones
      categoryButtons.forEach(b => {
        b.classList.remove('bg-primary-container', 'bg-primary', 'text-on-primary');
        b.classList.add('text-on-surface-variant');
      });
      btn.classList.add('bg-primary-container', 'text-on-primary');
      btn.classList.remove('text-on-surface-variant');

      // Asegurar que todas las secciones estén visibles para el desplazamiento suave
      allSections.forEach(sec => sec.classList.remove('hidden'));

      const cat = btn.getAttribute('data-category');

      if (!cat || cat === 'all') {
        const firstSection = document.getElementById('section-cafe') || allSections[0];
        smoothScrollToElement(firstSection, 750);
      } else {
        const targetSection = document.getElementById(`section-${cat}`);
        if (targetSection) {
          smoothScrollToElement(targetSection, 800);
        }
      }
    };
  });
}

/**
 * Sincroniza el botón de categoría activo mientras el usuario se desplaza por el menú
 */
function initMenuScrollSpy() {
  const allSections = document.querySelectorAll('.menu-section');
  const categoryButtons = document.querySelectorAll('.cat-pill');
  if (!allSections.length || !categoryButtons.length) return;

  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 105;

  window.addEventListener('scroll', () => {
    if (window._menuIsClickScrolling) return;

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const triggerOffset = headerHeight + 140;

    let currentCat = 'all';

    allSections.forEach(sec => {
      const top = sec.offsetTop - triggerOffset;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentCat = sec.id.replace('section-', '');
      }
    });

    categoryButtons.forEach(btn => {
      const btnCat = btn.getAttribute('data-category');
      if (btnCat === currentCat || (currentCat === 'all' && btnCat === 'all')) {
        btn.classList.add('bg-primary-container', 'text-on-primary');
        btn.classList.remove('text-on-surface-variant');
      } else {
        btn.classList.remove('bg-primary-container', 'bg-primary', 'text-on-primary');
        btn.classList.add('text-on-surface-variant');
      }
    });
  }, { passive: true });
}

/**
 * Selección de molienda en el personalizador de café en bolsa
 */
function initGrindSelector() {
  // Los inputs radio nativos gestionan el estado activo y el color con peer-checked sin necesidad de sobrescribir clases
}

/**
 * Cálculo del precio según el peso seleccionado para café en bolsa
 */
function initWeightPriceCalculator() {
  const weightInputs = document.querySelectorAll('input[name="weight"]');
  const priceDisplay = document.getElementById('bag-price-display');
  const priceMap = {
    '250': '$280',
    '500': '$520',
    '1000': '$950'
  };

  weightInputs.forEach(input => {
    input.onchange = (e) => {
      if (priceMap[e.target.value] && priceDisplay) {
        priceDisplay.textContent = priceMap[e.target.value];
      }
    };
  });
}

/**
 * Notificación toast al agregar café en bolsa para retiro en barra
 */
function initAddToCartToast() {
  const addBagBtn = document.getElementById('add-bag-btn');
  const toast = document.getElementById('cart-toast');

  if (addBagBtn && toast) {
    addBagBtn.onclick = (e) => {
      e.preventDefault();
      toast.classList.remove('hidden');
      toast.classList.add('toast-slide-in');

      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('toast-slide-in');
      }, 4000);
    };
  }
}

// Exportaciones globales para navegación SPA
window.initMenuPage = initMenuPage;
window.initMenuCategoryFilter = initMenuCategoryFilter;
window.initMenuScrollSpy = initMenuScrollSpy;
window.smoothScrollToElement = smoothScrollToElement;
window.initGrindSelector = initGrindSelector;
window.initWeightPriceCalculator = initWeightPriceCalculator;
window.initAddToCartToast = initAddToCartToast;
