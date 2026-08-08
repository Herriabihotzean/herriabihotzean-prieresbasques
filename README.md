# herriabihotzean-prieresbasques — version corrigée

Cette version sépare volontairement deux notions :

1. **langue générale / langue d’interface** : celle choisie sur Herria Bihotzean avant d’entrer dans les prières ;
2. **langue du texte de la prière** : locale à chaque page de prière.

## Comportement
- L’index `index.html` reprend la langue générale (`fr` ou `eu`).
- Chaque page de prière s’ouvre toujours avec le **texte basque**.
- Les libellés du lecteur, de navigation et des deux boutons de langue restent dans la langue générale d’entrée.
- Cliquer sur Français/Frantsesez ou Basque/Eskuaraz dans une prière ne modifie **jamais** `herria_langue`.
- Au retour vers l’index des prières, la langue générale est donc inchangée.
- Le lecteur ne lit que le MP3 basque correspondant (`001.mp3` à `007.mp3`).

## Raccordement depuis `prieres-cantiques.html`
Remplacer le lien actuel de « Prières usuelles » par :

```html
<a class="carte" id="prieres-usuelles-link"
   href="https://herriabihotzean.github.io/herriabihotzean-prieresbasques/">
 Prières usuelles
</a>
```

Puis, juste après `langues.js` (ou avant `</body>`), ajouter :

```html
<script>
document.addEventListener("DOMContentLoaded", () => {
  const lien = document.getElementById("prieres-usuelles-link");
  if (!lien) return;
  lien.addEventListener("click", (e) => {
    e.preventDefault();
    let lang = "fr";
    if (window.HerriaLanguages) lang = HerriaLanguages.getGeneralLanguage();
    else { try { lang = localStorage.getItem("herria_langue") === "eu" ? "eu" : "fr"; } catch (_) {} }
    location.href = lien.href + "?lang=" + lang;
  });
});
</script>
```

Ce paramètre rend la transmission de la langue fiable même si le site principal utilise un domaine personnalisé différent de `github.io`.

## Fichiers à ajouter
- `audio/001.mp3` à `audio/007.mp3`
- `othoitzeko-liburua.pdf` à la racine

Les blasons et le fond sont appelés directement depuis `herriabihotzean-site`, afin d’utiliser exactement les mêmes fichiers graphiques.

## Messe française
Le `messe.docx` fourni est encore identique à `meza.docx`. La page française de `meza-saindua.html` contient donc uniquement un emplacement explicite en attente de la traduction.
