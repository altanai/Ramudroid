<?php

if (isset ( $_GET["p0"] ) && isset ( $_GET["p1"] ) && isset ( $_GET["p2"] ) && isset ( $_GET["p3"] ) && isset ( $_GET["p4"] ) && isset ( $_GET["p5"] ) && isset ( $_GET["p6"] ) && isset ( $_GET["p7"] ) ) 
{			
	//system("gpio mode 0 out");		
	system("gpio write 21 ".$_GET["p0"] );		
	
	//system("gpio mode 1 out");		
	system("gpio write 22 ".$_GET["p1"] );
	
	//system("gpio mode 2 out");		
	system("gpio write 23 ".$_GET["p2"] );
	
	//system("gpio mode 3 out");		
	system("gpio write 24 ".$_GET["p3"] );
	
	//system("gpio mode 4 out");	
	system("gpio write 25 ".$_GET["p4"] );
	
	//system("gpio mode 5 out");	
	system("gpio write 26 ".$_GET["p5"] );
	
	//system("gpio mode 6 out");		
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

?>