// get the target faq anchor from the script attributes
const targetFaq = document.currentScript.getAttribute('target-faq');
// get the current url
const curPage = window.location.href;
// replace the part from the last slash to the end of the string with the proper hash
window.location.href = curPage.replace(/\/[^\/]*$/, '#' + targetFaq);
