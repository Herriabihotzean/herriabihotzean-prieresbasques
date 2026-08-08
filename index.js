"use strict";
const HB_KEY="herria_langue";
const LABELS={fr:{fr:"français",eu:"basque"},eu:{fr:"frantsesez",eu:"eskuaraz"}};
const INDEX_TEXT={
 fr:{title:"Prières usuelles",morning:"Prière du matin",evening:"Prière du soir",ben:"Benedicite – Gratias – Angelus",rosary:"Rosaire",penance:"Pénitence",communion:"Communion",mass:"Sainte Messe",book:"Télécharger le livret imprimable",back:"← Retour à l’accueil"},
 eu:{title:"Ohiko othoitzak",morning:"Goizeko othoitza",evening:"Arratseko othoitza",ben:"Benedicite – Gratias – Angelus",rosary:"Arrosarioa",penance:"Penitentzia",communion:"Kominiatzen delarik",mass:"Meza Saindua",book:"Othoitz-liburu inprimagarria deskargatu",back:"← Harrera-horrirat itzuli"}
};
function readIncomingLanguage(){const p=new URLSearchParams(location.search).get("lang");if(p==="fr"||p==="eu")return p;try{return localStorage.getItem(HB_KEY)==="eu"?"eu":"fr"}catch(_e){return "fr"}}
function saveGeneralLanguage(lang){try{localStorage.setItem(HB_KEY,lang)}catch(_e){}}
function setText(lang){const t=INDEX_TEXT[lang];document.documentElement.lang=lang;document.title=t.title+" — Herria Bihotzean";for(const [k,v] of Object.entries(t)){document.querySelectorAll(`[data-i18n="${k}"]`).forEach(el=>el.textContent=v)}document.querySelectorAll(".language-choice").forEach(b=>{const code=b.dataset.lang;b.querySelector(".language-label").textContent=LABELS[lang][code];b.classList.toggle("active",code===lang);b.setAttribute("aria-pressed",code===lang?"true":"false")});document.querySelectorAll("a[data-prayer]").forEach(a=>{const u=new URL(a.getAttribute("href"),location.href);u.searchParams.set("ui",lang);a.href=u.pathname+u.search});const back=document.querySelector("[data-main-back]");if(back)back.href="https://herriabihotzean.github.io/herriabihotzean-site/prieres-cantiques.html?lang="+lang;history.replaceState(null,"",location.pathname+"?lang="+lang)}
document.addEventListener("DOMContentLoaded",()=>{let lang=readIncomingLanguage();setText(lang);document.querySelectorAll(".language-choice").forEach(b=>b.addEventListener("click",()=>{lang=b.dataset.lang;saveGeneralLanguage(lang);setText(lang)}))});
