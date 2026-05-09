/* SKILLAPP — A Codex of Minor Arts
   The application: routing, views, persistence, calibrations.
   Vanilla JS, no build step, no dependencies. Locale-aware. */

(function () {
  "use strict";

  const STORAGE_KEY = "skillapp.calibrations.v1";
  const LOCALE_KEY  = "skillapp.locale.v1";
  const SUPPORTED_LOCALES = ["en", "it"];
  const SKILLS = window.SKILLS || [];
  const SKILL_BY_ID = Object.fromEntries(SKILLS.map(function (s) { return [s.id, s]; }));

  /* ────────────────────────── locale ───────────────────────── */
  let currentLocale = detectLocale();

  function detectLocale() {
    let saved = null;
    try { saved = localStorage.getItem(LOCALE_KEY); } catch (_) {}
    if (saved && SUPPORTED_LOCALES.indexOf(saved) >= 0) return saved;
    const nav = (navigator.language || "en").toLowerCase();
    if (nav === "it" || nav.indexOf("it-") === 0) return "it";
    return "en";
  }
  function saveLocale(loc) {
    try { localStorage.setItem(LOCALE_KEY, loc); } catch (_) {}
  }
  function setLocale(loc) {
    if (SUPPORTED_LOCALES.indexOf(loc) < 0) return;
    if (loc === currentLocale) return;
    currentLocale = loc;
    saveLocale(loc);
    applyLocale();
    dispatch();
  }

  function t(key) {
    const dict = (window.UI && window.UI[currentLocale]) || {};
    const fb   = (window.UI && window.UI.en) || {};
    if (dict[key] != null) return dict[key];
    if (fb[key]   != null) return fb[key];
    return key;
  }
  function fmt(template, vars) {
    if (template == null) return "";
    return String(template).replace(/\{(\w+)\}/g, function (_, k) {
      return vars && vars[k] != null ? vars[k] : "";
    });
  }
  function tFmt(key, vars) { return fmt(t(key), vars); }

  function meta() {
    const en = (window.META && window.META.en) || {};
    const lo = (window.META && window.META[currentLocale]) || {};
    return Object.assign({}, en, lo, {
      categories: Object.assign({}, en.categories || {}, lo.categories || {})
    });
  }
  function getSkill(id) {
    const struct = SKILL_BY_ID[id];
    if (!struct) return null;
    const enT = (window.SKILL_TEXT && window.SKILL_TEXT.en && window.SKILL_TEXT.en[id]) || {};
    const loT = (window.SKILL_TEXT && window.SKILL_TEXT[currentLocale] && window.SKILL_TEXT[currentLocale][id]) || {};
    return Object.assign({}, struct, enT, loT);
  }

  /* apply <html lang> + sticky labels in the masthead */
  function applyLocale() {
    document.documentElement.setAttribute("lang", currentLocale);
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta_description"));
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t("title_codex"));
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t("meta_description"));
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", currentLocale === "it" ? "it_IT" : "en_GB");
    const m = meta();
    const subEl = document.querySelector(".masthead-sub");
    if (subEl) subEl.textContent = m.title || "";
    const edEl = document.querySelector(".masthead-edition");
    if (edEl) edEl.textContent = "ed. " + (m.edition || "");
    const navMap = { codex: "nav_codex", ledger: "nav_ledger", rite: "nav_rite", colophon: "nav_colophon" };
    document.querySelectorAll(".navbar a[data-route]").forEach(function (a) {
      a.textContent = t(navMap[a.dataset.route] || "");
    });
    document.querySelectorAll(".lang-switch button[data-locale]").forEach(function (b) {
      b.classList.toggle("current", b.dataset.locale === currentLocale);
      b.setAttribute("aria-pressed", b.dataset.locale === currentLocale ? "true" : "false");
    });
    const langWrap = document.querySelector(".lang-switch");
    if (langWrap) langWrap.setAttribute("aria-label", t("lang_label"));
    const impressum = document.querySelector(".foot-row span:first-child");
    if (impressum) impressum.textContent = t("foot_impressum");
  }

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
    catch (e) { /* fail quietly */ }
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
  function fmtDate(t_) {
    const d = new Date(t_);
    const months = t("months_short");
    const m = Array.isArray(months) ? months[d.getMonth()] : "";
    return m + " " + String(d.getDate()).padStart(2, "0") + " · " +
      String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
  }
  function fmtVal(v) {
    if (typeof v !== "number" || !isFinite(v)) return "—";
    return Math.round(v * 100) / 100;
  }
  function pageNumberFor(route, sub) {
    const map = { codex: "I", ledger: "II", rite: "III", colophon: "IV" };
    if (route === "atelier" && sub) {
      const skill = SKILL_BY_ID[sub];
      if (skill) return skill.numeral;
    }
    return map[route] || "—";
  }
  function todayLabel(d) {
    const months = t("months_long");
    const dows   = t("days_long");
    return fmt(t("date_long"), {
      dow:   Array.isArray(dows) ? dows[d.getDay()] : "",
      month: Array.isArray(months) ? months[d.getMonth()] : "",
      day:   d.getDate(),
      year:  d.getFullYear()
    });
  }

  /* ────────────────────────── charts ───────────────────────── */
  function sparkline(values) {
    if (!values || values.length === 0) return "";
    const blocks = "▁▂▃▄▅▆▇█";
    let lo = Infinity, hi = -Infinity;
    for (const v of values) { if (v < lo) lo = v; if (v > hi) hi = v; }
    if (lo === hi) return blocks[3].repeat(values.length);
    return values.map(function (v) {
      const tt = (v - lo) / (hi - lo);
      const i = Math.min(blocks.length - 1, Math.max(0, Math.round(tt * (blocks.length - 1))));
      return blocks[i];
    }).join("");
  }
  function svgChart(entries, lowerIsBetter) {
    const N = entries.length;
    if (N === 0) return el("div", { class: "chart-empty", text: t("chart_empty") });
    const W = 480, H = 120, P = 14;
    const xs = entries.map(function (e) { return e.t; });
    const ys = entries.map(function (e) { return e.v; });
    const xmin = xs[0], xmax = xs[xs.length - 1];
    let ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    if (ymin === ymax) { ymin = ymin - 1; ymax = ymax + 1; }
    function px(tt) { return P + (xmax === xmin ? W / 2 - P : ((tt - xmin) / (xmax - xmin)) * (W - 2 * P)); }
    function py(v)  { return H - P - ((v - ymin) / (ymax - ymin)) * (H - 2 * P); }
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("class", "chart-svg");
    svg.setAttribute("role", "img");
    for (let i = 0; i <= 3; i++) {
      const y = P + i * ((H - 2 * P) / 3);
      const ln = document.createElementNS(svgNS, "line");
      ln.setAttribute("x1", P); ln.setAttribute("x2", W - P);
      ln.setAttribute("y1", y); ln.setAttribute("y2", y);
      ln.setAttribute("class", "chart-grid");
      svg.appendChild(ln);
    }
    const d = entries.map(function (e, i) {
      return (i === 0 ? "M" : "L") + px(e.t).toFixed(1) + " " + py(e.v).toFixed(1);
    }).join(" ");
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("class", "chart-line");
    svg.appendChild(path);
    for (const e of entries) {
      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", px(e.t));
      c.setAttribute("cy", py(e.v));
      c.setAttribute("r", 2.5);
      c.setAttribute("class", "chart-dot");
      svg.appendChild(c);
    }
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
    const mark = better ? t("chart_improving") : delta === 0 ? t("chart_steady") : t("chart_drifting");
    return mark + " · " + sign + (Math.round(delta * 100) / 100) +
      tFmt("chart_over_n", { n: entries.length });
  }

  /* ─────────────────────── calibrations ────────────────────── */
  /* Each calibration takes (skill, container, onLog) and populates
     `container` with its UI. onLog(value, note) records a reading. */

  const CALIBRATIONS = {};

  CALIBRATIONS.manual = function (skill, container, onLog) {
    const placeholder = skill.placeholder || t("placeholder_value");
    const unit = skill.unit;
    const input = el("input", {
      type: "number", step: "any", class: "cal-input",
      placeholder: placeholder, "aria-label": t("rule_calibration")
    });
    const note = el("input", {
      type: "text", class: "cal-note",
      placeholder: t("note_optional"), "aria-label": t("note_optional")
    });
    const submit = el("button", { class: "cal-btn", type: "button", text: t("btn_record") });
    container.appendChild(el("p", {
      class: "cal-help",
      text: tFmt("atelier_enter_reading", { unit: unit })
    }));
    submit.addEventListener("click", function () {
      const v = parseFloat(input.value);
      if (isNaN(v)) { input.focus(); return; }
      onLog(v, note.value.trim());
      input.value = ""; note.value = "";
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") submit.click();
    });
    container.appendChild(el("div", { class: "cal-row" }, [input, note, submit]));
  };

  /* shared helpers for interactive widgets */
  function rndInt(lo, hi) { return Math.floor(Math.random() * (hi - lo + 1)) + lo; }
  function widgetShell(container, opts) {
    container.classList.add("widget");
    const root = el("div", { class: "widget-root" });
    container.appendChild(el("p", { class: "cal-help", text: opts.help }));
    container.appendChild(root);
    return root;
  }
  function logRow(container, value, unit, note, onLog) {
    const row = el("div", { class: "cal-row cal-row-result" });
    row.appendChild(el("span", { class: "cal-result", text: t("result_label") + value + " " + unit }));
    if (note) row.appendChild(el("span", { class: "cal-result-note", text: note }));
    row.appendChild(el("button", {
      type: "button", class: "cal-btn", text: t("btn_record_reading"),
      onclick: function () { onLog(value, note || ""); }
    }));
    container.appendChild(row);
  }

  /* ── I. Mental Multiplication ─────────────────────────────── */
  CALIBRATIONS.mentalMult = function (skill, container, onLog) {
    const N = 5;
    const root = widgetShell(container, { help: t("w_mental_help") });
    function gen() {
      const a = rndInt(11, 99); const b = rndInt(11, 99);
      return { a: a, b: b, ans: a * b };
    }
    function render() {
      clear(root);
      root.appendChild(el("button", {
        class: "cal-btn", text: t("btn_begin"), type: "button",
        onclick: run
      }));
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
        inputmode: "numeric", "aria-label": t("rule_calibration")
      });
      const status = el("div", { class: "widget-status" });
      stage.appendChild(prompt); stage.appendChild(input); stage.appendChild(status);
      root.appendChild(stage);
      function show() {
        const p = problems[i];
        prompt.textContent = p.a + " × " + p.b + " = ?";
        status.textContent = tFmt("w_mental_problem", { i: i + 1, n: N });
        input.value = ""; input.focus();
      }
      input.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        const v = parseInt(input.value, 10);
        if (isNaN(v)) return;
        if (v === problems[i].ans) correct++;
        i++;
        if (i >= N) finish((performance.now() - start) / 1000, correct);
        else show();
      });
      show();
      function finish(seconds, correct) {
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: tFmt("w_mental_finish", { c: correct, n: N, s: seconds.toFixed(1) }) }));
        const value = Math.round(seconds * 10) / 10;
        const note  = tFmt("w_mental_note", { c: correct, n: N });
        logRow(root, value, skill.unit, note, onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: t("btn_again"), onclick: render }));
      }
    }
    render();
  };

  /* ── II. Major System ─────────────────────────────────────── */
  CALIBRATIONS.majorSystem = function (skill, container, onLog) {
    const N = 10;
    const root = widgetShell(container, { help: t("w_major_help") });
    function render() {
      clear(root);
      root.appendChild(el("button", {
        class: "cal-btn", text: t("btn_begin"), type: "button", onclick: study
      }));
    }
    let digits = "";
    function study() {
      digits = ""; for (let i = 0; i < N; i++) digits += rndInt(0, 9);
      clear(root);
      root.appendChild(el("div", { class: "digit-string", text: digits.split("").join("  ") }));
      root.appendChild(el("p", { class: "cal-help dim", text: t("w_major_compose") }));
      root.appendChild(el("button", { class: "cal-btn", text: t("btn_hide_recall"), type: "button", onclick: recall }));
    }
    function recall() {
      clear(root);
      root.appendChild(el("p", { class: "cal-help", text: t("w_major_type_order") }));
      const input = el("input", {
        type: "text", class: "widget-input wide", inputmode: "numeric",
        autocomplete: "off", "aria-label": t("w_major_type_order")
      });
      const submit = el("button", { class: "cal-btn", text: t("btn_score"), type: "button" });
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") submit.click();
      });
      submit.addEventListener("click", function () {
        const guess = (input.value || "").replace(/\D/g, "").slice(0, N);
        let correct = 0;
        for (let i = 0; i < N; i++) if (guess[i] === digits[i]) correct++;
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: tFmt("w_major_finish", { c: correct, n: N }) }));
        root.appendChild(el("p", { class: "cal-help dim",
          text: tFmt("w_major_shown_typed", { shown: digits, typed: guess || t("w_major_dash") }) }));
        logRow(root, correct, skill.unit, tFmt("w_major_note", { n: N }), onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: t("btn_again"), onclick: render }));
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
    const root = widgetShell(container, { help: t("w_doom_help") });
    function genDate() {
      const y = rndInt(1900, 2099);
      const m = rndInt(1, 12);
      const dim = new Date(y, m, 0).getDate();
      const d = rndInt(1, dim);
      return { y: y, m: m, d: d, dow: new Date(y, m - 1, d).getDay() };
    }
    function render() {
      clear(root);
      root.appendChild(el("button", { class: "cal-btn", text: t("btn_begin"), type: "button", onclick: run }));
    }
    function run() {
      clear(root);
      const set = []; for (let i = 0; i < N; i++) set.push(genDate());
      let i = 0; let correct = 0;
      const start = performance.now();
      const prompt = el("div", { class: "widget-prompt" });
      const status = el("div", { class: "widget-status" });
      const buttons = el("div", { class: "dow-buttons" });
      const days = t("days_short");
      days.forEach(function (label, idx) {
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
        const months = t("months_short");
        const d = set[i];
        prompt.textContent = d.y + "  ·  " + months[d.m - 1] + "  " + String(d.d).padStart(2, "0");
        status.textContent = tFmt("w_doom_date", { i: i + 1, n: N });
      }
      root.appendChild(prompt); root.appendChild(buttons); root.appendChild(status);
      show();
      function finish(seconds, correct) {
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: tFmt("w_doom_finish", { c: correct, n: N, s: seconds.toFixed(1) }) }));
        logRow(root, correct, skill.unit, tFmt("w_doom_note_elapsed", { s: seconds.toFixed(1) }), onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: t("btn_again"), onclick: render }));
      }
    }
    render();
  };

  /* ── IV. One Minute ───────────────────────────────────────── */
  CALIBRATIONS.oneMinute = function (skill, container, onLog) {
    const root = widgetShell(container, { help: t("w_one_help") });
    function render() {
      clear(root);
      root.appendChild(el("button", { class: "cal-btn", text: t("btn_start"), type: "button", onclick: run }));
    }
    function run() {
      clear(root);
      const start = performance.now();
      root.appendChild(el("p", { class: "widget-finish text-dim", text: t("w_one_instruction") }));
      const stop = el("button", { class: "cal-btn cal-btn-large", type: "button", text: t("btn_stop") });
      stop.addEventListener("click", function () {
        const elapsed = (performance.now() - start) / 1000;
        const error = Math.abs(elapsed - 60);
        clear(root);
        const finishKey = elapsed > 60 ? "w_one_finish_long" : "w_one_finish_short";
        const noteKey   = elapsed > 60 ? "w_one_note_long"   : "w_one_note_short";
        root.appendChild(el("p", { class: "widget-finish",
          text: tFmt(finishKey, { elapsed: elapsed.toFixed(2), error: error.toFixed(2) }) }));
        const v = Math.round(error * 100) / 100;
        const note = tFmt(noteKey, { s: elapsed.toFixed(2) });
        logRow(root, v, skill.unit, note, onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: t("btn_again"), onclick: render }));
      });
      root.appendChild(stop);
    }
    render();
  };

  /* ── V. Clock Reading ─────────────────────────────────────── */
  CALIBRATIONS.clockRead = function (skill, container, onLog) {
    const N = 10;
    const root = widgetShell(container, { help: t("w_clock_help") });
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
      root.appendChild(el("button", { class: "cal-btn", text: t("btn_begin"), type: "button", onclick: run }));
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
        inputmode: "numeric", placeholder: t("w_clock_placeholder")
      });
      function show() {
        clear(wrap);
        wrap.appendChild(clockSVG(set[i].h, set[i].m));
        status.textContent = tFmt("w_clock_face", { i: i + 1, n: N });
        input.value = ""; input.focus();
      }
      input.addEventListener("keydown", function (e) {
        if (e.key !== "Enter") return;
        const tt = parseTime(input.value);
        if (!tt) return;
        if (tt.h === (set[i].h % 12) && Math.abs(tt.m - set[i].m) <= 1) correct++;
        i++;
        if (i >= N) finish((performance.now() - start) / 1000, correct);
        else show();
      });
      root.appendChild(wrap); root.appendChild(input); root.appendChild(status);
      show();
      function finish(seconds, correct) {
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: tFmt("w_clock_finish", { c: correct, n: N, s: seconds.toFixed(1) }) }));
        const value = Math.round(seconds * 10) / 10;
        const note = tFmt("w_clock_note", { c: correct, n: N });
        logRow(root, value, skill.unit, note, onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: t("btn_again"), onclick: render }));
      }
    }
    render();
  };

  /* ── VI. Pitch Intervals ──────────────────────────────────── */
  CALIBRATIONS.pitchInterval = function (skill, container, onLog) {
    const SEMIS = [3, 4, 5, 7, 12];
    const labels = t("w_pitch_intervals");
    const INTERVALS = SEMIS.map(function (s, i) { return { label: labels[i] || ("+" + s), semis: s }; });
    const N = 10;
    const root = widgetShell(container, { help: t("w_pitch_help") });
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
      const tt = audioCtx.currentTime + 0.04;
      const f2 = rootFreq * Math.pow(2, semis / 12);
      note(rootFreq, tt, 0.55);
      note(f2, tt + 0.65, 0.55);
    }
    function render() {
      clear(root);
      root.appendChild(el("button", { class: "cal-btn", text: t("btn_begin"), type: "button", onclick: run }));
    }
    function run() {
      clear(root);
      const set = [];
      for (let i = 0; i < N; i++) {
        const rootFreq = 220 * Math.pow(2, rndInt(0, 8) / 12);
        const idx = rndInt(0, INTERVALS.length - 1);
        set.push({ rootFreq: rootFreq, idx: idx, ans: INTERVALS[idx] });
      }
      let i = 0; let correct = 0;
      const status = el("div", { class: "widget-status" });
      const replay = el("button", { class: "cal-btn", type: "button", text: t("btn_play") });
      const buttons = el("div", { class: "interval-buttons" });
      INTERVALS.forEach(function (iv, idx) {
        const b = el("button", { type: "button", class: "dow-btn wide", text: iv.label });
        b.addEventListener("click", function () {
          if (idx === set[i].idx) correct++;
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
        status.textContent = tFmt("w_pitch_interval", { i: i + 1, n: N });
        play(set[i].rootFreq, set[i].ans.semis);
      }
      root.appendChild(status); root.appendChild(replay); root.appendChild(buttons);
      show();
      function finish(correct) {
        clear(root);
        root.appendChild(el("p", { class: "widget-finish",
          text: tFmt("w_pitch_finish", { c: correct, n: N }) }));
        logRow(root, correct, skill.unit, tFmt("w_pitch_note", { n: N }), onLog);
        root.appendChild(el("button", { type: "button", class: "ghost-btn", text: t("btn_again"), onclick: render }));
      }
    }
    render();
  };

  /* ── VII. Reading Pace ────────────────────────────────────── */
  CALIBRATIONS.readingPace = function (skill, container, onLog) {
    const PASSAGE = t("w_read_passage");
    const WORDS = String(PASSAGE).trim().split(/\s+/).length;
    const root = widgetShell(container, { help: tFmt("w_read_help", { words: WORDS }) });
    function render() {
      clear(root);
      root.appendChild(el("blockquote", { class: "reading-passage", text: PASSAGE }));
      root.appendChild(el("p", { class: "cal-help dim", text: t("w_read_attribution") }));
      const start = el("button", { class: "cal-btn", text: t("btn_start_reading"), type: "button" });
      let t0 = 0;
      start.addEventListener("click", function () {
        t0 = performance.now();
        clear(root);
        root.appendChild(el("blockquote", { class: "reading-passage", text: PASSAGE }));
        const stop = el("button", { class: "cal-btn cal-btn-large", text: t("btn_stop"), type: "button" });
        stop.addEventListener("click", function () {
          const seconds = (performance.now() - t0) / 1000;
          const wpm = Math.round((WORDS / seconds) * 60);
          clear(root);
          root.appendChild(el("p", { class: "widget-finish",
            text: tFmt("w_read_finish", { words: WORDS, s: seconds.toFixed(1), wpm: wpm }) }));
          logRow(root, wpm, skill.unit, tFmt("w_read_note_elapsed", { s: seconds.toFixed(1) }), onLog);
          root.appendChild(el("button", { type: "button", class: "ghost-btn", text: t("btn_again"), onclick: render }));
        });
        root.appendChild(stop);
      });
      root.appendChild(start);
    }
    render();
  };

  /* ── VIII. Freehand Circle (self-rated) ───────────────────── */
  CALIBRATIONS.circleSelfRate = function (skill, container, onLog) {
    const root = widgetShell(container, { help: t("w_circle_help") });
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
      el("span", { class: "slider-display-label", text: t("w_circle_verdict") }),
      valueLabel,
      el("span", { class: "slider-display-label", text: t("w_circle_out_of") })
    ]));
    root.appendChild(el("button", {
      class: "cal-btn", type: "button", text: t("btn_record"),
      onclick: function () { onLog(parseInt(range.value, 10), ""); }
    }));
  };

  /* ─────────────────────────── views ───────────────────────── */
  const view = function () { return document.getElementById("view"); };

  function renderCodex() {
    const v = view(); clear(v);
    document.title = t("title_codex");
    const m = meta();
    const intro = el("section", { class: "codex-intro" });
    intro.appendChild(el("h1", { class: "codex-title", text: m.title }));
    intro.appendChild(el("p", { class: "codex-subtitle", text: m.subtitle }));
    intro.appendChild(el("p", { class: "codex-preface", text: m.preface }));
    intro.appendChild(rule(t("rule_index")));
    v.appendChild(intro);

    const list = el("ol", { class: "codex-list", start: "1" });
    SKILLS.forEach(function (skillStruct) {
      const skill = getSkill(skillStruct.id);
      const last = entriesFor(skill.id).slice(-12).map(function (e) { return e.v; });
      const li = el("li", { class: "codex-item", dataset: { id: skill.id } });
      const a = el("a", { href: "#atelier/" + skill.id, class: "codex-link" });
      a.appendChild(el("span", { class: "codex-numeral", text: skill.numeral + "." }));
      a.appendChild(el("span", { class: "codex-glyph", text: skill.glyph }));
      a.appendChild(el("span", { class: "codex-name" }, [
        el("span", { class: "codex-title-line", text: skill.title }),
        el("span", { class: "codex-cat", text: m.categories[skill.category] || skill.category })
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
    v.appendChild(el("p", { class: "codex-invocation", text: m.invocation }));
  }

  function renderAtelier(skillId) {
    const v = view(); clear(v);
    const skill = getSkill(skillId);
    if (!skill) { renderNotFound(); return; }
    document.title = tFmt("title_atelier", { title: skill.title });
    const m = meta();

    const head = el("section", { class: "atelier-head" });
    head.appendChild(el("a", { href: "#codex", class: "back-link", text: t("back_to_codex") }));
    head.appendChild(el("p", { class: "atelier-numeral", text: t("article_prefix") + skill.numeral }));
    head.appendChild(el("h1", { class: "atelier-title" }, [
      el("span", { class: "atelier-glyph", text: skill.glyph }),
      el("span", { class: "atelier-title-text", text: skill.title })
    ]));
    head.appendChild(el("p", {
      class: "atelier-cat",
      text: tFmt("atelier_an_art", {
        cat: m.categories[skill.category] || skill.category,
        unit: skill.unit
      })
    }));
    v.appendChild(head);

    if (skill.warning) {
      const warn = el("aside", { class: "atelier-warn" });
      warn.appendChild(el("span", { class: "warn-tag", text: t("atelier_warning_tag") }));
      warn.appendChild(el("span", { text: skill.warning }));
      v.appendChild(warn);
    }

    v.appendChild(rule(t("rule_description")));
    v.appendChild(el("p", { class: "atelier-desc", text: skill.description }));

    v.appendChild(rule(t("rule_origin")));
    v.appendChild(el("p", { class: "atelier-origin", text: skill.origin }));

    v.appendChild(rule(t("rule_protocol")));
    const ol = el("ol", { class: "atelier-protocol" });
    (skill.protocol || []).forEach(function (step) { ol.appendChild(el("li", { text: step })); });
    v.appendChild(ol);

    v.appendChild(el("p", { class: "atelier-marginalia", text: skill.marginalia }));

    v.appendChild(rule(t("rule_calibration")));
    const calBox = el("div", { class: "calibration-box" });
    const cal = CALIBRATIONS[skill.calibration.type] || CALIBRATIONS.manual;
    cal(skill, calBox, function (value, note) {
      addEntry(skill.id, value, note || "");
      renderAtelier(skill.id);
    });
    v.appendChild(calBox);

    v.appendChild(rule(t("rule_readings")));
    const entries = entriesFor(skill.id).sort(function (a, b) { return a.t - b.t; });
    v.appendChild(svgChart(entries, !!skill.lowerIsBetter));

    if (entries.length) {
      const ledger = el("table", { class: "atelier-ledger" });
      const tb = document.createElement("tbody");
      entries.slice().reverse().slice(0, 10).forEach(function (e) {
        const tr = document.createElement("tr");
        tr.appendChild(el("td", { class: "lg-date", text: fmtDate(e.t) }));
        tr.appendChild(el("td", { class: "lg-val", text: fmtVal(e.v) }));
        tr.appendChild(el("td", { class: "lg-unit", text: skill.unit }));
        tr.appendChild(el("td", { class: "lg-note", text: e.n || "" }));
        const action = el("td", { class: "lg-action" });
        action.appendChild(el("button", {
          type: "button", class: "lg-rm", "aria-label": t("remove_label"), text: "⌫",
          onclick: function () { removeEntry(e.id); renderAtelier(skill.id); }
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
    document.title = t("title_ledger");
    v.appendChild(el("h1", { class: "page-title", text: t("ledger_title") }));
    v.appendChild(el("p", { class: "page-blurb", text: t("ledger_blurb") }));
    v.appendChild(rule(""));

    const all = getEntries().slice().sort(function (a, b) { return b.t - a.t; });
    if (all.length === 0) {
      v.appendChild(el("p", { class: "ledger-empty", text: t("ledger_empty") }));
      return;
    }

    const tbl = el("table", { class: "ledger-table" });
    const tb = document.createElement("tbody");
    let lastDay = "";
    all.forEach(function (e) {
      const skill = getSkill(e.skillId);
      const d = new Date(e.t);
      const dayKey = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      if (dayKey !== lastDay) {
        const groupTr = document.createElement("tr");
        groupTr.className = "ledger-day";
        const groupTd = el("td", { colspan: "5", class: "ledger-day-cell", text: todayLabel(d) });
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
        linkCell.textContent = t("ledger_unknown");
      }
      tr.appendChild(linkCell);
      tr.appendChild(el("td", { class: "lg-val", text: fmtVal(e.v) }));
      tr.appendChild(el("td", { class: "lg-unit", text: skill ? skill.unit : "" }));
      tr.appendChild(el("td", { class: "lg-note", text: e.n || "" }));
      tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    v.appendChild(tbl);

    const total = all.length;
    const skillsTouched = new Set(all.map(function (e) { return e.skillId; })).size;
    const earliest = new Date(all[all.length - 1].t);
    const since = todayLabel(earliest).split(",").slice(1).join(",").trim() || todayLabel(earliest);
    v.appendChild(el("p", { class: "ledger-summary",
      text: tFmt("ledger_summary", { total: total, touched: skillsTouched, since: since }) }));

    v.appendChild(rule(""));
    const tools = el("div", { class: "ledger-tools" });
    tools.appendChild(el("button", {
      type: "button", class: "danger-btn", text: t("btn_erase_ledger"),
      onclick: function () {
        if (window.confirm(t("ledger_erase_confirm"))) {
          saveEntries([]); renderLedger();
        }
      }
    }));
    tools.appendChild(el("button", {
      type: "button", class: "ghost-btn", text: t("btn_export_text"),
      onclick: function () { exportLedger(); }
    }));
    v.appendChild(tools);
  }

  function exportLedger() {
    const all = getEntries().slice().sort(function (a, b) { return a.t - b.t; });
    if (!all.length) return;
    const m = meta();
    const lines = ["SKILLAPP — " + t("ledger_title"), "edition " + (m.edition || ""),
      new Date().toISOString(), ""];
    all.forEach(function (e) {
      const skill = getSkill(e.skillId);
      lines.push([
        new Date(e.t).toISOString(),
        skill ? skill.numeral + ". " + skill.title : t("ledger_unknown"),
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
      let tt = Math.imul(a ^ a >>> 15, 1 | a);
      tt = tt + Math.imul(tt ^ tt >>> 7, 61 | tt) ^ tt;
      return ((tt ^ tt >>> 14) >>> 0) / 4294967296;
    };
  }
  function pickRiteSkills(date, n) {
    const rnd = mulberry32(dateSeed(date));
    const pool = SKILLS.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    return pool.slice(0, n);
  }
  function loggedToday(skillId) {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    return getEntries().some(function (e) { return e.skillId === skillId && e.t >= cutoff; });
  }

  function renderRite() {
    const v = view(); clear(v);
    document.title = t("title_rite");
    const today = new Date();
    const picks = pickRiteSkills(today, 3);
    const ord = t("rite_ordinals") || ["1.", "2.", "3."];

    v.appendChild(el("h1", { class: "page-title", text: t("rite_title") }));
    v.appendChild(el("p", { class: "page-blurb", text: t("rite_blurb") }));
    v.appendChild(el("p", { class: "rite-date", text: todayLabel(today) }));
    v.appendChild(rule(t("rule_order")));

    const list = el("ol", { class: "rite-list" });
    picks.forEach(function (skillStruct, idx) {
      const skill = getSkill(skillStruct.id);
      const done = loggedToday(skill.id);
      const li = el("li", { class: "rite-item" + (done ? " rite-item-done" : "") });
      li.appendChild(el("div", { class: "rite-numeral", text: ord[idx] || (idx + 1 + ".") }));
      const body = el("div", { class: "rite-body" });
      body.appendChild(el("a", { href: "#atelier/" + skill.id, class: "rite-link" }, [
        el("span", { class: "rite-glyph", text: skill.glyph }),
        el("span", { class: "rite-title", text: skill.title })
      ]));
      body.appendChild(el("p", { class: "rite-desc", text: shortDesc(skill.description || "") }));
      body.appendChild(buildRiteTimer(5));
      if (done) body.appendChild(el("p", { class: "rite-done", text: t("rite_done_today") }));
      li.appendChild(body);
      list.appendChild(li);
    });
    v.appendChild(list);
    v.appendChild(rule(""));
    v.appendChild(el("p", { class: "rite-foot", text: t("rite_foot") }));
  }
  function shortDesc(s) {
    const m = String(s).match(/^[^.!?]+[.!?]/);
    const out = (m ? m[0] : s).trim();
    return out.length > 180 ? out.slice(0, 177) + "…" : out;
  }
  function buildRiteTimer(minutes) {
    const total = minutes * 60;
    let remaining = total;
    let handle = null;
    const display = el("span", { class: "timer-display", text: fmtTimer(total) });
    const start = el("button", { type: "button", class: "ghost-btn", text: tFmt("btn_start_min", { min: minutes }) });
    const reset = el("button", { type: "button", class: "ghost-btn dim", text: t("btn_reset") });
    function tick() {
      remaining = Math.max(0, remaining - 1);
      display.textContent = fmtTimer(remaining);
      if (remaining === 0) {
        clearInterval(handle); handle = null;
        start.textContent = t("btn_done");
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
        clearInterval(handle); handle = null; start.textContent = t("btn_resume");
        return;
      }
      if (remaining === 0) remaining = total;
      start.textContent = t("btn_pause");
      display.classList.remove("ringing");
      handle = setInterval(tick, 1000);
    });
    reset.addEventListener("click", function () {
      if (handle) { clearInterval(handle); handle = null; }
      remaining = total;
      display.textContent = fmtTimer(total);
      display.classList.remove("ringing");
      start.textContent = tFmt("btn_start_min", { min: minutes });
    });
    return el("div", { class: "rite-timer" }, [display, start, reset]);
  }
  function fmtTimer(s) {
    const mm = Math.floor(s / 60), ss = s % 60;
    return String(mm).padStart(2, "0") + ":" + String(ss).padStart(2, "0");
  }

  function renderColophon() {
    const v = view(); clear(v);
    document.title = t("title_colophon");
    const m = meta();
    v.appendChild(el("h1", { class: "page-title", text: t("colophon_title") }));
    v.appendChild(rule(""));
    v.appendChild(el("p", { class: "atelier-desc", text: m.preface }));
    v.appendChild(el("p", { class: "atelier-desc", text: m.invocation }));
    v.appendChild(rule(""));
    v.appendChild(el("p", { class: "atelier-origin", text: m.attribution }));
    v.appendChild(rule(""));
    const techy = el("p", { class: "atelier-origin dim" });
    techy.appendChild(el("span", { text: t("colophon_tech") }));
    techy.appendChild(el("a", {
      href: "https://github.com/pezzaliapp/skillapp",
      text: t("colophon_source_text"),
      target: "_blank", rel: "noopener noreferrer"
    }));
    techy.appendChild(el("span", { text: t("colophon_source_period") }));
    v.appendChild(techy);
  }

  function renderNotFound() {
    const v = view(); clear(v);
    v.appendChild(el("h1", { class: "page-title", text: t("not_found_title") }));
    v.appendChild(el("p", { class: "page-blurb", text: t("not_found_blurb") }));
    v.appendChild(el("a", { href: "#codex", class: "back-link", text: t("back_to_codex") }));
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
      case "codex":    renderCodex();    break;
      case "atelier":  renderAtelier(sub); break;
      case "ledger":   renderLedger();   break;
      case "rite":     renderRite();     break;
      case "colophon": renderColophon(); break;
      default:         renderNotFound();
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  /* ─────────────── language switch wiring ──────────────────── */
  function wireLangSwitch() {
    document.querySelectorAll(".lang-switch button[data-locale]").forEach(function (b) {
      b.addEventListener("click", function () { setLocale(b.dataset.locale); });
    });
  }

  /* ─────────────────────────── main ────────────────────────── */
  function main() {
    document.getElementById("app").classList.remove("loading");
    applyLocale();
    wireLangSwitch();
    window.addEventListener("hashchange", dispatch);
    if (!location.hash) location.hash = "#codex";
    dispatch();
  }
  main();
})();
