/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#007FFF",
        // primary: "#FFC0CB",
        // primary: "#9d00ff",
      },
      backgroundImage: {
        gradient: "linear-gradient(to right,#318CE7,#007FFF)",
      },
    },
  },
  plugins: [],
};
