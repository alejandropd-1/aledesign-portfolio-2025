import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin personalizado para renombrar archivos CSS
function renameCSSPlugin() {
    return {
        name: 'rename-css',
        generateBundle(options, bundle) {
            // Buscar todos los archivos CSS en el bundle
            for (const fileName in bundle) {
                if (fileName.endsWith('.css')) {
                    const file = bundle[fileName];
                    // Crear nuevo nombre de archivo
                    const newFileName = 'css/app.css';
                    // Renombrar el archivo en el bundle
                    bundle[newFileName] = file;
                    // Actualizar el nombre del archivo
                    file.fileName = newFileName;
                    // Eliminar el archivo viejo del bundle
                    delete bundle[fileName];
                }
            }
        },
    };
}

// https://astro.build/config
export default defineConfig({
    site: 'https://www.aledesign.dev',
    integrations: [sitemap()],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "sass:map"; @use "sass:math"; @use "sass:meta";`,
                },
            },
        },
        plugins: [renameCSSPlugin()],
        build: {
            rollupOptions: {
                output: {
                    // Para archivos JS
                    chunkFileNames: 'js/[name].[hash].js',
                    entryFileNames: 'js/[name].[hash].js',
                    // Para otros assets (imágenes, fuentes)
                    assetFileNames: (assetInfo) => {
                        const info = assetInfo.name.split('.');
                        const ext = info[info.length - 1];

                        // CSS ya se maneja con el plugin
                        if (ext === 'css') {
                            return 'css/app.css';
                        }

                        // Imágenes
                        if (
                            /\.(png|jpe?g|gif|svg|webp|ico)$/i.test(
                                assetInfo.name,
                            )
                        ) {
                            return 'images/[name][extname]';
                        }

                        // Fuentes
                        if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
                            return 'fonts/[name][extname]';
                        }

                        // Default
                        return 'assets/[name][extname]';
                    },
                },
            },
            // No dividir CSS
            cssCodeSplit: false,
        },
    },
    build: {
        // Asegurar que los estilos no se inlineen
        inlineStylesheets: 'never',
    },
});
