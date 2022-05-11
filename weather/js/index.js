$(document).ready(function(){
  getWeather();
});

var tempKelvin = 0;
var tempCelsius;
var tempFahrenheit;

/* Tempurature conversions
**
**          From	      To Fahrenheit	            To Celsius
** Fahrenheit (F)	      F	                        (F - 32) * 5/9
** Celsius    (C or o)	(C * 9/5) + 32	          C
** Kelvin     (K)	      (K - 273.15) * 9/5 + 32	  K - 273.15
**
*/

function getWeather() {
  
$.getJSON("http://ip-api.com/json", function(data) {
  var apiURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + data.lat  + "&lon=" + data.lon + "&appid=1c250652f11a391bd3b14915629f499a";
  $.getJSON(apiURL, function(data) {

    $("#user-loc").html(data.name);
    $("#weather-icon img").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"); 
    $("#weather-main").html(data.weather[0].main);
    $("#weather-description").html(data.weather[0].description);
    tempKelvin = data.main.temp;
    tempCelsius = tempKelvin - 273.15;
    tempFahrenheit = (tempKelvin - 273.15) * 9 / 5 + 32;
    $("#temp").html(Math.round(tempFahrenheit));
    $("#app-init").css("display", "none");
  })
});
}

$("#temp-unit").click( function() {
  if( " F " === $("#temp-unit").text() ) {
    $("#temp").html(Math.round(tempCelsius));
    $("#temp-unit").html(" C ");
  } else {
    $("#temp").html(Math.round(tempFahrenheit));
    $("#temp-unit").html(" F ");
  }
});