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

 

	$p7= $_GET['p8'];
	
	if ( true) {
			
		echo($p7);		
		
		?> 
		
		<script>

		p7 = "<?php echo $p7; ?>";

	var data = 0;
	var request = new XMLHttpRequest();	
	request.open( "GET" , "ultrasonic.php?&p7=" + p7, true);
	request.send(null);

	request.onreadystatechange = function () {
		
		if (request.readyState == 4 && request.status == 200) {
		
			data = request.responseText;

			if ( !(data.localeCompare("obstruction")) ){
				
				alert("stopall");
				
				var request = new XMLHttpRequest();	
				request.open( "GET" , "testgpio.php?p0=0&p1=0&p2=0&p3=0&p4=0&p5=0&p6=0&p7=0", true);
				request.send(null);
	
				request.onreadystatechange = function () {
		
				if (request.readyState == 4 && request.status == 200) {
				
					data = request.responseText;
		
					if ( !(data.localeCompare("ok")) ){
						alert("stopped all");
					}
					
					/*
					else if ( !(data.localeCompare("1")) ) {
						alert(" undone ");
					}*/
		
					else if ( !(data.localeCompare("fail"))) {
						alert ("Something went wrong! - data local compare " );
						return ("fail");			
					}
					else {
						alert ("Something went wrong! - ready state change " );
						return ("fail"); 
					}
				}
		
				else if (request.readyState == 4 && request.status == 500) {
					alert ("server error");
					return ("fail");
				}
		
				else if (request.readyState == 4 && request.status != 200 && request.status != 500 ) { 
					alert ("Something went wrong!");
					return ("fail"); 
				}
				
			};
						
				return("stopall");
			}
			
			/*
			else if ( !(data.localeCompare("1")) ) {
				alert(" undone ");
			}*/

			else if ( !(data.localeCompare("fail"))) {
				alert ("Something went wrong! - data local compare " );
				return ("fail");			
			}
			else {
				alert ("Something went wrong! - ready state change " );
				return ("fail"); 
			}
		}

		else if (request.readyState == 4 && request.status == 500) {
			alert ("server error");
			return ("fail");
		}

		else if (request.readyState == 4 && request.status != 200 && request.status != 500 ) { 
			alert ("Something went wrong!");
			return ("fail"); 
		}
		
	};
	
		</script>
		
		<?php
	}
		
?>

</body>
</html>
