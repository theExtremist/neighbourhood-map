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
            map = new google.maps.Map(document.getElementById('map'),
                {center: {lat: -37.882, lng: 145.163}, zoom: 13, mapTypeControl: false}
            );
            clearTimeout(googleRequestTimeout);
        }
    });
}

