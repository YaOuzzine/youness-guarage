import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#1a1a1a',
        'charcoal-dark': '#121212',
        'electric-teal': '#00f0ff',
        'fresh-mint': '#66ffcc',
        'glass-dark': 'rgba(20, 20, 20, 0.6)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        // Admin palette
        'admin-primary': '#0df2f2',
        'admin-bg': '#0f172a',
        'admin-surface': 'rgba(30, 41, 59, 0.7)',
        'admin-sidebar': '#111827',
      },
      fontFamily: {
        display: ['var(--font-inter)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow-teal': '0 0 15px rgba(0, 240, 255, 0.3)',
        'glow-mint': '0 0 15px rgba(102, 255, 204, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
