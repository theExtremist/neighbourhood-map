var places = [];

function getPlaces(){

    //build url
    //the resuls only display local events and art and entertainement venues
    // within a 1kilometer radius
    var fourSquareUrl =  "https://api.foursquare.com/v2/venues/search?";
    fourSquareUrl += $.param({
        "ll"            : "-37.882,145.163",
        "client_id"     : "1PH5RDBJLQSDHXMBR115JZ5P10RDQCJKFZQZCKCS4ZGDD1IZ",
        "client_secret" : "1RVTY1L5KPDRCUVUV2YBYN2LAMS3SEGEFDNAZDHGPQQ5MHP5",
        "v"             : "20161209",
        "limit"         : 10,
        "categoryId"    : "4d4b7105d754a06373d81259,4d4b7104d754a06370d81259",
        "radius"        : 1000,
    });

    $.getJSON(
        fourSquareUrl,
        function(data)
        {
            results = data.response.venues;
            for (var i = results.length - 1; i >= 0; i--)
            {
                places.push({
                    "id"        : results[i].id,
                    "name"      : results[i].name,
                    "location"  : results[i].location,
                });
            };
            initMap();
        }
    ).error(function (e)
        {
            return e;
        }
    );
};




var place = function(data) {
    this.name = ko.observable(data.name);
    this.location = ko.observable(data.location);
}



var ViewModel = function() {
    var self = this;

    this.locations = ko.observableArray([]);

    places.forEach(function (p) {
        self.locations.push(new place(p));
        new google.maps.Marker({position: p.location, label: p.name, map: map});
    });
}



function toggleNav() {
  document.getElementById("myNav").classList.toggle("open");
}
