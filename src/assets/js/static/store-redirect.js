
document.addEventListener("DOMContentLoaded", function(event) { 
    if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
        console.log("redirect android");
        window.location = 'market://details?id=de.rki.coronawarnapp';
        document.getElementById("store_apple").classList.add("d-none");
    }
    else if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1){
        console.log("redirect apple");
        window.location.href = 'https://apps.apple.com/de/app/corona-warn-app/id1512595757';
        document.getElementById("store_android").classList.add("d-none");
    }
    else {
        console.log("no redirect");
    }
});