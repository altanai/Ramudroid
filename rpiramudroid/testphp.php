mo<?php
echo exec('whoami');
system("gpio write 1 ".$_GET["p1"] );
?>