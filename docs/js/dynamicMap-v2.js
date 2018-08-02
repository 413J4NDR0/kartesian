function main(regions, jsonData) {
    normalize(regions, jsonData);
    for (var j = 0; j < regions.length; j++) {
        var entity = regions[j];
        var region = canvas.select('#' + entity);
        region.data('json', jsonData[entity]);
        region.mouseover(function (e) {
            this.node.style.opacity = 0.65;
            setInfo(this);
            $(".info").css({
                "width": 'auto'
            });
        });

        region.mouseout(function (e) {
            this.node.style.opacity = 1;
        });
    }
    console.log(sum)
}

function normalize(regions, jsonData) {
    var properties = Object.keys(jsonData[regions[0]]);
    console.log(properties);
}

function setInfo(region) {
    var json = region.data('json');
    document.getElementById('entity-name').innerHTML = json.entity;

}

function protean(region) {
    var json = region.data('json');

}
