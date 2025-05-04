/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, rgba(11, 26, 161, 0.2) 0%, rgba(9, 121, 43, 0.2) 38%, rgba(24, 204, 14, 0.2) 100%)",
      },
      colors: {
        primary: {
          DEFAULT: "#00FF7F",
          dark: "#00CC66",
        },
        background: {
          DEFAULT: "#0A0A0A",
          lighter: "#1A1A1A",
          paper: "#121212",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0A0",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
        "fade-loop": "fade 2s ease-in-out infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            transform: "scale(1)",
            "box-shadow": "0 0 10px #00FF7F, 0 0 20px #00FF7F",
          },
          "50%": {
            transform: "scale(1.05)",
            "box-shadow": "0 0 20px #00FF7F, 0 0 40px #00FF7F",
          },
        },
        fade: {
          "0%": { opacity: "0.7" },
          "25%": { opacity: "0.85" },
          "50%": { opacity: "1" },
          "75%": { opacity: "0.85" },
          "100%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
  important: true,
};
