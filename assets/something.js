<script src="https://www.gstatic.com/firebasejs/5.5.0/firebase.js"></script>

var config = {
    apiKey: "AIzaSyDDK1JrP5IISu60BtEOjRRzA5JdmJhOzRI",
    authDomain: "mw-2018-4b5be.firebaseapp.com",
    databaseURL: "https://mw-2018-4b5be.firebaseio.com",
    projectId: "mw-2018-4b5be",
    storageBucket: "mw-2018-4b5be.appspot.com",
    messagingSenderId: "428331059261"
};
  firebase.initializeApp(config);

var database = firebase.database();

// add trains and input fields
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  var trainName = $("train-name-input").val().trim();
  var destination = $("#destination").val().trim();
  var trainStartTime = moment($("#trainStartTime").val().trim(), "HH:mm").format("HHmm");
  var frequency = $("#frequncy").val().trim();

  // newTrain info
  var newTrain = {
    nameName: trainName,
    destination: destination,
    trainStartTime: trainStartTime,
    frequency: frequency
  };

  // push info to database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.trainStartTime);
  console.log(newTrain.frequency);


  // Clear all input fields
  $("#trainName").val("");
  $("#destination").val("");
  $("#trainStartTime").val("");
  $("#frequency").val("");
});

//Firebase event adding train info to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var trainStartTime = childSnapshot.val().trainStartTime;
  var frequency = childSnapshot.val().frequency;

  // train info
  console.log(trainName);
  console.log(destination);
  console.log(trainStartTime);
  console.log(frequency);

  // Create new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(trainStartTime),
    $("<td>").text(frequency)
  );

  // Append new row to  table
  $("#train-table").append(newRow);
});

