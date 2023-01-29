/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        app_base_font: "'Source Sans Pro', sans-serif",
      },
      backgroundColor: {
        notes_bg: "rgba(0, 0, 0, 0.018)",
      },
    },
  },
  plugins: [],
};
