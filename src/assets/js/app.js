import $ from 'jquery';
import './lib/slick.min.js';

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

    document.addEventListener('scroll', () => {
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
    });

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
        const autohideSticky = function(){
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
        $('.js-section-close').on('click tap', function(){
            $(this).parents('section').first().addClass('hidden');
            $(document).off('scroll', autohideSticky);
        });
        $('.js-section-sticky').removeClass('hidden');
        $(document).on('scroll', autohideSticky);
    };

    // load FAQs
    // TODO: check whether to load english or german FAQs
    let faq = [];
    $.get("/assets/data/faq.json", (data) => {
        $(data['section-main'].sections).each((i, section) => {
            $(section.accordion).each((ii, faqEntry) => {
                faq.push([faqEntry.anchor, faqEntry.title.toLowerCase() + " " + faqEntry.textblock.map((x) => x.toLowerCase()).join(" ")]);
            })
        })
    })

    // react to keystrokes in the search bar
    $('#faq-search').on('keyup', (event) => {
        const curSearch = event.target.value.toLowerCase();
        // only search for longer terms and react to empty search (aka delete input)
        if(curSearch.length < 2 && curSearch.length > 0) {
            return;
        }

        const hide = [];
        const show = [];

        // Yeah, slow. But in the end, this is only 50-100 entries
        $(faq).each((_, entry) => {
            // text and header does not match
            if(entry[1].search(curSearch) !== -1 || curSearch.length === 0) {
                show.push("div[id='" + entry[0] + "']");
            } else {
                hide.push("div[id='" + entry[0] + "']");
            }
        });

        // show all matches
        if (show.length > 0) {
            document.querySelectorAll(show).forEach((link) => {
                console.log()
                $(link).show();
            });
        }

        // hide everything that does not match
        if (hide.length > 0) {
            document.querySelectorAll(hide).forEach((link) => {
                $(link).hide();
            });
        }
    });


});
