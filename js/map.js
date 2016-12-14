var map;
var pos = {lat: -37.8136, lng: 144.9631};

function initMap() {
    console.log("entering init map");

    var googleRequestTimeout = setTimeout(function () {
        $("body").prepend("We cannot access google maps at the moment. Please try again later");
    }, 5000);

    var url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDhXe13Q7PPa0_gmdT9LLWDtsZm0dV4Z15"
    return $.ajax( {
        url: url,
        dataType: "script",
        success: function(response) {
            map = new google.maps.Map(document.getElementById('map'),
                {center: pos, zoom: 13, mapTypeControl: false}
            );
            clearTimeout(googleRequestTimeout);
        }
    });
};


function addMarker(place, map){
    var marker = new google.maps.Marker({position: place.location, map: map});
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){
            marker.setAnimation(null);
        }, 2100);
    };
};


function getCurrentLocation() {

    console.log("Entering getCurrentLocation");

    var def = $.Deferred();
    //default to melbourne if there is no geolocation or the user declines

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        pos = {lat: position.coords.latitude,lng: position.coords.longitude};
        def.resolve();
        }, function() {
            def.resolve();
        });
    } else {
        def.resolve();
    };

    return def.promise();
};
