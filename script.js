/* ============================================================
   🌿 Jardín de Belén & Alon — script.js
   Archivo central para las funciones interactivas del proyecto
   ============================================================ */


function initGardenDashboard() {
  const cards = Array.from(document.querySelectorAll('section.card[id^="P"]'));
  const getTxt = el => (el?.innerText || '').toLowerCase();

  const classify = (card) => {
    const txt = getTxt(card);
    return {
      suculenta: /suculent/.test(txt),
      trepadora: /trepador|colgant/.test(txt),
      palmera: /palmera/.test(txt),
      arbusto: /arbusto|árbol/.test(txt),
      herbacea: /herbácea|ornamental/.test(txt),
    };
  };

  const healthScore = (card) => {
    const txt = getTxt(card);
    const positive = /(muy saludable|sano|vigoros|hojas firmes|floración|excelente)/;
    const attention = /(estrés|puntas secas|decaíd|amarill|dañad|falta de|recuperación)/;
    const isOk = positive.test(txt);
    const needs = attention.test(txt) && !isOk;
    return { ok: !!isOk || (!needs && /estable|bien/.test(txt)), needs: !!needs };
  };

  const counters = { total: cards.length, sucu:0, trepa:0, palma:0, arb:0, herb:0, ok:0, needs:0 };
  cards.forEach(c => {
    const cfy = classify(c);
    counters.sucu += cfy.suculenta?1:0;
    counters.trepa += cfy.trepadora?1:0;
    counters.palma += cfy.palmera?1:0;
    counters.arb   += cfy.arbusto?1:0;
    counters.herb  += cfy.herbacea?1:0;

    const hs = healthScore(c);
    counters.ok   += hs.ok?1:0;
    counters.needs+= hs.needs?1:0;
  });

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('kpi-total', counters.total);
  set('kpi-sucus', counters.sucu);
  set('kpi-trepas', counters.trepa);
  set('kpi-palmas', counters.palma);
  set('kpi-arbustos', counters.arb);
  set('kpi-herb', counters.herb);

  const percentOk = counters.total ? Math.round((counters.ok / counters.total) * 100) : 0;
  set('health-percent', percentOk + '% sanas');
  const bar = document.getElementById('health-bar');
  if (bar) bar.style.width = percentOk + '%';
  const legend = document.getElementById('health-legend');
  if (legend) legend.textContent = `${counters.ok} sanas · ${counters.needs} con atención`;

  const dates = Array.from(document.querySelectorAll('.block .kv'))
    .map(p => p.innerText)
    .filter(t => /última revisión:\s*\d{1,2}\/\d{1,2}\/\d{4}/i.test(t))
    .map(t => t.match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0].split('/').reverse().join('-'))
    .sort();
  const last = dates.length ? dates[dates.length - 1] : null;
  if (last) {
    const [y,m,d] = last.split('-');
    const lu = document.getElementById('last-update');
    if (lu) lu.textContent = `Última actualización: ${d}/${m}/${y}`;
  }

  const chips = document.querySelectorAll('.chip');
  const showAll = () => cards.forEach(c => c.style.display = '');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      const rule = chip.dataset.filter;
      if (rule === 'all') { showAll(); return; }
      const re = new RegExp(rule, 'i');
      cards.forEach(card => {
        const txt = getTxt(card);
        card.style.display = re.test(txt) ? '' : 'none';
      });
      document.querySelector('#dashboard')?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGardenDashboard);
} else {
  initGardenDashboard();
}




/*   Funciones de la web*/
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


/* ============================================================
   Dashboard: KPIs + Salud + Chips + Donut (todo en script.js)
   ============================================================ */

