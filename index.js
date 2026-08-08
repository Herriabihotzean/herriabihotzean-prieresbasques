"use strict";
document.addEventListener("DOMContentLoaded",()=>{
 let lang=setIndexLang(rememberedLang());
 const sections=[...document.querySelectorAll("[data-lang]")]; const buttons=[...document.querySelectorAll("[data-set-lang]")];
 function show(l){lang=setIndexLang(l);document.documentElement.lang=l;sections.forEach(s=>s.hidden=s.dataset.lang!==l);buttons.forEach(b=>b.classList.toggle("active",b.dataset.setLang===l));history.replaceState(null,"",location.pathname+"?lang="+l);}
 buttons.forEach(b=>b.addEventListener("click",()=>show(b.dataset.setLang)));
 document.querySelectorAll("a[data-prayer]").forEach(a=>a.addEventListener("click",()=>setIndexLang(lang)));
 show(lang);
});