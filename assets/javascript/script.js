var dayPlanner = []

 
function getCurrentDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}


function savePlannerData() {
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));
}


function displayPlannerData() {
    dayPlanner.forEach(function (hour) {
        $("#" + hour.id).val(hour.dataPlanner)
    }) 
}


function loadPlannerData() {
    var dataLoaded = JSON.parse(localStorage.getItem("dayPlanner"));

    if (dataLoaded) {
        dayPlanner = dataLoaded;
    }

    savePlannerData()
    displayPlannerData()
}

dayPlanner.forEach(function(hour) {
  
    var timeRow = $("<form>")
        .addClass("row");

    $(".container").append(timeRow);

    
    var timeField = $("<div>")
        .addClass("col-md-2 hour")
        .text(hour.displayHour + hour.ampm);

    var hourInput = $("<div>")
        .addClass("col-md-9 description p-0")
    var hourData = $("<textarea>");
        hourData.attr("id", hour.id);
    
        if (hour.time == moment().format("HH")) {
            hourData.addClass("present")
        } else if (hour.time < moment().format("HH")) {
                hourData.addClass("past")
        } else if (hour.time > moment().format("HH")) {
            hourData.addClass("future")
    }

    hourInput.append(hourData);
    
    var saveIcon = $("<i class='far fa-save fa-lg'></i>")
    var saveEnd = $("<button>")
        .addClass("col-md-1 saveBtn");
 
    saveEnd.append(saveIcon);    
    timeRow.append(timeField, hourInput, saveEnd)
})

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children().attr("id");
    dayPlanner[saveIndex].dataPlanner = $(this).siblings(".description").children().val();
    savePlannerData();
    displayPlannerData();
})
getCurrentDate()
loadPlannerData()
