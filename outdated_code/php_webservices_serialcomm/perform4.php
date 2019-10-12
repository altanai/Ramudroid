<html>
<body>
<?php 
   exec("sudo minicom --device /dev/ttyUSB0 -C capturefile");
   echo file_get_contents('capturefile');
?>
</body>
</html>
