function main(regions, jsonData) {
    var sum = 0;
    for (var j = 0; j < regions.length; j++) {
        console.log(j)
        var entity = regions[j];
        var region = canvas.select('#' + entity);
        region.data('json', jsonData[entity]);
        sum += jsonData[entity].pop_prewar - jsonData[entity].pop_2018;
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

function setInfo(region) {
    var json = region.data('json');
    document.getElementById('entity-name').innerHTML = json.entity;

}