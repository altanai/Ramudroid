<?php
system("gpio mode 2 out");
system("gpio mode 3 out");
system("gpio mode 23 out");	
system("gpio mode 24 out");			
system("gpio mode 25 out");	
system("gpio mode 26 out");	
system("gpio mode 27 out");	

if (isset ( $_GET["p0"] ) && isset ( $_GET["p1"] ) && isset ( $_GET["p2"] ) && isset ( $_GET["p3"] ) && isset ( $_GET["p4"] ) && isset ( $_GET["p5"] ) && isset ( $_GET["p6"] ) && isset ( $_GET["p7"] ) ) 
{			
			
	system("gpio write 2 ".$_GET["p0"] );		
	
	system("gpio write 3".$_GET["p1"] );

	system("gpio write 23 ".$_GET["p2"] );
			
	system("gpio write 24 ".$_GET["p3"] );
	
	system("gpio write 25 ".$_GET["p4"] );

	system("gpio write 26 ".$_GET["p5"] );
	
	system("gpio write 27 ".$_GET["p6"] );

	/*
	system("gpio mode 7 out");	
	system("gpio write 7 ".$_GET["p7"] );
	*/
	
	echo("ok");
} 

else {
	echo ("fail"); 
}

/*dont use pin 21 and 22 gpio as they show reversed results - pull up
*/
?>