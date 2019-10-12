<?php
$handle = fopen( '/dev/ttyUSB0', 'r' ); # Open device for Read access
$tagid = fgets( $handle ); # Read data from device
echo $tagid; # Display data
fclose ($handle); # Close device file
?>