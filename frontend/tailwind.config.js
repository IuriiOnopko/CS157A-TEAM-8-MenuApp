/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F2",
        ink: "#1B211A",
        sage: "#2F6F4E",
        "sage-dark": "#244A32",
        clay: "#B45309",
        card: "#FFFFFF",
        border: "#EDE7D9",
        "border-strong": "#E1DACB",
        muted: "#4B5A46",
        "muted-2": "#6B7566",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
