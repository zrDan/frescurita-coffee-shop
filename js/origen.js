/**
 * La Frescurita Café & Tostaduría
 * Origin & Roastery Interactions (origen-y-tostaduria.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  initOrigenPage();
});

function initOrigenPage() {
  initOriginFilters();
  initWorkshopModal();
}

/**
 * Filter coffee origins (All, Colombia Huila, Etiopía Yirgacheffe, Guatemala Antigua)
 */
function initOriginFilters() {
  const cards = document.querySelectorAll('.coffee-card');
  const btnAll = document.getElementById('viewAllBtn');
  const btnCol = document.getElementById('viewColBtn');
  const btnEth = document.getElementById('viewEthBtn');
  const btnGua = document.getElementById('viewGuaBtn');
  const allButtons = [btnAll, btnCol, btnEth, btnGua].filter(Boolean);

  function setActiveFilter(selectedBtn, originFilter) {
    allButtons.forEach(btn => {
      btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
      btn.classList.add('text-on-surface-variant');
    });

    if (selectedBtn) {
      selectedBtn.classList.add('bg-surface-container-lowest', 'text-on-surface', 'shadow-sm');
      selectedBtn.classList.remove('text-on-surface-variant');
    }

    cards.forEach(card => {
      if (!originFilter || card.getAttribute('data-origin') === originFilter) {
        card.classList.remove('hidden');
        card.classList.add('flex');
      } else {
        card.classList.add('hidden');
        card.classList.remove('flex');
      }
    });
  }

  if (btnAll) btnAll.onclick = () => setActiveFilter(btnAll, null);
  if (btnCol) btnCol.onclick = () => setActiveFilter(btnCol, 'colombia');
  if (btnEth) btnEth.onclick = () => setActiveFilter(btnEth, 'etiopia');
  if (btnGua) btnGua.onclick = () => setActiveFilter(btnGua, 'guatemala');
}

/**
 * Workshop Modal Interactions (Open, Close, Keyboard ESC, Submit)
 */
function initWorkshopModal() {
  const modal = document.getElementById('registerModal');
  const modalTitle = document.getElementById('modalTitle');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const form = document.getElementById('workshopForm');

  if (!modal) return;

  function openModal(workshopName) {
    if (modalTitle) modalTitle.textContent = workshopName;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.onclick = () => {
      const workshopName = btn.getAttribute('data-workshop') || 'Taller de Café de Especialidad';
      openModal(workshopName);
    };
  });

  if (closeModalBtn) {
    closeModalBtn.onclick = closeModal;
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal();
    }
  };

  // Close modal on ESC key
  window.onkeydown = (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  };

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      closeModal();
      form.reset();
      if (typeof showToast === 'function') {
        showToast('¡Inscripción confirmada! Te enviaremos el temario y accesos por email.', 'success');
      } else {
        alert('¡Gracias por inscribirte! Nos contactaremos a la brevedad con los detalles de acceso.');
      }
    };
  }
}

// Global exports for SPA navigation
window.initOrigenPage = initOrigenPage;
window.initOriginFilters = initOriginFilters;
window.initWorkshopModal = initWorkshopModal;
