CONTENTSTRING = '<div id="info-content"> <img id="info-image" src="https://www.flickr.com/photos/teekay-72/7651549856"> Theirry</div>'


var places = [];

$.when(getCurrentLocation()).done(function() {
    $.when(getPlaces(), initMap()).done(function() {
        ko.applyBindings(new ViewModel());
    });
});


var place = function(data) {
    this.name = ko.observable(data.name);
    this.location = ko.observable(data.location);

    this.setMarker = function(marker) {
        this.marker = marker;
        this.marker.set("parent", this);
    };

    this.contentString = ko.observable(CONTENTSTRING);
};


var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray([]);

    places.forEach(function (p) {
        newPlace = new place(p);
        self.locations.push(newPlace);
        newPlace.setMarker(addMarker(p, map));
    });


    this.setPlace = function(aPlace){
        activate(aPlace);
    };
};



function activate(aPlace){

    if (!aPlace.images) {
        $.when(getFlicker(aPlace)).done(function(){
            console.log(aPlace.images());
        });
    }

    toggleBounce(aPlace.marker);
    displayInfo(aPlace);
};



function toggleNav() {
  document.getElementById("myNav").classList.toggle("open");
};
