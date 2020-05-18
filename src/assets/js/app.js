import $ from 'jquery';
//import 'what-input';

window.jQuery = $;

$(document).ready(function(){
    $('.js-accordion dt, .js-toggle').click(function(){
        $($(this).data('target') ? $(this).data('target') : $(this)).toggleClass('active');
    });
})

