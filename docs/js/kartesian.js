var redGradient = ['#380303', '#460404', '#530606', '#610707', '#6e0808', '#7c0909', '#890a0a', '#970c0c',
'#a32424', '#af3c3c', '#bb5454', '#c76d6d', '#d38585', '#df9d9d', '#ebb6b6', '#f7cece', '#f7cece'];

var tealGradient = ['#032828', '#043636', '#064343', '#075151', '#085e5e', '#096c6c', '#0a7979', '#0c8787',
'#249393', '#3c9f9f', '#54abab', '#6db7b7', '#85c3c3', '#9dcfcf', '#b6dbdb', '#cee7e7', '#cee7e7'];

var greyGradient = ['#1e1e1e', '#232323', '#282828', '#2D2D2D', '#323232', '#373737', '#3B3B3B', '#414141',
'#555555', '#6A6A6A', '#7E7E7E', '#939393', '#a8a8a8', '#bCbCbC', '#d1d1d1', '#e5e5e5', '#e5e5e5'];

var gradients = new Map([['red' , redGradient], ['teal' , tealGradient], ['grey', greyGradient], ['gray', greyGradient]]);

function Kartesian(country, dataset=country,color="red", outline=false, outlinecolor="#fff") {
    var svg_layout = '<object type="image/svg+xml" data="img/'+ country + '.svg" id="svg" style="max-height: inherit"></object>';
    $('#map-wrapper').prepend(svg_layout);
    var canvas;
    var svgWrapper = document.getElementById("svg");
    svgWrapper.addEventListener('load', function(){
        var svgDoc = svgWrapper.contentDocument;
        canvas = Snap(svgDoc);
        getData(dataset).then(function(data){
            getMetadata(dataset).then(function(metadata){
                console.log(data);
                console.log(metadata);
                var regions = Object.keys(data);
                main(regions, data, metadata, canvas, color,outline,outlinecolor);
            });
        });
    });
}

function main(regions, jsonData, jsonMeta, canvas, color,outline,outlinecolor) {
    for (var j = 0; j < regions.length; j++) {
        var entity = regions[j];
        var region = canvas.select('#' + entity);
        region.data('json', jsonData[entity]);
        region.mouseover(function (e) {
            this.node.style.opacity = 0.65;
            setInfo(this, jsonMeta);
            $(".info").css({
                "display": "block"
            });
        });

        region.mouseout(function (e) {
            this.node.style.opacity = 1;
            $(".info").removeAttr('style');
        });
        protean(region, color,outline,outlinecolor);
    }
    document.getElementById('map-title').innerHTML = jsonMeta.entity + " " + jsonMeta.pop;
}

function setInfo(region, jsonMeta) {
    var json = region.data('json');
    document.getElementById('entity-name').innerHTML = json.entity;
    document.getElementById('pop').innerHTML = jsonMeta.pop + ': ' + commafy(json.pop) ;
}

function protean(region, color,outline,outlinecolor) {
    var colorGradient = gradients.get(color);
    var json = region.data('json');
    var index = Math.round(json.pop_scaled / 0.0625);
    region.node.style.fill = colorGradient[index];
    region.node.style.stroke = colorGradient[index];
    if (outline) {
        region.node.style.stroke = outlinecolor;
    }
}

$("#vietnam").click(function () {
    $("#svg").remove();
    Kartesian("vietnam", "vietnam",'teal');
});


$("#mexico").click(function () {
    $("#svg").remove();
    Kartesian("mexico", "mexico", 'teal');
});

$("#syria").click(function () {
    $("#svg").remove();
    Kartesian("syria", "syria", 'teal');
});

$("#yemen").click(function () {
    $("#svg").remove();
    Kartesian("yemen", "yemen", 'teal');
});
