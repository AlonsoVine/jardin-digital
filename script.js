/* ============================================================
   🌿 Jardín de Belén & Alon — script.js
   Archivo central para las funciones interactivas del proyecto
   ============================================================ */

function initGardenDashboard() {
  const cards = Array.from(document.querySelectorAll('section.card[id^="P"]'));
  const getTxt = (el) => (el?.innerText || "").toLowerCase();

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
    const positive =
      /(muy saludable|sano|vigoros|hojas firmes|floración|excelente)/;
    const attention =
      /(estrés|puntas secas|decaíd|amarill|dañad|falta de|recuperación)/;
    const isOk = positive.test(txt);
    const needs = attention.test(txt) && !isOk;
    return {
      ok: !!isOk || (!needs && /estable|bien/.test(txt)),
      needs: !!needs,
    };
  };

  const counters = {
    total: cards.length,
    sucu: 0,
    trepa: 0,
    palma: 0,
    arb: 0,
    herb: 0,
    ok: 0,
    needs: 0,
  };
  cards.forEach((c) => {
    const cfy = classify(c);
    counters.sucu += cfy.suculenta ? 1 : 0;
    counters.trepa += cfy.trepadora ? 1 : 0;
    counters.palma += cfy.palmera ? 1 : 0;
    counters.arb += cfy.arbusto ? 1 : 0;
    counters.herb += cfy.herbacea ? 1 : 0;

    const hs = healthScore(c);
    counters.ok += hs.ok ? 1 : 0;
    counters.needs += hs.needs ? 1 : 0;
  });

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  set("kpi-total", counters.total);
  set("kpi-sucus", counters.sucu);
  set("kpi-trepas", counters.trepa);
  set("kpi-palmas", counters.palma);
  set("kpi-arbustos", counters.arb);
  set("kpi-herb", counters.herb);

  const percentOk = counters.total
    ? Math.round((counters.ok / counters.total) * 100)
    : 0;
  set("health-percent", percentOk + "% sanas");
  const bar = document.getElementById("health-bar");
  if (bar) bar.style.width = percentOk + "%";
  const legend = document.getElementById("health-legend");
  if (legend)
    legend.textContent = `${counters.ok} sanas · ${counters.needs} con atención`;

  const dates = Array.from(document.querySelectorAll(".block .kv"))
    .map((p) => p.innerText)
    .filter((t) => /última revisión:\s*\d{1,2}\/\d{1,2}\/\d{4}/i.test(t))
    .map((t) =>
      t
        .match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0]
        .split("/")
        .reverse()
        .join("-")
    )
    .sort();
  const last = dates.length ? dates[dates.length - 1] : null;
  if (last) {
    const [y, m, d] = last.split("-");
    const lu = document.getElementById("last-update");
    if (lu) lu.textContent = `Última actualización: ${d}/${m}/${y}`;
  }

  const chips = document.querySelectorAll(".chip");
  const showAll = () => cards.forEach((c) => (c.style.display = ""));
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      const rule = chip.dataset.filter;
      if (rule === "all") {
        showAll();
        return;
      }
      const re = new RegExp(rule, "i");
      cards.forEach((card) => {
        const txt = getTxt(card);
        card.style.display = re.test(txt) ? "" : "none";
      });
      document
        .querySelector("#dashboard")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGardenDashboard);
} else {
  initGardenDashboard();
}

/*   Funciones de la web*/
(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const SHOW_AFTER = 400;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (y > SHOW_AFTER) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  function scrollTopSmooth() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  btn.addEventListener("click", scrollTopSmooth);
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollTopSmooth();
    }
  });

  onScroll();
})();

/* ────────────────────────────────
   Activar animaciones cuando el DOM esté listo
   ──────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("ready");
});

/* ────────────────────────────────
   Modo claro / oscuro
   ──────────────────────────────── */
(function () {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const html = document.documentElement;

  // Cargar preferencia guardada
  const saved = localStorage.getItem("theme");
  if (saved === "light") html.classList.add("light");

  // Actualizar icono
  function updateIcon() {
    btn.textContent = html.classList.contains("light") ? "🌞" : "🌙";
  }

  // Cambiar tema al pulsar
  btn.addEventListener("click", () => {
    html.classList.toggle("light");
    const isLight = html.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateIcon();
  });

  updateIcon();
})();

/* ────────────────────────────────
   Botón "Volver arriba" flotante
   ──────────────────────────────── */
(function () {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  const SHOW_AFTER = 400;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (y > SHOW_AFTER) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  function scrollTopSmooth() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  btn.addEventListener("click", scrollTopSmooth);
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollTopSmooth();
    }
  });

  onScroll();
})();

/* ────────────────────────────────
   Barra de búsqueda y filtros
   ──────────────────────────────── */
