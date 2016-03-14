/*      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.964, lng: -122.015},
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.SATELLITE
        });
        map.setTilt(45);
      }*/

/**
 * @constructor
 * @implements {google.maps.MapType}
 */
/*function CoordMapType(tileSize) {
  this.tileSize = tileSize;
}

CoordMapType.prototype.maxZoom = 19;
CoordMapType.prototype.name = 'Tile #s';
CoordMapType.prototype.alt = 'Tile Coordinate Map Type';

CoordMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
  var div = ownerDocument.createElement('div');
  div.innerHTML = coord;
  div.style.width = this.tileSize.width + 'px';
  div.style.height = this.tileSize.height + 'px';
  div.style.fontSize = '10';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px';
  div.style.borderColor = '#AAAAAA';
  div.style.backgroundColor = '#E5E3DF';
  return div;
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 41.850, lng: -87.650},
    streetViewControl: false,
    mapTypeId: 'coordinate',
    mapTypeControlOptions: {
      mapTypeIds: ['coordinate', google.maps.MapTypeId.ROADMAP],
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    }
  });

  map.addListener('maptypeid_changed', function() {
    var showStreetViewControl = map.getMapTypeId() !== 'coordinate';
    map.setOptions({
      streetViewControl: showStreetViewControl
    });
  });

  // Now attach the coordinate map type to the map's registry.
  map.mapTypes.set('coordinate',
                   new CoordMapType(new google.maps.Size(256, 256)));
}
*/
