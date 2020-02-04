// Always start with document ready
$(document).ready(function () {
let APIKey = '166a433c57516f51dfab1f7edaed8413';

//1. take the user input and process it with the api key/ajax
//2. add that user input to search hisotry (localstorage and appending a new div)
//3. 

// Here we are building the URL we need to query the database
let city = $('.user-input').text(); // here we need to make the city the user input 
let APIKey = '8df56de68fc674d0574c7d70462e9457'
let queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&" + city + "&appid=" + APIKey; // br teakhe variable out 
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);
    // Create CODE HERE to transfer content to HTML
    let cityName = $('<div>') + city;
    let tempDiv = $('<div> Temperature: ' + response.wind.speed + '</div>')
    let windDiv = $('<div> Wind Speed: ' + response.wind.speed + '</div>')
    let humDiv = $('<div> Humidity: ' + response.main.humidity + "</div>")
    let tempDiv = $('<div> Temperature: ' + response.main.temp + "</div>")
    $('.temp').append(cityName, windDiv, humDiv, tempDiv);
});
});