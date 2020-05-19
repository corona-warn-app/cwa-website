import $ from 'jquery';
//import 'what-input';

window.jQuery = $;

$(document).ready(function(){
    $('.js-accordion dt, .js-toggle').click(function(){
        $($(this).data('target') ? $(this).data('target') : $(this)).toggleClass('active');
    });
    $('.js-menu .js-scroll-navigate a').click(function(){
        $(this).parents('.js-menu').first().removeClass('active');
        $(this).parents('.js-menu').first().find('a').removeClass('active');
        $(this).addClass('active');
    })
})

