import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import gzipPlugin from 'rollup-plugin-gzip';

// ============================================
// PANEL DE CONTROL DE LA COMPILACIÓN (BUILD)
// ============================================
const OPCIONES_BUILD = {
    // Controla si el CSS se hace más pequeño (minifica) para producción.
    minificarCSS: true, // `true` = minificado (opción por defecto) | `false` = sin minificar

    // El nombre que tendrá tu archivo CSS final.
    nombreArchivoCSS: 'app.css',

    // --- Herramientas para CSS (Plugins de PostCSS) ---
    // Activa las herramientas que quieras usar al compilar tu sitio.
    usarAutoprefixer: true, // Añade prefijos de navegador automáticamente (ej: -webkit-)
    usarCssNano: true, // Optimiza y reduce aún más el tamaño del CSS.
    usarPostcssPresetEnv: true, // Te permite usar sintaxis moderna de CSS y la hace compatible.
};

// ============================================
// CONFIGURACIÓN DE LAS HERRAMIENTAS DE CSS (POSTCSS)
// ============================================
// Aquí creamos una lista vacía para añadir las herramientas que activaste arriba.
const pluginsPostCSS = [];

// Si `usarAutoprefixer` es `true`, lo añadimos a la lista.
if (OPCIONES_BUILD.usarAutoprefixer) {
    pluginsPostCSS.push(autoprefixer());
}

// Si `usarCssNano` es `true`, lo añadimos a la lista.
if (OPCIONES_BUILD.usarCssNano) {
    // Puedes ver las optimizaciones aquí: https://cssnano.co/docs/optimisations/
    pluginsPostCSS.push(cssnano({ preset: 'default' }));
}

// Si `usarPostcssPresetEnv` es `true`, lo añadimos a la lista.
if (OPCIONES_BUILD.usarPostcssPresetEnv) {
    // Puedes ver las características aquí: https://preset-env.cssdb.org/features
    pluginsPostCSS.push(postcssPresetEnv({ stage: 3 }));
}

// ============================================
// CONFIGURACIÓN PRINCIPAL DE ASTRO
// ============================================
export default defineConfig({
    // La dirección de tu sitio web.
    site: 'https://www.aledesign.dev',

    // Integraciones o "superpoderes" para Astro.
    integrations: [sitemap()], // Añade un mapa del sitio automáticamente.

    // Configuración para Vite (la herramienta que Astro usa por debajo).
    vite: {
        build: {
            // Le decimos a Vite si debe minificar o no, según tu elección en OPCIONES_BUILD.
            minify: OPCIONES_BUILD.minificarCSS,
            // Pre-compresión gzip
            reportCompressedSize: true,
            rollupOptions: {
                output: {
                    // CSS va a assets/app.css
                    assetFileNames: (assetInfo) => {
                        if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                            return `assets/${OPCIONES_BUILD.nombreArchivoCSS}`;
                        }
                        // Imágenes van a assets/images/
                        if (
                            assetInfo.name &&
                            /\.(png|jpe?g|svg|gif|webp)$/i.test(assetInfo.name)
                        ) {
                            return 'assets/images/[name]_[hash][extname]';
                        }
                        return 'assets/[name]_[hash][extname]';
                    },
                    // // Minimizar JS chunks (solo lo esencial)
                    // chunkFileNames: 'assets/js/[name]_[hash].js',
                    // entryFileNames: 'assets/js/[name]_[hash].js',
                    // manualChunks: undefined, // Evita chunks innecesarios
                },
            },
            // Plugins para compresión
            plugins: [
                gzipPlugin({
                    filter: /\.(js|css|html|svg)$/,
                    threshold: 1024, // Solo archivos >1KB
                })
            ],
        },
        css: {
            // Aquí le pasamos a Vite la lista de herramientas para CSS que preparamos antes.
            postcss: {
                plugins: pluginsPostCSS,
            },
            preprocessorOptions: {
                scss: {
                    // Esto es para la gente que usa SASS/SCSS.
                    additionalData: `@use "sass:map"; @use "sass:math"; @use "sass:meta";`,
                },
            },
        },
    },

    // Configuración de optimización de imágenes
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
    },

    // Configuración de la compilación (build) de Astro.
    build: {
        // Esto fuerza a que el CSS siempre esté en un archivo separado (app.css).
        inlineStylesheets: 'never',
        // Dividir en menos chunks
        split: false,
    },

    // Configuración de salida para sitio completamente estático
    output: 'static',
});
