var href = "./en/";
if (
  typeof navigator.languages !== "undefined" &&
  navigator.languages.length > 0
) {
  for (var i = 0; i < navigator.languages.length; ++i) {
    var lowerCaseValue = navigator.languages[i].toLowerCase();
    if (lowerCaseValue.indexOf("de") >= 0) {
      href = "./de/";
      break;
    } else if (lowerCaseValue.indexOf("en") >= 0) {
      href = "./en/";
      break;
    }
  }
} else if (
  (navigator.language || navigator.userLanguage).toLowerCase().indexOf("de") >=
  0
) {
  href = "./de/";
}

window.location.href = href;
