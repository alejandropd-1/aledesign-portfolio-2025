# Alejandro Delgado Portfolio 2025

Portfolio profesional de Alejandro Delgado - UX/UI Web Designer

## 🚀 Estructura del Proyecto

```
/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       └── (imágenes del portfolio)
├── src/
│   ├── components/
│   │   ├── Header.astro      # Cabecera con información personal
│   │   └── Job.astro          # Componente para mostrar trabajos
│   ├── content/
│   │   ├── config.ts          # Configuración de las colecciones
│   │   └── jobs/              # Archivos .md con los trabajos
│   ├── layouts/
│   │   └── BaseLayout.astro   # Layout principal con SEO
│   ├── pages/
│   │   ├── index.astro        # Página principal
│   │   └── 404.astro          # Página de error
│   └── styles/
│       ├── main.scss          # Archivo principal de estilos
│       ├── abstracts/         # Variables, mixins, funciones
│       ├── base/              # Reset, tipografía base
│       ├── components/        # Estilos de componentes
│       ├── layout/            # Estilos de layout
│       └── utilities/         # Clases utilitarias
└── package.json
```

## 📦 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Copiar archivos SASS:**
   - Copia toda la carpeta `sass` desde `C:\www\aledesign\sass`
   - A la carpeta `C:\www\aledesign-portfolio-2025\src\styles`
   - Mantén la estructura de carpetas

3. **Copiar imágenes:**
   - Copia todas las imágenes desde `C:\www\aledesign\public\images`
   - A la carpeta `C:\www\aledesign-portfolio-2025\public\images`

## 🧞 Comandos

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias                        |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/` |
| `npm run preview`         | Vista previa del build localmente               |

## ✏️ Cómo agregar nuevos trabajos

### 1. Crear un nuevo archivo .md

Crea un archivo en `src/content/jobs/` con el formato: `XX-nombre-trabajo.md`

```markdown
---
title: "Título del Trabajo"
category: "design" # puede ser: design, marketing, management
place: "Nombre de la Empresa"
type: "Tipo de contrato"
period: "2024 - Present"
tags: ["Tag1", "Tag2", "Tag3"]
order: 6  # número de orden en que aparecerá
status: "published" # o "draft" para no publicarlo
---

- Primera tarea o responsabilidad
- Segunda tarea o responsabilidad
- Tercera tarea o responsabilidad
```

### 2. Categorías disponibles:
- **design**: Para trabajos de diseño UX/UI
- **marketing**: Para trabajos de marketing digital
- **management**: Para trabajos de gestión de proyectos

### 3. El sitio se actualiza automáticamente

Una vez que agregues el archivo .md y reinicies el servidor de desarrollo, el trabajo aparecerá automáticamente en tu portfolio.

## 🎨 Personalización de estilos

Los estilos están organizados en SASS siguiendo la metodología SMACSS:

- **abstracts/**: Variables de colores, tamaños, breakpoints
- **base/**: Reset CSS y estilos base
- **components/**: Estilos específicos de componentes (banner, jobs, etc.)
- **layout/**: Grid, contenedores, layouts
- **utilities/**: Clases utilitarias (márgenes, padding, etc.)

Para modificar colores, tipografías o espaciados, edita los archivos en `src/styles/abstracts/`

## 🔍 SEO y Accesibilidad

El sitio incluye:
- ✅ Meta tags optimizados
- ✅ Open Graph para redes sociales
- ✅ Structured Data (Schema.org)
- ✅ Sitemap automático
- ✅ Atributos ARIA para accesibilidad
- ✅ Semántica HTML5
- ✅ URLs canónicas

## 📱 Responsive Design

El sitio es completamente responsive con breakpoints en:
- Small: 480px
- Medium: 720px
- Large: 1040px
- XLarge: 1280px
- XXLarge: 1600px

## 🚀 Deploy

El sitio puede ser desplegado en:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

Solo necesitas hacer build y subir la carpeta `dist/`

## 📄 Licencia

Este proyecto es privado y pertenece a Alejandro Delgado.

---

Desarrollado con ❤️ usando [Astro](https://astro.build)
