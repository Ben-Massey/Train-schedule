// Initialize Firebase
var config = {
    apiKey: "AIzaSyCbgiC9TRQFmwP3YtFCdPfp9jp4DLLYqIw",
    authDomain: "train-schedule-977ba.firebaseapp.com",
    databaseURL: "https://train-schedule-977ba.firebaseio.com",
    projectId: "train-schedule-977ba",
    storageBucket: "train-schedule-977ba.appspot.com",
    messagingSenderId: "662482066687"
};
firebase.initializeApp(config);

var database = firebase.database();


$('#addTrainBtn').on('click', function (event) {
    event.preventDefault();

    //grabbing user input
    var trainName = $("#trainNameInput").val().trim();

    var destinationName = $("#destinationInput").val().trim();

    var firstTrainTime = $('#firstTrainTimeInput').val().trim();

    var frequencyAmount = $('#frequencyInput').val().trim();

    // storing the user input in a variable to push to the database
    var newTrain = {
        name: trainName,
        destination: destinationName,
        startTime: firstTrainTime,
        frequency: frequencyAmount

    };
    // pushing new Train to the database
    database.ref().push(newTrain);




    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.startTime);
    // console.log(newTrain.frequency);


    // clear Text Boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyInput").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().startTime;
    var frequencyAmount = childSnapshot.val().frequency;

    // console.log(trainName);
    // console.log(destinationName);
    // console.log(firstTrainTime);
    // console.log(frequencyAmount);

    var firstTimeConverted = moment(firstTrainTime, "hh:mm A");


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % frequencyAmount;

    var tMinutesTillTrain = frequencyAmount - tRemainder;


    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    // creates html for each entry
    $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
        frequencyAmount + " minutes" + "</td><td>" + nextTrain.format("hh:mm A") + "</td><td>" + tMinutesTillTrain + " minutes" + "</td></tr>");

});