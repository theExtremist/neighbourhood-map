var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
                              center: {lat: -37.882, lng: 145.163}, zoom: 13,
                              mapTypeControl: false
    });

    ko.applyBindings(new ViewModel());
}


function addMarker(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    var marker = new google.maps.Marker({
        position: location,
        label: "X",
        map: map
    });
}
