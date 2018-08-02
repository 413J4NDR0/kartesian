var database = firebase.database();
var syriaData;
database.ref().on("value", function(current){
    syriaData = current.val();
    console.log(syriaData.syria);
    console.log(typeof(syriaData));
}, function (error) {
    console.log("Error: " + error.code);
})
