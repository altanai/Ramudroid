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
	echo " Getting parameter values ";
	
	$p0= $_GET['p1'];
	$p1= $_GET['p2'];
	$p2= $_GET['p3'];
	$p3= $_GET['p4'];
	$p4= $_GET['p5'];
	$p5= $_GET['p6'];
	$p6= $_GET['p7'];
	$p7= $_GET['p8'];
	
	if ( true) {
			
		echo($p0.$p1.$p2.$p3.$p4.$p5.$p6.$p7);		
		
		?> 
		
		<script>
		
		p0 = "<?php echo $p0; ?>";
		p1 = "<?php echo $p1; ?>";
		p2 = "<?php echo $p2; ?>";
		p3 = "<?php echo $p3; ?>";
		p4 = "<?php echo $p4; ?>";
		p5 = "<?php echo $p5; ?>";
		p6 = "<?php echo $p6; ?>";
		p7 = "<?php echo $p7; ?>";

	var data = 0;
	var request = new XMLHttpRequest();	
	request.open( "GET" , "testgpio.php?p0="+p0+"&p1=" + p1 + "&p2=" + p2 + "&p3=" + p3+ "&p4=" + p4+ "&p5=" + p5+ "&p6=" + p6+ "&p7=" + p7, true);
	request.send(null);

	request.onreadystatechange = function () {
		
		if (request.readyState == 4 && request.status == 200) {
		
			data = request.responseText;

			if ( !(data.localeCompare("ok")) ){
				//alert("turn done all");
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
