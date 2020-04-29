$(document).ready(function () {
    $("#searchButton").on("click", function () {
        var inputStored = $("#cityInput").val();
        $("#cityInput").val("");
        getWeather(inputStored);
        addList(inputStored);
    })

    function addList(inputStored) {
        var newRow = $("<button>").addClass("addedRow").text(inputStored);
        $("#generatedList").append(newRow);
        $("#cityInput").val("");

    }

    function getWeather(inputStored) {
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + inputStored + "&units=imperial&appid=d4e0d5067632cdd06a4bad12b5b1e650",
        }).then(function (data) {
            var card = $("<div>").addClass("card");
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h2>").addClass("card-title").text(data.name);
            var temp = $("<p>").addClass("card-text").text("Current Temperature: " + data.main.temp + " F ")
            var windSpeed = $("<p>").addClass("card-text").text("Wind Speed is : " + data.wind.speed + " MPH")
            var clouds = $("<p>").addClass("card-text").text("Todays weather has : " + data.weather[0].description)

            cardBody.append(cardTitle, temp, windSpeed, clouds);
            card.append(cardBody);
            $("#dailyForecast").html(card);



        })
    }






});


// Generate function that dynamically generates html list tags within unordered list
// Getweather - Get request from API
// api key 5 day : api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}
//^^ check for specific dates / times 
// for loop    

// Save / Call from Local Storage
// Weather forecast for today - for future 
//