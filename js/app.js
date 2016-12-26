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
    self.allLocations = [];
    self.locations = ko.observableArray(self.allLocations);

    places.forEach(function (p) {
        newPlace = new place(p); //add var
        self.allLocations.push(newPlace);
        newPlace.setMarker(addMarker(p, map));
    });

    this.filter = ko.observable();

    this.filterLocations = this.filter.subscribe(function (filter) {
        self.filter(self.filter().toUpperCase());
        self.locations((self.allLocations.filter(filtration)));

        for (i=0; i < self.allLocations.length; i++) {
            if (self.locations.indexOf(self.allLocations[i]) > -1) {
                self.allLocations[i].marker.setMap(map);
            } else {
                self.allLocations[i].marker.setMap(null);
            }
        }

    })

    function filtration (location) {
        return (location.name().toUpperCase().indexOf(self.filter()) > -1) ? true : false;
    }


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
            self.index = (self.index >= currentPlace().images.length - 1) ? 0 : self.index + 1;
            currentPlace().currentImage(currentPlace().images[self.index].url_q);
        }
    }

};


function toggleNav() {
  document.getElementById("myNav").classList.toggle("open");
};

var vm = new ViewModel();


