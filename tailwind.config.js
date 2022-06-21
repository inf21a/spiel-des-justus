/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        justusbg: "#00D1C5",
        justusbgold: "#ffedb6",
        justusfont: "#FFE500",
        lButton: "#00A69C", // lobby Button
        lButtonH: "#009289", // lobby Button hover
        lButtonD: "#89DBD6", // lobby Button disabled
        lBred: "#FF7070", // lobby Button red
        lBredH: "#FF5555", // lobby Button red hover
      },
    },
  },
  plugins: [],
};
