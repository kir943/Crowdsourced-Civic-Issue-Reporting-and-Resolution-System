/**
 * CivicTrack Design Tokens Reference
 * Institutional Municipal Aesthetic System
 */

export const THEME_TOKENS = {
  colors: {
    primary: {
      deepNavy: '#00274e',
      container: '#0f3d6e',
      onContainer: '#84a9e0',
      fixed: '#d4e3ff',
    },
    secondary: {
      cobalt: '#1d4ed8',
      container: '#4069f2',
      fixed: '#dce1ff',
    },
    surfaces: {
      base: '#faf8ff',
      card: '#ffffff',
      subdued: '#f2f3ff',
      container: '#eaedff',
      containerHigh: '#e2e7ff',
      containerHighest: '#dae2fd',
    },
    neutrals: {
      textDark: '#131b2e',
      textVariant: '#43474f',
      outline: '#737780',
      outlineVariant: '#c3c6d0',
    },
    status: {
      resolved: {
        bg: '#F0FDF4',
        border: '#BBF7D0',
        text: '#15803D',
        dot: '#16A34A',
      },
      inProgress: {
        bg: '#EFF6FF',
        border: '#BFDBFE',
        text: '#1D4ED8',
        dot: '#2563EB',
      },
      pending: {
        bg: '#FFFBEB',
        border: '#FDE68A',
        text: '#B45309',
        dot: '#D97706',
      },
      escalated: {
        bg: '#FEF2F2',
        border: '#FECACA',
        text: '#B91C1C',
        dot: '#DC2626',
      },
      inspection: {
        bg: '#EEF2FF',
        border: '#C7D2FE',
        text: '#4338CA',
        dot: '#4F46E5',
      },
    },
  },
  typography: {
    fontFamily: {
      sans: "'Public Sans', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
  },
  borderRadius: {
    sm: '0.125rem',
    default: '0.25rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
} as const;
