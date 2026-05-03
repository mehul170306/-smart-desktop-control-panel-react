/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        foreground: "#f9fafb",
        card: "rgba(17, 24, 39, 0.7)",
        primary: {
          DEFAULT: "#3b82f6",
          glow: "rgba(59, 130, 246, 0.5)",
        },
        secondary: {
          DEFAULT: "#8b5cf6",
          glow: "rgba(139, 92, 246, 0.5)",
        },
        accent: {
          DEFAULT: "#10b981",
          glow: "rgba(16, 185, 129, 0.5)",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        'neon-blue': '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
        'neon-purple': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
      }
    },
  },
  plugins: [],
}
