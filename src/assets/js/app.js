import $ from 'jquery';
import throttle from 'lodash.throttle';
import 'slick-carousel';

window.jQuery = $;

$(document).ready(function(){
    $('.js-accordion dt, .js-toggle').on('click tap', function(){
        $($(this).data('target') ? $(this).data('target') : $(this)).toggleClass('active');
    });

    if (document.querySelector(".page-faq")) {
        const { hash } = window.location;
        hash && $(hash).parent() && $(hash).parent().addClass("active");
    }

    $('.js-menu .js-scroll-navigate a').on('click tap', function(){
        $(this).parents('.js-menu').first().removeClass('active');
        $(this).parents('.js-menu').first().find('a').removeClass('active');
        $(this).addClass('active');
    });

    const anchors = Array.from(document.querySelectorAll('.js-anchor'));
    const menu = document.querySelector('.js-scroll-navigate');

    const handleScrollFAQMenu = function() {
        if (!anchors.length) {
            return
        }

        const negativeOffsets = anchors
            .map((anchor) => Math.floor(anchor.getBoundingClientRect().top))
            .filter(offset => offset <= 0);
        const current = negativeOffsets.indexOf(Math.max(...negativeOffsets));

        if (current >= 0) {
            const hash = '#' + anchors[current].id;

            const oldItem = menu.querySelector('a.active');
            const newItem = menu.querySelector('a[href="' + hash + '"]');

            if (newItem !== null && oldItem !== null) {
                oldItem.classList.remove('active');
                newItem.classList.add('active');
            }
        }
    };
    const throttledHandleScrollFAQMenu = throttle(handleScrollFAQMenu, 500)
    document.addEventListener('scroll', throttledHandleScrollFAQMenu)

    $('.js-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
            breakpoint : 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    if ($('.js-section-sticky').index() >= 0){
        const autoHideSticky = function(){
            const top = $(document).scrollTop(),
                maxTop = $(window).height() / 4;
            if ($('.js-section-sticky').hasClass('invisible')) {
                if (top < maxTop) {
                    $('.js-section-sticky').removeClass('invisible');
                }
            } else {
                if (top > maxTop) {
                    $('.js-section-sticky').addClass('invisible');
                }
            }
        }
        const throttledAutoHideSticky = throttle(autoHideSticky, 500)
        document.addEventListener('scroll', throttledAutoHideSticky)

        $('.js-section-close').on('click tap', function(){
            $(this).parents('section').first().addClass('hidden');
            $(document).off('scroll', throttledAutoHideSticky);
        });
        $('.js-section-sticky').removeClass('hidden');
    };

    // function to update the faq list for a given searchString
    const updateResults = function(searchString, faq) {
        // result are two arrays, the elements to hide and the ones to show
        const hide = [];
        const show = [];

        // Yeah, slow. But in the end, this is only 50-100 entries
        Object.keys(faq).forEach((anchor) => {
            let text = faq[anchor];
            let anchorDiv = "div[id='" + anchor + "-div']"
            // text and header does not match or the search string is empty
            if(searchString.length === 0 || text.search(searchString) !== -1) {
                show.push(anchorDiv);
            } else {
                hide.push(anchorDiv);
            }
        });

        // show all matches
        if (show.length > 0) {
            document.querySelectorAll(show).forEach((div) => {
                $(div).show({duration: 300});
            });
        }

        // hide everything that does not match
        if (hide.length > 0) {
            document.querySelectorAll(hide).forEach((div) => {
                $(div).hide({duration: 300});
            });
        };

        // update the total count of results
        let totalCount = (show.length + hide.length).toString();
        let sCount = show.length.toString().padStart(totalCount.length, "0");
        document.getElementById("match-count").innerHTML = sCount + "/" + totalCount;
    }

    // check if the faq-search text field is present
    let searchField = document.getElementById("faq-search");
    if(searchField !== null){
        let faq = {};
        // determine the right filename suffix based on the path
        let lang = window.location.pathname.slice(0,3);
        let fn = "faq" + (lang === "/de" ? "_de" : "") + ".json";

        // do an AJAX call to get the right FAQ document
        $.get("/assets/data/" + fn, (data) => {
            faq = data;
            let faqCount = Object.keys(data).length.toString();
            document.getElementById("match-count").innerHTML = faqCount + "/" + faqCount;

            // find out whether there are search strings added
            var urlParams = new URLSearchParams(window.location.search);
            if(urlParams.has("search")){
                updateResults(urlParams.get("search"), faq);
            }
        });

        searchField.addEventListener("keyup", (event) => {
            const curSearch = event.target.value.toLowerCase();
            // only search for longer terms and react to empty search (aka delete input)
            if(curSearch.length < 2 && curSearch.length > 0) {
                return;
            }
            updateResults(curSearch, faq);
        });
    }
});
