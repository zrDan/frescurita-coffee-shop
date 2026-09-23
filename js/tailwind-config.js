/**
 * Configuración de Tailwind CSS para La Frescurita Café & Tostaduría
 * Tema: Calidez Artesanal
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primario (Espresso Tostado & Tinta Tueste Oscuro)
        "primary": "#090100",
        "on-primary": "#ffffff",
        "primary-container": "#2c1810",
        "on-primary-container": "#9e7e73",
        "primary-fixed": "#ffdbce",
        "primary-fixed-dim": "#e3bfb2",
        "on-primary-fixed": "#2a170f",
        "on-primary-fixed-variant": "#5a4137",
        "inverse-primary": "#e3bfb2",

        // Secundario (Terracota Artesanal & Especias de Caramelo)
        "secondary": "#8d4e2a",
        "on-secondary": "#ffffff",
        "secondary-container": "#feab80",
        "on-secondary-container": "#783d1b",
        "secondary-fixed": "#ffdbcb",
        "secondary-fixed-dim": "#ffb691",
        "on-secondary-fixed": "#341100",
        "on-secondary-fixed-variant": "#703715",

        // Terciario (Salvia Botánica & Tueste Bosque)
        "tertiary": "#010300",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#13200b",
        "on-tertiary-container": "#7a8a6d",
        "tertiary-fixed": "#d7e8c6",
        "tertiary-fixed-dim": "#bbccac",
        "on-tertiary-fixed": "#121f0a",
        "on-tertiary-fixed-variant": "#3d4b32",

        // Superficies y Fondos (Pergamino & Neutros Cálidos)
        "background": "#fcf9f3",
        "on-background": "#1c1c18",

        "surface": "#fcf9f3",
        "surface-dim": "#dcdad4",
        "surface-bright": "#fcf9f3",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3ed",
        "surface-container": "#f0eee8",
        "surface-container-high": "#ebe8e2",
        "surface-container-highest": "#e5e2dc",
        "surface-variant": "#e5e2dc",
        "surface-tint": "#74584e",
        "on-surface": "#1c1c18",
        "on-surface-variant": "#504440",
        "inverse-surface": "#31312d",
        "inverse-on-surface": "#f3f0ea",

        // Contornos y Bordes
        "outline": "#827470",
        "outline-variant": "#d3c3be",

        // Estados y Alertas
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Alias de Marca Artesanal Especializada
        "roast-espresso": "#2c1810",
        "roast-chestnut": "#5c3826",
        "roast-warm": "#885035",
        "roast-dark": "#422312",
        "terracotta": "#8d4e2a",
        "crema": "#fff9ee",
        "parchment": "#fcf9f3",
        "oatmeal": "#f6f3ed"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "gutter": "1.5rem",
        "gutter-mobile": "1rem",
        "margin": "3rem",
        "margin-mobile": "1.25rem"
      },
      fontFamily: {
        "cooper": ["Cooper Black", "cooper-black-std", "Cooper", "Aharoni Bold", "Aharoni", "Fraunces", "serif"],
        "cooper-black": ["Cooper Black", "cooper-black-std", "Cooper", "Aharoni Bold", "Aharoni", "Fraunces", "serif"],
        "aharoni": ["Aharoni Bold", "Aharoni", "Cooper Black", "sans-serif"],
        "aharoni-bold": ["Aharoni Bold", "Aharoni", "Cooper Black", "sans-serif"],
        "recoleta": ["Cooper Black", "Aharoni Bold", "Aharoni", "cooper-black-std", "serif"],
        "serif": ["Cooper Black", "Aharoni Bold", "Aharoni", "Fraunces", "serif"],
        "display-lg": ["Cooper Black", "cooper-black-std", "Cooper", "Aharoni Bold", "Aharoni", "Playfair Display", "serif"],
        "display-lg-mobile": ["Cooper Black", "cooper-black-std", "Cooper", "Aharoni Bold", "Aharoni", "Playfair Display", "serif"],
        "headline-xl": ["Aharoni Bold", "Aharoni", "Cooper Black", "cooper-black-std", "Playfair Display", "serif"],
        "headline-xl-mobile": ["Aharoni Bold", "Aharoni", "Cooper Black", "cooper-black-std", "Playfair Display", "serif"],
        "headline-lg": ["Aharoni Bold", "Aharoni", "Cooper Black", "cooper-black-std", "Playfair Display", "serif"],
        "headline-lg-mobile": ["Aharoni Bold", "Aharoni", "Cooper Black", "cooper-black-std", "Playfair Display", "serif"],
        "headline-sm": ["Aharoni Bold", "Aharoni", "Cooper Black", "cooper-black-std", "Playfair Display", "serif"],
        "body-xl": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "body-sm": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "label-lg": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "label-md": ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        "label-sm": ["Plus Jakarta Sans", "system-ui", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-lg-mobile": ["38px", { lineHeight: "46px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-xl-mobile": ["30px", { lineHeight: "38px", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "500" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "500" }],
        "headline-sm": ["22px", { lineHeight: "28px", fontWeight: "500" }],
        "body-xl": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "600" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.05em", fontWeight: "500" }]
      }
    }
  }
};
