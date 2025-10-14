<div align="center">

# Jardín de Belén & Alonso

### Un jardín digital donde la naturaleza y el amor crecen juntos

Creado con cariño por **Belén** y **Alon**  
<sub>Proyecto personal y colaborativo — Iniciado en 2025</sub>

URL: https://alonsovine.github.io/jardin-digital/

</div>

---

## Descripción

Jardín de Belén & Alon es una web artesanal para registrar y acompañar la vida de nuestras plantas.  
Cada ficha documenta una especie real de nuestro hogar, uniendo conocimiento botánico, diseño web y emoción compartida.

El objetivo del proyecto es combinar ciencia y sensibilidad: cultivar un jardín vivo que crece en la tierra y en la pantalla.

---

## Organización del proyecto

Estructura simple, pensada para mantener orden y escalar fácilmente:

- `index.html` — Página principal con el resumen, la barra de búsqueda y todas las fichas (P001…PXXX).
- `style.css` — Estilos principales, temas claro/oscuro, animaciones y diseño responsive.
- `script.js` — Lógica de interactividad: KPIs, filtros, donut, exportación, tema y sonido.
- `img/` — Fotografías de plantas e iconos (incluye `bird.svg` y hojas Monstera).
- `audio/` — Pista local de ambiente: `relaxing-birds-and-piano-music-137153.mp3`.
- `jardin_de_belen_y_alon_2025.txt` — Notas del proyecto.

---

## Funcionalidades principales

- Resumen del jardín (dashboard)
  - KPIs automáticos: total, suculentas, trepadoras/colgantes, palmeras, arbustos/árboles, herbáceas/ornamentales.
  - Indicador de salud general con barra y porcentaje “sanas” vs “con atención”.
  - Última actualización calculada a partir de las fichas.
  - Mini gráfico donut por tipo con leyenda.

- Búsqueda y filtros
  - Barra de búsqueda por nombre común/científico.
  - Selectores dinámicos de “Tipo” y “Estado” construidos desde el contenido real.
  - Chips rápidos de categoría (Todas, Suculentas, Trepadoras/Colgantes, etc.).
  - Contador de resultados y botón “Limpiar”.

- Exportación de datos
  - Descarga de todas las fichas como `JSON`, `TXT` o `CSV (Excel)`.
  - Archivos generados en el cliente a partir del DOM actual.
  - Nombre de archivo con fecha y hora: `jardin_belen_alon_YYYYMMDD_HHMM.ext`.

- Tema claro/oscuro
  - Conmutador en el header; persistencia con `localStorage` (`theme`).
  - Variables CSS y transiciones suaves; respeta `prefers-reduced-motion`.

- Sonido ambiente (pájaros)
  - Botón dedicado en el header; reproduce/pausa una pista local.
  - Persistencia de estado y volumen (`amb_on`, `amb_vol`) en `localStorage`.
  - Pausa automática al cambiar de pestaña y reanuda si estaba activo.

- Accesibilidad y UX
  - Roles y etiquetas ARIA en botones, menús y búsqueda.
  - Cierre de menús con “Escape” y al hacer clic fuera.
  - Botón flotante “Volver arriba” con soporte de teclado.
  - Imágenes con `loading="lazy"` y texto alternativo.

- UI y rendimiento
  - Header pegajoso con desenfoque, animaciones de entrada y micro-efectos al hover.
  - Diseño responsive móvil/desktop sin dependencias externas.

---

## Cómo ejecutar

- Opción rápida: abrir `index.html` directamente en tu navegador.
- Opción recomendada: servir como sitio estático (por ejemplo con Live Server).  
  Nota: algunos navegadores restringen audio autoplay; el botón de pájaro activa manualmente el sonido.

---

## Añadir o editar fichas

Cada planta vive en una sección `.card` con id `P###`. Para añadir una nueva:

1) Duplica una tarjeta existente en `index.html` y actualiza:
- Encabezado `.id`: “Planta PXXX — Nombre / Nombre científico”.
- Bloque “Ficha”: `Apodo`, `Fecha de registro`, `Tipo`, `Origen o procedencia`, `Ubicación actual`.
- Bloque “Cuidados`: `Luz`/`Condiciones de luz`, `Riego`, `Temperatura`, `Humedad`, `Sustrato`.
- Bloque “Estado`: `Última revisión`, `Estado actual`.
- “Observaciones” e “Historial”.

2) Coloca la imagen en `img/` y actualiza `src` y `alt` en `<img class="thumb" loading="lazy" ...>`.

3) Mantén las etiquetas tal como aparecen (por ejemplo `Tipo:`, `Estado actual:`).  
   El script lee estas claves para construir filtros y exportar datos.

---

## Personalización y mantenimiento

- Audio de ambiente: cambia `AMBIENCE_SRC` en `script.js` si mueves la pista.
- Tema: el HTML usa la clase `light` para el modo claro; se persiste en `localStorage`.
- Exportación: los formatos incluyen todas las claves visibles en las tarjetas.
- Si renombraras etiquetas en las fichas, adapta los prefijos que el parser de `script.js` reconoce.

---

## Tecnologías utilizadas

- HTML5 y CSS3 — Semántica, variables CSS, diseño responsive.
- JavaScript (vanilla) — Interactividad sin dependencias externas.
- Git + GitHub Pages — Publicación del sitio estático.

---

## Futuras mejoras

- Línea temporal de evolución fotográfica por planta.
- Sección de floraciones destacadas y alertas de cuidados.
- Paginación/carga progresiva de fichas.
- Edición y alta de plantas mediante formulario + JSON.
- Internacionalización (ES/EN) y búsqueda avanzada.

---

## Autores

**Belén & Alon** — Proyecto conjunto de diseño, naturaleza y amor.  
Iniciado en 2025 — cultivado con paciencia, código y ternura.

