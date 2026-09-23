# La Frescura Coffee Shop (La Frescura Café & Tostaduría)

Sitio web estructurado y modularizado para **La Frescura**, tostaduría artesanal de café de especialidad y panadería de masa madre.

---

## 📁 Arquitectura y Estructura del Proyecto

El proyecto sigue una separación estricta de responsabilidades entre **Estructura (HTML)**, **Estilos (CSS)**, **Acciones/Lógica (JavaScript)** y **Componentes Reutilizables**:

```
frescurita-coffee-shop/
├── components/
│   ├── header.html                # Componente reutilizable del Header (Top bar + Navegación + Logo unificado)
│   └── footer.html                # Componente reutilizable del Footer (Datos, enlaces, Club del Café y sellos)
├── css/
│   └── styles.css                 # Hojas de estilo centralizadas (Fuentes, Reset, Clases de marca, Animaciones)
├── js/
│   ├── tailwind-config.js         # Configuración y tokens de diseño Tailwind CSS
│   ├── main.js                    # Lógica global y Component Loader (Header/Footer, Nav activa, Newsletter, Toasts)
│   ├── menu.js                    # Acciones del Menú (Filtros por categoría, selector de molienda y peso)
│   ├── origen.js                  # Acciones de Origen (Filtro de fincas, modal interactivo de talleres)
│   └── reservas.js                # Acciones de Reservas (Selección de turno, comensales, acordeón FAQ)
├── index.html                     # Portada principal / Landing de entrada
├── inicio.html                    # Página de Inicio completa
├── menu-y-especialidades.html     # Menú de café de especialidad, pastelería y métodos de extracción
├── origen-y-tostaduria.html       # Trazabilidad de fincas, proceso de tueste y talleres
├── visitanos-y-reservas.html      # Ubicación, horarios, mapa interactivo y reserva de mesa
├── la-frescurita-cafe.html        # Vista alternativa
├── DESIGN.md                      # Sistema de diseño "Artisanal Warmth"
├── README.md                      # Documentación del proyecto
└── screenshots/                   # Capturas y recursos gráficos
```

---

## 🧩 Componentes Modulares (`components/`)

Para evitar duplicación de código y garantizar mantenibilidad:
- **`components/header.html`**: Contiene la barra superior informativa, el logotipo oficial y el menú de navegación completo.
- **`components/footer.html`**: Contiene la sección de marca, enlaces rápidos, horarios, formulario de suscripción a *El Club del Café* y sellos de calidad.
- **Carga Dinámica**: En cada página HTML se definen `<div id="site-header"></div>` y `<div id="site-footer"></div>`. El script [`js/main.js`](js/main.js) los carga de forma asíncrona y activa automáticamente el enlace correspondiente en la barra de navegación según la página visitada.

---

## 🎨 Sistema de Diseño: *Artisanal Warmth*

- **Estilo**: Modern Rustic & Organic Tactile Minimal
- **Paleta de Colores**:
  - `primary`: `#2C1810` / `#090100` (Espresso Tostado)
  - `secondary`: `#8D4E2A` / `#5C3826` / `#C47A53` (Caramelo & Terracota)
  - `tertiary`: `#5C6B50` (Salvia Botánica)
  - `surface`: `#FCF9F3` (Pergamino Cálido)
- **Tipografías**:
  - Títulos & Display: `Playfair Display`, `Fraunces`, `Cooper Black`
  - Textos & Etiquetas: `Plus Jakarta Sans`
  - Iconos: `Material Symbols Outlined`

---

## ⚡ Funcionalidades Interactivas (JS)

1. **Global (`js/main.js`)**:
   - **Enrutador SPA en tiempo real**: Intercepta la navegación entre páginas para evitar recargas completas del navegador, realizando transiciones instantáneas y suaves mediante `fetch` y la API `history.pushState()`.
   - Carga e inyección modular de `components/header.html` y `components/footer.html`.
   - Detección automática y resaltado de la página activa en el menú de navegación.
   - Efecto dinámico de backdrop y sombra en el header al hacer scroll.
   - Sistema global de notificaciones tipo Toast.
   - Captura y validación del formulario de newsletter en el footer.

2. **Menú & Especialidades (`js/menu.js`)**:
   - Filtro fluido por pestañas de categorías (`#section-cafe`, `#section-panaderia`, `#section-bebidas-frescas`, `#section-algo-dulce`).
   - Selector interactivo de molienda.
   - Calculador de precio según peso (250g, 500g, 1kg).
   - Botón interactivo para agregar al pedido con confirmación Toast.

3. **Origen & Tostaduría (`js/origen.js`)**:
   - Pestañas de filtrado de microlotes por país de origen (Colombia, Etiopía, Guatemala).
   - Modal accesible para inscripción en talleres de cata y barismo (apertura, cierre y tecla `Escape`).
   - Formulario de reserva de plazas con validación.

4. **Visítanos & Reservas (`js/reservas.js`)**:
   - Selector interactivo de ambiente.
   - Selector de turnos y franjas horarias.
   - Selector de comensales (1 a 8 personas).
   - Acordeón interactivo para la sección de Preguntas Frecuentes (FAQ).
   - Confirmación y pre-reserva de mesa con feedback toast.

---

## 🚀 Cómo Ejecutar Localmente

Para abrir y navegar el sitio con soporte completo de componentes modulares y rutas:

```powershell
python -m http.server 8000 --directory "c:\Users\perso\.gemini\antigravity-ide\scratch\frescurita-coffee-shop"
```

Luego abre en tu navegador:
👉 [http://localhost:8000](http://localhost:8000) o directamente [http://localhost:8000/inicio.html](http://localhost:8000/inicio.html)
