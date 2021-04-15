var lang = "en";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const target = urlParams.get('target')


if (
  typeof navigator.languages !== "undefined" &&
  navigator.languages.length > 0
) {
  for (var i = 0; i < navigator.languages.length; ++i) {
    var tag = navigator.languages[i].slice(0, 2).toLowerCase();
    if (tag === "de" || tag === "en") {
      lang = tag;
      break;
    }
  }
} else if (
  (navigator.language || navigator.userLanguage).slice(0, 2).toLowerCase() ===
  "de"
) {
  lang = "de";
}

if(target != null) {
  window.location.href = "./" + lang + "/" + target + "/";
} else {
  window.location.href = "./" + lang + "/";
}
