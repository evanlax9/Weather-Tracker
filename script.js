$(document).ready(function () {
    $("#searchButton").on("click", function () {
        var inputStored = $("#cityInput").val();
        $("#cityInput").val("");
        getWeather(inputStored);
    })

    function getWeather(inputStored) {

    }


});


// Generate function that dynamically generates html list tags within unordered list
// Getweather - Get request from API
// Save / Call from Local Storage
// Weather forecast for today - for future 
//