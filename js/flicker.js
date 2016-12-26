// 1dac1d1953756ef7

// retrieves a maximum of 10 pictures for a given position within a 0.05km radius
// if no pictures are available, a default photo is displayed.
function getFlicker(aPlace) {

    //build query url
    var url =  "https://api.flickr.com/services/rest/?";
    url += $.param({
        "method"        : "flickr.photos.search",
        "api_key"       : "4801506c6e7be98db3863019b62fc461",
        "lat"           : aPlace.location().lat,
        "lon"           : aPlace.location().lng,
        "radius"        : 0.05,
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
            if (aPlace.images.length == 0){
                aPlace.images[0] = {url_q: '/img/default.png'};
            }
        }
    ).error(function (e) {
        $("#error").text("We cannot load pictures from Flickr, please try again later");
        return;
    });
};