

var rfg = [150, 300, 500, 1000, 1500, 3000, 5000, 10000, 30000, 50000, 100000, 200000, 500000, 800000, 2000000]
var rfgc = ['#000', '#1a0000', '#1f0000', '#3a0000', '#3f0000', '#4a0000', '#4f0000', '#6a0000', '#6f0000', '#7a0000', '#8a0000', '#ca0000', '#da0000', '#df0000', '#ef0000', '#ff0000']
var total = [0, 10, 20, 50, 80, 100, 500, 600]
var totalc = ['#000', '#001f00', '#003f00', '#005f00', '#007f00', '#009f00', '#00af00', '#00d700', '#00f700']
var pub = [0, 1, 3, 5, 10, 30, 75, 100]
var pubc = ['#000', '#330', '#440', '#550', '#660','#770', '#990', '#dd0', '#ff0']
var state = 'europe';
var legendTotal = ['#total', "#00ff00", "#003000", "105", "- 1000 images", "- 600 images", "- 100 images", "- 5 images", "Distribution of Photos in the AP Database", 't', null, total, totalc];
var legendPub = ['#published', "#ff0", "#330", "105", "- 150 images", "", "- 10 images", "- 1 images", "Distribution of Published AP Photos", 'pi', null, pub, pubc];
var legendRef = ['#refugees', "#c90000", "#370000", "170", "- 2,000,000 or more refugees", "- 20,000 refugees", "- 5,000 refugees", "- 500 refugees", "Refugees of the Syrian Civil War", 'r16', null, rfg, rfgc];
var hit = [];
var cite = [];
var ready = false;
//Functions for changing from Europe to USA
function changeView(region, varray) {
    $(varray[0]).click(function () {
        legendShift(varray[1], varray[2], varray[3], varray[4], varray[5], varray[6], varray[7])
        document.getElementById('mt').innerHTML = varray[8]
        main(region, varray[9], varray[10], varray[11], varray[12]);
    });
}

$("#europeChange").click(function () {
    setView("usa", "#usa", "#europe", "#usaChange", "#europeChange")
    document.getElementById('mt').innerHTML = "Refugees of the Syrian Civil War"
    main(states, 'r16', null, rfg, rfgc);
    changeView(states, legendTotal);
    changeView(states, legendPub);
    changeView(states, legendRef);

});

$("#usaChange").click(function () {
    //$("#bar").velocity({ translateX: "0px", translateY: "0px" });
    setView("europe", "#europe", "#usa", "#europeChange", "#usaChange")
    main(countries, 'r16', null, rfg, rfgc);
    legendShift("#c90000", "#370000", "170", "- 2,000,000 or more refugees", "- 20,000 refugees", "- 5,000 refugees", "- 500 refugees")
    document.getElementById('mt').innerHTML = "Refugees of the Syrian Civil War"
    changeView(countries, legendTotal);
    changeView(countries, legendPub);
    changeView(countries, legendRef);
});

//Apply mouseover and click effects
function main(regions, tag1, tag2, val, color) {
    for (var j = 0; j < regions.length; j++) {
        regions[j].mouseover(function (e) {
            this.node.style.opacity = 0.65;
            setInfo(this, tag1, tag2);
            if (state == 'usa') {
                $(".info").css({
                    "width": screen.width * (250 / 1280) + 'px'
                });
            } else {
                $(".info").css({
                    "width": screen.width * (470 / 1280) + 'px'
                });
            }
        });

        regions[j].mouseout(function (e) {
            this.node.style.opacity = 1;
            $(".info").css({
                "width": "auto"
            });
            document.getElementById('cn').innerHTML = "";
            document.getElementById('rs').innerHTML = "";
        });
        protean(regions[j], tag1, tag2, val, color)
        gallery(regions[j])
    }

}