(function () {
  const qInput = document.getElementById("q");
  const typeSel = document.getElementById("filterType");
  const stateSel = document.getElementById("filterState");
  const lightSel = document.getElementById("filterLight");
  const waterSel = document.getElementById("filterWater");
  const healthSel = document.getElementById("filterHealth");
  const clearBtn = document.getElementById("clearFilters");
  const resultCount = document.getElementById("resultCount");

  if (!qInput || !typeSel || !stateSel) return;

  const cards = Array.from(document.querySelectorAll("section.card"));

  function getKV(section, key) {
    const kvs = section.querySelectorAll("p.kv");
    for (const p of kvs) {
      const txt = p.textContent.trim();
      if (txt.toLowerCase().startsWith(key.toLowerCase())) {
        return txt.slice(key.length).trim().replace(/^:\s*/, "");
      }
    }
    return "";
  }

  // Clasificación rápida de salud a partir del contenido
  function deriveHealth(section) {
    const txt = (section?.innerText || "").toLowerCase();
    const positive =
      /(muy saludable|sano|vigoros|hojas firmes|floración|excelente|bien|estable)/;
    const attention =
      /(estrés|puntas secas|decaíd|amarill|dañad|falta de|recuperación)/;
    const ok =
      positive.test(txt) && !attention.test(txt)
        ? "sanas"
        : attention.test(txt)
        ? "atencion"
        : "sanas";
    return ok;
  }

  const tiposSet = new Set();
  const estadosSet = new Set();
  const lucesSet = new Set();
  const riegosSet = new Set();

  for (const s of cards) {
    const name = (s.querySelector(".id")?.textContent || "").toLowerCase();
    const apodo = getKV(s, "Apodo:").toLowerCase();
    const tipo = getKV(s, "Tipo:").toLowerCase();
    const estado = getKV(s, "Estado actual:").toLowerCase();
    const luz = (
      getKV(s, "Luz:") || getKV(s, "Condiciones de luz recomendadas:")
    ).toLowerCase();
    const riego = getKV(s, "Riego:").toLowerCase();
    const salud = deriveHealth(s);

    s.dataset.name = name;
    s.dataset.tipo = tipo;
    s.dataset.estado = estado;
    s.dataset.luz = luz;
    s.dataset.riego = riego;
    s.dataset.salud = salud; // 'sanas' | 'atencion'
    s.dataset.apodo = apodo;

    if (tipo) tiposSet.add(tipo);
    if (estado) estadosSet.add(estado);
    if (luz) lucesSet.add(luz);
    if (riego) riegosSet.add(riego);
  }

  function fillSelect(select, values) {
    if (!select) return;
    const sorted = Array.from(values).sort((a, b) => a.localeCompare(b, "es"));
    for (const v of sorted) {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v.charAt(0).toUpperCase() + v.slice(1);
      select.appendChild(opt);
    }
  }
  fillSelect(typeSel, tiposSet);
  fillSelect(stateSel, estadosSet);
  fillSelect(lightSel, lucesSet);
  fillSelect(waterSel, riegosSet);

  function applyFilters() {
    const q = qInput.value.trim().toLowerCase();
    const t = typeSel.value;
    const e = stateSel.value;
    const l = lightSel ? lightSel.value : "";
    const w = waterSel ? waterSel.value : "";
    const h = healthSel ? healthSel.value : "";

    let visible = 0;
    for (const s of cards) {
      const byName =
        !q ||
        s.dataset.name.includes(q) ||
        (s.dataset.apodo && s.dataset.apodo.includes(q));
      const byType = !t || s.dataset.tipo === t;
      const byState = !e || s.dataset.estado === e;
      const byLight = !l || s.dataset.luz === l;
      const byWater = !w || s.dataset.riego === w;
      const byHealth = !h || s.dataset.salud === h;

      const show =
        byName && byType && byState && byLight && byWater && byHealth;
      s.style.display = show ? "" : "none";
      if (show) visible++;
    }

    if (visible === cards.length) {
      resultCount.textContent = "Mostrando todas";
    } else if (visible === 0) {
      resultCount.textContent = "Sin resultados";
    } else {
      resultCount.textContent = `Mostrando ${visible} de ${cards.length}`;
    }
  }

  qInput.addEventListener("input", applyFilters);
  typeSel.addEventListener("change", applyFilters);
  stateSel.addEventListener("change", applyFilters);
  lightSel?.addEventListener("change", applyFilters);
  waterSel?.addEventListener("change", applyFilters);
  healthSel?.addEventListener("change", applyFilters);

  clearBtn.addEventListener("click", () => {
    qInput.value = "";
    typeSel.value = "";
    stateSel.value = "";
    if (lightSel) lightSel.value = "";
    if (waterSel) waterSel.value = "";
    if (healthSel) healthSel.value = "";
    applyFilters();
    qInput.focus();
  });

  applyFilters();
})();

/* ============================================================
   Dashboard: KPIs + Salud + Chips + Donut (todo en script.js)
   ============================================================ */

