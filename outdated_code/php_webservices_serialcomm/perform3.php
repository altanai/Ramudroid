<!DOCTYPE html>

<html>
    <head>
        <meta charset="utf-8" />
        <title>IOT</title>
        

    </head>
 
    <body style="background-color: white;">

	<?php

	    if (isset($_SERVER['HTTP_ORIGIN'])) {
	        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	        header('Access-Control-Allow-Credentials: true');
	        /*header('Access-Control-Max-Age: 86400');*/    
	    }

	    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

	        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
	            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

	        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
	            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

	        exit(0);
	    }

	    echo "Started CORS!";		
	
	?> 
		
	<script>
		

	var data = 0;
	var request = new XMLHttpRequest();	
	request.open( "GET" , "arduinoread.php", true);
	request.send(null);

	request.onreadystatechange = function () {
		
		if (request.readyState == 4 && request.status == 200) {
		
			data = request.responseText;
			consooe.log(data);

			if ( !(data.localeCompare("ok")) ){
				alert(data);
			}

			else {
				alert ("Something went wrong! - ready state change " );
				return ("fail"); 
			}
		}

		else if (request.readyState == 4 && request.status != 200 && request.status != 500 ) { 
			alert ("Something went wrong!");
			return ("fail"); 
		}
		
	};
	
	</script>
		

</body>
</html>
