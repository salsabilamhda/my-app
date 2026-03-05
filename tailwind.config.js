/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Memproses file di folder app
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Memproses file di folder pages
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Memproses file di folder components
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Memproses semua file di folder src
  ],
  theme: {
    extend: {}, // Tempat untuk menambah tema custom
  },
  plugins: [],
}