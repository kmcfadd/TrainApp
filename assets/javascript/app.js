$(document).ready(function(){

  // Your web app's Firebase configuration
  var Config = {
    apiKey: "AIzaSyAaM8bnlDoIGd7FjZFJEEd62wwdMzjvayM",
    authDomain: "trainapp-9bd98.firebaseapp.com",
    databaseURL: "https://trainapp-9bd98.firebaseio.com",
    projectId: "trainapp-9bd98",
    storageBucket: "",
    messagingSenderId: "928211259254",
    appId: "1:928211259254:web:fdc818b2b7e752c4"
  };
  // Initialize Firebase
  firebase.initializeApp(Config);

  var database = firebase.database();

  // initial variables that will hold the input values
    var trainName;
    var destination;
    var firstTime;
    var frequency = 0;

    // on-click function for the submit to process the inputs
$("#submit-train").on("click", function(event){

// use a default preventer to stop the page from refreshing upon completing its task
    event.preventDefault();

// use jquery to grab the values of the targeted inputs
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

// console log the result
    console.log(trainName)
    console.log(destination)
    console.log(firstTime)
    console.log(frequency)

    database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTime,
        frequency: frequency
    })



// clear the inputs of their values
    $("#train-name").val("")
    $("#destination").val("")
    $("#first-train").val("")
    $("#frequency").val("")

})

database.ref().on("child_added", function(snapshot){

    console.log(snapshot.val().name)
    console.log(snapshot.val().destination)
    console.log(snapshot.val().firstTrain)
    console.log(snapshot.val().frequency)

    $("#train-table").append("<tr>" + "<td>" + snapshot.val().name + "</td>" +
    "<td>" + snapshot.val().destination + "</td>" +
    "<td>" + snapshot.val().frequency + "</td>" +
    "</tr>"
    )

})

})