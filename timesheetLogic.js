// My web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC3SW07O2K_E8gaN9p7Muo4nbOGH2QL6Ys",
    authDomain: "train-scheduler-2b9b4.firebaseapp.com",
    databaseURL: "https://train-scheduler-2b9b4.firebaseio.com",
    projectId: "train-scheduler-2b9b4",
    storageBucket: "train-scheduler-2b9b4.appspot.com",
    messagingSenderId: "452416900333",
    appId: "1:452416900333:web:d0bfa35fb9d73340"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  var database =firebase.database();
$("#submit-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    console.log("Train successfully added")

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var currentTime= moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var arrivalTime = moment(nextTrain).format("hh:mm")

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(arrivalTime),
        $("<td>").text(tMinutesTillTrain),
     //   $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});
