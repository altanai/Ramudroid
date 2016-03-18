 var cameraOutput = document.getElementById("remote-video");
 var poi = [];
 var maxDistance = 0;

/* function gotCameraStream(stream) {
      var source;
     if (window.webkitURL) {
	 source = window.webkitURL.createObjectURL(stream);
	 cameraOutput.autoplay = true;
     } else {
	 source = stream; 
     }
     if (cameraOutput.mozSrcObject !== undefined) {
	 cameraOutput.mozSrcObject = source;
     } else {
	 cameraOutput.src = source;
     }
     cameraOutput.play();     
 }

 function errorWithCamera(error) {
     document.getElementById("error").appendChild(document.createTextNode(error));
 }*/

 var here;

 function gotPosition(lat,long) {
    //here = {"latitude":pos.coords.latitude,"longitude":pos.coords.longitude};
    here={"latitude": lat ,"longitude":long};

	var data = [{
                    latitude: 90,
                    longitude: 0,
                    label: "North Pole"
                },
                {
                    latitude: -90,
                    longitude: 0,
                    label: "South Pole"
                },
                {
                    latitude: 48.85825,
                    longitude: 2.2945,
                    label: "Tour Eiffel"
                },
                {
                    latitude: 12.972702,
                    longitude:  77.618915,
                    label: "MGRoad"
                }];
/*
,
                {
                    latitude:12.972604, 
                    longitude: 77.639457,
                    label:"Indiranager"
                }
*/
	 for (var i = 0 ; i < data.length; i++) {
	    var p = projectedPOI(here,data[i]);
        maxDistance = Math.max(maxDistance, p.distance);
	    poi.push(p);
	 }
	 for (var i =0 ; i<poi.length; i++) {
	     // Let's calculate the position on our overlay canvas based on logarithmic scale of distance
	    poi[i].y = 240 - Math.log(poi[i].distance) / Math.log(Math.pow(maxDistance, 1/ (240-15)));
	 }
  	 drawPOIInfo();


 }

/* navigator.getUserMedia || (navigator.getUserMedia = navigator.mozGetUserMedia ||
 navigator.webkitGetUserMedia || navigator.msGetUserMedia);

 if (navigator.getUserMedia) {
    navigator.getUserMedia({video:true, toString: function(){return 'video';}}, gotCameraStream, errorWithCamera);     
 }
*/

 var ctx = document.getElementById("overlay").getContext("2d");
 ctx.textAlign = "center";
 ctx.textBaseline = "middle";
 ctx.font="15px Arial";
 ctx.fillStyle = "white";
 ctx.strokeStyle = "white";

 var alpha = 0;
 var orientationLogger ;
 var animation;


function drawPOIInfo() {
   document.getElementById('orientation').innerHTML = alpha;
   ctx.clearRect(0,0,320,240);
   for (var i =0 ; i<poi.length; i++) {
     // Based on direction of POI
     var x = 160 + ((360 + alpha - poi[i].angle) % 360)*16/9;

     var y = poi[i].y;
     ctx.beginPath();
     ctx.moveTo(160,260);
     ctx.lineTo(x,y);
     ctx.stroke();
     ctx.font="10px Arial";
     ctx.fillText(Math.floor(poi[i].distance / 100) / 10 + 'km',160 + (x - 160) / 2, 240 + (y - 240)/2);
     ctx.font="15px Arial";
     ctx.fillText(poi[i].label,x,y);
   }
   animation = requestAnimationFrame(drawPOIInfo);
}

 window.addEventListener("deviceorientation", function(e) {
     alpha = (e.alpha + 180) % 360;
 });






//navigator.geolocation.getCurrentPosition(gotPosition);
 
var dataArray=[];
dataArray=arrData;
/*dataArray = arrData.map(function(item){
    return item.splice(6,2);
});
console.log(dataArray.length);*/

for(var x=1 ; x< dataArray.length ; x++ ){
    if(precision(dataArray[x][6]) > 4 || precision(dataArray[x][7])>4){
        gotPosition(dataArray[x][6],dataArray[x][7]);
        //console.log("here got poition " ,dataArray[x]);
    }
}


function precision(a) {
  if (!isFinite(a)) return 0;
  var e = 1, p = 0;
  while (Math.round(a * e) / e !== a) { e *= 10; p++; }
  return p;
}