

<html>

<head>

<title>Arduino control</title>

</head>

<body>
<?php 
echo exec('whoami');
?>

<?php

	include 'PhpSerial.php';

    // Let's start the class
    $serial = new phpSerial();

    $serial->deviceSet("/dev/ttyUSB0");

    $serial->confBaudRate(9600); //Baud rate: 9600
    $serial->confParity("none");  //Parity (this is the "N" in "8-N-1")
    $serial->confCharacterLength(8); //Character length     (this is the "8" in "8-N-1")
    $serial->confStopBits(1);  //Stop bits (this is the "1" in "8-N-1")
    $serial->confFlowControl("none");

    // Then we need to open it
    $serial->deviceOpen();

    sleep(5); 

    // Read data
    $read = $serial->readPort();

    // Print out the data
    echo $read;

    // If you want to change the configuration, the device must be closed.
    $serial->deviceClose();
?>

</body>

</html>