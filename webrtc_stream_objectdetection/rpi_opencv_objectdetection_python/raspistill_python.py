import cv2
import subprocess

img_path="/home/pi/Ramudroid/imgs/1.jpeg"

cmd = "raspistill -vf -w 640 -h 480 -o " + img_path + " "
subprocess.call(cmd, shell=True)

image = cv2.imread(img_path)
cv2.imshow("Rpi image", image)
cv2.waitKey(0)