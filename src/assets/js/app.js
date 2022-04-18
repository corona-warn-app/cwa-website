import $ from 'jquery';
import { isBuffer } from 'lodash';
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

    //initially set tabindex=-1 on all links in inactive accordions
    $('.accordion-faq-body').find('a').each(function() {
        if (!$(this).closest('.accordion-faq-body').prev('.accordion-faq-header').hasClass('active')) {
            $(this).attr("tabindex", "-1");
        }
    })

    $('.js-accordion dt, .js-toggle').on('click tap', function(){
        const element = $($(this).data('target') ? $(this).data('target') : $(this));
        element.toggleClass('active');

        //add tabindex=-1 or remove tabindex on all links inside accordion depending on the state
        if ($(this).parents('.js-accordion').length > 0) {
            const isActive = element.hasClass('active');
            element.next('.accordion-faq-body').find('a').each(function() {
                isActive ? $(this).removeAttr("tabindex") : $(this).attr("tabindex", "-1")
            })
            element.next('.accordion-faq-body').attr('aria-hidden', !isActive);
            element.next('.accordion-faq-body').attr('aria-expanded', isActive);
        }
        
    });

    if (document.querySelector(".page-faq")) {
        const { hash } = window.location;
        hash && $(hash).parent() && $(hash).parent().addClass("active");
    }

    $('.js-menu .js-scroll-navigate a').on('click tap', function(){
        $(this).parents('.js-menu').first().removeClass('active').attr('aria-current', "false");
        $(this).parents('.js-menu').first().find('a').removeClass('active').attr('aria-current', "false");
        $(this).addClass('active').attr('aria-current', "true");
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

    //scrolling menu items to display in window
    setTimeout(() => {
        const item = $(".section-item.active")
        const head = $(".topic-list.active")
        if(item && item.offset()) {
            $(menu).scrollTop(item.offset().top - item.outerHeight() - 180)
        } else if(head && head.offset()) {
            $(menu).scrollTop($(head).offset().top - $(menu).offset().top)
        }
    }, 500);

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
        $("#glossary_container").addClass('d-none');
        // show all matches
        if (show.length === 0) {
            document.querySelectorAll("h3").forEach((title) => {
                $(title).addClass('d-none');
                $('#no_results').removeClass("d-none");
                $('#collapseAll').addClass("d-none");
            });
            $("#faq-container").addClass('d-none');
        }
        if (show.length > 0) {
            if(!$('#no_results').hasClass("d-none")) $('#no_results').addClass("d-none");
            if($('#collapseAll').hasClass("d-none")) $('#collapseAll').removeClass("d-none");
            //Hide all topics containers
            $("#faq-container").children().each((index, child) => {
                $(child).addClass('d-none');
            })
            //Hide all sections containers
            $(".section-container").addClass('d-none');
            document.querySelectorAll(show).forEach((div) => {
                const accordion = $(div).parent().get(0)
                const section = $($(accordion).parent().get(0)).attr("id");
                if($($(accordion).parent()).parent().find("h1").attr("id") === topicString || topicString === "all" ) {
                    //Show topic container
                    $("#faq-container").children().each((index, child) => {
                        if($(child).find(".topic-title").attr("id") === $($(accordion).parent()).parent().find(".topic-title").attr("id")){
                            $(child).removeClass('d-none'); 
                        } 
                    })
                    //Show section container
                    $(".section-container").each((index, child) => {
                        if($(child).attr("id") === section) {
                            $(child).removeClass('d-none');
                            //Active FAQ title
                            $(child).find("h3").removeClass('d-none');
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
                $(div).addClass('d-none');
            });
        };

        let glossaryList = 0;
        
        if(topicString === "glossary" || topicString === "all") {
            glossaryList = countGlossaryResults(searchString);
            $(".word").each((index, word) => {
                if($(word).text().toLowerCase().includes(searchString.toLowerCase())) {
                    $($($(word).parent().get(0)).parent().get(0)).appendTo(".glossary-result")
                }
            })
            $(".description").each((index, desc) => {
                if($(desc).text().toLowerCase().includes(searchString.toLowerCase())) {
                    $($(desc).parent().get(0)).appendTo(".glossary-result")
                }
            })
            if(glossaryList > 0) $(".section-item a[href='#glossary']").addClass("active").parent().addClass("active");
            $("#glossary_container").removeClass('d-none');
        }

        if(glossaryList === 0) {
            $("#glossary_container").addClass('d-none'); 
        } else {
            if(window.matchMedia("(max-width: 767px)").matches) {
                $(".glossary-mobile-content").children().each((index, child) => {
                    if(index > 1) $(child).addClass('d-none'); 
                })
            } else {
                $("#glossary_container").children().each((index, child) => {
                    if(index > 1) $(child).addClass('d-none'); 
                })
            }
        }

        if(topicString !== "all") {
            $("#topic_separator").removeClass("d-none");
            $(".bread-section").addClass('d-none');
            $(".bread-topic").text($(`#${topicString}.topic-title`).text().trim()).removeClass('d-none');
        }
        setTimeout(() => {
            //check again showed items cause of topic filter
            let counter = topicString === "all" || topicString === "glossary" ? glossaryList : 0;
            $(".faq").each((index, faq) => {
                if($(faq).is(":visible")) {
                    counter++;
                    $(faq).parent().find("h3").removeClass('d-none');
                }
            })

            if(counter === 0) {
                document.querySelectorAll("h3").forEach((title) => {
                    $(title).addClass('d-none');
                    $('#no_results').removeClass("d-none");
                    $('#collapseAll').addClass("d-none");
                });
            } else $('#no_results').addClass("d-none");
            //Set search results breadcrumbs
            $("#counter").text(counter);
            $(".bread-search").removeClass("d-none");
            $("#search_separator").removeClass("d-none");
            handleResultFoundTextVisibility(counter)

            //remove search params from faq permalinks
            $('.faq-anchor').each((function() {
                $(this).attr('href', window.location.origin + window.location.pathname + $(this).attr('href').replace(window.location.search, ''))
            }))

            //highlight words
            if (searchString != "") {
                $('.accordion-faq-item-title').each(function() {
                    highlightWord(searchString, $(this))       
                })

                $('.accordion-faq-item-content').children().each((index,p) => {
                    if(!$(p).is("a") && !$(p).is("img")) {
                        if($(p).children().length === 0) {
                            highlightWord(searchString, $(p))       
                        }
                        else {
                            let canContinue = true;
                            const itemsToAvoid = [];
                            $(p).children().each((index, child) => {
                                if($(child).is("a") || $(child).is("img")) {
                                    itemsToAvoid.push($(child))
                                    canContinue = false;
                                }
                            })
                            if(canContinue) highlightWord(searchString, $(p))
                            else {
                                highlightWord(searchString, $(p), itemsToAvoid)
                            } 
                        }
                    }
                })
                $('#glossary_container .word').each(function() {
                    highlightWord(searchString, $(this))       
                })
                $('#glossary_container .description').each((index,p) => {
                    if(!$(p).is("a") && !$(p).is("img")) {
                        if($(p).children().length === 0) {
                            highlightWord(searchString, $(p))       
                        }
                        else {
                            let canContinue = true;
                            const itemsToAvoid = [];
                            $(p).children().each((index, child) => {
                                if($(child).is("a") || $(child).is("img")) {
                                    itemsToAvoid.push($(child))
                                    canContinue = false;
                                }
                            })
                            if(canContinue) highlightWord(searchString, $(p))
                            else {
                                highlightWord(searchString, $(p), itemsToAvoid)
                            } 
                        }
                    }
                })
            }
            //Redirect of FAQ question's links and glossary with search
            $(".accordion-faq-item-content a, .glossary-result a").on("click", function(e){
                e.preventDefault();
                URLRedirect($(this), true);
            });
        },700)
    }

    // remove any hashes when submitting the search form
    if (document.querySelector(".page-faq")) {
        const searchForm = document.getElementById("faq-search-form");
        const { hash } = window.location;

        if(window.matchMedia("(max-width: 767px)").matches) {
            $("#faq-search-form").removeClass("w-50").addClass("w-100");
            $("#faq-search").removeClass("w-50").addClass("w-100").removeClass("mr-3");
            $("#faq-topic").removeClass("w-25").addClass("w-100").removeClass("mr-3");
            $("#faq-submit").addClass("w-100");
        }
        
        if(searchForm !== null){
            searchForm.addEventListener("submit", (event) => {
                history.pushState("", document.title, 'results/' + window.location.search);
            })
        }

        if (hash) {
            window.location.href = window.location.href.replace("#", "results/#");
        }
    }

    if (document.querySelector(".page-faq-results")) {
        $.get({url: "faq_duplicate.json", converters: {"text html": jQuery.parseJSON}}, (data) => {
            data.map(question => {
                if($(`#${question.anchor}-div`).length > 0) {
                    const element = $(`#${question.anchor}-div`);
                    $(element).children().each((index, child) => {
                        $(child).children().each((i,elem) => {
                            if($(elem).hasClass("accordion-faq-item-title"))
                                $(elem).attr("id", question.anchor).html(question.title)
                            if($(elem).hasClass("accordion-faq-item-content")) {
                                question.textblock.reverse().map(p => {
                                    $(elem).prepend( `<p>${p}</p>` );
                                })
                                $(elem).find('.faq-anchor').attr('href', `#${question.anchor}`)
                            }
                        })
                    })
                }
            })
        })

        
        $(window).scrollTop(0);
        if(window.matchMedia("(max-width: 767px)").matches) {
            $("#faq-container-mobile").removeClass("d-none")
            $("#glossary-container-mobile").removeClass("d-none")
            //Adjust topics containers
            $("#faq-container").children().each((index, element) => {
                $(element).appendTo($(`#${$(element).find("h1").attr("id")}-div`).find(".accordion-faq-mobile-item-content"));
            })
            $("#faq-container").remove();
            $("#faq-container-mobile").attr("id", "faq-container");

            //Adjust glossary container
            $("#glossary_container").children().each((index, element) => {
                $(element).appendTo($(".glossary-mobile-content"));
            })
            $("#glossary_container").remove();
            $("#glossary-container-mobile").attr("id", "glossary_container");    
        } else {
            $("#faq-container-mobile").remove();
            $("#glossary-container-mobile").remove();
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

        if (hash) {
        // if we have a hash and that hash is not part of the faq list
        let hashVal = hash.substring(1)
        let locationHash = location.hash
        if(hash && !Object.keys(faq).includes(hashVal)) {
            // then let's get the list of defined redirects
            $.get("/assets/data/faq_redirects.json", (data) => {
                // and see whether there is a proper replacement (1:1 mapping)
                
                let replacement = data[hashVal];
                // if there is ...
                if(replacement){
                    // ... just go there
                    locationHash = "#" + replacement;
                }
            })
        }
       
            // go to anchor
            setTimeout(() => {
                if(window.matchMedia("(max-width: 767px)").matches) {
                    //Open accordion
                    if($(`${locationHash}`).hasClass("topic-container")) {
                        $($($($(`${locationHash}`).children()[0]).children()[0]).children()[0]).addClass("active");
                    }
                    //Open accordion and aim section title
                    
                    if($(`${locationHash}`).hasClass("section-container")) {
                        $($(`${locationHash}`).parent().parent().parent().parent().children()[0]).addClass("active");
                    }
                    //Open accordion and aim question
                    
                    if($(`${locationHash}`).hasClass("accordion-faq-item-title")){
                        $($(`${locationHash}`).parent().parent().parent().parent().parent().parent().parent().parent().children()[0]).addClass("active");
                    } 
                } 
                const h3 =  $(`h3${locationHash}`);
                const topic = $(`${locationHash}.topic-title`);
                const section = $(`${locationHash}.section-container`);

                history.replaceState({}, document.title, `${hash}` );
                if($(h3).length) {
                    h3.click();
                    if($(h3).hasClass("accordion-faq-item-title")) $(document).scrollTop( $(h3).offset().top );
                } else if($(section).length) {
                    section.find('.section-title').click();
                } else if($(topic).length) {
                    topic.click();
                } else if(hash === '#glossary') {
                    $('#glossary').click();
                }
            },500)
        }
        if(search) {
            $('#faq-search').val(search)
            //show cross to clean
            $(".clean-search").removeClass("d-none")
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
                    $("#faq-container").addClass('d-none');
                } else {
                    $("#glossary_container").addClass('d-none');
                    $("#faq-container").children().each((index, element) => {
                        if($(element).find(".topic-title").attr("id") !== topic) $(element).addClass('d-none');
                        else {
                            $("#topic_separator").removeClass("d-none");
                            $(".bread-topic").text($($(element).children()[0]).find(".topic-title").text());
                            $(".bread-topic").attr("href", `#${$(element).attr("id")}`);
                            $(".nav-aside").children().each((index, nav) => {
                                if($(nav).hasClass(topic)) $(nav).addClass("active");
                            })
                        }
                    })
                }
            }
        }

        //Clear search 
        $(".clean-search").on("click", function(e) {
            location.href = location.origin + location.pathname
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
                            $("#faq-container").addClass('d-none')
                            $("#glossary_container").removeClass('d-none');
                            let glossaryList = countGlossaryResults(search);
                            $(".word").each((index, word) => {
                                if($(word).text().toLowerCase().includes(search.toLowerCase())) {
                                    $($($(word).parent().get(0)).parent().get(0)).appendTo(".glossary-result")
                                }
                            })
                            $("#counter").text(glossaryList);
                            $("#topic_separator").removeClass("d-none");
                            $(".bread-topic").text($(this).text());
                            $("#bread_separator").addClass("d-none");
                            $(".bread-section").addClass('d-none');
                            handleResultFoundTextVisibility(glossaryList)
                        }
                        else {
                            $("#glossary_container").addClass('d-none');
                            $("#faq-container").removeClass('d-none');
                            $("#faq-container").children().each((index, element) => {
                                if($(element).find(".topic-title").attr("id") !== $(this).attr("id")) {
                                    $(element).addClass('d-none');
                                }
                                else {
                                    $(element).removeClass('d-none');
                                }
                            });
                            setTimeout(() => {
                                let counter = 0;
                                $(".faq").each((index, faq) => {
                                    if($(faq).is(":visible")) {
                                        $(faq).parent().find("h3").removeClass('d-none');
                                        counter++;
                                    }
                                })
                                counter === 0 ? $('#no_results').removeClass("d-none"): $('#no_results').addClass("d-none");
                                $("#counter").text(counter);
                                handleResultFoundTextVisibility(counter)
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
                    if($(this).attr("class").split(/\s+/)[1] === "glossary") {
                        $("#faq-container").addClass('d-none')
                        $("#glossary_container").removeClass('d-none');
                        $(this).addClass("active");
                        let glossaryList = countGlossaryResults(search);
                        $(".word").each((index, word) => {
                            if($(word).text().toLowerCase().includes(search.toLowerCase())) {
                                $($($(word).parent().get(0)).parent().get(0)).appendTo(".glossary-result")
                            }
                        })
                        if(glossaryList === 0) {
                            $("#glossary_container").addClass('d-none')
                            $('#no_results').removeClass("d-none")
                        } else {
                            $("#glossary_container").removeClass('d-none');
                            $('#no_results').addClass("d-none");
                        } 
                        $("#counter").text(glossaryList);
                        $("#topic_separator").removeClass("d-none");
                        $(".bread-topic").text($(this).text());
                        $("#bread_separator").addClass("d-none");
                        $(".bread-section").addClass('d-none');
                        handleResultFoundTextVisibility(glossaryList)
                    } else {
                        $("#faq-container").removeClass('d-none');
                        let currentTopic = $(this).attr("class").split(/\s+/)[1];
                        updateResults(search, currentTopic, faq);
                        $("#glossary_container").addClass('d-none');
                        $(".bread-section").addClass('d-none');
                        $("#bread_separator").addClass('d-none');
                        $("#faq-container").children().each((index, element) => {
                            if($(element).find(".topic-title").attr("id") !== $(this).attr("class").split(/\s+/)[1]) $(element).addClass('d-none');
                            else {
                                $(element).removeClass('d-none');
                                $(element).find("h1").removeClass('d-none');
                            }
                        });
                        setTimeout(() => {
                            let counter = 0;
                            $(".faq").each((index, faq) => {
                                if($(faq).is(":visible")) {
                                    $(faq).parent().find("h3").removeClass('d-none');
                                    counter++;
                                }
                            })
                            counter === 0 ? $('#no_results').removeClass("d-none"): $('#no_results').addClass("d-none");
                            $("#counter").text(counter);
                            handleResultFoundTextVisibility(counter)
                        }, 500)
                        $("#topic_separator").removeClass("d-none");
                        $(".bread-topic").text($(this).text());
                        $(".bread-search").removeClass("d-none");
                        $("#search_separator").removeClass("d-none");
                    }
                }
            });

            //Hide other sections on click in item nav section
            $(".section-item").on("click", function(e) {
                e.preventDefault();

                if($($(this).parent().get(0)).attr("class").split(/\s+/)[1] == "glossary") {
                    //Deactive faq container
                    $("#faq-container").addClass('d-none');
                    $("#glossary_container").removeClass('d-none');
                    if(search) {
                        let glossaryList = countGlossaryResults(search);
                        $(".word").each((index, word) => {
                            if($(word).text().toLowerCase().includes(search.toLowerCase())) {
                                $($($(word).parent().get(0)).parent().get(0)).appendTo(".glossary-result")
                            }
                        })
                        $("#counter").text(glossaryList);
                        $("#topic_separator").removeClass("d-none");
                        $(".bread-topic").text($(this).parent().find(".section-head").text());
                        $("#bread_separator").addClass("d-none");
                        $(".bread-section").addClass('d-none');
                        handleResultFoundTextVisibility(glossaryList)
                    }
                    return;
                } else $("#glossary_container").addClass('d-none');
                    
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
                $("#faq-container").removeClass('d-none');
                //Modify breadcrumb
                $("#bread_separator").removeClass("d-none");
                $("#topic_separator").removeClass("d-none");
                $(".bread-topic").text($(this).parent().find(".section-head").text())
                $(".bread-section").text($(this).find("a").clone().find("b").remove().end().text())
                $("#bread_separator").removeClass('d-none');
                $(".bread-section").removeClass('d-none');
                if(search) {
                    setTimeout(() => {
                        let counter = 0;
                        $(".faq").each((index, faq) => {
                            if($(faq).is(":visible")) {
                                $(faq).parent().find("h3").removeClass('d-none');
                                counter++;
                            }
                        })
                        counter === 0 ? $('#no_results').removeClass("d-none"): $('#no_results').addClass("d-none");
                        $("#counter").text(counter);
                        handleResultFoundTextVisibility(counter)
                    }, 500)
                    
                    $(".bread-search").removeClass("d-none");
                    $("#search_separator").removeClass("d-none");
                }
                //Show-hide containers
                let container;
                $("#faq-container").children().each((index, element) => {
                    if($(element).find(".topic-title").attr("id") !== $(this).parent().attr("class").split(/\s+/)[1]) {
                        $(element).addClass('d-none');
                    }
                    else {
                        $(element).removeClass('d-none');
                        container = element;
                    }
                });

                //Show/hide sections
                $(container).children().each((index, section) => {
                    if("#"+$(section).attr("id") === $(this).find("a").attr("href")) $(section).removeClass('d-none');
                    else $(section).addClass('d-none');
                })            
                location.href = $(this).find("a").attr("href");
                $(window).scrollTop(0);
            });

            //Hide other sections on click section title
            $(".section-title").on("click", function(e) {
                e.preventDefault();
                $(".section-item").each((index, section) => {
                    if($(section).parent().hasClass($(this).parents(".section-container").prev("h1").attr("id"))) {
                        if($(section).find("a").text() === $(this).text()) {
                            $(section).click();
                        }
                    }
                    
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

            //Redirect of FAQ question's links and glossary without search
            $(".accordion-faq-item-content a, .tab-content a").on("click", function(e){
                e.preventDefault();
                URLRedirect($(this), !$("#topic_separator").hasClass("d-none") ?true:false);
            });

            //Show all topics on click on FAQ
            $(".bread-faq").on("click", function(e) {
                
                if(!search) {
                    location.href = location.origin + location.pathname
                }
                else{
                    $("#faq-search-form").submit()
                }
            });
        } else {
            $(".section-head").on("click", function(e) {
                //Open accordion on mobile
                const topicName = $(this).attr("class").split(/\s+/)[1];
                if(topicName === "glossary") {
                    $(".glossary-accordion-header").addClass("active")
                    $(document).scrollTop( $(`#glossary_container`).offset().top );
                    $(".btn-close").click();
                } else {
                    $($(`#${topicName}-div`).children()[0]).addClass("active")
                    $(document).scrollTop( $(`#${topicName}-div`).offset().top );
                    $(".btn-close").click();
                }
            });

            $(".section-item").on("click", function(e) {
                //Open accordion on mobile
                $(this).parent().find("b").click()
                $(this).parent().find("b").attr("class").split(/\s+/)[1] === "glossary" ? $(document).scrollTop( $("#glossary_container").offset().top ) : $(document).scrollTop( $(this).offset().top );
                $(".btn-close").click();
            });
        }
        

        //Show search results count on the side menu
        $(".section-item").each((index, section) => {
            if(search) {
                $(section).find(".count").append().text(' ...')
                setTimeout(() => {
                    const item = $(section).find("a").attr('href')
                    let counter = 0;
                    if(item === "#glossary") {
                        $(".glossary-result").children("div").each((index, glossary_entry) => {
                            if($(glossary_entry).is(":visible")) {
                                counter++;
                            }
                       });
                    } else {
                        $(`${item} .faq`).each((index, faq) => {
                            if($(faq).is(":visible")) {
                                $(faq).parent().find("h3").removeClass('d-none');
                                counter++;
                            }
                        })
                    }
                    $(section).find(".count").text(' ('+counter.toString()+')')
                }, 750);
            }
            else {
                $(section).find(".count").remove()
            }
        })
        
        //Update header links in FAQ page
        $(".subheader").children().each((index, element) => {
        const newlink = $(element).find('a').attr('href').replace('/results', '')
        $(element).find('a').attr('href', newlink)
        });
    }

    const countGlossaryResults = function(search) {
        let count = 0;
        $(".word").each((index, word) => {
            let description = $(word).parent().parent().children(".description").text().toLowerCase();
            let title = $(word).text().toLowerCase()
            if(title.includes(search.toLowerCase())) {
                count++;
            } else if(description.includes(search.toLowerCase())) {
                count++;
            }
        })
        return count;
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

    //glossary tab-navigation with left/right arrow keys
    $('.nav-tabs .nav-item').keyup(function(e) {
        let tab = null;
        if (e.which === 39) {
            //right
            tab = $(this).next().length !== 0 ? $(this).next() : $(this).siblings().first()
        } else if (e.which === 37) {
            //left
            tab = $(this).prev().length !== 0 ? $(this).prev() : $(this).siblings().last() 
        }

        if (tab) {
            tab.addClass('active').siblings().removeClass('active');
            tab.attr("aria-selected", "true").siblings().attr("aria-selected", "false");
            tab.removeAttr('tabindex').siblings().attr('tabindex', '-1');
            $(tab.attr('href')).addClass('show active').siblings().removeClass('show active');
            tab.focus();
        }
    })

    // simple jquery tabs
    $('.nav-tabs .nav-item').click(function(e) {
        e.preventDefault();
        
        //Toggle tab link
        $(this).addClass('active').siblings().removeClass('active');
        $(this).attr("aria-selected", "true").siblings().attr("aria-selected", "false");
        $(this).removeAttr('tabindex').siblings().attr('tabindex', '-1');

        //Toggle target tab
        $($(this).attr('href')).addClass('show active').siblings().removeClass('show active');

        //Keep selected on refresh except in FAQ results
        if (!document.querySelector(".page-faq-results")) {
            if(window.location.href.includes("#")) window.location.href = window.location.href.split("#")[0]+=$(this).attr('href');           
            else window.location.href += $(this).attr('href');
        }
    });

    //events for navtabs mobiles in accessibility
    $('.mobile-type').ready(function(e){
        if(location.hash === "#ios" || location.hash === "#android"){
            $(window).scrollTop($("#glossary").offset().top);
        }
    });

    $(window).bind( 'hashchange', function(e) { 
        if(location.hash === "#ios" || location.hash === "#android"){
            $("a[href='" + location.hash + "']").addClass('active').siblings().removeClass('active');
            $("a[href='" + location.hash + "']").attr("aria-selected", "true").siblings().attr("aria-selected", "false");
            $("a[href='" + location.hash + "']").removeAttr('tabindex').siblings().attr('tabindex', '-1');
            $("div" + location.hash).addClass('show active').siblings().removeClass('show active')
            $(window).scrollTop($("#glossary").offset().top);
        }
    });

      // pre select tabs on page load
      if(window.location.href.includes("#")) {
        let activeLink = $(".nav-tabs a[href$='#"+window.location.href.split("#")[1]+"']");
        $(activeLink).addClass('active').siblings().removeClass('active');
        $($(activeLink).attr('href')).addClass('show active').siblings().removeClass('show active');
      }

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

    function highlightWord(search, element, itemsToAvoid=[]) {
        const searchLower = search.toLowerCase();
        let htmlArray = $(element).html().split(" ");
        if(itemsToAvoid.length > 0) {
            itemsToAvoid.map((item, index) => {
                htmlArray = htmlArray.join(' ').replace(item.prop('outerHTML'), `··${index}`);
                htmlArray = htmlArray.split(' ')
            })
        }
        let result = htmlArray.map((word) => {
            const wordLower = word.toLowerCase();
            if(wordLower === searchLower) {
                word = "<span class='highlight'>"+word+"</span>";
            }
            else if(wordLower.includes(searchLower)) {
                if(wordLower.indexOf(searchLower) === 0) {
                    word = "<span class='highlight'>"+word.slice(0, searchLower.length)+"</span>"+word.slice(searchLower.length);
                }
                else if(wordLower.indexOf(searchLower)+searchLower.length === word.length) {
                    word = word.slice(0, wordLower.indexOf(searchLower))+"<span class='highlight'>"+word.slice(wordLower.indexOf(searchLower), wordLower.indexOf(searchLower)+searchLower.length)+"</span>";
                } else {
                    word = word.slice(0, wordLower.indexOf(searchLower))+"<span class='highlight'>"+word.slice(wordLower.indexOf(searchLower), wordLower.indexOf(searchLower)+searchLower.length)+"</span>"+word.slice(wordLower.indexOf(searchLower)+searchLower.length);
                }
            }
            return word;
        }).join(" ");

        if(itemsToAvoid.length > 0) {
            result = result.split(' ');
            const fResult = result.map(word => {
                if(word.includes('··')) {
                    itemsToAvoid.map((item, index) => {
                        if(word.includes(`··${index}`)) {
                            if($(item).is('a')) {
                                const text = $(item).text().split(" ").map((txt) => {
                                    const wordLower = txt.toLowerCase();
                                    if(wordLower === searchLower) {
                                        txt = "<span class='highlight'>"+txt+"</span>";
                                    }
                                    else if(wordLower.includes(searchLower)) {
                                        if(wordLower.indexOf(searchLower) === 0) {
                                            txt = "<span class='highlight'>"+txt.slice(0, searchLower.length)+"</span>"+txt.slice(searchLower.length);
                                        }
                                        else if(wordLower.indexOf(searchLower)+searchLower.length === txt.length) {
                                            txt = txt.slice(0, wordLower.indexOf(searchLower))+"<span class='highlight'>"+txt.slice(wordLower.indexOf(searchLower), wordLower.indexOf(searchLower)+searchLower.length)+"</span>";
                                        } else {
                                            txt = txt.slice(0, wordLower.indexOf(searchLower))+"<span class='highlight'>"+txt.slice(wordLower.indexOf(searchLower), wordLower.indexOf(searchLower)+searchLower.length)+"</span>"+txt.slice(wordLower.indexOf(searchLower)+searchLower.length);
                                        }
                                    }
                                    return txt;
                                }).join(" ");
                                word = item.prop('outerHTML').replace($(item).text(), text);
                            } else {
                                word = item.prop('outerHTML');
                            }
                        }
                    })
                }
                return word;
            }).join(" ");

            result = fResult;
        }
        $(element).html(result)
    }

    function handleResultFoundTextVisibility(counter) {
        if(counter === 1) {
            $(".result-found").removeClass("d-none");
            $(".results-found").addClass("d-none");
        }
        else {
            $(".result-found").addClass("d-none");
            $(".results-found").removeClass("d-none");
        }
    }

    function URLRedirect(element, newTab=false){
        if($(element).hasClass("faq-anchor") || $(element).attr("href") === "#top")
            newTab = false;
        if(newTab){
            if ($(element).attr("href").charAt(0) == "#")
            window.open(window.location.origin + window.location.pathname + $(element).attr('href').replace(window.location.search, ''), '_blank');
            else
            window.open($(element).attr('href').replace(window.location.search, ''), '_blank');
        } else {
            if ($(element).attr("href").charAt(0) == "#"){   
                $($($(element).attr("href")).parent()).addClass("active");
                $(document).scrollTop( $(element).attr("href") === "#top" ?0 :$($(element).attr("href")).offset().top);
            }
            else
                location.href = $(element).attr("href")
        }
    }

    //Plotly ModeBar
    $(".modebar-btn").attr("tabindex", 0);
    $(".modebar-btn").on('keydown', (e) => {
        if (e.key === 'Enter') {
            e.target.click()
        }
    });

    //Plotly Filters
    $(".plot-container").find(".legendtoggle").attr("tabindex", 0);
    $(".plot-container").find(".legendtoggle").on('keydown', (e) => {
        if (e.key === 'Enter') {
            e.target.dispatchEvent(new Event('mouseup'))
        }
    })
});