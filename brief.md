# 📚 Brief del Proyecto: Portfolio Alejandro Delgado 2025

## 🎯 Objetivo del Proyecto
Migración de un portfolio web personal desde Vite a Astro, manteniendo la estética visual y el contenido original, pero agregando capacidades dinámicas para gestionar trabajos mediante archivos Markdown.

**Proyecto original:** `C:\www\aledesign` (Vite)  
**Proyecto nuevo:** `C:\www\aledesign-portfolio-2025` (Astro)  
**URL en producción:** https://aledesign.dev/

---

## 📋 Cronología de Desarrollo

### **Fase 1: Análisis y Configuración Inicial**

#### 1.1 Creación de la estructura base del proyecto
- Se creó el directorio principal `C:\www\aledesign-portfolio-2025`
- Se configuró el proyecto con Astro 4.16.18
- Se estableció la estructura de carpetas:
  ```
  src/
  ├── components/   # Componentes reutilizables
  ├── content/      # Contenido dinámico (trabajos)
  ├── layouts/      # Layouts principales
  ├── pages/        # Páginas del sitio
  └── styles/       # Estilos SASS
  ```

#### 1.2 Configuración inicial de dependencias
**package.json inicial:**
```json
{
  "dependencies": {
    "@astrojs/sitemap": "^3.2.1",
    "astro": "^4.16.18"
  },
  "devDependencies": {
    "sass": "^1.83.0"
  }
}
```

---

### **Fase 2: Migración de Contenido y Estilos**

#### 2.1 Sistema de contenido dinámico
Se implementó un sistema de gestión de contenido usando archivos Markdown para los trabajos:

**Estructura de un trabajo (`.md`):**
```markdown
---
title: "UX/UI Web Designer"
category: "design"  # design | marketing | management
place: "Nombre de la Empresa"
type: "Tipo de contrato"
period: "2024 - Present"
tags: ["Tag1", "Tag2"]
order: 1
status: "published"  # published | draft
---

- Tarea o responsabilidad 1
- Tarea o responsabilidad 2
```

#### 2.2 Migración de estilos SASS
**Proceso manual requerido:**
1. Copiar toda la carpeta `sass` desde `C:\www\aledesign\sass`
2. Pegarla en `C:\www\aledesign-portfolio-2025\src\styles`
3. Mantener la estructura: abstracts/, base/, components/, layout/, utilities/, vendor/

#### 2.3 Migración de assets
**Imágenes a copiar manualmente:**
- aledesign-avatar.png
- banner-background.png
- bg.png
- body-background.png
- grain.png

Desde: `C:\www\aledesign\public\images\`  
Hacia: `C:\www\aledesign-portfolio-2025\public\images\`

---

### **Fase 3: Resolución de Problemas y Optimizaciones**

#### 3.1 Problema: Errores de compilación SASS
**Síntoma:** Warnings de deprecación y errores de importación

**Soluciones aplicadas:**
1. Se actualizaron las dependencias:
   - sass a v1.90.0
   - Se agregó postcss-preset-env v10.2.4
   - Se agregó vite-plugin-html-purgecss v0.1.1
   - Se agregó eslint-config-wesbos v4.3.2

2. Se corrigió la importación de estilos en `BaseLayout.astro`:
   ```astro
   ---
   import '../styles/main.scss';
   ---
   ```
   **Nota:** NO usar `<link>` ni `<style>` con `@import` (deprecado)

3. Se configuró Vite para manejar módulos SASS:
   ```javascript
   preprocessorOptions: {
     scss: {
       additionalData: `@use "sass:map"; @use "sass:math"; @use "sass:meta";`
     }
   }
   ```

#### 3.2 Personalización de la salida CSS
**Objetivo:** Cambiar la estructura de salida de `_astro/[hash].css` a `css/app.css`

**Solución implementada:** Plugin personalizado en `astro.config.mjs`:
```javascript
function renameCSSPlugin() {
  return {
    name: 'rename-css',
    generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.endsWith('.css')) {
          const file = bundle[fileName];
          const newFileName = 'css/app.css';
          bundle[newFileName] = file;
          file.fileName = newFileName;
          delete bundle[fileName];
        }
      }
    }
  };
}
```

**Configuración adicional:**
- `cssCodeSplit: false` - Un solo archivo CSS
- `inlineStylesheets: 'never'` - Siempre archivo externo
- Organización de assets en carpetas específicas (css/, js/, images/)

---

### **Fase 4: Componentes y Estructura Final**

#### 4.1 Componentes creados
1. **BaseLayout.astro** - Layout principal con SEO completo
2. **Header.astro** - Información personal y redes sociales
3. **Job.astro** - Componente para mostrar cada trabajo

#### 4.2 Páginas implementadas
1. **index.astro** - Página principal que lista todos los trabajos
2. **404.astro** - Página de error personalizada

#### 4.3 SEO y optimizaciones
- Meta tags completos (Open Graph, Twitter Cards)
- Structured Data (Schema.org)
- Sitemap automático
- robots.txt configurado
- Google Analytics y Tag Manager integrados

---

## 🚀 Comandos del Proyecto

```bash
# Instalación inicial
npm install

