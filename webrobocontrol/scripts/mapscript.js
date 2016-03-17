var map;
var infowindow;


function initMap() {
  var myLatLng = {lat: 12.972778, lng: 77.639007};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 20,
    center: myLatLng
  });

  infowindow = new google.maps.InfoWindow(); 

  /*  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Ramudroid Location Map!'
    });*/
    var dataArray=[];

    dataArray = arrData.map(function(item){
        return item.splice(6,2);
    });
  for (var i = 0; i < dataArray.length; i++){
    var myLatlng = new google.maps.LatLng(dataArray[i][0], dataArray[i][1]);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent("<ul><li>Latitude " + dataArray[i][0] + "</li><li>Longitude " + dataArray[i][1] + "</li></ul>");
      infowindow.open(map, marker);
    };
  })(marker, i));  
  }

}


function dropPins(dataArray, map){

/*  for (var i = 0; i < dataArray.length; i++){
    var myLatlng = new google.maps.LatLng(dataArray[i][0], dataArray[i][1]);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
    return function() {
      infowindow.setContent("<ul><li>Latitude " + dataArray[i][0] + "</li><li>Longitude " + dataArray[i][1] + "</li></ul>");
      infowindow.open(map, marker);
    };
  })(marker, i));  
  }*/
}

