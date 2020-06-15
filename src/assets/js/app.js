import $ from 'jquery';
import './lib/slick.min.js';
//import 'what-input';

window.jQuery = $;

$(document).ready(function(){
    $('.js-accordion dt, .js-toggle').on('click tap', function(){
        $($(this).data('target') ? $(this).data('target') : $(this)).toggleClass('active');
    });
    $('.js-menu .js-scroll-navigate a').on('click tap', function(){
        $(this).parents('.js-menu').first().removeClass('active');
        $(this).parents('.js-menu').first().find('a').removeClass('active');
        $(this).addClass('active');
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
    }
});

