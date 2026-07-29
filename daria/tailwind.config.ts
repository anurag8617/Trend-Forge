/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        background: "#111113",
        surface: "#1C1C1E",
        card: "#18191C",
        border: "#2C2D32",
        primary: "#26E7FF",
        primarySoft: "#5AD7E5",
        glow: "#7CF5FF",
        forecast: "#9B6CFF",
        execute: "#F8B133",
        success: "#31D98C",
        warning: "#FFC857",
        danger: "#FF5E7A",
        text: "#FFFFFF",
        textSecondary: "#C9CDD2",
        muted: "#8A8F98",
        accent: 'rgb(var(--theme-accent-rgb) / <alpha-value>)',
        dariaNavy: '#0A0F1C',
        dariaIndigo: '#1A1B41',
      },
      backgroundImage: {
        'navy-indigo-gradient': 'linear-gradient(to bottom right, #0A0F1C, #1A1B41)',
      }
    },
  },
  plugins: [],
}
