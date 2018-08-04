var config = {
    apiKey: "AIzaSyBk9XcRfMEQVqFV3PJCchENYjwS9K4Lom8",
    authDomain: "dynamicmap-1f91d.firebaseapp.com",
    databaseURL: "https://dynamicmap-1f91d.firebaseio.com",
    projectId: "dynamicmap-1f91d",
    storageBucket: "dynamicmap-1f91d.appspot.com",
    messagingSenderId: "34590528788"
};
firebase.initializeApp(config);

var database = firebase.database();
function getData(country) {
        return database.ref('/'+ country).once("value").then(function(current){
            var promise;
            var country = current.val();
            return Promise.resolve(country);
    }, function (error) {
        console.log("Error: " + error.code);
    })
}

var svgWrapper = document.getElementById("svg");
var svgDoc;
var canvas;
svgWrapper.addEventListener('load', function(){
    svgDoc = svgWrapper.contentDocument;
    canvas = Snap(svgDoc);
    console.log(svgWrapper);
    console.log(svgDoc);
    console.log(canvas);
});