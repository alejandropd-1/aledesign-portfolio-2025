import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ============================================
// CONFIGURACIÓN DE BUILD - OPCIONES
// ============================================
const BUILD_OPTIONS = {
    // CSS - Minificación
    minifyCSS: false, // true = minificado | false = sin minificar

    // PurgeCSS - Elimina CSS no utilizado
    enablePurgeCSS: false, // true = activo | false = desactivado

    // PostCSS - Procesa CSS con plugins adicionales
    enablePostCSS: false, // true = activo | false = desactivado

    // Nombre del archivo CSS de salida
    cssFileName: 'app.css', // Puedes cambiar el nombre aquí
};

// ============================================
// PLUGINS PERSONALIZADOS
// ============================================

// Plugin para renombrar archivos CSS a app.css (o el nombre configurado)
function renameCSSPlugin() {
    return {
        name: 'rename-css',
        generateBundle(options, bundle) {
            // Buscar todos los archivos CSS en el bundle
            for (const fileName in bundle) {
                if (fileName.endsWith('.css')) {
                    const file = bundle[fileName];
                    // Usar el nombre configurado
                    const newFileName = `css/${BUILD_OPTIONS.cssFileName}`;
                    // Renombrar el archivo en el bundle
                    bundle[newFileName] = file;
                    file.fileName = newFileName;
                    // Eliminar el archivo viejo del bundle
                    delete bundle[fileName];
                }
            }
        },
    };
}

// Plugin PurgeCSS - Elimina CSS no utilizado
function purgeCSSPlugin() {
    if (!BUILD_OPTIONS.enablePurgeCSS) return null;

    // EJEMPLO DE CONFIGURACIÓN PURGECSS
    // Para activar: cambia enablePurgeCSS a true arriba
    // e instala: npm install @fullhuman/postcss-purgecss

    return {
        name: 'purgecss',
        // Configuración de PurgeCSS
        // content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue}'],
        // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        // safelist: ['html', 'body'], // Clases que nunca se eliminarán
    };
}

// ============================================
// CONFIGURACIÓN POSTCSS
// ============================================
function getPostCSSConfig() {
    if (!BUILD_OPTIONS.enablePostCSS) return {};

    // EJEMPLO DE CONFIGURACIÓN POSTCSS
    // Para activar: cambia enablePostCSS a true arriba
    // e instala los plugins que necesites: npm install postcss-preset-env autoprefixer

    return {
        postcss: {
            plugins: [
                // Ejemplos de plugins PostCSS:
                // require('autoprefixer'),
                // require('postcss-preset-env')({ stage: 3 }),
                // require('cssnano') // Para minificación adicional
            ],
        },
    };
}

// ============================================
// CONFIGURACIÓN DE VITE
// ============================================
function getViteConfig() {
    const plugins = [renameCSSPlugin(), purgeCSSPlugin()].filter(Boolean); // Elimina plugins null/undefined

    return {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "sass:map"; @use "sass:math"; @use "sass:meta";`,
                },
            },
            // Controlar minificación de CSS
            ...(BUILD_OPTIONS.minifyCSS === false && {
                // Si minifyCSS es false, desactivar minificación
                transformer: 'lightningcss',
                lightningcss: {
                    minify: false,
                },
            }),
            ...getPostCSSConfig(),
        },
        plugins,
        build: {
            rollupOptions: {
                output: {
                    // Solo manejo de CSS, el resto se eliminó
                    assetFileNames: (assetInfo) => {
                        // CSS se maneja con el plugin renameCSSPlugin
                        if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                            return `css/${BUILD_OPTIONS.cssFileName}`;
                        }
                        // Assets por defecto (si hubiera otros)
                        return 'assets/[name][extname]';
                    },
                },
            },
            // No dividir CSS en múltiples archivos
            cssCodeSplit: false,
            // Controlar minificación general
            minify: BUILD_OPTIONS.minifyCSS ? 'esbuild' : false,
            // Configuración de minificación de CSS
            cssMinify: BUILD_OPTIONS.minifyCSS,
        },
    };
}

// ============================================
// CONFIGURACIÓN PRINCIPAL DE ASTRO
// ============================================
export default defineConfig({
    site: 'https://www.aledesign.dev',
    integrations: [
        sitemap(),
        // Aquí puedes agregar más integraciones de Astro si las necesitas
    ],
    vite: getViteConfig(),
    build: {
        // Asegurar que los estilos no se inlineen
        inlineStylesheets: 'never',
    },
});

// ============================================
// INSTRUCCIONES DE USO
// ============================================
/*
 * CÓMO USAR ESTA CONFIGURACIÓN:
 *
 * 1. MINIFICACIÓN CSS:
 *    - Cambia 'minifyCSS' a false si no quieres minificar
 *    - Por defecto está en true (minificado)
 *
 * 2. PURGECSS (Eliminar CSS no usado):
 *    - Cambia 'enablePurgeCSS' a true
 *    - Instala: npm install @fullhuman/postcss-purgecss
 *    - Descomenta y configura las opciones en purgeCSSPlugin()
 *
 * 3. POSTCSS (Procesamiento adicional de CSS):
 *    - Cambia 'enablePostCSS' a true
 *    - Instala los plugins que necesites:
 *      npm install postcss-preset-env autoprefixer cssnano
 *    - Descomenta y configura los plugins en getPostCSSConfig()
 *
 * 4. NOMBRE DEL ARCHIVO CSS:
 *    - Cambia 'cssFileName' para usar otro nombre
 *    - Por defecto es 'app.css'
 *
 * EJEMPLOS DE CONFIGURACIONES:
 *
 * // Desarrollo (sin minificar, sin purge):
 * const BUILD_OPTIONS = {
 *     minifyCSS: false,
 *     enablePurgeCSS: false,
 *     enablePostCSS: false,
 *     cssFileName: 'app.css',
 * };
 *
 * // Producción optimizada:
 * const BUILD_OPTIONS = {
 *     minifyCSS: true,
 *     enablePurgeCSS: true,
 *     enablePostCSS: true,
 *     cssFileName: 'app.min.css',
 * };
 */
