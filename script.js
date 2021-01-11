var previousCities = localStorage.getItem("city-names", JSON.stringify(previousCities))
previousCities = previousCities ? previousCities.split(',') : [];

function getStoredCities () {
    $("#city-buttons").empty()
    for (var i = 0; i < previousCities.length; i++) {
        var newButton = $(`<button>`)
        newButton.addClass(`city-button rounded`)
        newButton.attr("data-city", `${previousCities[i]}`)
        newButton.text(`${previousCities[i]}`)
        var newDiv = $(`<div>`)
        newDiv.addClass("row p-2 m-2")
        newDiv.append(newButton)
        $("#city-buttons").append(newDiv)
    }
}

function showWeather () {
    var APIkey = "9526c3c911969b66bd8db72a323046c5"
    var cityName = previousCities[0]
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`
    
    $.ajax ({  
        url: queryURL,
        method: "GET"
    }) 
    .then (function (response) {
        $("#today").removeClass("hide")
        $("#forecast").removeClass("hide")
        $("#city-name").text(`Today in ${response.city.name}:`)
        var lat = (`${response.city.coord.lat}`)
        var lon = (`${response.city.coord.lon}`)
        var queryURL_UVI = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`
        var queryURL_UVI_forecast = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&cnt=3&appid=${APIkey}`

        for (var i = 0; i < response.list.length; i+=8) {
            var date = response.list[i].dt_txt
            var dayNumber = [1, 2, 3, 4, 5]
            var date_formatted = date.split(" ")
            $(`#day-${dayNumber[i/8]}`).text(`${date_formatted[0]}`)
            $(`#day-${dayNumber[i/8]}-icon`).attr("src", `https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`)
            $(`#day-${dayNumber[i/8]}-temp`).text(`Temperature: ${Math.round(response.list[i].main.temp)} °F`)
            $(`#day-${dayNumber[i/8]}-humidity`).text(`Humidity: ${response.list[i].main.humidity}%`)
            $(`#day-${dayNumber[i/8]}-wind`).text(`Wind Speed: ${response.list[i].wind.speed} MPH`)     
        }

        $.ajax ({  
            url: queryURL_UVI,
            method: "GET"
        }) 
        .then (function (response) {
            $(`#day-1-uvi`).text(`UVI: ${response.value}`)
            if (response.value < 3) {
                $(`#day-1-uvi`).attr("class", "bg-green")
            }
            else if (response.value < 6) {
                $(`#day-1-uvi`).attr("class", "bg-yellow")
            }
            else {
                $(`#day-1-uvi`).attr("class", "bg-red")
            }
        }) 

        $.ajax ({  
            url: queryURL_UVI_forecast,
            method: "GET"
        }) 
        .then (function (response) {
            for (i=0; i < response.length; i++) {
                $(`#day-${i+2}-uvi`).text(`UVI: ${response[i].value}`)
                if (response[i].value < 3) {
                    $(`#day-${i+2}-uvi`).attr("class", "bg-green")
                }
                else if (response[i].value < 6) {
                    $(`#day-${i+2}-uvi`).attr("class", "bg-yellow")
                }
                else {
                    $(`#day-${i+2}-uvi`).attr("class", "bg-red")
                }
            }
        }) 
    })
}

$("#search-button").click(function () {
    var currentCity = $("#city-input").val()
    $("#city-input").val("")
    previousCities.unshift(currentCity)
    localStorage.setItem("city-names", previousCities)
    showWeather()
    getStoredCities()
})

$("#city-buttons").click('.city-button', function () {
    var clickedButton = $(this).attr("data-city")
    var index = previousCities.indexOf(clickedButton)
    previousCities.unshift(previousCities.splice(index, 1)[0])
    localStorage.setItem("city-names", previousCities)
    showWeather()
    getStoredCities()
})

$("#clear-storage").click(function(){
    localStorage.clear()
    location.reload()
});

showWeather()
getStoredCities()