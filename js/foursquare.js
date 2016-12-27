// this function retrieves locations from Foursquare

function getPlaces() {
    console.log("entering 4 square");
    // build url
    // the resuls only display local events and art and entertainment venues
    // within a 1 kilometer radius
    var fourSquareUrl =  "https://api.foursquare.com/v2/venues/search?";
    fourSquareUrl += $.param({
        "ll"            : pos.lat + "," + pos.lng,
        "client_id"     : "1PH5RDBJLQSDHXMBR115JZ5P10RDQCJKFZQZCKCS4ZGDD1IZ",
        "client_secret" : "1RVTY1L5KPDRCUVUV2YBYN2LAMS3SEGEFDNAZDHGPQQ5MHP5",
        "v"             : "20161209",
        "limit"         : 20,
        // "categoryId"    : "4d4b7105d754a06373d81259,4d4b7104d754a06370d81259",
        // "radius"        : 1000,
    });

    return $.getJSON(
        fourSquareUrl,
        function(data) {
            results = data.response.venues;
            for (var i = results.length - 1; i >= 0; i--)
            {
                places.push({
                    "id"        : results[i].id,
                    "name"      : results[i].name,
                    "location"  : results[i].location,
                });
            }
        }
    ).error(function (e) {
        $("#error").append("We could contact Foursquare, please try again later <br>");
    });
}