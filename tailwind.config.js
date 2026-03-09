// tailwind.config.js
import daisyui from 'daisyui'

export default {
  darkMode: "class", // IMPORTANTE: usar "class"
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: { extend: {} },
  plugins: [daisyui],
  daisyui: { themes: ['light', 'dark'] },
}