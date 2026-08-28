/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-base': 'var(--bg-base)',
        'bg-surface': 'var(--bg-surface)',
        'bg-surface-2': 'var(--bg-surface-2)',
        'border-custom': 'var(--border)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'risk-high': 'var(--risk-high)',
        'risk-high-bg': 'var(--risk-high-bg)',
        'risk-medium': 'var(--risk-medium)',
        'risk-medium-bg': 'var(--risk-medium-bg)',
        'risk-low': 'var(--risk-low)',
        'risk-low-bg': 'var(--risk-low-bg)',
        'positive': 'var(--positive)',
        'negative': 'var(--negative)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'fintech': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'fintech-hover': '0 8px 30px -4px rgba(0, 0, 0, 0.5)',
        'glow-accent': '0 0 15px rgba(45, 212, 191, 0.25)',
      },
    },
  },
  plugins: [],
}
