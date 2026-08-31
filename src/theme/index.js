// RETROSPEED Canonical Design Tokens (Locked 7-Color Paper-Arcade Palette)

export const colors = {
  paper: '#FDF8EE',      // Surface cream
  paperAlt: '#FAF3E0',   // Container depth cream
  ink: '#2D2319',        // Dark chocolate ink (outlines, text, shadows)
  mustard: '#F6C445',    // Speed punch / primary action
  mint: '#48B89F',       // Precision punch / success / target halo
  coral: '#F28B82',      // Miss punch / danger / cracked heart
  sky: '#4BA3E3',        // Focus punch / time / metrics
  lilac: '#C3A6E8'       // Special punch / shortcuts / titlebars
};

export const shadows = {
  sm: '2px 2px 0px #2D2319',
  md: '3px 3px 0px #2D2319',
  lg: '4px 4px 0px #2D2319',
  xl: '6px 6px 0px #2D2319',
  pressed: '1px 1px 0px #2D2319'
};

export const borders = {
  standard: '2px solid #2D2319',
  heavy: '3px solid #2D2319'
};

export default {
  colors,
  shadows,
  borders
};
