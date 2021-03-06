// Always start with document ready
$(document).ready(function () {

  //1. take the user input and process it with the api key/ajax
  //2. add that user input to search hisotry (localstorage and appending a new div)
  //3. 


  let search = $('.search-btn')
  // create an event listener that will populate the page with data from the API about the user's input
  search.on('click', function (event) {
    event.preventDefault();
    $('.temp').html('');
    $('.five-day').html('');
    // Here we are building the URL we need to query the database
    let city = $('.user-input').val(); // here we need to make the city the user input 
    let citySearch = $('<button>' + city + '</button>').addClass('history-button');

    citySearch.on('click', function(event) {
      event.preventDefault();
      $('.temp').html('');
      $('.five-day').html('');
      getWeather(citySearch.text());
    });

    $('.search-history').append(citySearch);
    getWeather(city);
  });


});

function getWeather(city) {
  let APIKey = '8df56de68fc674d0574c7d70462e9457'; // link your specific api key
  // declare a variable containing the entire api, search query, and key
  let urlBase = "https://api.openweathermap.org/data/2.5/";
  let currentWeatherURL = urlBase + "weather?q=" + city + "&units=imperial&appid=" + APIKey;
  // declare var for latitiude and longitude, bc they will be needed for other api calls
  let lon;
  let lat;
  //use ajax to call your object
  $.ajax({
    url: currentWeatherURL,
    method: "GET"
  }).then(function (response) {
    // declare a var that converts kelvin to farenheight
    //Create divs for city name, temp, wind, and humidity
    let cityName = $('<h1' + city + '<img src=\"http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png\"/> </h1>');
    cityName.addClass('capitalize');
    let tempDiv = $('<div> Temperature: ' + response.main.temp + '</div>'); // replace response with your farenheight var
    let windDiv = $('<div> Wind Speed: ' + response.wind.speed + 'MPH </div>');
    let humDiv = $('<div> Humidity: ' + response.main.humidity + "%" + "</div>");
    // reassign values to these var, which will be plugged into the following api calls
    lon = response.coord.lon;
    lat = response.coord.lat;
    // append your new divs to the html
    $('.temp').append(cityName, windDiv, humDiv, tempDiv);
    //UV INDEX
    // the lat and long vars will still work because you are inside the same event listener
    let uvURL = urlBase + "uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon; // here is where you will plug in your vars. 
    $.ajax({
      url: uvURL,
      method: "GET"
    }).then(function (response) {
      let uvDiv = $('<div> UV Index: ' + response.value + "</div>"); // create a new div for UV 
      $('.temp').append(uvDiv); // append it to the same temp div as the others
    });
    //Five Day Forecast
    let fiveDayURL = urlBase + "forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
    $.ajax({
      url: fiveDayURL,
      method: "GET"
    }).then(function (response) {
      let noonForecast = response.list.filter(function (day) {
        return day.dt_txt.includes("12:00:00"); // have the function return from the 'day' object, the selected array, and have it include a selected string
      });
      for (let day of noonForecast) { // create a for loop to pull each of the below from noonforecast w/ the designated inclusion
        let fiveDiv = $('<div></div>').addClass('col');
        let fiveDayDate = $('<div>' + moment(day.dt_txt).format('M/D/YYYY') + '</div>');
        let fiveTemp = $('<div> Temp:' + day.main.temp + "</div>");
        let fiveHumidity = $('<div>Humidity:' + day.main.humidity + '% </div>');
        let iconImage = $('<img src=\"http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png\"/>');
        fiveDiv.append(fiveDayDate, iconImage, fiveTemp, fiveHumidity);
        $('.five-day').append(fiveDiv);
      }
      ;
    });
  });
}
