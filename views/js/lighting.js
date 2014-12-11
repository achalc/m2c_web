$(function() {
      // body...
        $('form[name="time"] input').click(function() {
          var timesURL = "http://api.geonames.org/timezoneJSON?lat=40.4410630&lng=-79.9423120&username=achannar";
          $.getJSON(timesURL, function(data) {
            var sunrise = data.sunrise;
            var sunset = data.sunset;
            var displayText = "Sunrise: " + sunrise + "<br/> Sunset: " + sunset;
            $("#timeResp").html(displayText);
          }); //getJSON
        }); // click 
        var currentTime = new Date(); 
        document.getElementById('dateOn').value = currentTime;
        document.getElementById('dateOff').value = currentTime;
    }); //onReady

    $(function() {
      $('button').click(function() {
        $("#toggle").fadeOut("slow");
      });
    });
    
    function clickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "This button has been clicked " + localStorage.clickcount + " time(s).";
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}