(function () {
  // Utilidades
  const $txt = (el) => (el?.textContent || "").toLowerCase();

  function classify(card) {
    const t = $txt(card);
    return {
      suculenta: /suculent/.test(t),
      trepadora: /trepador|colgant/.test(t),
      palmera: /palmera/.test(t),
      arbusto: /arbusto|árbol/.test(t),
      herbacea: /herbácea|ornamental/.test(t),
    };
  }

  function healthScore(card) {
    const t = $txt(card);
    const positive =
      /(muy saludable|sano|vigoros|hojas firmes|floración|excelente)/;
    const attention =
      /(estrés|puntas secas|decaíd|amarill|dañad|falta de|recuperación)/;
    const ok =
      positive.test(t) || (!attention.test(t) && /estable|bien/.test(t));
    const needs = attention.test(t) && !ok;
    return { ok, needs };
  }

  function computeCounters(cards) {
    const counters = {
      total: cards.length,
      sucu: 0,
      trepa: 0,
      palma: 0,
      arb: 0,
      herb: 0,
      ok: 0,
      needs: 0,
    };
    cards.forEach((c) => {
      const cf = classify(c);
      counters.sucu += cf.suculenta ? 1 : 0;
      counters.trepa += cf.trepadora ? 1 : 0;
      counters.palma += cf.palmera ? 1 : 0;
      counters.arb += cf.arbusto ? 1 : 0;
      counters.herb += cf.herbacea ? 1 : 0;

      const hs = healthScore(c);
      counters.ok += hs.ok ? 1 : 0;
      counters.needs += hs.needs ? 1 : 0;
    });
    return counters;
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  // Animaciones numéricas y easing
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

  function animateNumber(elOrId, to, { duration = 1500, prefix = '', suffix = '' } = {}) {
    const el = typeof elOrId === 'string' ? document.getElementById(elOrId) : elOrId;
    if (!el) return;
    const from = 0;
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const v = Math.round(from + (to - from) * easeOutQuint(t));
      el.textContent = `${prefix}${v}${suffix}`;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function updateKPIs(c) {
    animateNumber('kpi-total', c.total);
    animateNumber('kpi-sucus', c.sucu);
    animateNumber('kpi-trepas', c.trepa);
    animateNumber('kpi-palmas', c.palma);
    animateNumber('kpi-arbustos', c.arb);
    animateNumber('kpi-herb', c.herb);
  }

  function updateHealth(c) {
    const percentOk = c.total ? Math.round((c.ok / c.total) * 100) : 0;
    animateNumber('health-percent', percentOk, { suffix: '% sanas' });
    const bar = document.getElementById("health-bar");
    if (bar) bar.style.width = percentOk + "%";
    const legend = document.getElementById("health-legend");
    if (legend) legend.textContent = `${c.ok} sanas · ${c.needs} con atención`;
  }

  function updateLastUpdate() {
    const dates = Array.from(document.querySelectorAll(".block .kv"))
      .map((p) => p.textContent)
      .filter((t) => /última revisión:\s*\d{1,2}\/\d{1,2}\/\d{4}/i.test(t))
      .map((t) =>
        t
          .match(/\d{1,2}\/\d{1,2}\/\d{4}/)[0]
          .split("/")
          .reverse()
          .join("-")
      )
      .sort();
    const last = dates.length ? dates[dates.length - 1] : null;
    if (last) {
      const [y, m, d] = last.split("-");
      const lu = document.getElementById("last-update");
      if (lu) lu.textContent = `Última actualización: ${d}/${m}/${y}`;
    }
  }

  function bindChips(cards) {
    const chips = document.querySelectorAll(".chip");
    const showAll = () => cards.forEach((c) => (c.style.display = ""));
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        const rule = chip.dataset.filter;
        if (rule === "all") {
          showAll();
          return;
        }
        const re = new RegExp(rule, "i");
        cards.forEach((card) => {
          const t = $txt(card);
          card.style.display = re.test(t) ? "" : "none";
        });
        document
          .querySelector("#dashboard")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  // ---------- Donut ----------
  function renderDonut(counters) {
    const total = counters.total || 0;
    const container = document.getElementById("chart-types");
    const legendUL = document.getElementById("chart-legend");
    if (!container || !legendUL || !total) return;

    const data = [
      { key: "Suculentas", val: counters.sucu, color: "#7DC77F" },
      { key: "Trep./Colg.", val: counters.trepa, color: "#9AD08B" },
      { key: "Palmeras", val: counters.palma, color: "#A8DBA1" },
      { key: "Arb./Árboles", val: counters.arb, color: "#B7E3B0" },
      { key: "Herb./Ornam.", val: counters.herb, color: "#C6ECC0" },
    ].filter((d) => d.val > 0);

    const size = 140,
      r = 56,
      circumference = 2 * Math.PI * r,
      cx = size / 2,
      cy = size / 2;
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);

    // base
    const bg = document.createElementNS(ns, "circle");
    bg.setAttribute("cx", cx);
    bg.setAttribute("cy", cy);
    bg.setAttribute("r", r);
    bg.setAttribute("fill", "none");
    bg.setAttribute("stroke", "rgba(0,0,0,.12)");
    bg.setAttribute("stroke-width", "18");
    svg.appendChild(bg);

    // slices
    let offset = 0;
    let segIndex = 0;
    data.forEach((d) => {
      const len = circumference * (d.val / total);
      const arc = document.createElementNS(ns, "circle");
      arc.setAttribute("cx", cx);
      arc.setAttribute("cy", cy);
      arc.setAttribute("r", r);
      arc.setAttribute("fill", "none");
      arc.setAttribute("stroke", d.color);
      arc.setAttribute("stroke-width", "18");
      // iniciar desde 0 y animar hasta su longitud final
      arc.setAttribute("stroke-dasharray", `0 ${circumference}`);
      arc.setAttribute("stroke-dashoffset", `${-offset}`);
      arc.setAttribute("transform", `rotate(-90 ${cx} ${cy})`);
      arc.setAttribute("opacity", "0.95");
      svg.appendChild(arc);
      // animación del stroke
      const DURATION = 1600;
      const delay = segIndex * 180; // pequeño escalonado
      function animateArc(startTime){
        function step(now){
          const t = Math.min(1, (now - startTime) / DURATION);
          const eased = easeOutQuint(t);
          const val = len * eased;
          arc.setAttribute("stroke-dasharray", `${val} ${circumference - val}`);
          if(t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
      setTimeout(()=>animateArc(performance.now()), delay);
      offset += len;
      segIndex++;
    });

    // donut hole
    const hole = document.createElementNS(ns, "circle");
    hole.setAttribute("cx", cx);
    hole.setAttribute("cy", cy);
    hole.setAttribute("r", r - 10);
    hole.setAttribute("fill", "var(--panel)");
    svg.appendChild(hole);

    // center text
    const t = document.createElementNS(ns, "text");
    t.setAttribute("x", cx);
    t.setAttribute("y", cy + 4);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("font-size", "16");
    t.setAttribute("font-weight", "800");
    t.setAttribute("fill", "var(--text)");
    t.textContent = total;
    svg.appendChild(t);

    container.innerHTML = "";
    container.appendChild(svg);

    // legend
    legendUL.innerHTML = "";
    data.forEach((d) => {
      const li = document.createElement("li");
      const sw = document.createElement("span");
      sw.className = "swatch";
      sw.style.background = d.color;
      const pct = Math.round((d.val / total) * 100);
      li.appendChild(sw);
      li.appendChild(document.createTextNode(`${d.key}: ${d.val} · ${pct}%`));
      legendUL.appendChild(li);
    });
  }

  // ---------- Barras: Luz y Riego ----------
  function getKVForBars(section, labels){
    const kvs = section.querySelectorAll('p.kv');
    for(const p of kvs){
      const raw = (p.textContent||'').trim();
      for(const l of labels){
        if(raw.toLowerCase().startsWith(l.toLowerCase())){
          return raw.slice(l.length).replace(/^:\s*/,'').trim();
        }
      }
    }
    return '';
  }

  function normalizeLight(str){
    const s = (str||'').toLowerCase();
    const isAlta = /(muy\s*alta|alta|brillante|mucha|intensa)/.test(s);
    const isBaja = /(muy\s*baja|baja|sombra|poca)/.test(s);
    const isMedia = /(media|filtrada|parcial|luminosa)/.test(s);
    if(isAlta) return 'alta';
    if(isMedia) return 'media';
    if(isBaja) return 'baja';
    if(/indirecta/.test(s)) return 'media';
    return 'media';
  }

  function normalizeWater(str){
    const s = (str||'').toLowerCase();
    const alto = /(frecuent|abundant|mantener\s+h[úu]med|cada\s*(1|dos|2) d[íi]as)/.test(s);
    const bajo = /(escaso|poco|dejar\s+secar\s+complet|espaciado|espor[aá]dico)/.test(s);
    const moderado = /(moderad|regular)/.test(s);
    if(alto) return 'alto';
    if(bajo) return 'bajo';
    if(moderado) return 'moderado';
    if(/dejar\s+secar/.test(s)) return 'moderado';
    return 'moderado';
  }

  function countLightWater(cards){
    const light = { alta:0, media:0, baja:0 };
    const water = { alto:0, moderado:0, bajo:0 };
    cards.forEach(card=>{
      const l = getKVForBars(card, ['Luz:', 'Condiciones de luz recomendadas:']);
      const w = getKVForBars(card, ['Riego:']);
      light[normalizeLight(l)]++;
      water[normalizeWater(w)]++;
    });
    return { light, water };
  }

  function renderBars(containerId, legendId, entries){
    const cont = document.getElementById(containerId);
    const legend = document.getElementById(legendId);
    if(!cont) return;
    const total = entries.reduce((a,b)=>a+b.val,0) || 0;
    cont.innerHTML = '';
    if(legend) legend.innerHTML = '';
    entries.forEach(e=>{
      if(e.val<=0) return;
      const pct = total ? Math.round((e.val/total)*100) : 0;

      const item = document.createElement('div');
      item.className = 'baritem';

      const row = document.createElement('div');
      row.className = 'barrow';
      const fill = document.createElement('span');
      fill.className = 'fill';
      fill.style.background = e.color;
      fill.style.width = '0%';
      row.appendChild(fill);

      const label = document.createElement('span');
      label.className = 'barlabel';
      const sw = document.createElement('span');
      sw.className = 'swatch';
      sw.style.background = e.color;
      label.appendChild(sw);
      label.appendChild(document.createTextNode(`${e.label}: ${e.val} · ${pct}%`));

      item.appendChild(row);
      item.appendChild(label);
      cont.appendChild(item);

      requestAnimationFrame(()=>{ fill.style.width = pct + '%'; });
    });
  }

  function renderLightWater(cards){
    const { light, water } = countLightWater(cards);
    const lightData = [
      { key:'alta',  label:'Alta',  val: light.alta,  color:'#9AD08B' },
      { key:'media', label:'Media', val: light.media, color:'#B7E3B0' },
      { key:'baja',  label:'Baja',  val: light.baja,  color:'#D2F0CD' },
    ];
    const waterData = [
      { key:'alto',      label:'Alto',      val: water.alto,      color:'#7AB7E6' },
      { key:'moderado',  label:'Moderado',  val: water.moderado,  color:'#9CCAF0' },
      { key:'bajo',      label:'Bajo',      val: water.bajo,      color:'#C2E0F7' },
    ];
    renderBars('chart-light', 'legend-light', lightData);
    renderBars('chart-water', 'legend-water', waterData);

    // Indicadores promedio
    renderAverages('avg-light', lightData, { baja:1, media:2, alta:3 });
    renderAverages('avg-water', waterData, { bajo:1, moderado:2, alto:3 });
  }

  function renderAverages(containerId, entries, weights){
    const cont = document.getElementById(containerId);
    if(!cont) return;
    const total = entries.reduce((a,b)=>a + (b.val||0), 0) || 0;
    if(!total){ cont.innerHTML=''; return; }
    // weighted average 1..3
    let sum = 0; entries.forEach(e=>{ const w = weights[e.key]||0; sum += w * (e.val||0); });
    const avg = sum / total; // 1..3
    const pct = Math.round(((avg - 1) / 2) * 100); // 0..100
    // closest label
    const nearest = entries.slice().sort((a,b)=>Math.abs(weights[a.key]-avg)-Math.abs(weights[b.key]-avg))[0];

    // build UI
    cont.innerHTML = '';
    const head = document.createElement('div'); head.className='avg-head';
    const lspan = document.createElement('span'); lspan.innerHTML = `Promedio: <b>${nearest.label}</b>`;
    const rspan = document.createElement('span'); rspan.textContent = pct + '%';
    head.appendChild(lspan); head.appendChild(rspan); cont.appendChild(head);

    const row = document.createElement('div'); row.className='barrow';
    const fill = document.createElement('span'); fill.className='fill';
    // color cercano a la categoría dominante
    fill.style.background = nearest.color;
    fill.style.width = '0%'; row.appendChild(fill); cont.appendChild(row);
    requestAnimationFrame(()=>{ fill.style.width = pct + '%'; });
  }

  // ---------- Init ----------
  function initDashboard() {
    const cards = Array.from(
      document.querySelectorAll('section.card[id^="P"]')
    );
    if (!cards.length) return;
    const counters = computeCounters(cards);
    updateKPIs(counters);
    updateHealth(counters);
    updateLastUpdate();
    bindChips(cards);
    renderDonut(counters);
    renderLightWater(cards);
  }

  // Arranque
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDashboard);
  } else {
    initDashboard();
  }
})();

/* ============================================================
   Vista compacta/expandible de tarjetas de plantas
   - Muestra nombre, científico, apodo e imagen
   - Al pulsar, expande para ver la ficha completa
   ============================================================ */
(function(){
  const cards = Array.from(document.querySelectorAll('section.card[id^="P"]'));
  if(!cards.length) return;

  function getKV(section, label){
    const kvs = section.querySelectorAll('p.kv');
    for(const p of kvs){
      const raw = (p.textContent||'').trim();
      if(raw.toLowerCase().startsWith(label.toLowerCase())){
        return raw.slice(label.length).replace(/^:\s*/,'').trim();
      }
    }
    return '';
  }

  cards.forEach(card=>{
    // Crear línea de resumen si no existe
    let summary = card.querySelector('.summary-line');
    if(!summary){
      summary = document.createElement('div');
      summary.className = 'summary-line';
      const apodo = getKV(card, 'Apodo:');
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = apodo ? `Apodo: ${apodo}` : 'Apodo: —';
      summary.appendChild(tag);

      const toggle = document.createElement('button');
      toggle.className = 'card-toggle';
      toggle.setAttribute('aria-label','Mostrar/ocultar detalles');
      toggle.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>';
      summary.appendChild(toggle);

      const title = card.querySelector('.id');
      if(title){ title.insertAdjacentElement('afterend', summary); }

      function setState(expanded){
        card.classList.toggle('is-collapsed', !expanded);
        card.classList.toggle('is-expanded', !!expanded);
        toggle.setAttribute('aria-expanded', String(!!expanded));

        // Mostrar solo la última imagen cuando está colapsada
        const thumbs = Array.from(card.querySelectorAll('img.thumb'));
        if(thumbs.length > 1){
          if(!expanded){
            // En vista compacta mostrar SOLO la primera imagen
            thumbs.forEach((img, i)=>{ img.style.display = (i === 0) ? '' : 'none'; });
          } else {
            thumbs.forEach(img=>{ img.style.display = ''; });
          }
        }
      }

      // Estado inicial: compacto
      setState(false);

      // Click toggle
      toggle.addEventListener('click', (e)=>{ e.stopPropagation(); setState(!card.classList.contains('is-expanded')); });
      // También permitir click en el título
      title?.addEventListener('click', ()=> setState(!card.classList.contains('is-expanded')));
    }
  });
})();

/* ===== Exportar datos del jardín ===== */
(function () {
  const toggle = document.getElementById("dlToggle");
  const menu = document.getElementById("dlMenu");

  if (!toggle || !menu) return;

  // Abrir/cerrar menú
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });

  // Cerrar al clicar fuera o con ESC
  document.addEventListener("click", (e) => {
    if (!menu.hidden && !menu.contains(e.target) && e.target !== toggle) {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menu.hidden) {
      toggle.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }
  });

  // Utilidades
  function getText(el) {
    return (el?.textContent || "").trim();
  }
  function getKV(section, labelStarts) {
    const kvs = section.querySelectorAll("p.kv");
    for (const p of kvs) {
      const txt = getText(p);
      // admite etiquetas como "Origen:", "Origen o procedencia:", etc.
      for (const pref of [].concat(labelStarts)) {
        if (txt.toLowerCase().startsWith(pref.toLowerCase())) {
          return txt.slice(pref.length).replace(/^:\s*/, "").trim();
        }
      }
    }
    return "";
  }

  // Recolecta todas las plantas leyendo las cards
  function collectPlants() {
    const cards = Array.from(
      document.querySelectorAll('section.card[id^="P"]')
    );
    return cards.map((card) => {
      const id = card.id || "";
      const title = getText(card.querySelector(".id"));
      // "Planta P0XX — Nombre / Nombre científico"
      const [, nombreComun = "", nombreCientificoRaw = ""] =
        title.match(/—\s*(.*?)\s*\/\s*(.+)$/) || [];
      const nombreCientifico = nombreCientificoRaw
        .replace(/^\s*<.*?>|<\/.*?>$/g, "")
        .replace(/\s*<.*?>\s*/g, "")
        .trim();

      return {
        id,
        nombreComun,
        nombreCientifico,
        tipo: getKV(card, ["Tipo:", "Tipo"]),
        fechaRegistro: getKV(card, ["Fecha de registro:", "Fecha de registro"]),
        origen: getKV(card, [
          "Origen:",
          "Origen o procedencia:",
          "Procedencia:",
          "Origen/Procedencia:",
        ]),
        ubicacion: getKV(card, ["Ubicación:", "Ubicación actual:"]),
        luz: getKV(card, [
          "Luz:",
          "Condiciones de luz recomendadas:",
          "Alta indirecta",
          "Condiciones de luz",
        ]),
        riego: getKV(card, ["Riego:"]),
        temperatura: getKV(card, ["Temperatura:", "Temperatura ideal:"]),
        humedad: getKV(card, ["Humedad:", "Humedad recomendada:"]),
        sustrato: getKV(card, ["Sustrato:", "Sustrato usado:"]),
        ultimaRevision: getKV(card, ["Última revisión:"]),
        estadoActual: getKV(card, ["Estado actual:"]),
        observaciones:
          getText(card.querySelector(".row .block:nth-of-type(2) .kv")) || "",
        historial: getText(card.querySelector(".hist")) || "",
      };
    });
  }

  // Formateadores
  function toJSON(data) {
    return JSON.stringify(data, null, 2);
  }

  function toTXT(data) {
    return data
      .map((p) =>
        `# ${p.id} — ${p.nombreComun} / ${p.nombreCientifico}
Tipo: ${p.tipo}
Fecha de registro: ${p.fechaRegistro}
Origen: ${p.origen}
Ubicación: ${p.ubicacion}
Luz: ${p.luz}
Riego: ${p.riego}
Temperatura: ${p.temperatura}
Humedad: ${p.humedad}
Sustrato: ${p.sustrato}
Última revisión: ${p.ultimaRevision}
Estado actual: ${p.estadoActual}
Observaciones: ${p.observaciones}
Historial: ${p.historial}
`.trim()
      )
      .join("\n\n----------------------------------------\n\n");
  }

  function csvEscape(v) {
    if (v == null) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n;]/.test(s) ? `"${s}"` : s;
  }
  function toCSV(data) {
    const cols = [
      "id",
      "nombreComun",
      "nombreCientifico",
      "tipo",
      "fechaRegistro",
      "origen",
      "ubicacion",
      "luz",
      "riego",
      "temperatura",
      "humedad",
      "sustrato",
      "ultimaRevision",
      "estadoActual",
      "observaciones",
      "historial",
    ];
    const head = cols.join(",");
    const rows = data.map((p) => cols.map((c) => csvEscape(p[c])).join(","));
    return [head, ...rows].join("\n");
  }

  // Descargar
  function download(text, ext, mime) {
    const ts = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const file = `jardin_belen_alon_${ts.getFullYear()}${pad(
      ts.getMonth() + 1
    )}${pad(ts.getDate())}_${pad(ts.getHours())}${pad(ts.getMinutes())}.${ext}`;
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Click en una opción del menú
  menu.addEventListener("click", (e) => {
    const btn = e.target.closest(".dl-item");
    if (!btn) return;
    const fmt = btn.dataset.format;
    const data = collectPlants();

    if (fmt === "json") download(toJSON(data), "json", "application/json");
    if (fmt === "txt") download(toTXT(data), "txt", "text/plain;charset=utf-8");
    if (fmt === "csv") download(toCSV(data), "csv", "text/csv;charset=utf-8");

    // cerrar menú tras descargar
    toggle.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  });
})(); /* ────────────────────────────────
   Sonido ambiente (botón del pájaro)
   ──────────────────────────────── */
(function () {
  const btn = document.getElementById("ambienceBtn");
  if (!btn) return;

  // Ruta de tu pista real
  const AMBIENCE_SRC = "audio/relaxing-birds-and-piano-music-137153.mp3";

  // Reutiliza la misma instancia si ya existe (por si hay más controles)
  const audio = window.__ambAudio || new Audio(AMBIENCE_SRC);
  window.__ambAudio = audio;

  audio.loop = true;
  audio.preload = "auto";

  // Volumen y estado persistentes
  const savedVol = parseFloat(localStorage.getItem("amb_vol") || "0.25");
  audio.volume = isNaN(savedVol) ? 0.25 : savedVol;

  const wasOn = localStorage.getItem("amb_on") === "1";
  if (wasOn) {
    btn.classList.add("is-on");
    btn.setAttribute("aria-pressed", "true");
  }

  async function playIfAllowed() {
    try {
      await audio.play();
      btn.classList.add("is-on");
      btn.setAttribute("aria-pressed", "true");
      localStorage.setItem("amb_on", "1");
    } catch (e) {
      console.warn("No se pudo reproducir. Revisa la ruta:", AMBIENCE_SRC, e);
      btn.classList.remove("is-on");
      btn.setAttribute("aria-pressed", "false");
      localStorage.setItem("amb_on", "0");
    }
  }
  function pauseSound() {
    audio.pause();
    btn.classList.remove("is-on");
    btn.setAttribute("aria-pressed", "false");
    localStorage.setItem("amb_on", "0");
  }

  btn.addEventListener("click", () =>
    audio.paused ? playIfAllowed() : pauseSound()
  );

  // Si estaba activado antes, lo arrancamos en el primer gesto del usuario
  window.addEventListener(
    "pointerdown",
    function once() {
      if (localStorage.getItem("amb_on") === "1" && audio.paused)
        playIfAllowed();
      window.removeEventListener("pointerdown", once);
    },
    { once: true }
  );

  // Pausa al cambiar de pestaña; reanuda si estaba encendido
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) audio.pause();
    else if (!document.hidden && localStorage.getItem("amb_on") === "1")
      playIfAllowed();
  });

  // Log si la ruta del audio es inválida
  audio.addEventListener("error", () =>
    console.warn("No se pudo cargar:", AMBIENCE_SRC)
  );
})();

