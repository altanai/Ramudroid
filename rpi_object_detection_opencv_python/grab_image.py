import subprocess

imgpath = '/home/pi/Ramudroid/imgs/1.jpeg'
cmd = "raspistill -vf -w 640 -h 480 -o " + imgpath + ''
subprocess.call(cmd, shell=True)