# Desarrollo local
npm run dev          # Servidor en http://localhost:4321

# Construcción para producción
npm run build        # Genera carpeta dist/

# Vista previa del build
npm run preview      # Sirve el build localmente
```

---

## 📁 Estructura Final del Build

```
dist/
├── css/
│   └── app.css          # Todos los estilos compilados
├── js/
│   └── [archivos].js    # JavaScript organizado
├── images/
│   └── [imágenes]       # Assets de imagen
├── index.html           # Página principal
├── 404.html            # Página de error
└── sitemap-index.xml   # Sitemap para SEO
```

---

## ✅ Estado Actual del Proyecto

### Funcionando correctamente:
- ✅ Sitio desplegado en https://aledesign.dev/
- ✅ Contenido completo migrado
- ✅ Sistema de gestión de trabajos con Markdown
- ✅ Build optimizado sin errores
- ✅ SEO completo implementado

### Pendiente de verificación:
- ⚠️ Los estilos visuales no se están aplicando en producción
- Posible problema con la carga del archivo CSS en el servidor

---

## 📝 Cómo Agregar Nuevos Trabajos

1. Crear un archivo en `src/content/jobs/` (ej: `06-nuevo-trabajo.md`)
2. Usar el formato establecido con frontmatter y tareas
3. El trabajo aparecerá automáticamente al reconstruir el sitio

---

## 🔧 Mantenimiento y Actualizaciones

### Para modificar estilos:
- **Colores:** `src/styles/abstracts/_colors.scss`
- **Tipografías:** `src/styles/abstracts/_typography.scss`
- **Espaciados:** `src/styles/abstracts/_sizes.scss`

### Para actualizar contenido:
- **Información personal:** Editar `src/components/Header.astro`
- **Trabajos:** Editar archivos en `src/content/jobs/`

### Para desplegar cambios:
1. Hacer cambios localmente
2. Ejecutar `npm run build`
3. Subir contenido de `dist/` al servidor

---

## 📌 Notas Importantes

1. **SASS Moderno:** El proyecto usa `@use` y `@forward`, no `@import` (deprecado)
2. **Contenido Dinámico:** Los trabajos se gestionan mediante archivos Markdown
3. **Build Optimizado:** CSS y JS minificados automáticamente
4. **SEO Ready:** Todas las meta tags y structured data configuradas
5. **Responsive:** El sitio se adapta a todos los dispositivos

---

## 📝 Actualización: 11 de Agosto de 2025 - Configuración de Build Mejorada

### Cambios realizados en `astro.config.mjs`:

#### 1. **Opciones de Build Configurables**
Se agregó un objeto `BUILD_OPTIONS` al inicio del archivo con las siguientes opciones:

```javascript
const BUILD_OPTIONS = {
    minifyCSS: true,        // Controla la minificación del CSS
    enablePurgeCSS: false,  // Activa/desactiva PurgeCSS
    enablePostCSS: false,   // Activa/desactiva PostCSS
    cssFileName: 'app.css', // Nombre del archivo CSS de salida
};
```

#### 2. **Limpieza de Código**
- Se eliminó código no utilizado para renombrar archivos JS, imágenes y fuentes
- Se simplificó la función `assetFileNames` para solo manejar CSS
- Se mantuvo solo la funcionalidad esencial para generar `app.css`

#### 3. **Preparación para PurgeCSS y PostCSS**
- Se agregaron funciones placeholder para PurgeCSS y PostCSS
- Incluye ejemplos comentados de cómo configurar cada herramienta
- Instrucciones detalladas de instalación y uso

#### 4. **Control de Minificación**
- Ahora se puede controlar si el CSS se minifica o no
- Útil para debugging en desarrollo
- Configuración simple: cambiar `minifyCSS` a true/false

### Uso de las nuevas opciones:

**Para desarrollo (CSS sin minificar):**
```javascript
minifyCSS: false
```

**Para producción (CSS minificado):**
```javascript
minifyCSS: true
```

**Para activar PurgeCSS** (eliminar CSS no usado):
1. Instalar: `npm install @fullhuman/postcss-purgecss`
2. Cambiar: `enablePurgeCSS: true`
3. Configurar las opciones en la función `purgeCSSPlugin()`

**Para activar PostCSS** (procesamiento adicional):
1. Instalar plugins: `npm install postcss-preset-env autoprefixer`
2. Cambiar: `enablePostCSS: true`
3. Configurar plugins en la función `getPostCSSConfig()`

---

*Última actualización: 11 de Agosto de 2025*
