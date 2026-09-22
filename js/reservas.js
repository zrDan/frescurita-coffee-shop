/**
 * La Frescurita Café & Tostaduría
 * Interacciones de Visitas y Reservas de Mesas (visitanos-y-reservas.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  initReservasPage();
});

function initReservasPage() {
  initInteractiveCalendar();
  initTimeSlotChooser();
  initPaxSelector();
  initFaqAccordion();
  initBookingForm();
}

/**
 * Calendario interactivo de reservas
 * Rango disponible: Hoy -> 31 de Diciembre del año en curso
 */
function initInteractiveCalendar() {
  const monthYearLabel = document.getElementById('calendar-month-year');
  const grid = document.getElementById('calendar-grid');
  const prevBtn = document.getElementById('cal-prev-month');
  const nextBtn = document.getElementById('cal-next-month');
  const dateInput = document.getElementById('selected-date-input');
  const dateDisplay = document.getElementById('selected-date-display');

  if (!grid || !monthYearLabel) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Índice base 0 (0 = Ene, 11 = Dic)
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);

  // Estado: mes y año visualizados actualmente
  let viewYear = currentYear;
  let viewMonth = currentMonth;

  // La fecha seleccionada por defecto es hoy
  let selectedDate = new Date(today);

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const fullDayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  function updateSelectedDisplay() {
    if (dateInput) {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
    if (dateDisplay) {
      const dayName = fullDayNames[selectedDate.getDay()];
      const dayNum = selectedDate.getDate();
      const monthName = monthNames[selectedDate.getMonth()];
      const isToday = selectedDate.getTime() === today.getTime();
      dateDisplay.innerHTML = `
        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold text-label-sm shadow-sm">
          <span class="material-symbols-outlined text-[14px]">event</span>
          ${isToday ? 'Hoy, ' : ''}${dayName} ${dayNum} de ${monthName}
        </span>
      `;
    }
  }

  function renderCalendar() {
    monthYearLabel.textContent = `${monthNames[viewMonth]} ${viewYear}`;

    // El botón anterior se deshabilita si viewMonth es el mes actual del año en curso
    const isAtStart = viewYear === currentYear && viewMonth <= currentMonth;
    // El botón siguiente se deshabilita si viewMonth es Diciembre (11)
    const isAtEnd = viewYear === currentYear && viewMonth >= 11;

    if (prevBtn) {
      prevBtn.disabled = isAtStart;
      prevBtn.classList.toggle('opacity-30', isAtStart);
      prevBtn.classList.toggle('cursor-not-allowed', isAtStart);
    }
    if (nextBtn) {
      nextBtn.disabled = isAtEnd;
      nextBtn.classList.toggle('opacity-30', isAtEnd);
      nextBtn.classList.toggle('cursor-not-allowed', isAtEnd);
    }

    // Limpiar cuadrícula
    grid.innerHTML = '';

    // Encabezados de días: L, M, M, J, V, S, D (Lunes primero)
    const weekHeaders = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    weekHeaders.forEach(h => {
      const headerSpan = document.createElement('span');
      headerSpan.className = 'text-outline font-semibold py-1 text-[11px] uppercase tracking-wider';
      headerSpan.textContent = h;
      grid.appendChild(headerSpan);
    });

    // Primer día del mes visualizado
    const firstDay = new Date(viewYear, viewMonth, 1);
    // getDay() devuelve 0 para domingo, 1 para lunes... Ajustamos a Lunes = 0, Domingo = 6
    const startDayOfWeek = (firstDay.getDay() + 6) % 7;

    // Días de relleno del mes anterior
    const prevMonthLastDate = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const prevDaySpan = document.createElement('span');
      prevDaySpan.className = 'py-1.5 text-outline/30 select-none text-[12px] flex items-center justify-center';
      prevDaySpan.textContent = prevMonthLastDate - i;
      grid.appendChild(prevDaySpan);
    }

    // Días del mes actual
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const thisDate = new Date(viewYear, viewMonth, day);
      thisDate.setHours(0, 0, 0, 0);

      const isPast = thisDate < today;
      const isBeyondYear = thisDate > endOfYear;
      const isSelected = selectedDate && thisDate.getTime() === selectedDate.getTime();
      const isToday = thisDate.getTime() === today.getTime();

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = day;
      btn.setAttribute('data-date', `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);

      if (isPast || isBeyondYear) {
        btn.disabled = true;
        btn.className = 'py-1.5 text-outline/30 cursor-not-allowed select-none rounded-lg text-label-sm';
      } else if (isSelected) {
        btn.className = 'py-1.5 rounded-lg bg-secondary text-on-secondary font-bold shadow-md transform scale-105 transition-all text-label-sm ring-2 ring-secondary/40';
      } else if (isToday) {
        btn.className = 'py-1.5 rounded-lg bg-surface-container-high text-secondary font-bold border border-secondary/50 hover:bg-surface-container-highest transition-all text-label-sm';
      } else {
        btn.className = 'py-1.5 rounded-lg hover:bg-surface-container text-on-surface hover:text-primary transition-all text-label-sm font-medium';
      }

      if (!isPast && !isBeyondYear) {
        btn.onclick = (e) => {
          e.preventDefault();
          selectedDate = new Date(viewYear, viewMonth, day);
          selectedDate.setHours(0, 0, 0, 0);
          updateSelectedDisplay();
          renderCalendar();
        };
      }

      grid.appendChild(btn);
    }

    // Días de relleno del siguiente mes para completar la cuadrícula
    const totalSlots = startDayOfWeek + daysInMonth;
    const remainingSlots = (7 - (totalSlots % 7)) % 7;
    for (let j = 1; j <= remainingSlots; j++) {
      const nextDaySpan = document.createElement('span');
      nextDaySpan.className = 'py-1.5 text-outline/30 select-none text-[12px] flex items-center justify-center';
      nextDaySpan.textContent = j;
      grid.appendChild(nextDaySpan);
    }
  }

  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      if (viewYear === currentYear && viewMonth > currentMonth) {
        viewMonth--;
        renderCalendar();
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      if (viewYear === currentYear && viewMonth < 11) {
        viewMonth++;
        renderCalendar();
      }
    };
  }

  updateSelectedDisplay();
  renderCalendar();
}

/**
 * Selector de franjas horarias y turnos
 */
function initTimeSlotChooser() {
  const timeSlots = document.querySelectorAll('.time-slot');

  timeSlots.forEach(button => {
    button.onclick = (e) => {
      e.preventDefault();
      timeSlots.forEach(b => {
        b.classList.remove('bg-[#5c3826]', 'text-white', 'bg-primary', 'text-on-primary', 'active-time', 'shadow-sm', 'font-semibold');
        b.classList.add('bg-surface-container-low', 'text-on-surface');
      });
      button.classList.remove('bg-surface-container-low', 'text-on-surface');
      button.classList.add('bg-[#5c3826]', 'text-white', 'active-time', 'shadow-sm', 'font-semibold');
    };
  });
}

/**
 * Selector de cantidad de comensales (Pax)
 */
function initPaxSelector() {
  const paxBtns = document.querySelectorAll('.pax-btn');

  paxBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      paxBtns.forEach(b => {
        b.classList.remove('bg-[#5c3826]', 'text-white', 'bg-primary', 'text-on-primary', 'active-pax', 'shadow-sm');
        b.classList.add('bg-surface-container-low', 'text-primary');
      });
      btn.classList.remove('bg-surface-container-low', 'text-primary');
      btn.classList.add('bg-[#5c3826]', 'text-white', 'active-pax', 'shadow-sm');
    };
  });
}

/**
 * Acordeón interactivo de Preguntas Frecuentes (FAQ)
 */
function initFaqAccordion() {
  const toggles = document.querySelectorAll('.faq-toggle');

  toggles.forEach(btn => {
    btn.onclick = () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.material-symbols-outlined') || btn.querySelector('svg');
      const isCurrentlyHidden = content.classList.contains('hidden');

      // Cerrar las demás pestañas abiertas
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-toggle .material-symbols-outlined').forEach(i => i.classList.remove('rotate-180'));

      if (isCurrentlyHidden) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    };
  });
}

// Conmutador global para compatibilidad hacia atrás
window.toggleFaq = function(btn) {
  const content = btn.nextElementSibling;
  const icon = btn.querySelector('.material-symbols-outlined');
  const isHidden = content.classList.contains('hidden');

  document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
  document.querySelectorAll('.faq-toggle .material-symbols-outlined').forEach(i => i.classList.remove('rotate-180'));

  if (isHidden) {
    content.classList.remove('hidden');
    if (icon) icon.classList.add('rotate-180');
  }
};

/**
 * Gestor del formulario de reserva y cuadro de confirmación
 */
function initBookingForm() {
  const form = document.getElementById('reservation-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      showConfirmation();
    };
  }
}

window.showConfirmation = function() {
  const dateInput = document.getElementById('selected-date-input');
  const activeTime = document.querySelector('.time-slot.active-time') || document.querySelector('.time-slot.bg-primary');
  const activePax = document.querySelector('.pax-btn.active-pax') || document.querySelector('.pax-btn.bg-primary');
  const selectedAmbience = document.querySelector('input[name="ambience"]:checked');

  const dateValue = dateInput ? dateInput.value : '';
  const timeText = activeTime ? activeTime.textContent.trim() : '09:30';
  const paxText = activePax ? activePax.textContent.trim() : '2';
  
  let ambienceName = 'Sala Principal';
  if (selectedAmbience) {
    const val = selectedAmbience.value;
    if (val === 'patio-arbolado') ambienceName = 'Patio Arbolado';
    else if (val === 'barra-especialidad') ambienceName = 'Barra de Especialidad';
    else if (val === 'rincon-cowork') ambienceName = 'Rincón de Lectura';
  }

  const toast = document.getElementById('booking-toast');
  if (toast) {
    toast.classList.remove('hidden');
    toast.classList.add('toast-slide-in');
    
    const detailsElem = toast.querySelector('p:last-child');
    if (detailsElem) {
      detailsElem.innerHTML = `Mesa para <strong>${paxText} personas</strong> en <strong>${ambienceName}</strong> el <strong>${dateValue || 'día seleccionado'}</strong> a las <strong>${timeText} hs</strong>. Hemos enviado los detalles a tu correo.`;
    }
    
    toast.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (typeof showToast === 'function') {
    showToast(`¡Mesa confirmada (${paxText} pers. en ${ambienceName} - ${timeText} hs)!`, 'success');
  }
};

// Exportaciones globales para navegación SPA
window.initReservasPage = initReservasPage;
window.initInteractiveCalendar = initInteractiveCalendar;
window.initTimeSlotChooser = initTimeSlotChooser;
window.initPaxSelector = initPaxSelector;
window.initFaqAccordion = initFaqAccordion;
window.initBookingForm = initBookingForm;

