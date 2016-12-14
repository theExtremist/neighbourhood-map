var map;

var googleRequestTimeout = setTimeout(function (){
    $("body").prepend("We cannot access google maps at the moment. Please try again later");
}, 5000);


function initMap() {
    url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDhXe13Q7PPa0_gmdT9LLWDtsZm0dV4Z15"
    return $.ajax({
        url: url,
        dataType: "script",

        success: function(response) {
            var currentLocation = getCurrentLocation();
            console.log(currentLocation);
            map = new google.maps.Map(document.getElementById('map'),
                // {center: {lat: -37.882, lng: 145.163}, zoom: 13, mapTypeControl: false}
                {center: currentLocation, zoom: 13, mapTypeControl: false}
            );
            clearTimeout(googleRequestTimeout);
        }
    });
}


function addMarker(place, map){
    var marker = new google.maps.Marker({position: place.location, map: map});
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){
            marker.setAnimation(null);
        }, 2100);
    }
}


function getCurrentLocation(){

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        // map.setCenter(pos);
        console.log(pos);
        return pos;
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }
