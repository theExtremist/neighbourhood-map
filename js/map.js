var map;
var pos = {lat: -37.8136, lng: 144.9631}; // default location: Melbourne, Australia
var infowindow; //Google maps infowindow


// initialises the map
function initMap() {
    var googleRequestTimeout = setTimeout(function () {
        $("#error").append("We cannot access google maps. Please try again later. <br>");
    }, 5000);

    var url = "https://maps.googleapis.com/maps/api/js?v=3.20&key=AIzaSyDhXe13Q7PPa0_gmdT9LLWDtsZm0dV4Z15";
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
}


// adds a marker to the map and set place as the parent of this marker
function addMarker(place, map) {
    var marker = new google.maps.Marker({position: place.location, map: map});

    marker.set("class", "gm-marker");
    marker.addListener('click', function(){
            vm.setPlace(this.parent);
        }
    );
    return marker;
}


//Makes the mark bounce for 2 secodnds
function toggleBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
        marker.setAnimation(null);
    }, 2100);
}


//displays the infowindow
//if the infowindow is not open, the contents of the infowindow are bound again
function displayInfo(aPlace) {
    var reBind = infowindow.getMap() == null;

    toggleBounce(aPlace.marker);
    infowindow.open(map, aPlace.marker);

    if (reBind){
        var wrapper = document.getElementById("iw-wrapper");
        ko.cleanNode(wrapper);
        ko.applyBindings(vm, wrapper);
    }
}


// the code used here is adapted from http://humaan.com/custom-html-markers-google-maps
// makes a number of modifications to the information window.
// finally a div is created and assigned to the infowindow with the relevant KO bindings
function initialiseIW() {
    infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(infowindow, 'domready', function() {
        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();
        var iwCloseBtn = iwOuter.next();

        iwCloseBtn.css({right: '45px', top: '15px'});
        iwCloseBtn.siblings(2).css({right: '45px', top: '10px'});

        iwBackground.children(':nth-child(2)').css({'display' : 'none'});
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    });

    var contentStr =
        '<div id = "iw-wrapper">\
          <div class="iw-content", data-bind="with: currentPlace()">\
              <div class="iw-title" data-bind="text: name"></div>\
              <img id="iw-image" data-bind="click: $parent.nextPic(), attr: {src: currentImage()}">\
              <div class="iw-address" data-bind="text: location().formattedAddress"></div>\
          </div>\
        </div>';

    infowindow.setContent(contentStr);
}


// Attempts to determine the current location
// if this fails, Melbourne, Australis is chosen as default location
function getCurrentLocation() {
    var def = $.Deferred();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        pos = {lat: position.coords.latitude,lng: position.coords.longitude};
        def.resolve();
        }, function() {
            def.resolve();
        });
    } else {
        def.resolve();
    }

    return def.promise();
}

