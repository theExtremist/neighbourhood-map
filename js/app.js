var places = [];


$.when(getCurrentLocation()).done(function() {
    $.when(getPlaces(), initMap()).done(function() {
            ko.applyBindings(new ViewModel());
    });

});



var place = function(data) {
    this.name = ko.observable(data.name);
    this.location = ko.observable(data.location);
    this.currentImage = ko.observable("");

    this.setMarker = function(marker) {
        this.marker = marker;
        this.marker.set("parent", this);
    };
};


var ViewModel = function() {
    var self = this;
    self.index = 0;
    self.locations = ko.observableArray([]);

    places.forEach(function (p) {
        newPlace = new place(p); //add var
        self.locations.push(newPlace);
        newPlace.setMarker(addMarker(p, map));
    });

    currentPlace = ko.observable(self.locations()[1]);


    this.setPlace = function(aPlace){
        self.index = 0;
        currentPlace(aPlace);

        if (!currentPlace().images) {
            $.when(getFlicker(currentPlace())).done(function(){
                currentPlace().currentImage(currentPlace().images[0].url_q);
                displayInfo(currentPlace());
            });
        } else {
            displayInfo(currentPlace());
        }
    };

    this.nextPic = function(){
        if (currentPlace().images) {
            self.index = (self.index == currentPlace().images.length - 1) ? 0 : self.index + 1;
            currentPlace().currentImage(currentPlace().images[self.index].url_q);
        }
    }

};


function toggleNav() {
  document.getElementById("myNav").classList.toggle("open");
};

var vm = new ViewModel();
