/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'red': colors.red,
        'blue': colors.blue,
      }
    },
  },
  variants: {
    extend: {
      display: ["service-hover", "param-hover", "group-hover"],
    },
  },
  mode: "jit",
  darkMode: "class",
  plugins: [
    require('flowbite/plugin'),
    require("@tailwindcss/forms"),
    require("@vechaiui/core")({
      colors: [
        'red',
        'blue'
      ]
    }),
  ],
}