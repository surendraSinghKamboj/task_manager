/** @type {import('tailwindcss').Configuration} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EBEBFF",
          100: "#D2D2FE",
          200: "#A6A4FE",
          300: "#7E7CFD",
          400: "#524FFD",
          500: "#2522FC",
          600: "#0703E2",
          700: "#0502AB",
          800: "#03026F",
          900: "#020137",
          950: "#01001E",
        },
        secondary: {
          50: "#FBEBFF",
          100: "#F5D2FE",
          200: "#ECA4FE",
          300: "#E37CFD",
          400: "#DA4FFD",
          500: "#CF21FC",
          600: "#B603E2",
          700: "#8902AB",
          800: "#59026F",
          900: "#2C0137",
          950: "#18001E",
        },
        button: {
          50: "#FFF1EB",
          100: "#FEDFD2",
          200: "#FEBFA4",
          300: "#FDA37C",
          400: "#FD834F",
          500: "#FC6121",
          600: "#E24603",
          700: "#AB3502",
          800: "#6F2202",
          900: "#371101",
          950: "#1E0900",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
