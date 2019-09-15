<?php
$i = 0;
do {
	system("gpio mode 7 in");
	exec ("gpio read 7", $i, $return );
   // echo $i;
	if ($i >=1) {
        echo "obstruction";
        break;
    }

} while ($i <= 0);
?>