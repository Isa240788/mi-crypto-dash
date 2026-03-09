# Mi Crypto Dash

Mi Crypto Dash es una aplicación web bursátil que permite visualizar datos financieros en tiempo real utilizando la `API gratuita de Amazon Financial`. Está construida con **Vue 3**, **Vite** y utiliza **TailwindCSS** para estilos modernos, **Pinia** para manejo de estado y **ApexCharts** para gráficos interactivos.

## 🚀 Características

- Visualización de datos bursátiles y criptomonedas en tiempo real.

- Gráficas interactivas y dinámicas con ApexCharts.

- Manejo de estado centralizado con Pinia.

- Ruteo dinámico con Vue Router.

- Interfaz moderna y responsiva con TailwindCSS y DaisyUI.

- Integración con Firebase para autenticación y almacenamiento.

- Sanitización de contenido con DOMPurify para mayor seguridad.

## 🛠 Tecnologías

- Frontend: Vue 3, Vite, TailwindCSS, DaisyUI

- State Management: Pinia

- Ruteo: Vue Router

- Gráficos: ApexCharts, vue3-apexcharts

- Backend / Autenticación: Firebase

- Seguridad: DOMPurify

## ⚡Instalación

### Clona el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd mi-crypto-dash
```

### Instala las dependencias

```bash
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npm i -D daisyui@latest
```

### Inicia la aplicación en modo desarrollo

```bash
npm run dev
```

## 📁 Estructura del proyecto

```text
mi-crypto-dash/
├─ public/          # Archivos estáticos
├─ src/
│  ├─ assets/       # Imágenes y estilos
│  ├─ components/   # Componentes Vue
│  ├─ views/        # Vistas principales
│  ├─ router/       # Configuración de Vue Router
│  ├─ store/        # Pinia store
│  └─ main.js       # Entrada principal
├─ package.json
└─ vite.config.js
```

## 🔒 Seguridad

- Sanitización de contenido dinámico con DOMPurify para prevenir XSS.

- Buenas prácticas en el manejo de datos de Firebase y la API gratuita de Amazon.

## ⚙️ Configuración de Firebase

Crea un archivo .env en la raíz del proyecto con tus credenciales de Firebase:

```bash
VITE_FIREBASE_API_KEY=<tu_api_key>
VITE_FIREBASE_AUTH_DOMAIN=<tu_auth_domain>
VITE_FIREBASE_PROJECT_ID=<tu_project_id>
VITE_FIREBASE_STORAGE_BUCKET=<tu_storage_bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<tu_sender_id>
VITE_FIREBASE_APP_ID=<tu_app_id>
```

Luego reinicia el servidor de desarrollo.

## 📈 Uso

- Explora gráficos de acciones y criptomonedas en tiempo real.

- Filtra por rango de fechas y tipo de activo.

- Consulta indicadores clave de inversión de manera intuitiva.

## 📱 Futuras Mejoras de UX y Responsividad

Optimización móvil:

- Asegurarte de que los gráficos se vean correctamente en pantallas pequeñas.

- Menús desplegables tipo “hamburger” para navegación.

- Ajustes en tipografía y botones para tocar con facilidad.

Botones y conexiones al perfil:

- Botón para acceder al perfil del usuario con configuración y favoritos.

- Historial de gráficos o acciones favoritas por usuario.

- Posibilidad de personalizar alertas o notificaciones.

## 📊 Futuras Mejoras de Datos y Visualización

Indicadores avanzados:

- Promedios móviles, RSI, MACD u otros indicadores técnicos.

- Mostrar tendencias y cambios porcentuales de manera clara.

Filtrado avanzado:

- Filtrar por rangos de fecha, tipo de activo, volumen de transacción, etc.

Notificaciones o alertas:

- Alertas cuando un activo suba o baje cierto porcentaje.

- Push notifications o correo vía Firebase Cloud Functions.

🔒 Seguridad y Backend

Autenticación avanzada:

- Login con Google, GitHub o correo y contraseña (Firebase Auth).

- Protección de rutas para usuarios autenticados.

Protección de datos sensibles:

- Guardar tokens de la API y credenciales solo en el backend o Firebase Functions.

- Validar y sanitizar toda entrada del usuario.

⚡ Experiencia de Usuario Adicional

Favoritos y watchlist:

- Permitir que el usuario marque sus acciones o criptos favoritas y las vea al abrir la app.

Exportar datos:

- Exportar gráficos o tablas a CSV o PDF.

- Facilita análisis fuera de la app.

- Animaciones y microinteracciones:

- Hover sobre gráficos para ver valores exactos.

- Transiciones suaves al cambiar de vista.

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
