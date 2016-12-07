function toggleNav() {
  document.getElementById("myNav").classList.toggle("open");
}

var initialPlaces = [
            {
                "name"      : "Station",
                "location"  : {lat: -37.8726662, lng: 145.1232088,}
            },

            {
                "name"      : "YOMG",
                "location"  : {lat: -37.8734595, lng: 145.091393}
            },
];


var place = function(data) {
    this.name = ko.observable(data.name);
    this.location = ko.observable(data.location);
}


var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray([]);

       initialPlaces.forEach(function (p) {
       self.locations.push(new place(p))
    });
}


ko.applyBindings(new ViewModel());