
import $ from 'jquery';

window.jQuery = $;

let hash = window.location.hash;

function checkGlossaryAnchor(anchor) {
    if(hash.indexOf("glossary_") > -1) {
        // anchor starts with glossary_
        console.log(hash[10]);
    } else {
        // anchor doesnt start with glossary_
    }
}








$('a').on("click", function(e) {
    let anchor = "";
    // todo: extract anchor from link

    checkGlossaryAnchor(anchor);
});

checkGlossaryAnchor(hash);