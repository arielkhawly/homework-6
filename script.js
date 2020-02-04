// Always start with document ready
$(document).ready(function () {

  //1. take the user input and process it with the api key/ajax
  //2. add that user input to search hisotry (localstorage and appending a new div)
  //3. 


  let search = $('.search-btn')
  // create an event listener that will populate the page with data from the API about the user's input
  search.on('click', function(event)  {
    event.preventDefault();
    // Here we are building the URL we need to query the database
    let city = $('.user-input').val(); // here we need to make the city the user input 
    console.log(city);
    let APIKey = '8df56de68fc674d0574c7d70462e9457' // link your specific api key
    // declare a variabel containing the entire api, search query, and key
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      // Create CODE HERE to Log the queryURL
      console.log(queryURL);
      // Create CODE HERE to log the resulting object
      console.log(response);
      // Create CODE HERE to transfer content to HTML
      let faren = Math.floor(response.main.temp - 273.5) * 1.80 + 32
      let cityName = $('<div>' + city + '</div>');
      let tempDiv = $('<div> Temperature: ' + faren + '</div>')
      let windDiv = $('<div> Wind Speed: ' + response.wind.speed + '</div>')
      let humDiv = $('<div> Humidity: ' + response.main.humidity + "</div>")
      $('.temp').append(cityName, windDiv, humDiv, tempDiv);
    //5 day forecast
    let fiveDayURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    search.on('click', function(event)  {
      event.preventDefault();
      // Here we are building the URL we need to query the database
      let city = $('.user-input').val(); // here we need to make the city the user input 
      console.log(city);
      let APIKey = '8df56de68fc674d0574c7d70462e9457' // link your specific api key
      // declare a variable containing the entire api, search query, and key
      let queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
  
        // Create CODE HERE to Log the queryURL
        console.log(queryURL);
        // Create CODE HERE to log the resulting object
        console.log(response);
        // Create CODE HERE to transfer content to HTML
    });
  });


});