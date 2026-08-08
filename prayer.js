"use strict";
document.addEventListener("DOMContentLoaded",()=>{
 const returnLang=sessionStorage.getItem(LANG_KEY)||"eu";
 const sections=[...document.querySelectorAll("[data-prayer-lang]")], buttons=[...document.querySelectorAll("[data-set-lang]")];
 const listen=document.querySelector(".audio-open-button"), panel=document.querySelector(".audio-panel"), audio=document.querySelector("audio");
 const home=document.querySelector("[data-home]"); if(home)home.href="index.html?lang="+returnLang;
 function show(l){if(l!=="fr"&&l!=="eu")l="eu";document.documentElement.lang=l;sections.forEach(s=>s.hidden=s.dataset.prayerLang!==l);buttons.forEach(b=>b.classList.toggle("active",b.dataset.setLang===l));listen.textContent=l==="eu"?"entzun":"écouter";}
 buttons.forEach(b=>b.addEventListener("click",()=>show(b.dataset.setLang)));
 listen.addEventListener("click",()=>{panel.hidden=!panel.hidden;listen.setAttribute("aria-expanded",panel.hidden?"false":"true");});
 show("eu"); // chaque sous-page s'ouvre toujours en basque
});