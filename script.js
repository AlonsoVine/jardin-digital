/* ============================================================
   🌿 Jardín de Belén & Alon — script.js
   Archivo central para las funciones interactivas del proyecto
   ============================================================ */



(function(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;

  const SHOW_AFTER = 400;
  let ticking = false;

  function onScroll(){
    const y = window.scrollY || document.documentElement.scrollTop;
    if(y > SHOW_AFTER){
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  function scrollTopSmooth(){
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduceMotion){
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  btn.addEventListener('click', scrollTopSmooth);
  btn.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      scrollTopSmooth();
    }
  });

  onScroll();
})();

/* ────────────────────────────────
   Activar animaciones cuando el DOM esté listo
   ──────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('ready');
});

/* ────────────────────────────────
   Modo claro / oscuro
   ──────────────────────────────── */
(function(){
  const btn = document.getElementById('themeToggle');
  if(!btn) return;

  const html = document.documentElement;

  // Cargar preferencia guardada
  const saved = localStorage.getItem('theme');
  if(saved === 'light') html.classList.add('light');

  // Actualizar icono
  function updateIcon(){
    btn.textContent = html.classList.contains('light') ? '🌞' : '🌙';
  }

  // Cambiar tema al pulsar
  btn.addEventListener('click', ()=>{
    html.classList.toggle('light');
    const isLight = html.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateIcon();
  });

  updateIcon();
})();


/* ────────────────────────────────
   Botón "Volver arriba" flotante
   ──────────────────────────────── */
(function(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;

  const SHOW_AFTER = 400;
  let ticking = false;

  function onScroll(){
    const y = window.scrollY || document.documentElement.scrollTop;
    if(y > SHOW_AFTER){
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function(){
    if(!ticking){
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  function scrollTopSmooth(){
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduceMotion){
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  btn.addEventListener('click', scrollTopSmooth);
  btn.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      scrollTopSmooth();
    }
  });

  onScroll();
})();

/* ────────────────────────────────
   Barra de búsqueda y filtros
   ──────────────────────────────── */
(function(){
  const qInput = document.getElementById('q');
  const typeSel = document.getElementById('filterType');
  const stateSel = document.getElementById('filterState');
  const clearBtn = document.getElementById('clearFilters');
  const resultCount = document.getElementById('resultCount');

  if(!qInput || !typeSel || !stateSel) return;

  const cards = Array.from(document.querySelectorAll('section.card'));

  function getKV(section, key){
    const kvs = section.querySelectorAll('p.kv');
    for(const p of kvs){
      const txt = p.textContent.trim();
      if(txt.toLowerCase().startsWith(key.toLowerCase())) {
        return txt.slice(key.length).trim().replace(/^:\s*/,'');
      }
    }
    return '';
  }

  const tiposSet = new Set();
  const estadosSet = new Set();

  for(const s of cards){
    const name = (s.querySelector('.id')?.textContent || '').toLowerCase();
    const tipo = getKV(s, 'Tipo:').toLowerCase();
    const estado = getKV(s, 'Estado actual:').toLowerCase();

    s.dataset.name = name;
    s.dataset.tipo = tipo;
    s.dataset.estado = estado;

    if(tipo) tiposSet.add(tipo);
    if(estado) estadosSet.add(estado);
  }

  function fillSelect(select, values){
    const sorted = Array.from(values).sort((a,b)=>a.localeCompare(b,'es'));
    for(const v of sorted){
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v.charAt(0).toUpperCase() + v.slice(1);
      select.appendChild(opt);
    }
  }
  fillSelect(typeSel, tiposSet);
  fillSelect(stateSel, estadosSet);

  function applyFilters(){
    const q = qInput.value.trim().toLowerCase();
    const t = typeSel.value;
    const e = stateSel.value;

    let visible = 0;
    for(const s of cards){
      const byName = !q || s.dataset.name.includes(q);
      const byType = !t || s.dataset.tipo === t;
      const byState = !e || s.dataset.estado === e;

      const show = byName && byType && byState;
      s.style.display = show ? '' : 'none';
      if(show) visible++;
    }

    if(visible === cards.length){
      resultCount.textContent = 'Mostrando todas';
    }else if(visible === 0){
      resultCount.textContent = 'Sin resultados';
    }else{
      resultCount.textContent = `Mostrando ${visible} de ${cards.length}`;
    }
  }

  qInput.addEventListener('input', applyFilters);
  typeSel.addEventListener('change', applyFilters);
  stateSel.addEventListener('change', applyFilters);

  clearBtn.addEventListener('click', ()=>{
    qInput.value = '';
    typeSel.value = '';
    stateSel.value = '';
    applyFilters();
    qInput.focus();
  });

  applyFilters();
})();
