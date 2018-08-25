var redGradient = ['#280303', '#360404', '#430606', '#510707', '#5e0808', '#6c0909', '#790a0a', '#870c0c', 
'#932424', '#9f3c3c', '#ab5454', '#b76d6d', '#c38585', '#cf9d9d', '#dbb6b6', '#e7cece', '#e7cece'];

function Kartesian(country, dataset=country) {
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
                main(regions, data, metadata, canvas);
            });
        });
    });
}

function main(regions, jsonData, jsonMeta, canvas) {
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
        protean(region, redGradient);
    }
    document.getElementById('map-title').innerHTML = jsonMeta.entity + " " + jsonMeta.pop;
}

function setInfo(region, jsonMeta) {
    var json = region.data('json');
    document.getElementById('entity-name').innerHTML = json.entity;
    document.getElementById('pop').innerHTML = jsonMeta.pop + ': ' + commafy(json.pop) ;
}

function protean(region, colorGradient) {
    var json = region.data('json');
    var index = Math.round(json.pop_scaled / 0.0625);
    region.node.style.fill = colorGradient[index];
    region.node.style.stroke = colorGradient[index];
}

$("#vietnam").click(function () {
    $("#svg").remove();
    Kartesian("vietnam");
});


$("#mexico").click(function () {
    $("#svg").remove();
    Kartesian("mexico");
});

$("#syria").click(function () {
    $("#svg").remove();
    Kartesian("syria");
});

$("#yemen").click(function () {
    $("#svg").remove();
    Kartesian("yemen");
});
