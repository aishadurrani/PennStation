//Link to Firebase
var trainData = new Firebase("https://trainschedule1.firebaseIO.com/");




// Button for adding train
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainTime = $("#trainTimeInput").val().trim();
	var trainFrequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency,
	}

	// Uploads train data to the database
	trainData.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(newTrain.time);
	console.log(newTrain.frequency);

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#trainTimeInput").val("");
	$("#frequencyInput").val("");

	// Determine when the next train arrives.
	return false;
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

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
 

		// Assumptions
		//var tFrequency = 3; 
		//var trainTime = "03:30"; // Time is 3:30 AM


		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment()
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % trainFrequency; 
		console.log(tRemainder);

		// Minute Until Train
		var minutesAway = trainFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + minutesAway);

		// Next Train
		var nextTrain = moment().add(minutesAway, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
		
		var nextarrival = moment(nextTrain).format("HH:mm");






	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextarrival  + "</td><td>" + minutesAway + "</td></tr>");

});




