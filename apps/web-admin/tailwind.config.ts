import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0df2f2',
        'primary-dark': '#0bb8b8',
        'primary-glow': 'rgba(13, 242, 242, 0.15)',
        'background-dark': '#0f172a',
        'surface-dark': 'rgba(30, 41, 59, 0.7)',
        'sidebar-dark': '#111827',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'success-light': 'rgba(52, 211, 153, 0.15)',
        'success-text': '#34d399',
        'info-light': 'rgba(13, 242, 242, 0.1)',
        'info-text': '#22d3ee',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'page-gradient':
          'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)',
      },
    },
  },
  plugins: [],
};

export default config;
