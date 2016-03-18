var map;
var infowindow;


function initMap() {
  var myLatLng = {lat: 12.972778, lng: 77.639007};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: myLatLng
  });

  infowindow = new google.maps.InfoWindow(); 

    /*
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Ramudroid Location Map!'
    });*/
    var mapArray=arrData;
    
    /*
    mapArray = mapArray.map(function(item){
        return item.splice(6,2);
    });*/
    
    console.log(" ------------Map Array ---------------");
    console.log(mapArray[0]);
    console.log(mapArray[1]);

    for (var i = 1; i < mapArray.length; i++){
        var myLatlng = new google.maps.LatLng(mapArray[i][6], mapArray[i][7]);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent("<ul><li>Latitude " + mapArray[i][0] + "</li><li>Longitude " + mapArray[i][1] + "</li></ul>");
              infowindow.open(map, marker);
            };
        })(marker, i));  
    }

}
