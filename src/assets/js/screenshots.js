import $ from 'jquery';

window.jQuery = $;

let lbImage;

//Sets the option selected according to the version of the application being consulted
$(document).ready(function () {
    lbImage = $('.lb.image').attr('src');
    const version = window.location.pathname.split(".")[0].split("/")[3].replace("-", ".");
    if (version == '') $('select[name="archived-screenshots"]').children().last().prop('selected', 'selected');
    else {
        $('select[name="archived-screenshots"]').children().each(function (index) {
            if (version == $(this).text().split(" ")[1]) $(this).prop('selected', 'selected');
        });
    }

    if(location.hash.includes("#dropdown")) {
        location.hash = location.hash.replace("#dropdown", "");
        $(window).scrollTop(0);
    }

    //Insert zoom icon on lightbox container
    $('<a class="lb-zoom" href="#" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="lightgrey" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></a>').insertBefore($('.lb-close'))
});

//Update lb-zoom href
setInterval(() => {
    if(lbImage != $('.lb-image').attr('src')) {
        lbImage = $('.lb-image').attr('src');
        $("a.lb-zoom").attr("href", lbImage)
    }
}, 1000);

// Screenshots screen: redirect to selected option's value after changing version in dropdown
$('select[name="archived-screenshots"]').on("change", function (e) {
    window.location.href = e.target.value + window.location.hash + '#dropdown';
});

// Show/hide menu after changing OS tabs
$('.nav-tabs a').on("click", function (e) {
    if (window.location.href.includes("#")) window.location.href = window.location.href.split("#")[0] += $(this).attr('href');
    else window.location.href += $(this).attr('href');
    const { hash } = window.location;
    const hashDevice = hash != "" ? hash.replace("#", "").split("_")[0] : "ios";
    const androidMenu = document.querySelector('#android_menu')
    const iosMenu = document.querySelector('#ios_menu')
    if (hashDevice === "android") {
        // Show/hide menu
        androidMenu.classList.remove("d-none")
        iosMenu.classList.add("d-none")
    } else {
        // Show/hide menu
        androidMenu.classList.add("d-none")
        iosMenu.classList.remove("d-none")
    }
    preventAnchorScroll();
});

//   Add feature for tag auto-navigation with hash in the URL
const scrollTo = (hash) => {
    location.hash = hash;
}


const checkHashAndChangeTab = () => {
    const { hash } = window.location;
    const hashDevice = hash.replace("#", "").split("_")[0]
    const androidMenu = document.querySelector('#android_menu')
    const iosMenu = document.querySelector('#ios_menu')
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
        androidMenu.classList.remove("d-none")
        iosMenu.classList.add("d-none")
        scrollTo(hash)
    } else {
        // Put tabs correctly
        androidTab.classList.remove("active")
        iosTab.classList.add("active")
        // Show/hide content
        androidContent.classList.remove(...contentClasses)
        iosContent.classList.add(...contentClasses)
        // Show/hide menu
        androidMenu.classList.add("d-none")
        iosMenu.classList.remove("d-none")
        scrollTo(hash)
    }
}

function preventAnchorScroll() {
    var scrollToTop = function () {
        $(window).scrollTop(0);
    };
    if (window.location.hash) {
        // handler is executed at most once
        $(window).one('scroll', scrollToTop);
    }
    // make sure to release scroll 1 second after document readiness
    // to avoid negative UX
    $(function () {
        setTimeout(
            function () {
                $(window).off('scroll', scrollToTop);
            },
            1000
        );
    });
}
checkHashAndChangeTab();