/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      colors: {
        ink: '#0A0D0A',
        surface: '#111710',
        surface2: '#171E16',
        line: '#263026',
        bone: '#EEF1E7',
        muted: '#8D978A',
        volt: {
          DEFAULT: '#BAFF3B',
          dim: '#8CBF2C',
        },
        violet: {
          DEFAULT: '#8B5CF6',
          dim: '#5B3AA8',
        },
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(198,255,58,0.35)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
}

