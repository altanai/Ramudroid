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

    
$comPort = "/dev/ttyACM0"; //The com port address. This is a debian address

$msg = '';

if(isset($_POST["hi"])){

$serial = new phpSerial;

$serial->deviceSet($comPort);

$serial->confBaudRate(9600);

$serial->confParity("none");

$serial->confCharacterLength(8);

$serial->confStopBits(1);

$serial->deviceOpen();

sleep(2); //Unfortunately this is nessesary, arduino requires a 2 second delay in order to receive the message

$serial->sendMessage("Well hello!");

$serial->deviceClose();

$msg = "You message has been sent! WOHOO!";

}

?>

<html>

<head>

<title>Arduino control</title>

</head>

<body>

<form method="POST">

<input type="submit" value="Send" name="hi">

</form><br>

<?=$msg?>

</body>

</html>