/* ============================================================
   Botón hojas flotantes (mostrar/ocultar capa visual)
   ============================================================ */
(function(){
  const btn = document.getElementById('leavesToggle');
  const layer = document.querySelector('.floating-leaves');
  if(!btn || !layer) return;

  const saved = localStorage.getItem('leaves_on');
  const on = saved !== '0';
  function apply(state){
    layer.style.display = state ? '' : 'none';
    btn.classList.toggle('is-on', state);
    btn.setAttribute('aria-pressed', String(state));
    localStorage.setItem('leaves_on', state ? '1' : '0');
  }
  apply(on);

  btn.addEventListener('click', ()=> apply(!(btn.classList.contains('is-on'))));
})();

/* ============================================================
   Recorrido automático de fichas (autoplay)
   ============================================================ */
(function(){
  const btn = document.getElementById('autoplayBtn');
  return; // antiguo autoplay por tarjetas deshabilitado (usamos autoplay del lightbox)

  let timer = null;
  let index = 0;
  const INTERVAL = 4000; // ms

  function visibleCards(){
    const all = Array.from(document.querySelectorAll('section.card[id^="P"]'));
    return all.filter(c => c.style.display !== 'none');
  }

  function step(){
    const cards = visibleCards();
    if(!cards.length){ stop(); return; }
    if(index >= cards.length) index = 0;
    const card = cards[index++];
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function play(){
    if(timer) return;
    btn.setAttribute('aria-pressed','true');
    btn.textContent = '⏸ Pausar';
    step();
    timer = setInterval(step, INTERVAL);
  }
  function stop(){
    if(timer){ clearInterval(timer); timer = null; }
    btn.setAttribute('aria-pressed','false');
    btn.textContent = '▶️ Paseo por el jardín.';
  }

  btn.addEventListener('click', ()=> timer ? stop() : play());
  document.addEventListener('visibilitychange', ()=>{ if(document.hidden) stop(); });
})();

/* ============================================================
   Lightbox (visor) para imágenes de plantas
   - Click en .thumb abre overlay
   - Esc cierra, ←/→ navegan
   - Tema coherente y transiciones suaves
   ============================================================ */
(function () {
  const overlay = document.getElementById("lightbox");
  if (!overlay) return;

  const imgEl = overlay.querySelector(".lb-img");
  const captionEl = overlay.querySelector(".lb-caption");
  const btnClose = overlay.querySelector(".lb-close");
  const btnPrev = overlay.querySelector(".lb-prev");
  const btnNext = overlay.querySelector(".lb-next");

  // Listado lineal de todas las miniaturas
  const thumbs = Array.from(document.querySelectorAll("img.thumb"));
  if (!thumbs.length) return;

  // Habilitar transiciones: quitar hidden y usar clase is-open
  overlay.removeAttribute("hidden");

  let idx = -1;

  function setImage(i) {
    idx = (i + thumbs.length) % thumbs.length;
    const t = thumbs[idx];
    const src = t.getAttribute("src");
    const alt = t.getAttribute("alt") || "";
    imgEl.src = src;
    imgEl.alt = alt;
    captionEl.textContent = alt;
    // Preload vecinos
    const nextIdx = (idx + 1) % thumbs.length;
    const prevIdx = (idx - 1 + thumbs.length) % thumbs.length;
    [nextIdx, prevIdx].forEach((j) => {
      const im = new Image();
      im.src = thumbs[j].getAttribute("src");
    });
  }

  function openAt(i) {
    setImage(i);
    overlay.classList.add("is-open");
    document.documentElement.classList.add("no-scroll");
    btnClose?.focus({ preventScroll: true });
    try{ document.dispatchEvent(new CustomEvent('lightbox:open')); }catch(_){}
  }

  function close() {
    overlay.classList.remove("is-open");
    document.documentElement.classList.remove("no-scroll");
    try{ document.dispatchEvent(new CustomEvent('lightbox:close')); }catch(_){}
  }

  function next() {
    setImage(idx + 1);
  }
  function prev() {
    setImage(idx - 1);
  }

  // Enlazar thumbs
  thumbs.forEach((t, i) => {
    t.style.cursor = "zoom-in";
    t.addEventListener("click", (e) => {
      e.preventDefault();
      openAt(i);
    });
  });

  // Controles
  btnClose?.addEventListener("click", close);
  btnNext?.addEventListener("click", next);
  btnPrev?.addEventListener("click", prev);

  // Cerrar al pulsar fondo
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  // Teclado global
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
  // Export API para otros módulos
  window.__lightbox = {
    openAt,
    close,
    next,
    prev,
    isOpen: () => overlay.classList.contains('is-open'),
    thumbs
  };
})();

/* ============================================================
   Recorrido automático (modo galería/lightbox)
   - Abre el visor y va mostrando imágenes en orden aleatorio
   - Se detiene al cerrar el visor o cambiar de pestaña
   ============================================================ */
(function(){
  const btn = document.getElementById('autoplayBtn');
  if(!btn) return;

  let timer = null;
  let order = [];
  let pos = 0;
  const INTERVAL = 4000; // ms

  function shuffle(n){
    const a=[...Array(n).keys()];
    for(let i=n-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
    return a;
  }

  function stop(){ if(timer){ clearInterval(timer); timer=null; } btn.setAttribute('aria-pressed','false'); btn.textContent='▶️ Paseo por el jardín.'; }

  function step(){
    const lb = window.__lightbox; if(!lb) return stop();
    const total = lb.thumbs?.length||0; if(!total){ stop(); return; }
    if(!order.length) { order = shuffle(total); pos = 0; }
    if(pos >= order.length) { order = shuffle(total); pos = 0; }
    const idx = order[pos++];
    lb.openAt(idx);
  }

  function play(){
    if(timer){ stop(); return; }
    btn.setAttribute('aria-pressed','true');
    btn.textContent='⏸ Pausar';
    step();
    timer = setInterval(step, INTERVAL);
  }

  // Exponer para otros módulos si se necesita
  window.__startLightboxAutoplay = play;

  btn.addEventListener('click', play);
  document.addEventListener('visibilitychange', ()=>{ if(document.hidden) stop(); });
  document.addEventListener('lightbox:close', stop);
})();

/* ────────────────────────────────
   Hojas flotantes (generación)
   ──────────────────────────────── */
(function(){
  const layer = document.querySelector('.floating-leaves');
  if(!layer) return;

  // Si el usuario prefiere menos movimiento, no renderizamos
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mqReduce.matches) return;

  const NUM_LEAVES = 10;           // 6–12 es muy suave
  const vw = () => Math.floor(Math.random() * 100);           // 0..99
  const pick = (min, max) => min + Math.random() * (max - min);
  const isLight = document.documentElement.classList.contains('light');
  const masks = [
    'img/monstera-leaf-verde-borde-8px.svg',
    'img/leaves-svgrepo-com.svg',
    'img/leaves-svgrepo-com (1).svg',
    'img/leaves-svgrepo-com (2).svg',
    'img/leaves-svgrepo-com (3).svg',
    'img/leaves-5-svgrepo-com.svg'
  ];

  for (let i=0; i<NUM_LEAVES; i++){
    const leaf = document.createElement('span');
    leaf.className = 'leaf';
    const inner = document.createElement('span');
    inner.className = 'inner';

    // Posición X de inicio/mitad/fin (en vw) para crear ligera deriva horizontal
    const startX = vw();                           // 0..100 vw
    const sway   = pick(6, 14);                    // cuánto se desplaza lateralmente
    const dir    = Math.random() < 0.5 ? -1 : 1;   // izquierda o derecha
    const midX   = startX + dir * (sway * 0.6);
    const endX   = startX + dir * sway;

    // Tamaño, duración y desfase
    const size   = pick(26, 44);                   // px (más grandes)
    const dur    = pick(14, 22);                   // s
    const delay  = -pick(0, dur);                  // negativo para entrar desfasadas
    const op     = pick(isLight ? 0.22 : 0.18, isLight ? 0.42 : 0.35);

    leaf.style.setProperty('--sx', `${startX}vw`);
    leaf.style.setProperty('--mx', `${midX}vw`);
    leaf.style.setProperty('--ex', `${endX}vw`);
    leaf.style.setProperty('--size', `${size}px`);
    leaf.style.setProperty('--dur', `${dur}s`);
    leaf.style.setProperty('--delay', `${delay}s`);
    leaf.style.setProperty('--opacity', op.toFixed(2));

    // Máscara SVG aleatoria para variedad
    const maskUrl = masks[Math.floor(Math.random() * masks.length)];
    inner.style.setProperty('--mask-url', `url("${maskUrl}")`);

    // Vaivén de rotación aleatorio (sobre el hijo)
    const tilt = pick(6, 12);
    const dirTilt = Math.random() < 0.5 ? -1 : 1;
    leaf.style.setProperty('--tiltDur', `${pick(2.2, 3.4)}s`);
    leaf.style.setProperty('--tiltA', `${-dirTilt * tilt}deg`);
    leaf.style.setProperty('--tiltB', `${dirTilt * tilt}deg`);

    leaf.appendChild(inner);
    layer.appendChild(leaf);
  }
})();
