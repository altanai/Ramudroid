<html>
<head>
<title>Arduino control</title>
</head>
<body>
<h2>Serial port Arduino to rpi</h2>
<?php
	include 'PhpSerial.php';
    $serial = new phpSerial();
    $serial->deviceSet("/dev/ttyUSB0");
    $serial->confBaudRate(115200); //Baud rate: 9600
    $serial->confParity("none");  //Parity (this is the "N" in "8-N-1")
    $serial->confCharacterLength(8); //Character length     (this is the "8" in "8-N-1")
    $serial->confStopBits(1);  //Stop bits (this is the "1" in "8-N-1")
    $serial->confFlowControl("none");
    $serial->deviceOpen();
    sleep(5); 
    $read = $serial->readPort();
    echo $read;
    $serial->deviceClose();
?>

</body>

</html>