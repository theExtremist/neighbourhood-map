

function CustomMarker(latlng, map, place) {
  console.log("this is CustomMarker");
  this.setMap(map);
  this.latlng = latlng;
  this.place = place;

}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {

  var self = this;

  var div = this.div;

  if (!div) {

    div = this.div = document.createElement('div');

    div.className = 'marker';

    div.style.position = 'absolute';
    div.style.cursor = 'pointer';
    div.style.width = '60px';
    div.style.height = '60px';
    div.style.background = 'white';




    google.maps.event.addDomListener(div, "click", function(event) {
      google.maps.event.trigger(self, "click");
    });

    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }

  var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

  if (point) {
    div.style.left = point.x + 'px';
    div.style.top = point.y + 'px';
  }

  ko.applyBindingsToNode(div,{text: this.place.name});

};

CustomMarker.prototype.remove = function() {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  }
};

CustomMarker.prototype.getPosition = function() {
  return this.latlng;
};