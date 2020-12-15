var APIkey = "9526c3c911969b66bd8db72a323046c5"
var cityName = "Denver"

var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIkey}&units=imperial`

$.ajax ({  
    url: queryURL,
    method: "GET"
}) 
.then (function (response) {
    console.log (response)
})

