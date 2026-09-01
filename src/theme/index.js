// RETROSPEED theme tokens + CSS variable application.

export const THEMES = {
  bone: {
    id: 'bone',
    name: 'Vintage 90s OS (Default)',
    subtitle: 'Warm cream canvas with solid mustard & lilac accents',
    tag: 'Classic',
    vars: {
      '--rs-wallpaper': '#B9D2E8',
      '--rs-paper': '#FDF8EE',
      '--rs-paper-alt': '#FAF3E0',
      '--rs-ink': '#2D2319',
      '--rs-titlebar': '#C3A6E8',
      '--rs-accent': '#F6C445',
      '--rs-mint': '#48B89F',
      '--rs-coral': '#F28B82',
      '--rs-sky': '#4BA3E3',
      '--rs-lilac': '#C3A6E8',
      '--rs-shadow': '#2D2319',
    },
  },
  vintage: {
    id: 'vintage',
    name: 'Macintosh Classic Paper',
    subtitle: 'Soft sandstone parchment with sky denim highlights',
    tag: 'Vintage',
    vars: {
      '--rs-wallpaper': '#C5D8E6',
      '--rs-paper': '#F7F1E1',
      '--rs-paper-alt': '#EFE3CA',
      '--rs-ink': '#2D2319',
      '--rs-titlebar': '#4BA3E3',
      '--rs-accent': '#48B89F',
      '--rs-mint': '#48B89F',
      '--rs-coral': '#F28B82',
      '--rs-sky': '#4BA3E3',
      '--rs-lilac': '#C3A6E8',
      '--rs-shadow': '#2D2319',
    },
  },
  'cyber-mint': {
    id: 'cyber-mint',
    name: 'Neo Mint & Lavender',
    subtitle: 'Pastel mint green surfaces with lavender titlebars',
    tag: 'Modern Retro',
    vars: {
      '--rs-wallpaper': '#D4E8DC',
      '--rs-paper': '#F1FAF5',
      '--rs-paper-alt': '#E0F2E7',
      '--rs-ink': '#2D2319',
      '--rs-titlebar': '#48B89F',
      '--rs-accent': '#C3A6E8',
      '--rs-mint': '#48B89F',
      '--rs-coral': '#F28B82',
      '--rs-sky': '#4BA3E3',
      '--rs-lilac': '#C3A6E8',
      '--rs-shadow': '#2D2319',
    },
  },
  lavender: {
    id: 'lavender',
    name: 'Pastel Dreamscape',
    subtitle: 'Solid lilac headers with warm coral accents',
    tag: 'Pastel',
    vars: {
      '--rs-wallpaper': '#E3D7F4',
      '--rs-paper': '#FAF5FE',
      '--rs-paper-alt': '#EFE4FC',
      '--rs-ink': '#2D2319',
      '--rs-titlebar': '#C3A6E8',
      '--rs-accent': '#F28B82',
      '--rs-mint': '#48B89F',
      '--rs-coral': '#F28B82',
      '--rs-sky': '#4BA3E3',
      '--rs-lilac': '#C3A6E8',
      '--rs-shadow': '#2D2319',
    },
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal Amber',
    subtitle: 'Golden mustard titlebars with high contrast ink cards',
    tag: 'Hacker CRT',
    vars: {
      '--rs-wallpaper': '#E8DEC4',
      '--rs-paper': '#FDF8EC',
      '--rs-paper-alt': '#F5E8C8',
      '--rs-ink': '#2D2319',
      '--rs-titlebar': '#F6C445',
      '--rs-accent': '#F6C445',
      '--rs-mint': '#48B89F',
      '--rs-coral': '#F28B82',
      '--rs-sky': '#4BA3E3',
      '--rs-lilac': '#C3A6E8',
      '--rs-shadow': '#2D2319',
    },
  },
};

export const DEFAULT_THEME_ID = 'bone';

const FALLBACK = {
  wallpaper: '#B9D2E8',
  paper: '#FDF8EE',
  paperAlt: '#FAF3E0',
  ink: '#2D2319',
  titlebar: '#C3A6E8',
  accent: '#F6C445',
  mint: '#48B89F',
  coral: '#F28B82',
  sky: '#4BA3E3',
  lilac: '#C3A6E8',
  shadow: '#2D2319',
};

export const colors = {
  paper: FALLBACK.paper,
  paperAlt: FALLBACK.paperAlt,
  ink: FALLBACK.ink,
  mustard: FALLBACK.accent,
  mint: FALLBACK.mint,
  coral: FALLBACK.coral,
  sky: FALLBACK.sky,
  lilac: FALLBACK.lilac,
};

export const shadows = {
  sm: '2px 2px 0px var(--rs-shadow)',
  md: '3px 3px 0px var(--rs-shadow)',
  lg: '4px 4px 0px var(--rs-shadow)',
  xl: '6px 6px 0px var(--rs-shadow)',
  pressed: '1px 1px 0px var(--rs-shadow)',
};

export const borders = {
  standard: '2px solid var(--rs-ink)',
  heavy: '3px solid var(--rs-ink)',
};

export function getTheme(themeId) {
  return THEMES[themeId] || THEMES[DEFAULT_THEME_ID];
}

export function applyTheme(themeId) {
  if (typeof document === 'undefined') return getTheme(themeId);
  const theme = getTheme(themeId);
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  Object.entries(theme.vars).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
  return theme;
}

/** Live CSS variable colors for canvas / inline styles. */
export function themeColors() {
  if (typeof document === 'undefined') return { ...FALLBACK };
  const s = getComputedStyle(document.documentElement);
  const read = (name, fb) => s.getPropertyValue(name).trim() || fb;
  return {
    wallpaper: read('--rs-wallpaper', FALLBACK.wallpaper),
    paper: read('--rs-paper', FALLBACK.paper),
    paperAlt: read('--rs-paper-alt', FALLBACK.paperAlt),
    ink: read('--rs-ink', FALLBACK.ink),
    titlebar: read('--rs-titlebar', FALLBACK.titlebar),
    accent: read('--rs-accent', FALLBACK.accent),
    mint: read('--rs-mint', FALLBACK.mint),
    coral: read('--rs-coral', FALLBACK.coral),
    sky: read('--rs-sky', FALLBACK.sky),
    lilac: read('--rs-lilac', FALLBACK.lilac),
    shadow: read('--rs-shadow', FALLBACK.shadow),
  };
}

export default {
  THEMES,
  colors,
  shadows,
  borders,
  getTheme,
  applyTheme,
  themeColors,
  DEFAULT_THEME_ID,
};
