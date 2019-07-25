$(document).ready(function(){



var trainName;
var destination;
var firstTime;
var frequency = 0;

$("#submit-train").on("click", function(){

    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTime = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(trainName)
    console.log(destination)
    console.log(firstTime)
    console.log(frequency)

    $("#train-name").val("")
    $("#destination").val("")
    $("#first-train").val("")
    $("#frequency").val("")
})

})