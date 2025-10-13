📘 README.md — Proyecto Jardín de Belen Alon
🌿 Descripción general
---

Este proyecto mantiene el registro digital del Jardín de Alon, un sistema HTML/CSS que documenta todas las plantas con su ficha técnica, cuidados y evolución.
El asistente GPT se encargará de analizar imágenes nuevas, identificar plantas y generar automáticamente las secciones <section> para añadirlas al archivo jardinDeAlon.html.

🗂️ Estructura de carpetas
/jardinDeAlon/
│
├── jardinDeAlon.html      # Archivo principal con todas las fichas (cards)
├── style.css              # (si está separado del HTML)
├── img/                   # Carpeta con las fotos de las plantas
│   ├── IMG-20251012-WA0034.jpg
│   ├── IMG-20251012-WA0035.jpg
│   ├── ...
│   └── monstera-delicosa-deja-fondo-de-naturaleza.jpg
└── README.md              # Este documento


🪴 El archivo jardinDeAlon.html está una carpeta por encima de img/.

🤖 Prompt maestro para el GPT
---

Copia y usa este prompt cada vez que quieras añadir nuevas plantas o actualizar el HTML:

🧩 Prompt

Quiero actualizar mi proyecto Jardín de Alon.
Te paso:

El HTML actual (o al menos el bloque <main class="container"> con las cards existentes).

El CSS (si he hecho cambios).

Una o varias nuevas imágenes (en img/, con sus nombres exactos).

(Opcional) Una breve nota o descripción sobre cada imagen.

Tu tarea:

Detecta el último id="P0XX" existente y continúa con los siguientes códigos correlativos.

Analiza cada foto y determina el nombre común y científico de la planta (si no es seguro, marca “(identificación tentativa)”).

Genera una section completa con la estructura del jardín, respetando el estilo actual.

Usa las rutas de imagen en formato img/NOMBRE.jpg (sin punto inicial).

Mantén intacto el resto del HTML y el CSS.

Devuélveme solo las nuevas sections listas para pegar, o todo el HTML actualizado si te lo pido.

🌼 Ejemplo de section
<!-- ===== P0XX ===== -->
<section class="card" id="P0XX">
  <img class="thumb" loading="lazy" src="img/NOMBRE_DE_LA_IMAGEN.jpg" alt="P0XX Nombre común" />
  <div>
    <div class="id">Planta P0XX — Nombre común / <span class="latin">Nombre científico</span></div>

    <div class="row">
      <div class="block">
        <h4>Ficha</h4>
        <p class="kv"><b>Apodo:</b> —</p>
        <p class="kv"><b>Fecha de registro:</b> DD/MM/AAAA</p>
        <p class="kv"><b>Tipo:</b> (suculenta, trepadora, palmera, etc.)</p>
        <p class="kv"><b>Nombre científico:</b> <span class="latin">…</span></p>
        <p class="kv"><b>Origen:</b> …</p>
        <p class="kv"><b>Ubicación:</b> interior/exterior + luz disponible</p>
      </div>
      <div class="block">
        <h4>Cuidados</h4>
        <p class="kv"><b>Luz:</b> …</p>
        <p class="kv"><b>Riego:</b> …</p>
        <p class="kv"><b>Temperatura:</b> …</p>
        <p class="kv"><b>Humedad:</b> …</p>
        <p class="kv"><b>Sustrato:</b> …</p>
      </div>
    </div>

    <div class="row">
      <div class="block">
        <h4>Estado</h4>
        <p class="kv"><b>Última revisión:</b> DD/MM/AAAA</p>
        <p class="kv"><b>Estado actual:</b> (diagnóstico visible en la foto)</p>
      </div>
      <div class="block">
        <h4>Observaciones</h4>
        <p class="kv">• Recomendación 1<br/>• Recomendación 2</p>
      </div>
    </div>

    <div class="hist">DD/MM/AAAA — Registro inicial.</div>
  </div>
</section>

✅ Checklist de validación

Antes de aceptar el resultado, el GPT debe verificar:

 Los IDs (P0XX) son consecutivos y únicos.

 Las rutas de imagen usan img/ sin punto inicial.

 Los atributos alt describen planta y código.

 Las fechas son coherentes (registro, revisión, historial).

 El CSS y las sections existentes no fueron modificados.

💡 Recomendaciones

Guardar siempre una copia de seguridad de jardinDeAlon.html antes de actualizar.

Comprobar visualmente que las miniaturas cargan correctamente.

Mantener la coherencia de estilo con el resto del jardín.

Si hay muchas plantas nuevas, pedir al GPT que entregue el HTML actualizado completo.