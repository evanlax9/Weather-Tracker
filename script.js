$(document).ready(function () {
    $("#searchButton").on("click", function () {
        var inputStored = $("#cityInput").val();
        $("#cityInput").val("");
        getWeather(inputStored);
        addList(inputStored);
        getWeatherFive(inputStored);
    })
    $("#generatedList").on("click", "button", function () {
        getWeather($(this).text());
        getWeatherFive($(this).text());

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
            if (cities.indexOf(inputStored) === -1) {
                cities.push(inputStored);
                localStorage.setItem("cities", cities);

            }

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
    function getWeatherFive(inputStored) {
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?appid=70e75079715aaa88f8897acff6d0352b&q=" + inputStored

        }).then(function (data) {
            $("#fiveDayForecast").html("<h2>Five Day Forecast</h2>").append("<div class=\"row\">")
            var allData = data.list;
            for (var i = 0; i < allData.length; i++) {
                var date = allData[i].dt_txt;
                var actualDate = date.split(" ")[0];
                var actualTime = date.split(" ")[1];

                if (actualTime === "12:00:00") {
                    var card = $("<div>").addClass("card col-md-2").attr("id", "forecastCard");
                    var cardTitle = $("<h5>").addClass("card-title").text(data.city.name);
                    var tempFive = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp);
                    var humidity = $("<p>").addClass("card-text").text("Humidity:" + data.list[i].main.humidity + "%")
                    var conditions = $("<p>").addClass("card-text").text("Skies : " + data.list[i].weather[0].main)
                    card.append(cardTitle, tempFive, humidity, conditions);
                    $("#fiveDayForecast").append(card);



                }
            }
        }
        )
    }

    var cities = [];
    if (localStorage.getItem("cities")) {
        cities = localstorage.getItem("cities").split(",");
    }


    if (cities.length > 1) {
        getWeather(cities[cities.length - 1]);
        getWeatherFive(cities[cities.length - 1]);

    }
    for (var i = 0; i < cities.length; i++) {
        var cityToAdd = cities[i].charAt(0).toUpperCase() + cities[i].substring(1);
        addList(cityToAdd);
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