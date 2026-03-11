import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // 🕵️‍♀️ INDISPENSABLE: Aquí le decimos al robot dónde vive la app
    baseUrl: 'http://localhost:5173', 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // ✅ Para que no se maree con el motor de Vite
    supportFile: false,
  },
});
