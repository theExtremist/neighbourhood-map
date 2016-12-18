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
};


var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray([]);

    places.forEach(function (p) {
        newPlace = new place(p); //add var
        self.locations.push(newPlace);
        newPlace.setMarker(addMarker(p, map));
    });

    currentPlace = ko.observable(this.locations()[0]);

    this.setPlace = function(aPlace){
        currentPlace(aPlace);
        activate(aPlace);
        console.log(currentPlace().name());
        aPlace.name("D");
    };

    ko.applyBindingsToNode(document.getElementById("test"),{text: currentPlace().name});
};


function activate(aPlace){

    if (!aPlace.images) {
        $.when(getFlicker(aPlace)).done(function(){
            // console.log(aPlace.images());
        });
    }

    toggleBounce(aPlace.marker);
    displayInfo(aPlace);
};



function toggleNav() {
  document.getElementById("myNav").classList.toggle("open");
};
