/**
 * La Frescurita Café & Tostaduría
 * Global Scripts, Dynamic Component Loader, SPA Router & Interactions
 */

document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteComponents();
  initActiveNav();
  initHeaderScroll();
  initNewsletterForm();
  initSpaRouter();
  reinitPageScripts(window.location.pathname);
});

/**
 * Loads header and footer component files dynamically
 */
async function loadSiteComponents() {
  const headerContainer = document.getElementById('site-header') || document.querySelector('[data-component="header"]');
  const footerContainer = document.getElementById('site-footer') || document.querySelector('[data-component="footer"]');

  const promises = [];

  if (headerContainer && headerContainer.children.length === 0) {
    promises.push(
      fetch('components/header.html')
        .then(res => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return res.text();
        })
        .then(html => {
          headerContainer.innerHTML = html;
        })
        .catch(err => console.warn('Could not load components/header.html:', err))
    );
  }

  if (footerContainer && footerContainer.children.length === 0) {
    promises.push(
      fetch('components/footer.html')
        .then(res => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return res.text();
        })
        .then(html => {
          footerContainer.innerHTML = html;
        })
        .catch(err => console.warn('Could not load components/footer.html:', err))
    );
  }

  if (promises.length > 0) {
    await Promise.allSettled(promises);
  }
}

/**
 * Single Page Application (SPA) Client-Side Router
 * Intercepts internal links and swaps <main> without full-page reloads
 */
function initSpaRouter() {
  document.addEventListener('click', async (e) => {
    // Ignore clicks with modifier keys (Ctrl/Cmd for new tab, Shift, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) {
      return;
    }

    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignore anchors, external links, protocols, or javascript pseudo-protocols
    if (
      href.startsWith('#') ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('//') ||
      href.startsWith('tel:') ||
      href.startsWith('mailto:') ||
      href.startsWith('javascript:') ||
      link.getAttribute('target') === '_blank'
    ) {
      return;
    }

    // Must be an internal HTML page or root
    if (href.endsWith('.html') || href === '/' || href.includes('.html#')) {
      e.preventDefault();
      await navigateTo(href);
    }
  });

  // Handle browser back/forward history navigation
  window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'inicio.html';
    loadPageContent(currentPath, false);
  });
}

/**
 * Navigate to a specific internal URL without reloading the browser
 */
async function navigateTo(url) {
  // Push state to browser history
  if (window.location.pathname.split('/').pop() !== url) {
    window.history.pushState({}, '', url);
  }
  await loadPageContent(url, true);
}

/**
 * Fetches and replaces only the <main> content
 */
async function loadPageContent(url, scrollToTop = true) {
  try {
    const fetchUrl = url.split('#')[0] || 'inicio.html';
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const htmlText = await res.text();

    const parser = new DOMParser();
    const newDoc = parser.parseFromString(htmlText, 'text/html');

    const newMain = newDoc.querySelector('main');
    const currentMain = document.querySelector('main');

    if (newMain && currentMain) {
      // Smooth fade out/in effect
      currentMain.style.opacity = '0';
      currentMain.style.transition = 'opacity 0.15s ease-out';

      setTimeout(async () => {
        currentMain.innerHTML = newMain.innerHTML;
        currentMain.className = newMain.className;

        if (newDoc.title) {
          document.title = newDoc.title;
        }

        initActiveNav();
        await reinitPageScripts(url);

        currentMain.style.opacity = '1';

        if (url.includes('#')) {
          const hashId = url.split('#')[1];
          const targetElem = document.getElementById(hashId);
          if (targetElem) {
            targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        }

        if (scrollToTop) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 150);
    }
  } catch (err) {
    console.error('Error in SPA routing, falling back to standard navigation:', err);
    window.location.href = url;
  }
}

/**
 * Re-initializes page-specific JavaScript modules after SPA page load
 */
async function reinitPageScripts(url) {
  const page = (url || window.location.pathname).split('/').pop().split('?')[0].split('#')[0] || 'inicio.html';

  if (page.includes('menu')) {
    if (typeof window.initMenuPage === 'function') {
      window.initMenuPage();
    } else {
      await loadScript('js/menu.js');
      if (typeof window.initMenuPage === 'function') window.initMenuPage();
    }
  } else if (page.includes('origen')) {
    if (typeof window.initOrigenPage === 'function') {
      window.initOrigenPage();
    } else {
      await loadScript('js/origen.js');
      if (typeof window.initOrigenPage === 'function') window.initOrigenPage();
    }
  } else if (page.includes('reservas')) {
    if (typeof window.initReservasPage === 'function') {
      window.initReservasPage();
    } else {
      await loadScript('js/reservas.js');
      if (typeof window.initReservasPage === 'function') window.initReservasPage();
    }
  }
}

/**
 * Helper to dynamically load a script file on demand
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (e) => reject(e);
    document.body.appendChild(script);
  });
}

/**
 * Marks current navigation item as active based on pathname
 */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('header nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    const isMatch = href === currentPath || 
      (currentPath === '' && (href === 'index.html' || href === 'inicio.html')) ||
      (currentPath === 'index.html' && (href === 'index.html' || href === 'inicio.html')) ||
      (currentPath === 'inicio.html' && (href === 'inicio.html' || href === 'index.html'));

    if (isMatch) {
      link.classList.add('bg-surface-container-high', 'text-on-surface', 'font-semibold', 'shadow-sm');
      link.classList.remove('text-on-surface-variant');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('bg-surface-container-high', 'text-on-surface', 'font-semibold', 'shadow-sm');
      link.classList.add('text-on-surface-variant');
      link.removeAttribute('aria-current');
    }
  });
}

/**
 * Adds dynamic shadow & backdrop to sticky header on scroll
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-[0_4px_20px_rgba(44,24,16,0.08)]');
    } else {
      header.classList.remove('shadow-[0_4px_20px_rgba(44,24,16,0.08)]');
    }
  }, { passive: true });
}

/**
 * Handles newsletter subscription with user feedback toast
 */
function initNewsletterForm() {
  const forms = document.querySelectorAll('footer form');
  
  forms.forEach(form => {
    const submitBtn = form.querySelector('button');
    const input = form.querySelector('input[type="email"]');

    if (submitBtn && input) {
      submitBtn.onclick = (e) => {
        e.preventDefault();
        handleSubscription(input.value, form);
      };

      form.onsubmit = (e) => {
        e.preventDefault();
        handleSubscription(input.value, form);
      };
    }
  });
}

function handleSubscription(email, form) {
  if (!email || !email.includes('@') || !email.includes('.')) {
    showToast('Por favor, ingresa un correo electrónico válido.', 'error');
    return;
  }

  showToast('¡Gracias por unirte al Club del Café! Revisa tu bandeja de entrada.', 'success');
  const input = form.querySelector('input[type="email"]');
  if (input) input.value = '';
}

/**
 * Global Toast Notification Utility
 */
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('global-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'global-toast-container';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgClass = type === 'error' ? 'bg-[#ba1a1a] text-white' : 'bg-[#2c1810] text-[#fcf9f3]';
  const icon = type === 'error' ? 'error' : (type === 'success' ? 'check_circle' : 'info');

  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border border-white/10 ${bgClass} toast-slide-in`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] text-[#feab80]">${icon}</span>
    <span class="font-body-sm text-[13px] font-medium">${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global exports
window.navigateTo = navigateTo;
window.loadPageContent = loadPageContent;
window.showToast = showToast;
