// 1dac1d1953756ef7
function getFlicker(aPlace) {
    // console.log("entering flicker");

    // build url
    // the resuls only display local events and art and entertainement venues
    // within a 1kilometer radius
    var url =  "https://api.flickr.com/services/rest/?";
    url += $.param({
        "method"        : "flickr.photos.search",
        "api_key"       : "4801506c6e7be98db3863019b62fc461",
        "lat"           : aPlace.location().lat,
        "lon"           : aPlace.location().lng,
        "radius"        : 0.005,
        "format"        : "json",
        "nojsoncallback": 1,
        "page"          : 1,
        "per_page"      : 10,
        "extras"        : "url_q",
    });

    return $.getJSON(
        url,
        function(data) {
            aPlace.images = data.photos.photo;
        }
    ).error(function (e) {
        $("body").prepend("We could not retrieve places from foursquare, please try again later");
        console.log("We could not retrieve places from foursquare, please try again later");
    });
};