function main(regions, jsonData) {
    for (var j = 0; j < regions.length; j++) {
        console.log(j)
        var region = svgDoc.getElementById(regions[j]);
        var r = $('#'+regions[j]);
        console.log(r[0]);
        region.mouseover(function (e) {
            this.node.style.opacity = 0.65;
            setInfo(this, jsonData);
        });

        /*regions[j].mouseout(function (e) {
            this.node.style.opacity = 1;
            $(".info").css({
                "width": "auto"
            });
            document.getElementById('cn').innerHTML = "";
            document.getElementById('rs').innerHTML = "";
        });*/
    }

}

function setInfo(region, jsonData) {
    console.log(jsonData[region].entity)
    document.getElementById('entity-name').innerHTML = jsonData[region].entity;
}