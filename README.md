<div align="center">

![IMG](img/fondo-readme.png "imagen cámara")

# <img src="img/monstera-leaf-verde-borde-8px.svg" width="32" align="center" /> Jardín de Belén & Alonso

### 🌸 Un jardín digital donde la naturaleza y el amor crecen juntos

Creado con cariño por **Belén** y **Alon**  
<sub>Proyecto personal y colaborativo — Iniciado en 2025</sub>  

🔗 **URL:** [https://alonsovine.github.io/jardin-digital/](https://alonsovine.github.io/jardin-digital/)

</div>

---

## 🌿 Descripción

**Jardín de Belén & Alon** es una web artesanal para registrar y acompañar la vida de nuestras plantas.  
Cada ficha documenta una especie real de nuestro hogar, uniendo conocimiento botánico, diseño web y emoción compartida.  

El proyecto busca equilibrar ciencia y sensibilidad: cultivar un jardín vivo que crece tanto en la tierra como en la pantalla.

---

## 🪴 Organización del proyecto

Estructura clara, pensada para mantener orden y escalar fácilmente:

- `index.html` — Página principal con el resumen, la barra de búsqueda y todas las fichas (`P001…PXXX`).
- `style.css` — Estilos principales, temas claro/oscuro, animaciones y diseño responsive.
- `script.js` — Lógica de interactividad: KPIs, filtros, donut, exportación, tema, sonido y hojas flotantes.
- `img/` — Fotografías de plantas e iconos (incluye `monstera-leaf-verde-borde-8px.svg` y `bird.svg`).
- `audio/` — Sonidos de ambiente: `relaxing-birds-and-piano-music-137153.mp3`.
- `jardin_de_belen_y_alon_2025.txt` — Notas y apuntes del proyecto.

---

## ✨ Funcionalidades principales

### 🌸 Panel resumen (dashboard)
- KPIs automáticos: total de plantas, suculentas, trepadoras/colgantes, palmeras, arbustos/árboles y herbáceas/ornamentales.  
- Indicador de **salud general** con barra y porcentaje (“sanas” vs “en cuidado”).  
- Fecha de **última actualización** calculada automáticamente.  
- Mini gráfico **donut** con distribución por tipo.  
- **Animaciones** suaves al cargar los indicadores.

### 🔍 Búsqueda y filtros dinámicos
- Barra de búsqueda por nombre común o científico.  
- Filtros por **tipo**, **estado**, **luz**, **riego** y **salud**.  
- Chips rápidos de categoría (Todas, Suculentas, Trepadoras, etc.).  
- Contador de resultados y botón **“Limpiar”**.  
- Soporte para combinaciones múltiples de filtros.

### 🧾 Exportación de datos
- Descarga completa de las fichas en formatos **JSON**, **TXT** o **CSV (Excel)**.  
- Archivos generados en el cliente, con nombre `jardin_belen_alon_YYYYMMDD_HHMM.ext`.  

### 🌓 Tema claro / oscuro
- Botón de alternancia 🌙☀️ con transición suave y persistencia (`localStorage: theme`).  
- Variables CSS y detección automática de `prefers-color-scheme`.  

### 🎵 Sonido ambiente
- Botón dedicado 🎶 (pájaro) en el header; reproduce o pausa la pista local.  
- Estado y volumen recordados (`amb_on`, `amb_vol`), pausa automática al cambiar de pestaña.  

### 🍃 Animación de hojas flotantes
- Hojas Monstera animadas descendiendo suavemente.  
- Activación/desactivación con botón 🍃 junto al de sonido.  
- Persistencia (`leaves_on`) y respeto a `prefers-reduced-motion`.  
- Color adaptativo: más claras en oscuro, más oscuras en claro.

### 💚 Interfaz y accesibilidad
- Roles y etiquetas **ARIA** en botones, menús y buscador.  
- Cierre de menús con **Escape** o clic fuera.  
- Botón flotante **“Volver arriba”** con soporte de teclado.  
- Imágenes con `loading="lazy"` y texto alternativo.  
- Animaciones respetuosas con `prefers-reduced-motion`.

### 🌸 Experiencia visual
- Header pegajoso con desenfoque y micro-efectos.  
- Diseño **responsive** móvil/desktop sin dependencias externas.  
- Paleta cromática natural, animaciones discretas y tipografía elegante.

---

## ⚙️ Cómo ejecutar

- Opción rápida: abre `index.html` directamente en tu navegador.  
- Opción recomendada: usar un servidor estático (por ejemplo **Live Server**).  
  > Nota: algunos navegadores restringen la reproducción automática de audio; el botón de pájaro activa el sonido manualmente.

---

## 🌱 Añadir o editar fichas

Cada planta vive en una sección `.card` con id `P###`.  
Para añadir una nueva:

1. Duplica una tarjeta existente en `index.html` y actualiza:
   - Encabezado `.id`: `Planta PXXX — Nombre / Nombre científico`.  
   - Bloque **Ficha**: `Apodo`, `Fecha de registro`, `Tipo`, `Origen`, `Ubicación`.  
   - Bloque **Cuidados**: `Luz`, `Riego`, `Temperatura`, `Humedad`, `Sustrato`.  
   - Bloque **Estado**: `Última revisión`, `Estado actual`.  
   - “Observaciones” e “Historial”.

2. Coloca la imagen en `img/` y actualiza `src` y `alt` en `<img class="thumb" ...>`.

3. Mantén las etiquetas (`Tipo:`, `Estado actual:`); el script las usa para generar filtros y estadísticas.

---

## 🧠 Personalización y mantenimiento

- 🎵 **Audio:** cambia `AMBIENCE_SRC` en `script.js` si mueves la pista.  
- 🌗 **Tema:** el HTML usa `.light` para modo claro; persiste automáticamente.  
- 💾 **Exportación:** los formatos incluyen todos los campos visibles en las fichas.  
- 🪴 **Campos clave:** si renombras etiquetas, actualiza los prefijos que lee el script.  
- 🍃 **Hojas:** activa/desactiva la animación desde el botón del header.  

---

## 💻 Tecnologías utilizadas

- 🧩 **HTML5 + CSS3** — Semántica, variables CSS, animaciones y diseño responsive.  
- ⚡ **JavaScript (vanilla)** — Interactividad sin dependencias externas.  
- ☁️ **Git + GitHub Pages** — Publicación del sitio estático.  

---

## 🌼 Futuras mejoras

- 📸 Línea temporal de evolución fotográfica por planta.  
- 🌺 Sección de floraciones destacadas y alertas de cuidados.  
- 📆 Agenda automática de próximos riegos.  
- ✏️ Alta/edición de plantas mediante formulario con guardado en JSON o backend.  
- 🌐 Internacionalización (ES/EN).  
- 📱 Paginación o carga progresiva de fichas.  
- 🌾 Integración con backend ligero (Supabase/Firebase/Sheets).  

---

## 💞 Autores

**Belén & Alon** — proyecto conjunto de diseño, naturaleza y amor.  
🌿 Iniciado en 2025 — cultivado con paciencia, código y ternura.  

