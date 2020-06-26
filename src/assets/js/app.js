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
    document.addEventListener('scroll', () => {
        const negativeOffsets = anchors
            .map((anchor) => Math.floor(anchor.getBoundingClientRect().top))
            .filter(offset => offset <= 0);
        const current = negativeOffsets.indexOf(Math.max(...negativeOffsets));

        if (current >= 0) {
            const hash = '#' + anchors[current].id;

            if (location.hash !== hash) {
                history.replaceState(null, null, hash);
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            }
        }
    });

    const menu = document.querySelector('.js-scroll-navigate');
    if (menu !== null) {
        window.addEventListener('hashchange', () => {
            const oldItem = menu.querySelector('a.active');
            const newItem = menu.querySelector('a[href="' + location.hash + '"]');
            if (newItem !== null && oldItem !== null) {
                oldItem.classList.remove('active');
                newItem.classList.add('active');
            }
        });

        if (location.hash !== '') {
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
    }

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
    }
});
