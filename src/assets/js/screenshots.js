import $ from 'jquery';

window.jQuery = $;

//Sets the option selected according to the version of the application being consulted
$(document).ready(function() {
    const version = window.location.pathname.split(".")[0].split("/")[3].replace("-", ".");
    if(version == '') $('select[name="archived-screenshots"]').children().last().attr('selected','selected');
    else {
        $('select[name="archived-screenshots"]').children().each(function( index ) {
            if(version == $(this).text()) $(this).attr('selected','selected');
        });
    }
});

// Screenshots screen: redirect to selected option's value after changing version in dropdown
$('select[name="archived-screenshots"]').on("change", function(e) {
    window.location.href = e.target.value + window.location.hash;
});

//   Add feature for tag auto-navigation with hash in the URL
const scrollTo = (hash) => {
    location.hash = hash;
}


const checkHashAndChangeTab = () => {
    const { hash } = window.location;
    const hashDevice = hash.replace("#", "").split("_")[0]
    const androidTab = document.querySelector('[href="#android_screenshots"]')
    const iosTab = document.querySelector('[href="#ios_screenshots"]')
    const androidContent = document.querySelector("#android_screenshots")
    const iosContent = document.querySelector("#ios_screenshots")
    const contentClasses = ["show", "active"]
    if (hashDevice === "android") {
        // Put tabs correctly
        iosTab.classList.remove("active")
        androidTab.classList.add("active")
        // Show/hide content
        iosContent.classList.remove(...contentClasses)
        androidContent.classList.add(...contentClasses)
        scrollTo(hash)
    } else {
        // Put tabs correctly
        androidTab.classList.remove("active")
        iosTab.classList.add("active")
        // Show/hide content
        androidContent.classList.remove(...contentClasses)
        iosContent.classList.add(...contentClasses)
        scrollTo(hash)
    }
}
checkHashAndChangeTab()