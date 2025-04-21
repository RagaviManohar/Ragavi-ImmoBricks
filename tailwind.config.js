/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral colors
        neutral: {
          0: "#FFFFFF", // Neutral [0]
          50: "#F5F7FA", // Neutral [50]
          100: "#F2F5F8", // Neutral [100]
          200: "#E1E4EA", // Neutral [200]
          300: "#CACFD8", // Neutral [300]
          400: "#99A0AE", // Neutral [400]
          500: "#717784", // Neutral [500]
          600: "#525866", // Neutral [600]
          700: "#2B303B", // Neutral [700]
          800: "#222530", // Neutral [800]
          900: "#181B25", // Neutral [900]
          950: "#0E121B", // Neutral [950]
        },
        // Yellow colors
        yellow: {
          10: "rgba(255, 219, 67, 0.1)", // Yellow [10]
          50: "rgba(255, 219, 67, 0.5)", // Yellow [50]
          100: "#FFF6D0", // Yellow [100]
          200: "#FFEDA1", // Yellow [200]
          300: "#FFE472", // Yellow [300]
          400: "#FFDB43", // Yellow [400]
          500: "#FFD41E", // Yellow [500]
          600: "#F8C800", // Yellow [600]
          700: "#D3AA00", // Yellow [700]
          800: "#AE8C00", // Yellow [800]
          900: "#896F00", // Yellow [900]
          950: "#645100", // Yellow [950]
        },
        // Blue colors
        blue: {
          10: "rgba(50, 70, 160, 0.1)", // Blue [10]
          50: "rgba(50, 70, 160, 0.5)", // Blue [50]
          100: "#D9DEF3", // Blue [100]
          200: "#B3BCE7", // Blue [200]
          300: "#8D9BDB", // Blue [300]
          400: "#677ACF", // Blue [400]
          500: "#4158C3", // Blue [500]
          600: "#3246A0", // Blue [600] *
          700: "#2B3C89", // Blue [700]
          800: "#233171", // Blue [800]
          900: "#1C275A", // Blue [900]
          950: "#151D42", // Blue [950]
        },
        // Teal colors
        teal: {
          10: "rgba(0, 110, 110, 0.1)", // Teal [10]
          50: "rgba(0, 110, 110, 0.5)", // Teal [50]
          100: "#A6FFFF", // Teal [100]
          200: "#7AFFFF", // Teal [200]
          300: "#4DFFFF", // Teal [300]
          400: "#21FFFF", // Teal [400]
          500: "#00F3F3", // Teal [500]
          600: "#00C7C7", // Teal [600]
          700: "#009A9A", // Teal [700]
          800: "#006E6E", // Teal [800] *
          900: "#005252", // Teal [900]
          950: "#003636", // Teal [950]
        },
        // Green colors
        green: {
          50: "#E0FAEC", // Green [50]
          100: "#D0FBE9", // Green [100]
          200: "#C2F5DA", // Green [200]
          300: "#84EBB4", // Green [300]
          400: "#3EE089", // Green [400]
          500: "#1FC16B", // Green [500]
          600: "#1DAF61", // Green [600]
          700: "#178C4E", // Green [700]
          800: "#1A7544", // Green [800]
          900: "#16643B", // Green [900]
          950: "#0B4627", // Green [950]
        },
        // Orange colors
        orange: {
          50: "#FFF1EB", // Orange [50]
          100: "#FFE3D5", // Orange [100]
          200: "#FFD5C0", // Orange [200]
          300: "#FFBA97", // Orange [300]
          400: "#FF9A68", // Orange [400]
          500: "#FF8447", // Orange [500]
          600: "#E97135", // Orange [600]
          700: "#D05E25", // Orange [700]
          800: "#AD4E1F", // Orange [800]
          900: "#8B3E18", // Orange [900]
          950: "#682F12", // Orange [950]
        },
        // Red colors
        red: {
          50: "#FFEBEC", // Red [50]
          100: "#FFD5D8", // Red [100]
          200: "#FFC0C5", // Red [200]
          300: "#FF97A0", // Red [300]
          400: "#FF6875", // Red [400]
          500: "#FB3748", // Red [500]
          600: "#E93544", // Red [600]
          700: "#D02533", // Red [700]
          800: "#AD1F2B", // Red [800]
          900: "#8B1822", // Red [900]
          950: "#681219", // Red [950]
        },
        // Semantic color tokens
        primary: {
          "alpha-10": "rgba(71, 108, 255, 0.1)", // primary-alpha-10
          "alpha-16": "rgba(71, 108, 255, 0.16)", // primary-alpha-16
          base: "#4158C3", // primary-base (blue-500)
          darker: "#2B3C89", // primary-darker (blue-700)
          dark: "#233171", // primary-dark (blue-800)
        },
      },
    },
  },
  plugins: [],
};
