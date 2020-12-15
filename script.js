var APIkey = "9526c3c911969b66bd8db72a323046c5"
var cityName = "Denver"

var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`

$.ajax ({  
    url: queryURL,
    method: "GET"
}) 
.then (function (response) {
    console.log (`city name: ${response.city.name}`)
    var lat = (`${response.city.coord.lat}`)
    var lon = (`${response.city.coord.lon}`)
    
    var queryURL_UVI = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`

    var queryURL_UVI_forecast = `http://api.openweathermap.org/data/2.5/uvi/forecast?lat=${lat}&lon=${lon}&cnt=3&appid=${APIkey}`

    for (var i = 0; i < response.list.length; i+=8) {
        var date = response.list[i].dt_txt
        var date_formatted = date.split(" ")
        console.log (`date: ${date_formatted[0]}`)
        console.log (`icon representation of weather conditions: ${response.list[i].weather[0].icon}`)
        console.log (`temperature: ${response.list[i].main.temp}`)
        console.log (`humidity: ${response.list[i].main.humidity}`)
        console.log (`wind speed: ${response.list[i].wind.speed}`)     
    }

    $.ajax ({  
        url: queryURL_UVI,
        method: "GET"
    }) 
    .then (function (response) {
        console.log (`UV index 1: ${response.value}`)
        $.ajax ({  
            url: queryURL_UVI_forecast,
            method: "GET"
        }) 
        .then (function (response) {
            for (i=0; i < response.length; i++) {
                console.log (`UV index ${i+2}: ${response[i].value}`)
            }
        }) 
    }) 
})

