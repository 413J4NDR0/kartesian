var redGradient = ['#280303', '#360404', '#430606', '#510707', '#5e0808', '#6c0909', '#790a0a', '#870c0c', 
'#932424', '#9f3c3c', '#ab5454', '#b76d6d', '#c38585', '#cf9d9d', '#dbb6b6', '#e7cece', '#e7cece'];

function DynamicMap(country) {
    getData(country).then(function(data){
        console.log(data);
        regions = Object.keys(data);
        console.log(regions);
        main(regions, data);
    });
}

function main(regions, jsonData) {
    for (var j = 0; j < regions.length; j++) {
        var entity = regions[j];
        var region = canvas.select('#' + entity);
        region.data('json', jsonData[entity]);
        region.mouseover(function (e) {
            this.node.style.opacity = 0.65;
            setInfo(this);
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
}

function setInfo(region) {
    var json = region.data('json');
    document.getElementById('entity-name').innerHTML = json.entity;

}

function protean(region, colorGradient) {
    var json = region.data('json');
    var index = Math.round(json.pop_scaled / 0.0625);
    region.node.style.fill = colorGradient[index];
    region.node.style.stroke = colorGradient[index];
}
