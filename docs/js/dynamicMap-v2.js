function main(regions, jsonData) {
    for (var j = 0; j < regions.length; j++) {
        console.log(j)
        var entity = regions[j];
        var region = canvas.select('#' + entity);
        
        region.mouseover(function (e) {
            this.node.style.opacity = 0.65;
            setInfo(entity, jsonData);
        });

        region.mouseout(function (e) {
            this.node.style.opacity = 1;
        });
    }

}

function setInfo(region, jsonData) {
    console.log(jsonData[region].entity)
    document.getElementById('entity-name').innerHTML = jsonData[region].entity;
}