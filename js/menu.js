/**
 * La Frescurita Café & Tostaduría
 * Menu & Specialties Interactions (menu-y-especialidades.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMenuPage();
});

function initMenuPage() {
  initMenuCategoryFilter();
  initGrindSelector();
  initWeightPriceCalculator();
  initAddToCartToast();
}

/**
 * Filter sections by category (Café, Panadería, Bebidas frescas, Algo dulce, etc.)
 */
function initMenuCategoryFilter() {
  const categoryButtons = document.querySelectorAll('.cat-pill');
  const allSections = document.querySelectorAll('.menu-section');

  categoryButtons.forEach(btn => {
    btn.onclick = () => {
      // Update button active states
      categoryButtons.forEach(b => {
        b.classList.remove('bg-primary-container', 'bg-primary', 'text-on-primary');
        b.classList.add('text-on-surface-variant');
      });
      btn.classList.add('bg-primary-container', 'text-on-primary');
      btn.classList.remove('text-on-surface-variant');

      const cat = btn.getAttribute('data-category');

      if (!cat || cat === 'all') {
        allSections.forEach(sec => sec.classList.remove('hidden'));
      } else {
        allSections.forEach(sec => {
          const targetId = `section-${cat}`;
          if (sec.id === targetId || sec.getAttribute('data-category') === cat) {
            sec.classList.remove('hidden');
            sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            sec.classList.add('hidden');
          }
        });
      }
    };
  });
}

/**
 * Grind toggle buttons in the coffee bag customizer
 */
function initGrindSelector() {
  const grindBtns = document.querySelectorAll('.grind-btn');
  grindBtns.forEach(b => {
    b.onclick = () => {
      grindBtns.forEach(other => {
        other.classList.remove('bg-primary-container', 'bg-primary', 'text-on-primary', 'active');
        other.classList.add('bg-surface-container-low', 'text-on-surface');
      });
      b.classList.remove('bg-surface-container-low', 'text-on-surface');
      b.classList.add('bg-primary-container', 'text-on-primary', 'active');
    };
  });
}

/**
 * Coffee bag weight to price calculation
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
 * Cart Toast Notification when adding packaged coffee
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

// Global exports for SPA navigation
window.initMenuPage = initMenuPage;
window.initMenuCategoryFilter = initMenuCategoryFilter;
window.initGrindSelector = initGrindSelector;
window.initWeightPriceCalculator = initWeightPriceCalculator;
window.initAddToCartToast = initAddToCartToast;
