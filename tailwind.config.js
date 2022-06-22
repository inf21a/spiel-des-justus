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
        qCbg: "#98D7D6", // question Card background
        qCB: "#83B5B4", // question Card button
        qCBH: "#72A5A4", // question Card button hover
        qCBD: "#CBDFDF", // question Card button disabled
      },
    },
  },
  plugins: [],
};
