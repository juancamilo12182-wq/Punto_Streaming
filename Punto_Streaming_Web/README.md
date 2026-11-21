# Punto Streaming — Catálogo web

Página 100 % estática (HTML + CSS + JavaScript). No usa base de datos ni servidor,
así que se puede publicar gratis.

## Estructura

```
index.html          → la página
css/styles.css      → diseño (colores en :root al inicio del archivo)
js/config.js        → TU número de WhatsApp, Instagram y Facebook
js/productos.js     → catálogo: apps, precios, días y descripciones
js/app.js           → lógica (filtros, pedido, mensaje de WhatsApp)
img/                → logo y favicon
```

## Lo que debes editar

1. **`js/config.js`**: cambia `instagram` y `facebook` por los enlaces reales
   (ahora tienen `TU_USUARIO` y `TU_PAGINA`). El número de WhatsApp ya está puesto.
2. **`js/productos.js`**: para cambiar un precio, busca la app y modifica `precio`
   (sin puntos, ej. `12000`). Para agregar una app, copia una línea completa.
   Para ocultarla temporalmente, agrega `oculto: true`.

## Cómo publicarla gratis

**Opción A — Netlify Drop (la más fácil, sin cuenta de GitHub)**
1. Entra a https://app.netlify.com/drop
2. Arrastra la carpeta completa del proyecto. Te da un enlace al instante.

**Opción B — GitHub Pages**
1. Crea un repositorio en GitHub y sube todos los archivos.
2. Settings → Pages → Source: *Deploy from a branch* → rama `main` → carpeta `/ (root)`.

**Opción C — Cloudflare Pages / Vercel**
Conecta el repositorio o sube la carpeta; no requiere configuración de compilación.

> Si luego compras un dominio propio (ej. puntostreaming.com), cualquiera de estos
> servicios permite conectarlo.
