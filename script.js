// Always start with document ready
$(document).ready(function () {

  //1. take the user input and process it with the api key/ajax
  //2. add that user input to search hisotry (localstorage and appending a new div)
  //3. 


  let search = $('.search-btn')
  // create an event listener that will populate the page with data from the API about the user's input
  search.on('click', function (event) {
    event.preventDefault();
    // Here we are building the URL we need to query the database
    let city = $('.user-input').val(); // here we need to make the city the user input 
    console.log(city);
    let APIKey = '8df56de68fc674d0574c7d70462e9457' // link your specific api key
    // declare a variabel containing the entire api, search query, and key
    let urlBase = "http://api.openweathermap.org/data/2.5/"
    let currentWeatherURL = urlBase + "weather?q=" + city + "&appid=" + APIKey;
    console.log(currentWeatherURL);
    let lon;
    let lat;
    $.ajax({
      url: currentWeatherURL,
      method: "GET"
    }).then(function (response) {
      let faren = Math.floor(response.main.temp - 273.5) * 1.80 + 32
      let cityName = $('<div>' + city + '</div>');
      let tempDiv = $('<div> Temperature: ' + faren + '</div>')
      let windDiv = $('<div> Wind Speed: ' + response.wind.speed + '</div>')
      let humDiv = $('<div> Humidity: ' + response.main.humidity + "%" + "</div>")
      lon = response.coord.lon;
      lat = response.coord.lat;
      $('.temp').append(cityName, windDiv, humDiv, tempDiv);
      //UV INDEX
      let uvURL = urlBase + "uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
      console.log(uvURL);
      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        let uvDiv = $('<div> UV Index: ' + response.value + "</div>");
        $('.temp').append(uvDiv);
      });
      let fiveDayURL = urlBase +"forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
      console.log(fiveDayURL);
      $.ajax({
        url: fiveDayURL,
        method: "GET"
      }).then(function (response) {
        let noonForecast =  response.list.filter(function(day) {
          return day.dt_txt.includes("12:00:00"); 
        });
        for (let day of noonForecast) {
      
          let fiveDiv = $('<div> Five Day Forecast: ' + day.main.humidity + "%" + "</div>");
          $('.five-day').append(fiveDiv);
        }
       ;
      });

    });
  });


});