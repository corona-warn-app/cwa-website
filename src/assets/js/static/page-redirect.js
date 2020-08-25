// get the target faq anchor from the script attributes
const targetAnchor = document.currentScript.getAttribute('target-anchor');
const targetPath = document.currentScript.getAttribute('target-path');
// get the current url
const curPage = window.location.href;
const endsWithSlash = curPage.substr(-1) === "/";
let targetPage = curPage;

// if we have a target path, replace the existing last part of the url
if(targetPath){
    // Replace the last part of the string with the new path
    if(endsWithSlash){
        targetPage = curPage.replace(/\/[^\/]*\/$/, "/" + targetPath + "/");
    } else {
        targetPage = curPage.replace(/\/[^\/]*$/, "/" + targetPath + "/");
    }
}

// replace the part from the last slash to the end of the string with the proper hash
if(targetAnchor){
    if(endsWithSlash) {
        // if the page already ends with a slash, we only append the anchor
        targetPage += "#" + targetAnchor;
    } else {
        // otherwhise, we replace the last part of the url with the anchor
        targetPage = curPage.replace(/\/[^\/]*$/, '/#' + targetAnchor);
    }
}

// redirect to target
window.location.href = targetPage;
