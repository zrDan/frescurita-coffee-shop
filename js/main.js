/**
 * La Frescura Café & Tostaduría
 * Scripts Globales, Cargador Dinámico de Componentes, Enrutador SPA e Interacciones
 */

document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteComponents();
  initActiveNav();
  initMobileMenu();
  initHeaderScroll();
  initNewsletterForm();
  initSpaRouter();
  reinitPageScripts(window.location.pathname);
});

/**
 * Carga dinámicamente los archivos de componentes de encabezado y pie de página
 */
async function loadSiteComponents() {
  const headerContainer = document.getElementById('site-header') || document.querySelector('[data-component="header"]');
  const footerContainer = document.getElementById('site-footer') || document.querySelector('[data-component="footer"]');

  const promises = [];

  if (headerContainer && headerContainer.children.length === 0) {
    promises.push(
      fetch('components/header.html')
        .then(res => {
          if (!res.ok) throw new Error(`Estado ${res.status}`);
          return res.text();
        })
        .then(html => {
          headerContainer.innerHTML = html;
        })
        .catch(err => console.warn('No se pudo cargar components/header.html:', err))
    );
  }

  if (footerContainer && footerContainer.children.length === 0) {
    promises.push(
      fetch('components/footer.html')
        .then(res => {
          if (!res.ok) throw new Error(`Estado ${res.status}`);
          return res.text();
        })
        .then(html => {
          footerContainer.innerHTML = html;
        })
        .catch(err => console.warn('No se pudo cargar components/footer.html:', err))
    );
  }

  if (promises.length > 0) {
    await Promise.allSettled(promises);
  }
}

/**
 * Enrutador del lado del cliente para Aplicación de Página Única (SPA)
 * Intercepta enlaces internos e intercambia la etiqueta <main> sin recargar la página completa
 */
function initSpaRouter() {
  document.addEventListener('click', async (e) => {
    // Ignorar clics con teclas modificadoras (Ctrl/Cmd para nueva pestaña, Shift, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) {
      return;
    }

    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignorar anclas, enlaces externos, protocolos o pseudoprotocolos de javascript
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

    // Debe ser una página HTML interna o la raíz
    if (href.endsWith('.html') || href === '/' || href.includes('.html#')) {
      e.preventDefault();
      await navigateTo(href);
    }
  });

  // Gestionar navegación por el historial del navegador (Atrás / Adelante)
  window.addEventListener('popstate', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'inicio.html';
    loadPageContent(currentPath, false);
  });
}

/**
 * Navega a una URL interna específica sin recargar el navegador
 */
async function navigateTo(url) {
  // Guardar el estado en el historial del navegador
  if (window.location.pathname.split('/').pop() !== url) {
    window.history.pushState({}, '', url);
  }
  await loadPageContent(url, true);
}

/**
 * Obtiene y reemplaza únicamente el contenido de la etiqueta <main>
 */
async function loadPageContent(url, scrollToTop = true) {
  try {
    const fetchUrl = url.split('#')[0] || 'inicio.html';
    const res = await fetch(fetchUrl);
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
    const htmlText = await res.text();

    const parser = new DOMParser();
    const newDoc = parser.parseFromString(htmlText, 'text/html');

    const newMain = newDoc.querySelector('main');
    const currentMain = document.querySelector('main');

    if (newMain && currentMain) {
      // Efecto suave de desvanecimiento (fade out / fade in)
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
    console.error('Error en el enrutamiento SPA, recurriendo a navegación estándar:', err);
    window.location.href = url;
  }
}

/**
 * Reinicializa los módulos JavaScript específicos de cada página tras la carga SPA
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
 * Función auxiliar para cargar dinámicamente un archivo de script bajo demanda
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
 * Marca el elemento de navegación actual como activo según la ruta en escritorio y móvil
 */
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const desktopNavLinks = document.querySelectorAll('header nav a');
  const mobileNavLinks = document.querySelectorAll('#mobile-menu-drawer .mobile-nav-link');

  const updateLinkClass = (links, activeBg, activeText) => {
    links.forEach(link => {
      const href = link.getAttribute('href');
      const isMatch = href === currentPath || 
        (currentPath === '' && (href === 'index.html' || href === 'inicio.html')) ||
        (currentPath === 'index.html' && (href === 'index.html' || href === 'inicio.html')) ||
        (currentPath === 'inicio.html' && (href === 'inicio.html' || href === 'index.html'));

      if (isMatch) {
        link.classList.add(activeBg, activeText, 'font-semibold', 'shadow-sm');
        link.classList.remove('text-on-surface-variant');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove(activeBg, activeText, 'font-semibold', 'shadow-sm');
        link.classList.add('text-on-surface-variant');
        link.removeAttribute('aria-current');
      }
    });
  };

  updateLinkClass(desktopNavLinks, 'bg-surface-container-high', 'text-on-surface');
  updateLinkClass(mobileNavLinks, 'bg-surface-container-high', 'text-primary');
}

/**
 * Controlador del menú lateral desplegable (Drawer) para móviles y tabletas
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');

  if (!drawer || !backdrop) return;

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.onclick = (e) => {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    };
  }

  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeMenu();
    };
  }

  backdrop.onclick = () => {
    closeMenu();
  };

  // Cerrar al presionar la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });

  // Cerrar automáticamente el menú lateral al hacer clic en cualquiera de sus enlaces
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  window.closeMobileMenu = closeMenu;
  window.openMobileMenu = openMenu;
}

/**
 * Agrega sombra dinámica y fondo difuminado al encabezado fijo al desplazarse
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
 * Gestiona la suscripción al boletín con notificación toast informativa
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
 * Utilidad global para notificaciones Toast
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

// Exportaciones globales
window.navigateTo = navigateTo;
window.loadPageContent = loadPageContent;
window.showToast = showToast;
window.initMobileMenu = initMobileMenu;
window.initActiveNav = initActiveNav;
