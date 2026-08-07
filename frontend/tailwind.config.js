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
        ink: '#0A0A0E',
        surface: '#131318',
        surface2: '#1B1B22',
        line: '#2A2A33',
        bone: '#F3F1EA',
        muted: '#8B8B96',
        volt: {
          DEFAULT: '#C6FF3A',
          dim: '#8FBF1E',
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
