

$(document).ready(function() {
    var APIkey = '&APPID=8a92aa9e92769f41810f8df950d335b0';
    var lat = 0;
    var lon = 0;
    var coords = {lat: 0, lon: 0};
    getCoords();
  
    function getCoords () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(weatherRequest);
        } else {
            alert('Your browser does not support geolocation!');
        }
    };

    function weatherRequest(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude; 
        coords.lat = lat;
        coords.lon = lon;
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + coords.lat + '&lon=' + coords.lon + APIkey, function( json ) {
            var temp = (json.main.temp * (9/5)) - 459.67;
            console.log(json);
            if (temp > 45) {
                $('#warm').removeClass('hidden');
            } else {
                $('#cold').removeClass('hidden');
            };
            $("div#temp").append(String(temp.toFixed(2)) + " degrees Fahrenheit in " + json.name);
        });

    };
});