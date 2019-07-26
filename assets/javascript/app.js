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
    var firstTrain = 0;
    var frequency = 0;
    var nextArrival;
 
    
    // on-click function for the submit to process the inputs
$("#submit-train").on("click", function(event){

// use a default preventer to stop the page from refreshing upon completing its task
    event.preventDefault();

// use jquery to grab the values of the targeted inputs
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = moment($("#first-train").val().trim(), "HH:mm")
    frequency = $("#frequency").val().trim();

// console log the result
    console.log(trainName)
    console.log(destination)
    console.log("first train " + firstTrain)
    console.log(frequency)
    
    // using the first train time we calculate how many minutes til now it is
    var difference = moment().diff(moment(firstTrain, 'HH:mm'), 'minutes')
    var division = parseInt(difference / frequency)

    // create an array to hold our times for arrivals
    var arrivals = []

    // create a loop to add every time using the frequency to the array, until we hit our current time
    for ( var i = 0; i < division+1; i++) {
        var arrival = firstTrain.add(frequency, 'minutes')
        var anotherArrival = moment(arrival).format("HH:mm")
        arrivals.push(anotherArrival)
    }

    // pull out the last item in the array as the "next arrival"
    var lastArrival = arrivals[arrivals.length-1]

    // log the rest
    console.log(arrivals)
    console.log(lastArrival)

    // calculate how many minutes until the next arrival
    var minutesAway = moment(lastArrival, "HH:mm").fromNow()

    console.log(minutesAway)


    // push all of our variables into the database
    database.ref().push({
        name: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: lastArrival,
        minutesAway: minutesAway
    })


// clear the inputs of their values
    $("#train-name").val("")
    $("#destination").val("")
    $("#first-train").val("")
    $("#frequency").val("")

})


database.ref().on("child_added", function(snapshot){

    /* log all the database variables
    console.log(snapshot.val().name)
    console.log(snapshot.val().destination)
    console.log(snapshot.val().firstTrain)
    console.log(snapshot.val().frequency)
    console.log(snapshot.val().nextArrival)
    console.log(snapshot.val().minutes)*/

    // append the database values to our table
    $("#train-table").append("<tr>" + "<td>" + snapshot.val().name + "</td>" +
    "<td>" + snapshot.val().destination + "</td>" +
    "<td>" + snapshot.val().frequency + "</td>" +
    "<td>" + snapshot.val().nextArrival + "</td>" +
    "<td>" + snapshot.val().minutesAway + "</td>" +
    "</tr>"
    )

})

})