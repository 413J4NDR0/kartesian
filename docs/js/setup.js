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
        var data = current.val();
        return Promise.resolve(data);
    }, function (error) {
        console.log("Error: " + error.code);
    })
}

function getMetadata(country) {
    return database.ref('/metadata/' + country).once("value").then(function(current){
        var data = current.val();
        return Promise.resolve(data);
    }, function (error) {
        console.log("Error: " + error.code);
    })
}

function commafy(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}