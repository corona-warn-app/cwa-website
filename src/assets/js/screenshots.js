import $ from 'jquery';

window.jQuery = $;

// Screenshots screen: redirect to selected option's value after changing version in dropdown
$('select[name="archived-screenshots"]').on("change", function(e) {
    window.location.href = e.target.value;
});

// Show/hide menu after changing OS tabs
$('a.nav-link').on("click", function(e) {
    const { hash } = window.location;
    const hashDevice = hash.replace("#", "").split("_")[0]
    const androidMenu = document.querySelector('#android_menu')
    const iosMenu = document.querySelector('#ios_menu')
    if (hashDevice === "android") {
        // Show/hide menu
        androidMenu.remove("d-none")
        iosMenu.add("d-none")
    } else {
        // Show/hide menu
        androidMenu.add("d-none")
        iosMenu.remove("d-none")
    }
});

//   Add feature for tag auto-navigation with hash in the URL
const scrollTo = (hash) => {
    location.hash = hash;
}


const checkHashAndChangeTab = () => {
    const { hash } = window.location;
    const hashDevice = hash.replace("#", "").split("_")[0]
    const androidMenu = document.querySelector('ul #android')
    const iosMenu = document.querySelector('ul #ios')
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
        // Show/hide menu
        androidMenu.remove("d-none")
        iosMenu.add("d-none")
        scrollTo(hash)
    } else {
        // Put tabs correctly
        androidTab.classList.remove("active")
        iosTab.classList.add("active")
        // Show/hide content
        androidContent.classList.remove(...contentClasses)
        iosContent.classList.add(...contentClasses)
        // Show/hide menu
        androidMenu.add("d-none")
        iosMenu.remove("d-none")
        scrollTo(hash)
    }
}
checkHashAndChangeTab()