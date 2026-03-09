// postcss.config.cjs
// ✅ Esto siempre funciona con Vite + Tailwind 4.x
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}