"use strict";
const LANG_KEY="herria-prieres-index-lang";
function qLang(){const q=new URLSearchParams(location.search).get("lang");return q==="fr"||q==="eu"?q:null;}
function rememberedLang(){return qLang()||sessionStorage.getItem(LANG_KEY)||"eu";}
function setIndexLang(lang){if(lang!=="fr"&&lang!=="eu")lang="eu";sessionStorage.setItem(LANG_KEY,lang);return lang;}
