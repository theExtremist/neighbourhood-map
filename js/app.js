var places = [];

//initialises the view model once the places and map data are received
$.when(getCurrentLocation()).done(function() {
    $.when(getPlaces(), initMap()).done(function() {
            ko.applyBindings(new ViewModel());
    });

});


//A place object stores self-explanatory information about a location
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
    //initialise variables
    var self = this;
    self.index = 0;
    self.allLocations = [];
    self.locations = ko.observableArray(self.allLocations);

    //popilate the allLocations array with places to display
    places.forEach(function (p) {
        newPlace = new place(p); //add var
        self.allLocations.push(newPlace);
        newPlace.setMarker(addMarker(p, map));
    });

    //the filter variable is bound to the search text box and is used to capture the search criteria
    //from the user
    this.filter = ko.observable();

    //the filter locations function subscribes to the filter and filters locations as the search
    //text box is updated by the user. This code is adapted from a W3C example
    this.filterLocations = this.filter.subscribe(function (filter) {
        self.uCasefilter = self.filter().toUpperCase();
        self.locations((self.allLocations.filter(filtration)));

        for (i=0; i < self.allLocations.length; i++) {
            if (self.locations.indexOf(self.allLocations[i]) > -1) {
                self.allLocations[i].marker.setMap(map);
            } else {
                self.allLocations[i].marker.setMap(null);
            }
        }

    })

    //helper function to filter contents of the locations array
    function filtration (location) {
        return (location.name().toUpperCase().indexOf(self.uCasefilter) > -1) ? true : false;
    }

    // place selected by the user
    currentPlace = ko.observable();

    // Call the relevant functions to:
    // set current place when the user selects a place from the drawer menu or clicks on a marker
    // retrieve photos from flicker
    // open the infowindow and display the photos and address of the location
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

    // moves to the next flicker picture
    this.nextPic = function(){
        if (currentPlace().images) {
            self.index = (self.index >= currentPlace().images.length - 1) ? 0 : self.index + 1;
            currentPlace().currentImage(currentPlace().images[self.index].url_q);
        }
    }

};

// opens the drawer menu
function toggleNav() {
  document.getElementById("myNav").classList.toggle("open");
};

var vm = new ViewModel();


