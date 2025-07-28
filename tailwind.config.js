/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'sunset-orange': '#ff3c00',
        'sunset-yellow': '#ffb600',
        // add more colors here
      },
    },
  },
  plugins: [],
};
