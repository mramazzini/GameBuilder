/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // You can extend the default theme with custom values here
      colors: {
        primary: "#3498db",
        secondary: "#e74c3c",
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // Add any additional plugins you want to use here
  ],
};
