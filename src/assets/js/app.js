import $ from 'jquery';
import throttle from 'lodash.throttle';
import 'slick-carousel';

window.jQuery = $;
const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

$(document).ready(function(){
    if(deviceType() === "desktop"){
        $(window).on('resize', function(){
            const { hash } = window.location;
            if(hash) {
                const contPos = $(hash).offset().top;
                $(window).scrollTop(contPos);
            }
        });
    }   
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
            if(searchString.length === 0) {
                show.push(anchorDiv);
            } else {
                // remove double spaces, split by space, and filter out empty strings
                let searchTerms = searchString.replace(/ +(?= )/g,'').split(" ").filter(x => x.length > 0);
                // perform the search for each term
                let allHits = searchTerms.every(term => text.includes(term.toLowerCase()));
                // put to hide, if no hit was found
                if(!allHits) {
                    hide.push(anchorDiv);
                } else {
                    show.push(anchorDiv);
                }
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

    // This removes all search parameters from the URL. While the page ignores search parameters, if the hash is set,
    // this just gives users cleaner URLs when clicking on the links and copying the url from the address bar.
    const clearSearchParam = function(hash = "") {
        var clean_uri = location.protocol + "//" + location.host + location.pathname;
        clean_uri += hash;
        window.history.replaceState({}, document.title, clean_uri);
    }

    // check if the faq-search text field is present
    let searchField = document.getElementById("faq-search");
    if(searchField !== null) {
        let faq = {};
        const sideMenuItems = [];
        $(".side-menu .nav-link").each(function() {
            let item = $(this).get(0)
            sideMenuItems.push(item.getAttribute('href').substring(1))
        })
        // do an AJAX call to get the searchable FAQ document
        // Converter ensures that even malformed mime-types are converted directly to JSON
        $.get({url: "faq.json", converters: {"text html": jQuery.parseJSON}}, (data) => {
            faq = data;
            let faqCount = Object.keys(data).length.toString();
            document.getElementById("match-count").innerHTML = faqCount + "/" + faqCount;

            // find out whether there are search strings added
            var urlParams = new URLSearchParams(window.location.search);
            const { hash } = window.location;
            if(urlParams.has("search")){
                // only perform search if no hash is set
                if(!hash || hash === "") {
                    // set the search string in the input
                    searchField.value = urlParams.get("search");
                    // and update the result list
                    updateResults(urlParams.get("search"), faq);
                }
            }
            // if we have a hash and that hash is not part of the faq list
            let hashVal = hash.substring(1)
            if(hash && !Object.keys(faq).includes(hashVal)) {
                // then let's get the list of defined redirects
                $.get("/assets/data/faq_redirects.json", (data) => {
                    // and see whether there is a proper replacement (1:1 mapping)
                    let replacement = data[hashVal];
                    // if there is ...
                    if(replacement){
                        // ... just go there
                        location.hash = "#" + replacement;
                    } else {
                        // Check if the hashVal isn't at the side-menu items. For prevent a bug when search the URL directly into another tab. 
                        if (!sideMenuItems.includes(hashVal)){
                            // if not, otherwise, just search for the hash value
                            searchField.value = hashVal;
                            updateResults(hashVal, faq);
                        }
                    }
                })
            }
        });

        // listen to the keyup event, i.e., when a character was entered into the form
        // and the value of the field was properly updated
        searchField.addEventListener("keyup", (event) => {
            const curSearch = event.target.value;
            // only search for longer terms and react to empty search (aka delete input)
            if(curSearch.length < 2 && curSearch.length > 0) {
                return;
            }
            updateResults(curSearch, faq);
        });
    };

    // add an event listener to each faqAnchor that provides a clean URL w/o search parameter
    var faqAnchors = document.getElementsByClassName("faq-anchor");
    Array.from(faqAnchors).forEach((element) => {
        element.addEventListener('click', (event) => {
            clearSearchParam(event.target.hash);
        });
    });

    // remove any hashes when submitting the search form
    var searchForm = document.getElementById("faq-search-form");
    if(searchForm !== null){
        searchForm.addEventListener("submit", (event) => {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        })
    }

    // mail protection using js
    // mails are written like this:
    // <a href="bob.smith...example...com" class="email">bob.smith...example...com</a>
    $(".email").each(function() {
        $(this).html( $(this).html().replace("...", "@").replace(/\.\.\./g, ".") );
        $(this).attr( "href", "mailto:" + $(this).attr("href").replace("...", "@").replace(/\.\.\./g, ".") );
    });


    // simple jquery tabs
    $('.nav-tabs .nav-item').click(function(e) {
        e.preventDefault();

        //Toggle tab link
        $(this).addClass('active').siblings().removeClass('active');

        //Toggle target tab
        $($(this).attr('href')).addClass('show active').siblings().removeClass('show active');

        //Keep selected on refresh
        if(window.location.href.includes("#")) window.location.href = window.location.href.split("#")[0]+=$(this).attr('href');           
        else window.location.href += $(this).attr('href');
      });

      // glossary links onclick handler
      $("a[href^='#glossary_']").on("click", function(e) {
        let anchor = $(this).attr("href").replace(/^#/, '');
        activateGlossary(anchor);
      });

      function activateGlossary(anchor) {
        let hash = location.hash.replace(/^#/, '');

        // if a link is clicked, get the hash from <a> instead from location.hash
        if(anchor) { hash = anchor; }

        if (hash && hash.indexOf("glossary_") > -1) {
            // the glossary anchor
            let glossaryAnchor = hash;

            // determine letter with dynamic language
            let glossaryLetter = $("#"+glossaryAnchor).closest("[role=tabpanel]").attr("id");

            // switch tabs
            $('#'+glossaryLetter.toUpperCase()+'-tab').addClass('active').siblings().removeClass('active');
            $($('#'+glossaryLetter.toUpperCase()+'-tab').attr('href')).addClass('show active').siblings().removeClass('show active');

            // go to glossary anchor
            $(document).scrollTop( $("#"+glossaryAnchor).offset().top );
        }

      }

      // onload jump to glossary
      activateGlossary(); 
});
