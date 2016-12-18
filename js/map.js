var map;
var pos = {lat: -37.8136, lng: 144.9631};
var infowindow;

function initMap() {
    console.log("entering init map");

    var googleRequestTimeout = setTimeout(function () {
        $("body").prepend("We cannot access google maps at the moment. Please try again later");
    }, 5000);

    var url = "https://maps.googleapis.com/maps/api/js?v=3.20&key=AIzaSyDhXe13Q7PPa0_gmdT9LLWDtsZm0dV4Z15"
    return $.ajax( {
        url: url,
        dataType: "script",
        success: function(response) {
            map = new google.maps.Map(document.getElementById('map'),
                {center: pos, zoom: 13, mapTypeControl: false, disableDefaultUI: true}
            );
            initialiseIW();
            clearTimeout(googleRequestTimeout);
        }
    });
};


function addMarker(place, map) {
    var marker = new google.maps.Marker({position: place.location, map: map});
    marker.addListener('click', function(){
            activate(this.parent);
        }
    );
    return marker;
};


function toggleBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
        marker.setAnimation(null);
    }, 2100);
};


function displayInfo(aPlace) {
    infowindow.open(map, aPlace.marker);
    $('.info-title').text(aPlace.name());
    $('.info-image').attr("src", "test.jpg");
    $('.info-address').text(aPlace.location().formattedAddress);
};


function initialiseIW() {

    CONTENTSTRING = '<div class="info-content">\
                     <div class="info-title"></div>\
                     <img class="info-image">\
                     <span class="info-address"></span>\
                </div>';


    infowindow = new google.maps.InfoWindow();
    infowindow.setContent(CONTENTSTRING);

    google.maps.event.addListener(infowindow, 'domready', function() {
        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();
        var iwCloseBtn = iwOuter.next();

        iwCloseBtn.css({right: '45px', top: '15px'});
        iwCloseBtn.siblings(2).css({right: '45px', top: '10px'});

        iwBackground.children(':nth-child(2)').css({'display' : 'none'});
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    });
}


function getCurrentLocation() {

    console.log("Entering getCurrentLocation");

    var def = $.Deferred();
    //default to melbourne if there is no geolocation or the user declines

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //     pos = {lat: position.coords.latitude,lng: position.coords.longitude};
    //     def.resolve();
    //     }, function() {
    //         def.resolve();
    //     });
    // } else {
        def.resolve();
    // };

    return def.promise();
};

