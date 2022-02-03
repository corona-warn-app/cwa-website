import $ from 'jquery';
import throttle from 'lodash.throttle';
import 'slick-carousel';

window.jQuery = $;
let expandStatus = true;
let faq = {};

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

    $('.qr-slider').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
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
    const updateResults = function(searchString, topicString, faq) {
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
        //hide glossary container
        $("#glossary_container").hide();
        // show all matches
        if (show.length === 0) {
            document.querySelectorAll("h3").forEach((title) => {
                $(title).hide();
                $('#no_results').removeClass("d-none");
                $('#collapseAll').addClass("d-none");
            });
            $("#faq-container").hide();
        }
        if (show.length > 0) {
            console.log("entra pq hay contenido")
            if(!$('#no_results').hasClass("d-none")) $('#no_results').addClass("d-none");
            if($('#collapseAll').hasClass("d-none")) $('#collapseAll').removeClass("d-none");
            //Hide all topics containers
            $("#faq-container").children().each((index, child) => {
                $(child).hide();
            })
            //Hide all sections containers
            $(".section-container").hide();
            console.log("antes del query", show)
            document.querySelectorAll(show).forEach((div) => {
                console.log("entra en el query")
                const accordion = $(div).parent().get(0)
                const section = $($(accordion).parent().get(0)).attr("id");
                console.log("accordion h1 id",$($(accordion).parent()).parent().find("h1").attr("id"),"topicString", topicString)
                if($($(accordion).parent()).parent().find("h1").attr("id") === topicString || topicString === "all" ) {
                    //Show topic container
                    console.log("accordion", $($(accordion).parent()).parent().find(".topic-title").attr("id"))
                    $("#faq-container").children().each((index, child) => {
                        if($(child).find(".topic-title").attr("id") === $($(accordion).parent()).parent().find(".topic-title").attr("id")) {$(child).show(); console.log("show", child)}
                    })
                    //Show section container
                    $(".section-container").each((index, child) => {
                        if($(child).attr("id") === section) {
                            $(child).show();
                            //Active FAQ title
                            $(child).find("h3").show();
                        }
                    })
                    //Active nav
                    document.querySelectorAll(".section-item").forEach((item) => {
                        if($(item).find("a").attr('href') === "#"+$(accordion).prev("h3").attr("id")) {
                            $(item).addClass("active");
                            $($(item).parent().get(0)).addClass("active")
                        }
                    });
                }
                
            });
        }

        // hide everything that does not match
        if (hide.length > 0) {
            document.querySelectorAll(hide).forEach((div) => {
                $(div).hide({duration: 300});
            });
        };

        let glossaryList = 0;
        
        if(topicString === "glossary" || topicString === "all") {
            $(".word").each((index, word) => {
                if($(word).text().toLowerCase().includes(searchString.toLowerCase())) {
                    $($($(word).parent().get(0)).parent().get(0)).appendTo(".glossary-result")
                    glossaryList++;
                    //Active letter in nav menu
                    document.querySelectorAll(".section-item").forEach((item) => {
                        if($(item).find("a").attr('href') === "#"+$(word).text()[0]) {
                            $(item).addClass("active");
                            $($(item).parent().get(0)).addClass("active")
                        }
                    });
                }
            })
            $("#glossary_container").show();
        }

        if(glossaryList === 0) {
            $("#glossary_container").hide(); 
        } else {
            $("#glossary_container").children().each((index, child) => {
                if(index > 1) $(child).hide(); 
            })
        }

        setTimeout(() => {
            //check again showed items cause of topic filter
            let counter = topicString === "all" || topicString === "glossary" ? glossaryList : 0;
            $(".faq").each((index, faq) => {
                if($(faq).is(":visible")) counter++;
            })

            if(counter === 0) {
                document.querySelectorAll("h3").forEach((title) => {
                    $(title).hide();
                    $('#no_results').removeClass("d-none");
                    $('#collapseAll').addClass("d-none");
                });
            }
            //Set search results breadcrumbs
            $("#counter").text(counter);
            $(".bread-search").removeClass("d-none");
            $("#search_separator").removeClass("d-none");
        },500)
    }

    // remove any hashes when submitting the search form
    if (document.querySelector(".page-faq")) {
        if(window.matchMedia("(max-width: 767px)").matches) {
            $("#faq-search-form").removeClass("w-50").addClass("w-100");
            $("#faq-search").removeClass("w-50").addClass("w-100").removeClass("mr-3");
            $("#faq-topic").removeClass("w-25").addClass("w-100").removeClass("mr-3");
            $("#faq-submit").addClass("w-100");
        }
        const searchForm = document.getElementById("faq-search-form");
        if(searchForm !== null){
            searchForm.addEventListener("submit", (event) => {
                history.pushState("", document.title, 'results/' + window.location.search);
            })
        }
    }

    if (document.querySelector(".page-faq-results")) {
        if(window.matchMedia("(max-width: 767px)").matches) {
            $("#faq-container-mobile").removeClass("d-none")
            //Adjust form
            $("#faq-search-form").removeClass("w-50").addClass("w-100");
            $("#faq-search").parent().removeClass("w-50").addClass("w-100");
            $("#faq-search").removeClass("mr-3");
            $("#faq-topic").removeClass("w-25").addClass("w-100").removeClass("mr-3");
            $("#faq-submit").addClass("w-100");
            //Adjust topics containers
            $("#faq-container").children().each((index, element) => {
                $(element).find("h1").remove()
                $(element).appendTo($(`#${$(element).attr("id")}-div`).find(".accordion-faq-item-content"));
            })
            $("#faq-container").remove();
            $("#faq-container-mobile").attr("id", "faq-container");
            
        }
        const searchForm = document.getElementById("faq-search-form");
        if(searchForm !== null){
            searchForm.addEventListener("submit", (event) => {
                history.pushState("", document.title, window.location.pathname + window.location.search);
            })
        }
        const searchParams = new URLSearchParams(window.location.search);
        const search = searchParams.get('search');
        const topic = searchParams.get('topic');
        const { hash } = window.location;
        if(search) {
            $('#faq-search').val(search)
        }
        if(topic) {
            $("#faq-topic").val(topic).prop('selected', true);
        }
        if(search) {
            $("#clean_search").removeClass("d-none");
            const sideMenuItems = [];
            $(".side-menu .nav-link").each(function() {
                let item = $(this).get(0)
                sideMenuItems.push(item.getAttribute('href').substring(1))
            })
            // do an AJAX call to get the searchable FAQ document
            // Converter ensures that even malformed mime-types are converted directly to JSON
            $.get({url: "faq.json", converters: {"text html": jQuery.parseJSON}}, (data) => {
                faq = data;
                // find out whether there are search strings added
                var urlParams = new URLSearchParams(window.location.search);
                if(urlParams.has("search")){
                    // only perform search if no hash is set
                    if(!hash || hash === "") {
                        // and update the result list
                        updateResults(search, topic, faq);
                    }
                }
            });
        } else {
            if(topic !== "all" && topic){
                if(topic === "glossary") {
                    $("#faq-container").hide();
                } else {
                    $("#glossary_container").hide();
                    $("#faq-container").children().each((index, element) => {
                        if($(element).find(".topic-title").attr("id") !== topic) $(element).hide();
                        else {
                            $("#topic_separator").removeClass("d-none");
                            $(".bread-topic").text($($(element).children()[0]).text());
                            $(".bread-topic").attr("href", `#${$(element).attr("id")}`);
                            $(".nav-aside").children().each((index, nav) => {
                                if($(nav).hasClass(topic)) $(nav).addClass("active");
                            })
                        }
                    })
                }
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
                }
            })
        }

        //Clear search 
        $(".clean-search").on("click", function(e) {
            $("#faq-search").val("");
            $("#faq-topic").val("all").prop('selected', true);
            $("#faq-search-form").submit()
        });

        if(!window.matchMedia("(max-width: 767px)").matches) {
            //Hide other topics on click in title
            $(".topic-title").on("click", function(e) {
                if(!search) {
                    $("#faq-topic").val($(this).attr("id")).prop('selected', true);
                    $("#faq-search-form").submit()
                } else {
                    if(topic === "all" || topic === $(this).attr("id")) {
                        if($(this).attr("id") === "glossary") {
                            $("#faq-container").hide()
                            $("#glossary_container").show();
                            let glossaryList = 0;
                            $(".word").each((index, word) => {
                                if($(word).text().toLowerCase().includes(search.toLowerCase())) {
                                    $($($(word).parent().get(0)).parent().get(0)).appendTo(".glossary-result")
                                    glossaryList++;
                                }
                            })
                            $("#counter").text(glossaryList);
                            $("#topic_separator").removeClass("d-none");
                            $(".bread-topic").text($(this).text());
                            $("#bread_separator").addClass("d-none");
                            $(".bread-section").hide();
                        }
                        else {
                            $("#glossary_container").hide();
                            $("#faq-container").show();
                            $("#faq-container").children().each((index, element) => {
                                if($(element).find(".topic-title").attr("id") !== $(this).attr("id")) {
                                    $(element).hide();
                                }
                                else {
                                    $(element).show();
                                }
                            });
                            setTimeout(() => {
                                let counter = 0;
                                $(".faq").each((index, faq) => {
                                    if($(faq).is(":visible")) counter++;
                                })
                                $("#counter").text(counter);
                            }, 500)
                            $("#topic_separator").removeClass("d-none");
                            $(".bread-topic").text($(this).text());
                            $(".bread-search").removeClass("d-none");
                            $("#search_separator").removeClass("d-none");
                        }
                    }
                }
            });

            //Hide other topics on click in head nav topic
            $(".section-head").on("click", function(e) {
                if(!search) {
                    e.preventDefault();
                    $("#faq-topic").val($(this).attr("class").split(/\s+/)[1]).prop('selected', true);
                    $("#faq-search-form").submit()
                } else {
                    if(topic === "all" || topic === $(this).attr("class").split(/\s+/)[1]) {
                        if($(this).attr("class").split(/\s+/)[1] === "glossary") {
                            $("#faq-container").hide()
                            $("#glossary_container").show();
                            let glossaryList = 0;
                            $(".word").each((index, word) => {
                                if($(word).text().toLowerCase().includes(search.toLowerCase())) {
                                    $($($(word).parent().get(0)).parent().get(0)).appendTo(".glossary-result")
                                    glossaryList++;
                                }
                            })
                            $("#counter").text(glossaryList);
                            $("#topic_separator").removeClass("d-none");
                            $(".bread-topic").text($(this).text());
                            $("#bread_separator").addClass("d-none");
                            $(".bread-section").hide();
                        } else {
                            $("#faq-container").show();
                            updateResults(search, topic, faq);
                            $("#glossary_container").hide();
                            $(".bread-section").hide();
                            $("#bread_separator").hide();
                            $("#faq-container").children().each((index, element) => {
                                if($(element).find(".topic-title").attr("id") !== $(this).attr("class").split(/\s+/)[1]) $(element).hide();
                                else {
                                    $(element).show();
                                    $(element).find("h1").show();
                                }
                            });
                            setTimeout(() => {
                                let counter = 0;
                                $(".faq").each((index, faq) => {
                                    if($(faq).is(":visible")) counter++;
                                })
                                $("#counter").text(counter);
                            }, 500)
                            $("#topic_separator").removeClass("d-none");
                            $(".bread-topic").text($(this).text());
                            $(".bread-search").removeClass("d-none");
                            $("#search_separator").removeClass("d-none");
                        }
                    }
                }
            });

            //Hide other sections on click in item nav section
            $(".section-item").on("click", function(e) {
                e.preventDefault();
                if(topic === "all" || topic === $($(this).parent().get(0)).attr("class").split(/\s+/)[1]) {

                    if($($(this).parent().get(0)).attr("class").split(/\s+/)[1] == "glossary") {
                        //Deactive faq container
                        $("#faq-container").hide();
                        $("#glossary_container").show();
                        if(search) {
                            let glossaryList = 0;
                            $(".word").each((index, word) => {
                                if($(word).text().toLowerCase().includes(search.toLowerCase())) {
                                    $($($(word).parent().get(0)).parent().get(0)).appendTo(".glossary-result")
                                    glossaryList++;
                                }
                            })
                            $("#counter").text(glossaryList);
                            $("#topic_separator").removeClass("d-none");
                            $(".bread-topic").text($(this).parent().find("b").text());
                            $("#bread_separator").addClass("d-none");
                            $(".bread-section").hide();
                        }
                        return;
                    } else $("#glossary_container").hide();
                    if(!search) {
                        //Active/deactive topic nav list
                        const topicList = $(this).parent();
                        $(".topic-list").each((index, list) => {
                            $(list).removeClass("active");
                        })
                        topicList.addClass("active")

                        //Active/deactive section nav item
                        $(".section-item").each((index, item) => {
                            $(item).removeClass("active");
                        })
                        $(this).addClass("active");
                    }
                    $("#faq-container").show();
                    //Modify breadcrumb
                    $("#bread_separator").removeClass("d-none");
                    $("#topic_separator").removeClass("d-none");
                    $(".bread-topic").text($(this).parent().find(".section-head").text())
                    $(".bread-section").text($(this).find("a").text())
                    $("#bread_separator").show();
                    $(".bread-section").show();
                    if(search) {
                        setTimeout(() => {
                            let counter = 0;
                            $(".faq").each((index, faq) => {
                                if($(faq).is(":visible")) counter++;
                            })
                            $("#counter").text(counter);
                        }, 500)
                        
                        $(".bread-search").removeClass("d-none");
                        $("#search_separator").removeClass("d-none");
                    }

                    //Show-hide containers
                    let container;
                    $("#faq-container").children().each((index, element) => {
                        if($(element).find(".topic-title").attr("id") !== $(this).parent().attr("class").split(/\s+/)[1]) {
                            $(element).hide();
                        }
                        else {
                            $(element).show();
                            container = element;
                        }
                    });

                    //Show/hide sections
                    $(container).children().each((index, section) => {
                        if("#"+$(section).attr("id") === $(this).find("a").attr("href")) $(section).show();
                        else $(section).hide();
                    })
                } 
            });

            //Hide other sections on click section title
            $(".section-title").on("click", function(e) {
                e.preventDefault();
                $(".section-item").each((index, section) => {
                    if($(section).find("a").attr('href') === "#"+$(this).attr("id")) $(section).click();
                })
            });

            //Simulate nav click on click in breadcrumb
            $(".bread-topic").on("click", function(e) {
                e.preventDefault();
                if(!search) $(".topic-list.active").find(".section-head").click();
                else {
                    $(".section-head").each((index, element) => {
                        if($(element).text() === $(this).text()) {
                            $(element).click();
                        }
                    })
                }
            });
            //Show all topics on click on FAQ
            $(".bread-faq").on("click", function(e) {
                $("#faq-search-form").submit()
            });
        }
    }

    // collapses/expands all accordions on button click in the FAQ
    $( document ).ready(function() {
        $("#collapseAll").click( function() {
            const accordions = document.querySelectorAll(".accordion-faq-header");
            accordions.forEach(accordion => {
                if(expandStatus) {
                    if(!$(accordion).hasClass('active')) $(accordion).addClass('active');
                } else {
                    if($(accordion).hasClass('active')) $(accordion).removeClass('active');
                }
            })
            expandStatus = !expandStatus;    
        });

    });
    // mail protection using js
    // mails are written like this:
    // <a href="bob.smith...example...com" class="email">bob.smith...example...com</a>
    $(".email").each(function() {
        $(this).html( $(this).html().replace("...", "@").replace(/\.\.\./g, ".") );
        $(this).attr( "href", "mailto:" + $(this).attr("href").replace("...", "@").replace(/\.\.\./g, ".") );
    });


    // multiqr csv upload name change
    // to prevent a csp issue due to inline js on eventregistration page
    $('#csvFile').on('change', () => {
        document.getElementById('csvName').innerHTML = document.getElementById('csvFile').files[0].name;
    })

    // simple jquery tabs
    $('.nav-tabs .nav-item').click(function(e) {
        e.preventDefault();

        //Toggle tab link
        $(this).addClass('active').siblings().removeClass('active');

        //Toggle target tab
        $($(this).attr('href')).addClass('show active').siblings().removeClass('show active');

        //Keep selected on refresh except in FAQ results
        if (!document.querySelector(".page-faq-results")) {
            if(window.location.href.includes("#")) window.location.href = window.location.href.split("#")[0]+=$(this).attr('href');           
            else window.location.href += $(this).attr('href');
        }
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
