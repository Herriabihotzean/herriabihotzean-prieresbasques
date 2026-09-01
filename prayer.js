"use strict";

const HB_KEY = "herria_langue";
const TEXT_KEY_PREFIX = "prieres_basques_texte:";

const UI = {
  fr: {
    fr: "français",
    eu: "basque",
    back: "← Retour à prières usuelles",
    top: "haut de page ↑",
    listen: "écouter"
  },
  eu: {
    fr: "frantsesez",
    eu: "eskuaraz",
    back: "← Ohiko othoitzetarat itzuli",
    top: "orri gainera ↑",
    listen: "entzun"
  }
};

function interfaceLanguage() {
  const q = new URLSearchParams(location.search).get("ui");
  if (q === "fr" || q === "eu") return q;

  try {
    return localStorage.getItem(HB_KEY) === "eu" ? "eu" : "fr";
  } catch (_e) {
    return "fr";
  }
}

function navigationType() {
  const entries =
    performance.getEntriesByType &&
    performance.getEntriesByType("navigation");

  return entries && entries[0] ? entries[0].type : "navigate";
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = interfaceLanguage();
  const t = UI[ui];
  const textKey = TEXT_KEY_PREFIX + location.pathname;
  let content = "eu";

  const sections = [...document.querySelectorAll("[data-prayer-lang]")];
  const buttons = [...document.querySelectorAll(".language-choice")];
  const listen = document.querySelector(".audio-open-button");
  const panel = document.querySelector(".audio-panel");

  document.querySelectorAll("[data-nav-back]").forEach(a => {
    a.textContent = t.back;
    a.href = "index.html?lang=" + ui;
  });

  document.querySelectorAll("[data-nav-top]").forEach(a => {
    a.textContent = t.top;
  });

  if (listen) listen.textContent = t.listen;

  buttons.forEach(b => {
    const code = b.dataset.lang;
    const label = b.querySelector(".language-label");
    if (label) label.textContent = t[code];
    b.addEventListener("click", () => show(code));
  });

  function show(lang) {
    content = lang === "fr" ? "fr" : "eu";

    sections.forEach(s => {
      s.hidden = s.dataset.prayerLang !== content;
    });

    buttons.forEach(b => {
      const active = b.dataset.lang === content;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });

    /*
     * On mémorise uniquement la langue de lecture de CETTE page.
     * La langue de navigation (ui) et herria_langue restent inchangées.
     */
    try {
      sessionStorage.setItem(textKey, content);
    } catch (_e) {}
  }

  if (listen && panel) {
    listen.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      listen.setAttribute("aria-expanded", panel.hidden ? "false" : "true");
    });
  }

  let initialContent = "eu";

  if (navigationType() === "reload") {
    try {
      const remembered = sessionStorage.getItem(textKey);
      if (remembered === "fr" || remembered === "eu") {
        initialContent = remembered;
      }
    } catch (_e) {}
  } else {
    /* Nouvelle entrée : la prière s’ouvre dans sa langue d’origine. */
    try {
      sessionStorage.setItem(textKey, "eu");
    } catch (_e) {}
  }

  show(initialContent);
});
