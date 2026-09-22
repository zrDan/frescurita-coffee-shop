/**
 * Tailwind CSS Configuration for La Frescurita Café & Tostaduría
 * Theme: Artisanal Warmth
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary (Roasted Espresso & Dark Roast Ink)
        "primary": "#090100",
        "on-primary": "#ffffff",
        "primary-container": "#2c1810",
        "on-primary-container": "#9e7e73",
        "primary-fixed": "#ffdbce",
        "primary-fixed-dim": "#e3bfb2",
        "on-primary-fixed": "#2a170f",
        "on-primary-fixed-variant": "#5a4137",
        "inverse-primary": "#e3bfb2",

        // Secondary (Artisanal Terracotta & Caramel Spices)
        "secondary": "#8d4e2a",
        "on-secondary": "#ffffff",
        "secondary-container": "#feab80",
        "on-secondary-container": "#783d1b",
        "secondary-fixed": "#ffdbcb",
        "secondary-fixed-dim": "#ffb691",
        "on-secondary-fixed": "#341100",
        "on-secondary-fixed-variant": "#703715",

        // Tertiary (Botanical Sage & Forest Roast)
        "tertiary": "#010300",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#13200b",
        "on-tertiary-container": "#7a8a6d",
        "tertiary-fixed": "#d7e8c6",
        "tertiary-fixed-dim": "#bbccac",
        "on-tertiary-fixed": "#121f0a",
        "on-tertiary-fixed-variant": "#3d4b32",

        // Surface & Backgrounds (Parchment & Warm Neutrals)
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

        // Outlines & Borders
        "outline": "#827470",
        "outline-variant": "#d3c3be",

        // Status & Alerts
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Stitch Artisanal Specialty Brand Aliases
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
        "cooper": ["cooper-black-std", "Cooper Black", "Recoleta", "serif"],
        "cooper-black": ["cooper-black-std", "Cooper Black", "Recoleta", "serif"],
        "recoleta": ["Recoleta", "cooper-black-std", "serif"],
        "display-lg": ["cooper-black-std", "Cooper Black", "Recoleta", "Playfair Display", "serif"],
        "display-lg-mobile": ["cooper-black-std", "Cooper Black", "Recoleta", "Playfair Display", "serif"],
        "headline-xl": ["Recoleta", "cooper-black-std", "Playfair Display", "serif"],
        "headline-xl-mobile": ["Recoleta", "cooper-black-std", "Playfair Display", "serif"],
        "headline-lg": ["Recoleta", "cooper-black-std", "Playfair Display", "serif"],
        "headline-lg-mobile": ["Recoleta", "cooper-black-std", "Playfair Display", "serif"],
        "headline-sm": ["Recoleta", "cooper-black-std", "Playfair Display", "serif"],
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