function reset() {
    if ($("#mySlides") != null) {
        $(".mySlides").remove();
        $("#image").remove();
        $(".dot").remove();
    }
}
//Called by the main function; sets the values of the div#info
function setInfo(region, tag1, tag2) {
    document.getElementById('cn').innerHTML = region.data('cn');
    if (tag1 == 'r16') {
        if (region.data('id') == "SY") {
            document.getElementById('rs').innerHTML = region.data('cn') + " had " + commafy(region.data('r15')) + " internally displaced peoples in 2015 and "
                + commafy(region.data('r16')) + " in 2016";
        } else if (region.data('id') == "PS" || region.data('id') == "XK") {
            document.getElementById('rs').innerHTML = "Data Deficient";
        } else {
            document.getElementById('rs').innerHTML = region.data('cn') + " had " + commafy(region.data('r15')) + " Syrian refugees or asylum seekers in 2015 and "
                + commafy(region.data('r16')) + " in 2016";
        }
    } else if (tag1 == "t") {
        if (region.data('t') == 0) {
            document.getElementById('rs').innerHTML = region.data('cn') + " had no photos about Syrian refugees in the AP Photos Database"
        } else {
            document.getElementById('rs').innerHTML = region.data('cn') + " had " + commafy(region.data('t')) + " photos about Syrian Refugees in the AP Photos database"
        }
    } else if (tag1 == "pi") {
        if (region.data('pi') == 0) {
            document.getElementById('rs').innerHTML = region.data('cn') + " had no photos cited by  the eight news agencies of interest"
        } else {
            document.getElementById('rs').innerHTML = region.data('cn') + " had " + commafy(region.data('pi')) + " photos cited by the eight news agencies of interest"
        }
    }
}
//initialize a Gallery on click
function visGal(region) {
    if (region.data('pi') > 0) {
        ready = true;
        $galleryWrap.find('.galleryWrap_title').text("");
        $galleryWrap.css({
            'top': "17%",
            'left': '69%'
        });
        $galleryWrap.find('.galleryWrap_title').text("Published Photos in " + region.data('cn'));
        document.getElementById('cont').innerHTML = ""
        slideIndex = 1;
        hit = region.data('hits');
        cite = region.data('cite');

        createSlides(region.data('url'));
    } else {
        ready = false;
        reset();
        $galleryWrap.find('.galleryWrap_title').text("");
        $galleryWrap.find('.galleryWrap_title').text(region.data('cn'));
        document.getElementById('cont').innerHTML = region.data('cn') + " had no cited photos"
        document.getElementById("contentText").innerHTML = "";

    }

}
function gallery(region) {
    if (region.data('pi') > 0) {

        region.mousedown(function (e) {
            ready = true;
            $galleryWrap.find('.galleryWrap_title').text("");
            $galleryWrap.css({
                'top': "17%",
                'left': '69%'
            });
            $galleryWrap.find('.galleryWrap_title').text("Published Photos in " + this.data('cn'));
            document.getElementById('cont').innerHTML = ""
            slideIndex = 1;
            hit = region.data('hits');
            cite = region.data('cite');
            createSlides(region.data('url'));

        });

        $galleryWrap.on('click', '.galleryWrap_close', function (e) {
            ready = false;
            $galleryWrap.css({
                'top': '-99999px',
                'left': '-99999px'
            });

            e.preventDefault();
            e.stopPropagation();
        });
    } else {
        ready = false;
        region.mousedown(function (e) {
            reset();
            $galleryWrap.find('.galleryWrap_title').text("");
            $galleryWrap.css({
                'top': '17%',
                'left': '69%',
                "min-width":"256px"
            });
            $galleryWrap.find('.galleryWrap_title').text(this.data('cn'));
            document.getElementById('cont').innerHTML = this.data('cn') + " had no cited photos"
            document.getElementById("contentText").innerHTML = "";

        });

        $galleryWrap.on('click', '.galleryWrap_close', function (e) {

            $galleryWrap.css({
                'top': '-99999px',
                'left': '-99999px'
            });

            e.preventDefault();
            e.stopPropagation();
        });
    }
}
//Create Gallery
function createSlides(imgList) {
    reset();
    prev = document.createElement('a');
    next = document.createElement('a');
    prev.setAttribute('class', "prev");
    next.setAttribute('class', "next");
    prev.innerHTML = "&#10094";
    next.innerHTML = "&#10095";
    prev.setAttribute("onclick", "plusSlides(-1)")
    next.setAttribute("onclick", "plusSlides(1)")
    document.getElementById("cont").appendChild(next);
    document.getElementById("cont").appendChild(prev);
    for (var i = 0; i < imgList.length; i++) {
        slides = document.createElement("div");
        dot = document.createElement("span");
        image = document.createElement("img");
        slides.setAttribute("class", "mySlides fade")
        dot.setAttribute("class", "dot")
        dot.setAttribute("onclick", "currentSlide(" + i + ")");
        image.setAttribute("src", imgList[i]);
        image.setAttribute("class", "image");
        slides.appendChild(image);
        document.getElementById("cont").appendChild(slides);
        document.getElementById("dotWrap").appendChild(dot);
    }

    showSlides(slideIndex);
}
var slideIndex = 1;
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    document.getElementById("contentText").innerHTML = "Image cited in " + hit[slideIndex - 1] + " Articles";
}
//Use regex to add commas where appropriate in integers for legibility
function commafy(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//change the fill of svg paths given the path, the data tags and arrays for the cutoffs and color scale
function protean(country, tag1, tag2, val, col, data) {
    for (var j = 0; j < val.length; j++) {
        if (country.data(tag1) <= val[j]) {
            country.node.setAttribute('stroke', col[j]);
            country.node.setAttribute('fill', col[j]);
            break;
        } else {
            country.node.setAttribute('stroke', col[j] + 1);
            country.node.setAttribute('fill', col[j + 1]);
        }
    }
}

//Change the color and labels of the legend
function legendShift(high, low, width, tick1, tick2, tick3, tick4) {
    $('#top').attr("stop-color", high)
    $('#bot').attr("stop-color", low)
    $('#bar').attr("width", width)
    document.getElementById('t1').innerHTML = tick1
    document.getElementById('t2').innerHTML = tick2
    document.getElementById('t3').innerHTML = tick3
    document.getElementById('t4').innerHTML = tick4
}

function setView(stateC, show0, hide0, show1, hide1) {
    $galleryWrap.css({
        'top': '-99999px',
        'left': '-99999px'
    });
    state = stateC;
    legendShift("#c90000", "#370000", "170", "- 2,000,000 or more refugees", "- 20,000 refugees", "- 5,000 refugees", "- 500 refugees")
    if (show0 == '#usa') {
        $(show0).css({
            "display": "block",
            "margin": "auto",
            "width": "57%",
            "padding-top": "3.9%",

        })
        var europeX = document.getElementById("usa").getBoundingClientRect().width - document.getElementById("europe").getBoundingClientRect().width;
        $("#bar").velocity({ translateX: europeX / 1.5 + "px" });
    } else if (show0 == '#europe') {
        $(show0).css({
            "display": "block",
            "margin": "auto",
            "width": "40%",

        })
        $("#bar").velocity({ translateX:  "0px"});
    }

    $(show0).velocity("fadeIn", { duration: 300 });
    $(hide1).css({
        "display": "none",
    })
    $(hide0).css({
        "display": "none",
    })
    $(show1).css({
        "display": "inline",
    })
}
