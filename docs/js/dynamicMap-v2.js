function main(regions, jsonData) {
    for (var j = 0; j < regions.length; j++) {
        console.log(j)
        var entity = regions[j];
        var region = canvas.select('#' + entity);
        region.data('json', jsonData[entity]);
        region.data('entity', entity);
        region.mouseover(function (e) {
            this.node.style.opacity = 0.65;
            setInfo(this);
        });

        region.mouseout(function (e) {
            this.node.style.opacity = 1;
        });
    }

}

function setInfo(region) {
    document.getElementById('entity-name').innerHTML = region.data('entity');
}