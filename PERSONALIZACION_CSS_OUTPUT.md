# 🎨 Personalización de la salida CSS en Astro

## 🎯 **Objetivo conseguido:**
- ✅ El archivo CSS se llama `app.css`
- ✅ Se ubica en la carpeta `css/` en lugar de `_astro/`
- ✅ Un solo archivo CSS sin división de código
- ✅ Funciona tanto en desarrollo como en producción

## 📝 **Configuración aplicada en `astro.config.mjs`:**

### 1. **Plugin personalizado para renombrar CSS:**
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

### 2. **Configuración de Vite:**
- `cssCodeSplit: false` - Un solo archivo CSS
- `assetFileNames` personalizado - Organiza los assets en carpetas específicas
- Plugin aplicado para renombrar el CSS

### 3. **Configuración de Astro:**
- `inlineStylesheets: 'never'` - Siempre genera archivo CSS externo

## 📁 **Estructura de salida después del build:**

```
dist/
├── css/
│   └── app.css          # Todos tus estilos compilados
├── js/
│   └── [archivos].js    # JavaScript organizado
├── images/
│   └── [imágenes]       # Imágenes copiadas
├── index.html           # Tu página principal
└── [otros archivos]
```

## 🚀 **Comandos:**

### Desarrollo:
```bash
npm run dev
```
- Los estilos se cargan con hot reload
- Se compilan sobre la marcha

### Producción:
```bash
npm run build
```
- Genera `dist/css/app.css` con todos los estilos
- Optimizado y minificado
- Links actualizados automáticamente

### Vista previa:
```bash
npm run preview
```
- Sirve la versión de producción localmente

## ✨ **Ventajas de esta configuración:**

1. **URL predecible:** Siempre `css/app.css`
2. **Fácil de cachear:** Nombre consistente
3. **Organización clara:** Carpetas separadas para cada tipo de asset
4. **Un solo archivo CSS:** Mejor para sites pequeños/medianos
5. **Compatible con CDN:** Fácil de servir desde un CDN

## 🔍 **Verificación:**

Después de `npm run build`, verifica:
1. Existe el archivo `dist/css/app.css`
2. El HTML tiene `<link href="/css/app.css">`
3. No existe la carpeta `_astro`
4. Los estilos se aplican correctamente

## 📝 **Notas importantes:**

- El hash se eliminó del nombre para tener siempre `app.css`
- Si necesitas versionado, puedes agregar un query parameter o usar service workers
- Para desarrollo, Astro maneja automáticamente el hot reload
- En producción, el CSS está minificado y optimizado

## 🛠️ **Si necesitas cache busting:**

Puedes modificar el plugin para agregar una versión:
```javascript
const newFileName = `css/app.${Date.now()}.css`;
```

O usar un query parameter en el HTML:
```html
<link href="/css/app.css?v=1.0.0" rel="stylesheet">
```

---

**Resultado:** Tu CSS siempre estará en `/css/app.css` tanto en desarrollo como en producción, con una estructura limpia y predecible.
