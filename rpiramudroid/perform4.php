<html>
<body>
<?php 
   exec("sudo minicom --device /dev/ttyUSB0 -C CaptureCoordinates");
   echo file_get_contents('capturefile');
?>
</body>
</html>
