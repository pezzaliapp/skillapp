/* SKILLAPP — A Codex of Minor Arts
   The application: routing, views, persistence, calibrations.
   Vanilla JS, no build step, no dependencies. */

(function () {
  "use strict";

  const STORAGE_KEY = "skillapp.calibrations.v1";
  const SKILLS = window.SKILLS || [];
  const META = window.CODEX_META || {};
  const SKILL_BY_ID = Object.fromEntries(SKILLS.map(function (s) { return [s.id, s]; }));

  /* ─────────────────────── DOM helpers ─────────────────────── */
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k === "dataset") {
          for (const dk in attrs[k]) node.dataset[dk] = attrs[k][dk];
        } else if (k.indexOf("on") === 0 && typeof attrs[k] === "function") {
          node.addEventListener(k.slice(2), attrs[k]);
        } else if (attrs[k] !== false && attrs[k] != null) {
          node.setAttribute(k, attrs[k]);
        }
      }
    }
    if (children != null) {
      const list = Array.isArray(children) ? children : [children];
      for (const c of list) {
        if (c == null || c === false) continue;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      }
    }
    return node;
  }

  function clear(n) { while (n.firstChild) n.removeChild(n.firstChild); }
  function rule(label) {
    const r = el("div", { class: "rule" + (label ? " rule-labelled" : "") });
    if (label) r.appendChild(el("span", { class: "rule-label", text: label }));
    return r;
  }

  /* ───────────────────────── storage ───────────────────────── */
  function getEntries() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  }
  function saveEntries(arr) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
    catch (e) { /* quota or private mode — fail quietly */ }
  }
  function addEntry(skillId, value, note) {
    const entries = getEntries();
    const id = "e_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
    entries.push({ id: id, skillId: skillId, t: Date.now(), v: Number(value), n: note || "" });
    saveEntries(entries);
    return id;
  }
  function removeEntry(id) {
    const entries = getEntries().filter(function (e) { return e.id !== id; });
    saveEntries(entries);
  }
  function entriesFor(skillId) {
    return getEntries().filter(function (e) { return e.skillId === skillId; });
  }

  /* ────────────────────────── format ───────────────────────── */
  function fmtDate(t) {
    const d = new Date(t);
    const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return m[d.getMonth()] + " " + String(d.getDate()).padStart(2, "0") + " · " +
      String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  function fmtVal(v, unit) {
    if (typeof v !== "number" || !isFinite(v)) return "—";
    const rounded = Math.round(v * 100) / 100;
    return rounded + (unit ? " " + unit : "");
  }
  function pageNumberFor(route, sub) {
    const map = { codex: "I", ledger: "II", rite: "III", colophon: "IV" };
    if (route === "atelier" && sub) {
      const skill = SKILL_BY_ID[sub];
      if (skill) return skill.numeral;
    }
    return map[route] || "—";
  }

  /* ────────────────────────── charts ───────────────────────── */
  function sparkline(values) {
    if (!values || values.length === 0) return "";
    const blocks = "▁▂▃▄▅▆▇█";
    let lo = Infinity, hi = -Infinity;
    for (const v of values) { if (v < lo) lo = v; if (v > hi) hi = v; }
    if (lo === hi) return blocks[3].repeat(values.length);
    return values.map(function (v) {
      const t = (v - lo) / (hi - lo);
      const i = Math.min(blocks.length - 1, Math.max(0, Math.round(t * (blocks.length - 1))));
      return blocks[i];
    }).join("");
  }
  function svgChart(entries, lowerIsBetter) {
    const N = entries.length;
    if (N === 0) return el("div", { class: "chart-empty", text: "no calibrations yet" });
    const W = 480, H = 120, P = 14;
    const xs = entries.map(function (e) { return e.t; });
    const ys = entries.map(function (e) { return e.v; });
    const xmin = xs[0], xmax = xs[xs.length - 1];
    let ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    if (ymin === ymax) { ymin = ymin - 1; ymax = ymax + 1; }
    function px(t) { return P + (xmax === xmin ? W / 2 - P : ((t - xmin) / (xmax - xmin)) * (W - 2 * P)); }
    function py(v) { return H - P - ((v - ymin) / (ymax - ymin)) * (H - 2 * P); }
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "chart-svg");
    svg.setAttribute("role", "img");

    // baseline + gridlines
    for (let i = 0; i <= 3; i++) {
      const y = P + i * ((H - 2 * P) / 3);
      const ln = document.createElementNS(svgNS, "line");
      ln.setAttribute("x1", P); ln.setAttribute("x2", W - P);
      ln.setAttribute("y1", y); ln.setAttribute("y2", y);
      ln.setAttribute("class", "chart-grid");
      svg.appendChild(ln);
    }

    // path
    const d = entries.map(function (e, i) {
      return (i === 0 ? "M" : "L") + px(e.t).toFixed(1) + " " + py(e.v).toFixed(1);
    }).join(" ");
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("class", "chart-line");
    svg.appendChild(path);

    // dots
    for (const e of entries) {
      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", px(e.t));
      c.setAttribute("cy", py(e.v));
      c.setAttribute("r", 2.5);
      c.setAttribute("class", "chart-dot");
      svg.appendChild(c);
    }

    // axis labels
    const lbl = document.createElementNS(svgNS, "text");
    lbl.setAttribute("x", P); lbl.setAttribute("y", H - 2);
    lbl.setAttribute("class", "chart-label");
    lbl.textContent = fmtDate(xmin).replace(" · ", " ");
    svg.appendChild(lbl);
    const lbl2 = document.createElementNS(svgNS, "text");
    lbl2.setAttribute("x", W - P); lbl2.setAttribute("y", H - 2);
    lbl2.setAttribute("text-anchor", "end");
    lbl2.setAttribute("class", "chart-label");
    lbl2.textContent = fmtDate(xmax).replace(" · ", " ");
    svg.appendChild(lbl2);

    const wrap = el("div", { class: "chart" });
    wrap.appendChild(svg);
    const trend = trendLabel(entries, lowerIsBetter);
    if (trend) wrap.appendChild(el("div", { class: "chart-trend", text: trend }));
    return wrap;
  }
  function trendLabel(entries, lowerIsBetter) {
    if (entries.length < 2) return "";
    const first = entries[0].v, last = entries[entries.length - 1].v;
    const delta = last - first;
    const better = lowerIsBetter ? delta < 0 : delta > 0;
    const sign = delta > 0 ? "+" : "";
    const mark = better ? "↗ improving" : delta === 0 ? "→ steady" : "↘ drifting";
    return mark + " · " + sign + (Math.round(delta * 100) / 100) + " over " + entries.length + " readings";
  }

  /* ─────────────────────── calibrations ────────────────────── */
  /* Each calibration takes (skill, container, onLog) and
     populates `container` with its UI. onLog(value, note) records it. */

  const CALIBRATIONS = {};

  CALIBRATIONS.manual = function (skill, container, onLog) {
    const cfg = skill.calibration;
    const input = el("input", {
      type: "number",
      step: "any",
      class: "cal-input",
      placeholder: cfg.placeholder || "value",
      "aria-label": "calibration value"
    });
    const note = el("input", {
      type: "text",
      class: "cal-note",
      placeholder: "note (optional)",
      "aria-label": "note"
    });
    const submit = el("button", { class: "cal-btn", type: "button", text: "record" });
    const helpText = el("p", {
      class: "cal-help",
      text: "Enter your reading in " + (cfg.inputUnit || skill.unit) + ". Press record when ready."
    });
    submit.addEventListener("click", function () {
      const v = parseFloat(input.value);
      if (isNaN(v)) { input.focus(); return; }
      onLog(v, note.value.trim());
      input.value = ""; note.value = "";
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") submit.click();
    });
    container.appendChild(helpText);
    const row = el("div", { class: "cal-row" }, [input, note, submit]);
    container.appendChild(row);
  };

  /* small helpers shared by the interactive widgets */
  function rndInt(lo, hi) { return Math.floor(Math.random() * (hi - lo + 1)) + lo; }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function widgetShell(container, opts) {
    container.classList.add("widget");
    const root = el("div", { class: "widget-root" });
    const top = el("p", { class: "cal-help", text: opts.help });
    container.appendChild(top);
    container.appendChild(root);
    return root;
  }
  function logRow(container, value, unit, note, onLog) {
    const row = el("div", { class: "cal-row cal-row-result" });
    row.appendChild(el("span", { class: "cal-result", text: "result: " + value + " " + unit }));
    if (note) row.appendChild(el("span", { class: "cal-result-note", text: note }));
    row.appendChild(el("button", {
      type: "button", class: "cal-btn", text: "record reading",
      onclick: function () { onLog(value, note || ""); }
    }));
    container.appendChild(row);
  }

  /* ── I. Mental Multiplication ─────────────────────────────── */
  CALIBRATIONS.mentalMult = function (skill, container, onLog) {
    const N = 5;
    const root = widgetShell(container, {
      help: "Five problems. Type each answer and press Enter. " +
            "The clock starts when the first problem is shown."
    });
    function gen() {
      const a = rndInt(11, 99); const b = rndInt(11, 99);
      return { a: a, b: b, ans: a * b };
    }
    function render() {
      clear(root);
      const begin = el("button", { class: "cal-btn", text: "begin", type: "button" });
      begin.addEventListener("click", run);
      root.appendChild(begin);
    }
    function run() {
      clear(root);
      const problems = []; for (let i = 0; i < N; i++) problems.push(gen());
      const start = performance.now();
      let i = 0; let correct = 0;
      const stage = el("div", { class: "widget-stage" });
      const prompt = el("div", { class: "widget-prompt" });
      const input = el("input", {
        type: "number", class: "widget-input", autocomplete: "off",
        inputmode: "numeric", "aria-label": "answer"
      });
      const status = el("div", { class: "widget-status" });
      stage.appendChild(prompt); stage.appendChild(input); stage.appendChild(status);
      root.appendChild(stage);
      function show() {
        const p = problems[i];
        prompt.textContent = p.a + " × " + p.b + " = ?";
        status.textContent = "problem " + (i + 1) + " of " + N;
        input.value = ""; input.focus();
      }
      input.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        const v = parseInt(input.value, 10);
        if (isNaN(v)) return;
        if (v === problems[i].ans) correct++;
        i++;
        if (i >= N) {
          const elapsed = (performance.now() - start) / 1000;
          finish(elapsed, correct);
        } else show();
      });
      show();
      function finish(seconds, correct) {
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: correct + " of " + N + " correct in " + seconds.toFixed(1) + " seconds." }));
        const value = Math.round(seconds * 10) / 10;
        const note = correct + "/" + N + " correct";
        logRow(root, value, skill.unit, note, onLog);
        const again = el("button", { type: "button", class: "ghost-btn", text: "again",
          onclick: render });
        root.appendChild(again);
      }
    }
    render();
  };

  /* ── II. Major System ─────────────────────────────────────── */
  CALIBRATIONS.majorSystem = function (skill, container, onLog) {
    const N = 10;
    const root = widgetShell(container, {
      help: "Ten random digits will appear. Study them. When ready, hide them and type the recall."
    });
    function render() {
      clear(root);
      const begin = el("button", { class: "cal-btn", text: "begin", type: "button",
        onclick: study });
      root.appendChild(begin);
    }
    let digits = "";
    function study() {
      digits = ""; for (let i = 0; i < N; i++) digits += rndInt(0, 9);
      clear(root);
      root.appendChild(el("div", { class: "digit-string", text: digits.split("").join("  ") }));
      root.appendChild(el("p", { class: "cal-help dim",
        text: "Compose images. When ready, hide and recall." }));
      const hide = el("button", { class: "cal-btn", text: "hide and recall", type: "button",
        onclick: recall });
      root.appendChild(hide);
    }
    function recall() {
      clear(root);
      root.appendChild(el("p", { class: "cal-help", text: "Type the digits in order." }));
      const input = el("input", {
        type: "text", class: "widget-input wide", inputmode: "numeric",
        autocomplete: "off", "aria-label": "recalled digits"
      });
      const submit = el("button", { class: "cal-btn", text: "score", type: "button" });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") submit.click();
      });
      submit.addEventListener("click", function () {
        const guess = (input.value || "").replace(/\D/g, "").slice(0, N);
        let correct = 0;
        for (let i = 0; i < N; i++) if (guess[i] === digits[i]) correct++;
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: correct + " of " + N + " digits in correct positions." }));
        root.appendChild(el("p", { class: "cal-help dim",
          text: "shown: " + digits + " · typed: " + (guess || "—") }));
        logRow(root, correct, skill.unit, "of " + N, onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: "again", onclick: render }));
      });
      root.appendChild(input);
      root.appendChild(submit);
      input.focus();
    }
    render();
  };

  /* ── III. Doomsday ────────────────────────────────────────── */
  CALIBRATIONS.doomsday = function (skill, container, onLog) {
    const N = 5;
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const root = widgetShell(container, {
      help: "Five random dates. Choose the weekday. The timer runs across the whole set."
    });
    function genDate() {
      const y = rndInt(1900, 2099);
      const m = rndInt(1, 12);
      const dim = new Date(y, m, 0).getDate();
      const d = rndInt(1, dim);
      return { y: y, m: m, d: d, dow: new Date(y, m - 1, d).getDay() };
    }
    function render() {
      clear(root);
      const begin = el("button", { class: "cal-btn", text: "begin", type: "button", onclick: run });
      root.appendChild(begin);
    }
    function run() {
      clear(root);
      const set = []; for (let i = 0; i < N; i++) set.push(genDate());
      let i = 0; let correct = 0;
      const start = performance.now();
      const prompt = el("div", { class: "widget-prompt" });
      const status = el("div", { class: "widget-status" });
      const buttons = el("div", { class: "dow-buttons" });
      DAYS.forEach(function (label, idx) {
        const b = el("button", { type: "button", class: "dow-btn", text: label });
        b.addEventListener("click", function () {
          if (idx === set[i].dow) correct++;
          i++;
          if (i >= N) finish((performance.now() - start) / 1000, correct);
          else show();
        });
        buttons.appendChild(b);
      });
      function show() {
        const d = set[i];
        prompt.textContent = d.y + "  ·  " +
          ["—","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.m] +
          "  " + String(d.d).padStart(2, "0");
        status.textContent = "date " + (i + 1) + " of " + N;
      }
      root.appendChild(prompt); root.appendChild(buttons); root.appendChild(status);
      show();
      function finish(seconds, correct) {
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: correct + " of " + N + " correct in " + seconds.toFixed(1) + "s." }));
        logRow(root, correct, skill.unit, seconds.toFixed(1) + "s elapsed", onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: "again", onclick: render }));
      }
    }
    render();
  };

  /* ── IV. One Minute ───────────────────────────────────────── */
  CALIBRATIONS.oneMinute = function (skill, container, onLog) {
    const root = widgetShell(container, {
      help: "Press start. Wait until you feel one minute has passed. Press stop."
    });
    function render() {
      clear(root);
      const begin = el("button", { class: "cal-btn", text: "start", type: "button", onclick: run });
      root.appendChild(begin);
    }
    function run() {
      clear(root);
      const start = performance.now();
      root.appendChild(el("p", { class: "widget-finish text-dim",
        text: "do not count. Listen to the body's clock." }));
      const stop = el("button", { class: "cal-btn cal-btn-large", type: "button", text: "stop" });
      stop.addEventListener("click", function () {
        const elapsed = (performance.now() - start) / 1000;
        const error = Math.abs(elapsed - 60);
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: "you stopped at " + elapsed.toFixed(2) + "s · error " +
                (elapsed > 60 ? "+" : "−") + error.toFixed(2) + "s" }));
        const v = Math.round(error * 100) / 100;
        const note = (elapsed > 60 ? "long" : "short") + " · stopped at " + elapsed.toFixed(2) + "s";
        logRow(root, v, skill.unit, note, onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: "again", onclick: render }));
      });
      root.appendChild(stop);
    }
    render();
  };

  /* ── V. Clock Reading ─────────────────────────────────────── */
  CALIBRATIONS.clockRead = function (skill, container, onLog) {
    const N = 10;
    const root = widgetShell(container, {
      help: "Ten random clock faces. Type the time as 'h:mm' (12-hour). The timer runs across the set."
    });
    function clockSVG(h, m) {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.setAttribute("class", "clock-face");
      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", 50); c.setAttribute("cy", 50); c.setAttribute("r", 46);
      c.setAttribute("class", "clock-rim"); svg.appendChild(c);
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * 2 * Math.PI - Math.PI / 2;
        const x1 = 50 + Math.cos(a) * 40, y1 = 50 + Math.sin(a) * 40;
        const x2 = 50 + Math.cos(a) * 44, y2 = 50 + Math.sin(a) * 44;
        const tk = document.createElementNS(svgNS, "line");
        tk.setAttribute("x1", x1); tk.setAttribute("y1", y1);
        tk.setAttribute("x2", x2); tk.setAttribute("y2", y2);
        tk.setAttribute("class", "clock-tick" + (i % 3 === 0 ? " bold" : ""));
        svg.appendChild(tk);
      }
      const hAng = ((h % 12) + m / 60) / 12 * 2 * Math.PI - Math.PI / 2;
      const mAng = (m / 60) * 2 * Math.PI - Math.PI / 2;
      function hand(ang, len, cls) {
        const x = 50 + Math.cos(ang) * len, y = 50 + Math.sin(ang) * len;
        const ln = document.createElementNS(svgNS, "line");
        ln.setAttribute("x1", 50); ln.setAttribute("y1", 50);
        ln.setAttribute("x2", x); ln.setAttribute("y2", y);
        ln.setAttribute("class", cls);
        svg.appendChild(ln);
      }
      hand(hAng, 24, "clock-hour");
      hand(mAng, 36, "clock-min");
      const cap = document.createElementNS(svgNS, "circle");
      cap.setAttribute("cx", 50); cap.setAttribute("cy", 50); cap.setAttribute("r", 2);
      cap.setAttribute("class", "clock-cap"); svg.appendChild(cap);
      return svg;
    }
    function render() {
      clear(root);
      const begin = el("button", { class: "cal-btn", text: "begin", type: "button", onclick: run });
      root.appendChild(begin);
    }
    function parseTime(s) {
      const m = String(s).trim().match(/^(\d{1,2})[:.](\d{1,2})$/);
      if (!m) return null;
      const h = parseInt(m[1], 10) % 12, mm = parseInt(m[2], 10);
      if (mm < 0 || mm > 59) return null;
      return { h: h, m: mm };
    }
    function run() {
      clear(root);
      const set = [];
      for (let i = 0; i < N; i++) set.push({ h: rndInt(1, 12), m: rndInt(0, 59) });
      let i = 0; let correct = 0;
      const start = performance.now();
      const wrap = el("div", { class: "clock-wrap" });
      const status = el("div", { class: "widget-status" });
      const input = el("input", {
        type: "text", class: "widget-input", autocomplete: "off",
        inputmode: "numeric", placeholder: "h:mm"
      });
      function show() {
        clear(wrap);
        wrap.appendChild(clockSVG(set[i].h, set[i].m));
        status.textContent = "face " + (i + 1) + " of " + N;
        input.value = ""; input.focus();
      }
      input.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        const t = parseTime(input.value);
        if (!t) return;
        if (t.h === (set[i].h % 12) && Math.abs(t.m - set[i].m) <= 1) correct++;
        i++;
        if (i >= N) finish((performance.now() - start) / 1000, correct);
        else show();
      });
      root.appendChild(wrap); root.appendChild(input); root.appendChild(status);
      show();
      function finish(seconds, correct) {
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: correct + " of " + N + " in " + seconds.toFixed(1) + "s." }));
        const value = Math.round(seconds * 10) / 10;
        const note = correct + "/" + N + " correct (±1 min tolerated)";
        logRow(root, value, skill.unit, note, onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: "again", onclick: render }));
      }
    }
    render();
  };

  /* ── VI. Pitch Intervals ──────────────────────────────────── */
  CALIBRATIONS.pitchInterval = function (skill, container, onLog) {
    const INTERVALS = [
      { label: "minor 3rd",   semis: 3 },
      { label: "major 3rd",   semis: 4 },
      { label: "perfect 4th", semis: 5 },
      { label: "perfect 5th", semis: 7 },
      { label: "octave",      semis: 12 }
    ];
    const N = 10;
    const root = widgetShell(container, {
      help: "Ten intervals. Two notes will sound. Choose the interval. " +
            "Replay any time. Audio uses the browser's synth — turn the volume up gently."
    });
    let audioCtx = null;
    function note(freq, when, dur) {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, when);
      g.gain.exponentialRampToValueAtTime(0.18, when + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(when); o.stop(when + dur + 0.05);
    }
    function play(rootFreq, semis) {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const t = audioCtx.currentTime + 0.04;
      const f2 = rootFreq * Math.pow(2, semis / 12);
      note(rootFreq, t, 0.55);
      note(f2, t + 0.65, 0.55);
    }
    function render() {
      clear(root);
      const begin = el("button", { class: "cal-btn", text: "begin", type: "button", onclick: run });
      root.appendChild(begin);
    }
    function run() {
      clear(root);
      const set = [];
      for (let i = 0; i < N; i++) {
        const rootFreq = 220 * Math.pow(2, rndInt(0, 8) / 12);
        const choice = INTERVALS[rndInt(0, INTERVALS.length - 1)];
        set.push({ rootFreq: rootFreq, ans: choice });
      }
      let i = 0; let correct = 0;
      const status = el("div", { class: "widget-status" });
      const replay = el("button", { class: "cal-btn", type: "button", text: "play" });
      const buttons = el("div", { class: "interval-buttons" });
      INTERVALS.forEach(function (iv) {
        const b = el("button", { type: "button", class: "dow-btn wide", text: iv.label });
        b.addEventListener("click", function () {
          if (iv.label === set[i].ans.label) correct++;
          i++;
          if (i >= N) finish(correct);
          else show();
        });
        buttons.appendChild(b);
      });
      replay.addEventListener("click", function () {
        play(set[i].rootFreq, set[i].ans.semis);
      });
      function show() {
        status.textContent = "interval " + (i + 1) + " of " + N;
        play(set[i].rootFreq, set[i].ans.semis);
      }
      root.appendChild(status); root.appendChild(replay); root.appendChild(buttons);
      show();
      function finish(correct) {
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: correct + " of " + N + " correct." }));
        logRow(root, correct, skill.unit, "of " + N, onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: "again", onclick: render }));
      }
    }
    render();
  };

  /* ── VII. Reading Pace ────────────────────────────────────── */
  CALIBRATIONS.readingPace = function (skill, container, onLog) {
    const PASSAGE = (
      "Mr Utterson the lawyer was a man of a rugged countenance, that was never " +
      "lighted by a smile; cold, scanty, and embarrassed in discourse; backward in " +
      "sentiment; lean, long, dusty, dreary, and yet somehow lovable. At friendly " +
      "meetings, and when the wine was to his taste, something eminently human " +
      "beaconed from his eye; something indeed which never found its way into his " +
      "talk, but which spoke not only in these silent symbols of the after-dinner " +
      "face, but more often and loudly in the acts of his life. He was austere with " +
      "himself; drank gin when he was alone, to mortify a taste for vintages; and " +
      "though he enjoyed the theatre, had not crossed the doors of one for twenty " +
      "years. But he had an approved tolerance for others; sometimes wondering, " +
      "almost with envy, at the high pressure of spirits involved in their " +
      "misdeeds; and in any extremity inclined to help rather than to reprove. " +
      "'I incline to Cain's heresy,' he used to say quaintly; 'I let my brother " +
      "go to the devil in his own way.'"
    );
    const WORDS = PASSAGE.trim().split(/\s+/).length;
    const root = widgetShell(container, {
      help: "Read the passage aloud, calmly, at a public-lectern pace. " +
            "Press start when you begin and stop when you reach the final word. (" + WORDS + " words.)"
    });
    function render() {
      clear(root);
      root.appendChild(el("blockquote", { class: "reading-passage", text: PASSAGE }));
      root.appendChild(el("p", { class: "cal-help dim",
        text: "Robert Louis Stevenson, 'The Strange Case of Dr Jekyll and Mr Hyde', 1886." }));
      const start = el("button", { class: "cal-btn", text: "start reading", type: "button" });
      let t0 = 0;
      start.addEventListener("click", function () {
        t0 = performance.now();
        clear(root);
        root.appendChild(el("blockquote", { class: "reading-passage", text: PASSAGE }));
        const stop = el("button", { class: "cal-btn cal-btn-large", text: "stop", type: "button" });
        stop.addEventListener("click", function () {
          const seconds = (performance.now() - t0) / 1000;
          const wpm = Math.round((WORDS / seconds) * 60);
          clear(root);
          root.appendChild(el("p", { class: "widget-finish",
            text: WORDS + " words in " + seconds.toFixed(1) + "s · " + wpm + " wpm" }));
          logRow(root, wpm, skill.unit, seconds.toFixed(1) + "s elapsed", onLog);
          root.appendChild(el("button", { type: "button", class: "ghost-btn", text: "again", onclick: render }));
        });
        root.appendChild(stop);
      });
      root.appendChild(start);
    }
    render();
  };

  /* ── VIII. Freehand Circle (self-rated) ───────────────────── */
  CALIBRATIONS.circleSelfRate = function (skill, container, onLog) {
    const root = widgetShell(container, {
      help: "Draw your circle on paper. Step three paces back. Then rate it honestly."
    });
    const wrap = el("div", { class: "slider-wrap" });
    const range = el("input", {
      type: "range", min: "0", max: "10", step: "1", value: "5", class: "circle-slider"
    });
    const valueLabel = el("span", { class: "slider-value", text: "5" });
    range.addEventListener("input", function () { valueLabel.textContent = range.value; });
    wrap.appendChild(el("span", { class: "slider-end", text: "0" }));
    wrap.appendChild(range);
    wrap.appendChild(el("span", { class: "slider-end", text: "10" }));
    root.appendChild(wrap);
    root.appendChild(el("div", { class: "slider-display" }, [
      el("span", { class: "slider-display-label", text: "your verdict: " }),
      valueLabel,
      el("span", { class: "slider-display-label", text: " / 10" })
    ]));
    const submit = el("button", { class: "cal-btn", type: "button", text: "record",
      onclick: function () { onLog(parseInt(range.value, 10), ""); } });
    root.appendChild(submit);
  };

  /* ─────────────────────────── views ───────────────────────── */
  const view = function () { return document.getElementById("view"); };

  function renderCodex() {
    const v = view(); clear(v);
    document.title = "SKILLAPP — A Codex of Minor Arts";
    const intro = el("section", { class: "codex-intro" });
    intro.appendChild(el("h1", { class: "codex-title", text: META.title }));
    intro.appendChild(el("p", { class: "codex-subtitle", text: META.subtitle }));
    intro.appendChild(el("p", { class: "codex-preface", text: META.preface }));
    intro.appendChild(rule("the index"));
    v.appendChild(intro);

    const list = el("ol", { class: "codex-list", start: "1" });
    SKILLS.forEach(function (skill) {
      const last = entriesFor(skill.id).slice(-12).map(function (e) { return e.v; });
      const li = el("li", { class: "codex-item", dataset: { id: skill.id } });
      const a = el("a", { href: "#atelier/" + skill.id, class: "codex-link" });
      a.appendChild(el("span", { class: "codex-numeral", text: skill.numeral + "." }));
      a.appendChild(el("span", { class: "codex-glyph", text: skill.glyph }));
      a.appendChild(el("span", { class: "codex-name" }, [
        el("span", { class: "codex-title-line", text: skill.title }),
        el("span", { class: "codex-cat", text: META.categories[skill.category] || skill.category })
      ]));
      const right = el("span", { class: "codex-right" });
      right.appendChild(el("span", {
        class: "codex-spark",
        text: last.length ? sparkline(last) : "·".repeat(8)
      }));
      right.appendChild(el("span", {
        class: "codex-count",
        text: last.length ? "(" + entriesFor(skill.id).length + ")" : "(—)"
      }));
      a.appendChild(right);
      li.appendChild(a);
      list.appendChild(li);
    });
    v.appendChild(list);
    v.appendChild(rule(""));
    v.appendChild(el("p", { class: "codex-invocation", text: META.invocation }));
  }

  function renderAtelier(skillId) {
    const v = view(); clear(v);
    const skill = SKILL_BY_ID[skillId];
    if (!skill) { renderNotFound(); return; }
    document.title = "SKILLAPP — " + skill.title;

    const head = el("section", { class: "atelier-head" });
    head.appendChild(el("a", { href: "#codex", class: "back-link", text: "← codex" }));
    head.appendChild(el("p", { class: "atelier-numeral", text: "Article " + skill.numeral }));
    head.appendChild(el("h1", { class: "atelier-title" }, [
      el("span", { class: "atelier-glyph", text: skill.glyph }),
      el("span", { class: "atelier-title-text", text: skill.title })
    ]));
    head.appendChild(el("p", {
      class: "atelier-cat",
      text: "an art " + (META.categories[skill.category] || skill.category) +
            " · calibrated in " + skill.unit
    }));
    v.appendChild(head);

    if (skill.warning) {
      const warn = el("aside", { class: "atelier-warn" });
      warn.appendChild(el("span", { class: "warn-tag", text: "AVERTISSEMENT" }));
      warn.appendChild(el("span", { text: skill.warning }));
      v.appendChild(warn);
    }

    v.appendChild(rule("description"));
    v.appendChild(el("p", { class: "atelier-desc", text: skill.description }));

    v.appendChild(rule("origin"));
    v.appendChild(el("p", { class: "atelier-origin", text: skill.origin }));

    v.appendChild(rule("protocol"));
    const ol = el("ol", { class: "atelier-protocol" });
    skill.protocol.forEach(function (step) { ol.appendChild(el("li", { text: step })); });
    v.appendChild(ol);

    v.appendChild(el("p", { class: "atelier-marginalia", text: skill.marginalia }));

    v.appendChild(rule("calibration"));
    const calBox = el("div", { class: "calibration-box" });
    const cal = CALIBRATIONS[skill.calibration.type] || CALIBRATIONS.manual;
    cal(skill, calBox, function (value, note) {
      addEntry(skill.id, value, note || "");
      renderAtelier(skill.id);
    });
    v.appendChild(calBox);

    v.appendChild(rule("readings"));
    const entries = entriesFor(skill.id).sort(function (a, b) { return a.t - b.t; });
    v.appendChild(svgChart(entries, !!skill.lowerIsBetter));

    if (entries.length) {
      const ledger = el("table", { class: "atelier-ledger" });
      const tb = document.createElement("tbody");
      entries.slice().reverse().slice(0, 10).forEach(function (e) {
        const tr = document.createElement("tr");
        tr.appendChild(el("td", { class: "lg-date", text: fmtDate(e.t) }));
        tr.appendChild(el("td", { class: "lg-val", text: fmtVal(e.v, "") }));
        tr.appendChild(el("td", { class: "lg-unit", text: skill.unit }));
        tr.appendChild(el("td", { class: "lg-note", text: e.n || "" }));
        const action = el("td", { class: "lg-action" });
        action.appendChild(el("button", {
          type: "button", class: "lg-rm", "aria-label": "remove reading", text: "⌫",
          onclick: function () {
            removeEntry(e.id);
            renderAtelier(skill.id);
          }
        }));
        tr.appendChild(action);
        tb.appendChild(tr);
      });
      ledger.appendChild(tb);
      v.appendChild(ledger);
    }
  }

  function renderLedger() {
    const v = view(); clear(v);
    document.title = "SKILLAPP — Ledger";
    v.appendChild(el("h1", { class: "page-title", text: "The Ledger" }));
    v.appendChild(el("p", { class: "page-blurb",
      text: "All recorded calibrations, in reverse chronological order. The ledger is the only history." }));
    v.appendChild(rule(""));

    const all = getEntries().slice().sort(function (a, b) { return b.t - a.t; });
    if (all.length === 0) {
      v.appendChild(el("p", { class: "ledger-empty",
        text: "No calibrations yet. Open any article in the codex and perform its test." }));
      return;
    }

    const tbl = el("table", { class: "ledger-table" });
    const tb = document.createElement("tbody");
    let lastDay = "";
    all.forEach(function (e) {
      const skill = SKILL_BY_ID[e.skillId];
      const d = new Date(e.t);
      const dayKey = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      if (dayKey !== lastDay) {
        const dayLabel = todayLabel(d);
        const groupTr = document.createElement("tr");
        groupTr.className = "ledger-day";
        const groupTd = el("td", { colspan: "5", class: "ledger-day-cell", text: dayLabel });
        groupTr.appendChild(groupTd);
        tb.appendChild(groupTr);
        lastDay = dayKey;
      }
      const tr = document.createElement("tr");
      tr.appendChild(el("td", { class: "lg-date",
        text: String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") }));
      const linkCell = el("td", { class: "lg-skill" });
      if (skill) {
        linkCell.appendChild(el("a", {
          href: "#atelier/" + skill.id,
          text: skill.numeral + ". " + skill.title
        }));
      } else {
        linkCell.textContent = "(unknown skill)";
      }
      tr.appendChild(linkCell);
      tr.appendChild(el("td", { class: "lg-val", text: fmtVal(e.v, "") }));
      tr.appendChild(el("td", { class: "lg-unit", text: skill ? skill.unit : "" }));
      tr.appendChild(el("td", { class: "lg-note", text: e.n || "" }));
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    v.appendChild(tbl);

    const total = all.length;
    const skillsTouched = new Set(all.map(function (e) { return e.skillId; })).size;
    const earliest = new Date(all[all.length - 1].t);
    v.appendChild(el("p", { class: "ledger-summary",
      text: total + " readings across " + skillsTouched + " articles · first entry " +
            todayLabel(earliest).split(",").slice(1).join(",").trim() }));

    v.appendChild(rule(""));
    const tools = el("div", { class: "ledger-tools" });
    tools.appendChild(el("button", {
      type: "button",
      class: "danger-btn",
      text: "erase the ledger",
      onclick: function () {
        if (window.confirm("Erase every recorded calibration? This cannot be undone.")) {
          saveEntries([]);
          renderLedger();
        }
      }
    }));
    tools.appendChild(el("button", {
      type: "button",
      class: "ghost-btn",
      text: "export as text",
      onclick: function () { exportLedger(); }
    }));
    v.appendChild(tools);
  }

  function exportLedger() {
    const all = getEntries().slice().sort(function (a, b) { return a.t - b.t; });
    if (!all.length) return;
    const lines = ["SKILLAPP — Ledger export", "edition " + META.edition,
      new Date().toISOString(), ""];
    all.forEach(function (e) {
      const skill = SKILL_BY_ID[e.skillId];
      lines.push([
        new Date(e.t).toISOString(),
        skill ? skill.numeral + ". " + skill.title : "(unknown)",
        e.v + (skill ? " " + skill.unit : ""),
        e.n || ""
      ].join("  ·  "));
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skillapp-ledger.txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  /* ─────────────── seeded picker for the daily rite ────────── */
  function dateSeed(date) {
    /* a stable hash of YYYY-MM-DD */
    const s = date.getFullYear() + "-" +
      String(date.getMonth() + 1).padStart(2, "0") + "-" +
      String(date.getDate()).padStart(2, "0");
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return h;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function pickRiteSkills(date, n) {
    const rnd = mulberry32(dateSeed(date));
    const pool = SKILLS.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    return pool.slice(0, n);
  }
  function todayLabel(d) {
    const m = ["January","February","March","April","May","June",
      "July","August","September","October","November","December"];
    const dows = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return dows[d.getDay()] + ", " + m[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }
  function loggedToday(skillId) {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    return getEntries().some(function (e) { return e.skillId === skillId && e.t >= cutoff; });
  }

  function renderRite() {
    const v = view(); clear(v);
    document.title = "SKILLAPP — Daily Rite";
    const today = new Date();
    const picks = pickRiteSkills(today, 3);

    v.appendChild(el("h1", { class: "page-title", text: "The Daily Rite" }));
    v.appendChild(el("p", { class: "page-blurb",
      text: "Three articles drawn from the codex for today. " +
            "The same three on every device, for this date; tomorrow they will be other three." }));
    v.appendChild(el("p", { class: "rite-date", text: todayLabel(today) }));
    v.appendChild(rule("the order"));

    const list = el("ol", { class: "rite-list" });
    picks.forEach(function (skill, idx) {
      const done = loggedToday(skill.id);
      const li = el("li", { class: "rite-item" + (done ? " rite-item-done" : "") });
      li.appendChild(el("div", { class: "rite-numeral", text: ["i.", "ii.", "iii."][idx] }));
      const body = el("div", { class: "rite-body" });
      body.appendChild(el("a", { href: "#atelier/" + skill.id, class: "rite-link" }, [
        el("span", { class: "rite-glyph", text: skill.glyph }),
        el("span", { class: "rite-title", text: skill.title })
      ]));
      body.appendChild(el("p", { class: "rite-desc", text: shortDesc(skill.description) }));
      body.appendChild(buildRiteTimer(5));
      if (done) body.appendChild(el("p", { class: "rite-done", text: "✓ a reading was recorded today" }));
      li.appendChild(body);
      list.appendChild(li);
    });
    v.appendChild(list);
    v.appendChild(rule(""));
    v.appendChild(el("p", { class: "rite-foot",
      text: "Five minutes per article. Fifteen minutes well spent. " +
            "Open each article to perform the calibration and record a reading." }));
  }
  function shortDesc(s) {
    /* first sentence, capped */
    const m = String(s).match(/^[^.!?]+[.!?]/);
    const out = (m ? m[0] : s).trim();
    return out.length > 180 ? out.slice(0, 177) + "…" : out;
  }
  function buildRiteTimer(minutes) {
    const total = minutes * 60;
    let remaining = total;
    let handle = null;
    const display = el("span", { class: "timer-display", text: fmtTimer(total) });
    const start = el("button", { type: "button", class: "ghost-btn", text: "start " + minutes + "-min" });
    const reset = el("button", { type: "button", class: "ghost-btn dim", text: "reset" });
    function tick() {
      remaining = Math.max(0, remaining - 1);
      display.textContent = fmtTimer(remaining);
      if (remaining === 0) {
        clearInterval(handle); handle = null;
        start.textContent = "done";
        display.classList.add("ringing");
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const o = ctx.createOscillator(); const g = ctx.createGain();
          o.frequency.value = 660; o.type = "sine";
          g.gain.setValueAtTime(0.0001, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
          o.connect(g); g.connect(ctx.destination);
          o.start(); o.stop(ctx.currentTime + 0.65);
        } catch (_) {}
      }
    }
    start.addEventListener("click", function () {
      if (handle) {
        clearInterval(handle); handle = null; start.textContent = "resume";
        return;
      }
      if (remaining === 0) remaining = total;
      start.textContent = "pause";
      display.classList.remove("ringing");
      handle = setInterval(tick, 1000);
    });
    reset.addEventListener("click", function () {
      if (handle) { clearInterval(handle); handle = null; }
      remaining = total;
      display.textContent = fmtTimer(total);
      display.classList.remove("ringing");
      start.textContent = "start " + minutes + "-min";
    });
    return el("div", { class: "rite-timer" }, [display, start, reset]);
  }
  function fmtTimer(s) {
    const mm = Math.floor(s / 60), ss = s % 60;
    return String(mm).padStart(2, "0") + ":" + String(ss).padStart(2, "0");
  }

  function renderColophon() {
    const v = view(); clear(v);
    document.title = "SKILLAPP — Colophon";
    v.appendChild(el("h1", { class: "page-title", text: "Colophon" }));
    v.appendChild(rule(""));
    v.appendChild(el("p", { class: "atelier-desc", text: META.preface }));
    v.appendChild(el("p", { class: "atelier-desc", text: META.invocation }));
    v.appendChild(rule(""));
    v.appendChild(el("p", { class: "atelier-origin", text: META.attribution }));
    v.appendChild(rule(""));
    const techy = el("p", { class: "atelier-origin dim" });
    techy.appendChild(el("span", { text:
      "Set in JetBrains Mono and EB Garamond. " +
      "Printed in the browser, kept in the browser. " +
      "All readings live in localStorage and never leave this device. " +
      "No accounts, no servers, no analytics. " +
      "View the source at " }));
    techy.appendChild(el("a", {
      href: "https://github.com/pezzaliapp/skillapp",
      text: "github.com/pezzaliapp/skillapp",
      target: "_blank", rel: "noopener noreferrer"
    }));
    techy.appendChild(el("span", { text: "." }));
    v.appendChild(techy);
  }

  function renderNotFound() {
    const v = view(); clear(v);
    v.appendChild(el("h1", { class: "page-title", text: "Article not found" }));
    v.appendChild(el("p", { class: "page-blurb",
      text: "Return to the codex." }));
    v.appendChild(el("a", { href: "#codex", class: "back-link", text: "← codex" }));
  }

  /* ─────────────────────────── routing ─────────────────────── */
  function parseRoute() {
    const h = (location.hash || "#codex").replace(/^#/, "");
    const parts = h.split("/").filter(Boolean);
    return { route: parts[0] || "codex", sub: parts[1] || "" };
  }

  function dispatch() {
    const { route, sub } = parseRoute();
    document.body.dataset.route = route;
    document.querySelectorAll(".navbar a").forEach(function (a) {
      a.classList.toggle("current", a.dataset.route === route);
    });
    const folioEl = document.getElementById("folio");
    if (folioEl) folioEl.textContent = "fol. " + pageNumberFor(route, sub);
    const pageNumEl = document.getElementById("pageNum");
    if (pageNumEl) pageNumEl.textContent = "— " + pageNumberFor(route, sub) + " —";

    switch (route) {
      case "codex": renderCodex(); break;
      case "atelier": renderAtelier(sub); break;
      case "ledger": renderLedger(); break;
      case "rite": renderRite(); break;
      case "colophon": renderColophon(); break;
      default: renderNotFound();
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* ─────────────────────────── main ────────────────────────── */
  function main() {
    document.getElementById("app").classList.remove("loading");
    window.addEventListener("hashchange", dispatch);
    if (!location.hash) location.hash = "#codex";
    dispatch();
  }
  main();
})();