(function(){
  // Utilidades
  const $txt = el => (el?.innerText || '').toLowerCase();

  function classify(card){
    const t = $txt(card);
    return {
      suculenta: /suculent/.test(t),
      trepadora: /trepador|colgant/.test(t),
      palmera:   /palmera/.test(t),
      arbusto:   /arbusto|árbol/.test(t),
      herbacea:  /herbácea|ornamental/.test(t),
    };
  }

  function healthScore(card){
    const t = $txt(card);
    const positive = /(muy saludable|sano|vigoros|hojas firmes|floración|excelente)/;
    const attention = /(estrés|puntas secas|decaíd|amarill|dañad|falta de|recuperación)/;
    const ok = positive.test(t) || (!attention.test(t) && /estable|bien/.test(t));
    const needs = attention.test(t) && !ok;
    return { ok, needs };
  }

  function computeCounters(cards){
    const counters = { total: cards.length, sucu:0, trepa:0, palma:0, arb:0, herb:0, ok:0, needs:0 };
    cards.forEach(c=>{
      const cf = classify(c);
      counters.sucu += cf.suculenta?1:0;
      counters.trepa+= cf.trepadora?1:0;
      counters.palma+= cf.palmera?1:0;
      counters.arb  += cf.arbusto?1:0;
      counters.herb += cf.herbacea?1:0;

      const hs = healthScore(c);
      counters.ok   += hs.ok?1:0;
      counters.needs+= hs.needs?1:0;
    });
    return counters;
  }

  function setText(id, val){ const el = document.getElementById(id); if (el) el.textContent = val; }

  function updateKPIs(c){
    setText('kpi-total',    c.total);
    setText('kpi-sucus',    c.sucu);
    setText('kpi-trepas',   c.trepa);
    setText('kpi-palmas',   c.palma);
    setText('kpi-arbustos', c.arb);
    setText('kpi-herb',     c.herb);
  }

  function updateHealth(c){
    const percentOk = c.total ? Math.round((c.ok / c.total) * 100) : 0;
    setText('health-percent', percentOk + '% sanas');
    const bar = document.getElementById('health-bar');
    if (bar) bar.style.width = percentOk + '%';
    const legend = document.getElementById('health-legend');
    if (legend) legend.textContent = `${c.ok} sanas · ${c.needs} con atención`;
  }

  function updateLastUpdate(){
    const dates = Array.from(document.querySelectorAll('.block .kv'))
      .map(p => p.innerText)
      .filter(t => /última revisión:\s*\d{1,2}\/\d{1,2}\/\d{4}/i.test(t))
      .map(t => t.match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0].split('/').reverse().join('-'))
      .sort();
    const last = dates.length ? dates[dates.length - 1] : null;
    if (last) {
      const [y,m,d] = last.split('-');
      const lu = document.getElementById('last-update');
      if (lu) lu.textContent = `Última actualización: ${d}/${m}/${y}`;
    }
  }

  function bindChips(cards){
    const chips = document.querySelectorAll('.chip');
    const showAll = () => cards.forEach(c => c.style.display = '');
    chips.forEach(chip=>{
      chip.addEventListener('click', ()=>{
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        const rule = chip.dataset.filter;
        if(rule === 'all'){ showAll(); return; }
        const re = new RegExp(rule, 'i');
        cards.forEach(card=>{
          const t = $txt(card);
          card.style.display = re.test(t) ? '' : 'none';
        });
        document.querySelector('#dashboard')?.scrollIntoView({behavior:'smooth', block:'start'});
      });
    });
  }

  // ---------- Donut ----------
  function renderDonut(counters){
    const total = counters.total || 0;
    const container = document.getElementById('chart-types');
    const legendUL  = document.getElementById('chart-legend');
    if(!container || !legendUL || !total) return;

    const data = [
      { key: 'Suculentas',    val: counters.sucu,  color: '#7DC77F' },
      { key: 'Trep./Colg.',   val: counters.trepa, color: '#9AD08B' },
      { key: 'Palmeras',      val: counters.palma, color: '#A8DBA1' },
      { key: 'Arb./Árboles',  val: counters.arb,   color: '#B7E3B0' },
      { key: 'Herb./Ornam.',  val: counters.herb,  color: '#C6ECC0' },
    ].filter(d => d.val > 0);

    const size = 140, r = 56, circumference = 2*Math.PI*r, cx=size/2, cy=size/2;
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns,'svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);

    // base
    const bg = document.createElementNS(ns,'circle');
    bg.setAttribute('cx',cx); bg.setAttribute('cy',cy); bg.setAttribute('r',r);
    bg.setAttribute('fill','none'); bg.setAttribute('stroke','rgba(0,0,0,.12)');
    bg.setAttribute('stroke-width','18'); svg.appendChild(bg);

    // slices
    let offset = 0;
    data.forEach(d=>{
      const len = circumference * (d.val / total);
      const arc = document.createElementNS(ns,'circle');
      arc.setAttribute('cx',cx); arc.setAttribute('cy',cy); arc.setAttribute('r',r);
      arc.setAttribute('fill','none'); arc.setAttribute('stroke', d.color);
      arc.setAttribute('stroke-width','18');
      arc.setAttribute('stroke-dasharray', `${len} ${circumference-len}`);
      arc.setAttribute('stroke-dashoffset', `${-offset}`);
      arc.setAttribute('transform', `rotate(-90 ${cx} ${cy})`);
      arc.setAttribute('opacity','0.95');
      svg.appendChild(arc);
      offset += len;
    });

    // donut hole
    const hole = document.createElementNS(ns,'circle');
    hole.setAttribute('cx',cx); hole.setAttribute('cy',cy); hole.setAttribute('r', r-10);
    hole.setAttribute('fill','var(--panel)'); svg.appendChild(hole);

    // center text
    const t = document.createElementNS(ns,'text');
    t.setAttribute('x',cx); t.setAttribute('y',cy+4);
    t.setAttribute('text-anchor','middle');
    t.setAttribute('font-size','16'); t.setAttribute('font-weight','800');
    t.setAttribute('fill','var(--text)'); t.textContent = total;
    svg.appendChild(t);

    container.innerHTML = ''; container.appendChild(svg);

    // legend
    legendUL.innerHTML = '';
    data.forEach(d=>{
      const li = document.createElement('li');
      const sw = document.createElement('span'); sw.className = 'swatch';
      sw.style.background = d.color;
      const pct = Math.round((d.val/total)*100);
      li.appendChild(sw);
      li.appendChild(document.createTextNode(`${d.key}: ${d.val} · ${pct}%`));
      legendUL.appendChild(li);
    });
  }

  // ---------- Init ----------
  function initDashboard(){
    const cards = Array.from(document.querySelectorAll('section.card[id^="P"]'));
    if(!cards.length) return;
    const counters = computeCounters(cards);
    updateKPIs(counters);
    updateHealth(counters);
    updateLastUpdate();
    bindChips(cards);
    renderDonut(counters);
  }

  // Arranque
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initDashboard);
  } else {
    initDashboard();
  }
})();
