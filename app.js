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

  /* Stub: interactive calibrations are added in a later pass.
     They render a small notice and a manual fallback. */
  function stubInteractive(skill, container, onLog) {
    container.appendChild(el("p", {
      class: "cal-help",
      text: "An interactive calibration for this article is being typeset."
    }));
    container.appendChild(el("p", {
      class: "cal-help dim",
      text: "Until then, perform the test on your own and record the reading manually."
    }));
    CALIBRATIONS.manual(
      Object.assign({}, skill, {
        calibration: { type: "manual", inputUnit: skill.unit, placeholder: "value" }
      }),
      container,
      onLog
    );
  }
  ["mentalMult", "majorSystem", "doomsday", "oneMinute",
   "clockRead", "pitchInterval", "readingPace", "circleSelfRate"]
   .forEach(function (k) { CALIBRATIONS[k] = stubInteractive; });

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
    all.forEach(function (e) {
      const skill = SKILL_BY_ID[e.skillId];
      const tr = document.createElement("tr");
      tr.appendChild(el("td", { class: "lg-date", text: fmtDate(e.t) }));
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

  function renderRite() {
    const v = view(); clear(v);
    document.title = "SKILLAPP — Daily Rite";
    v.appendChild(el("h1", { class: "page-title", text: "The Daily Rite" }));
    v.appendChild(el("p", { class: "page-blurb",
      text: "Three articles drawn from the codex for today. The same three for the same date, everywhere; tomorrow they will be other three." }));
    v.appendChild(rule(""));
    v.appendChild(el("p", { class: "ledger-empty", text: "The rite is being composed; full timer follows in a later pass." }));
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
