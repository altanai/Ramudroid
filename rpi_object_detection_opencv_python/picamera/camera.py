from picamera import PiCamera
from time import sleep

camera = PiCamera()

# preview
# camera.start_preview()
# sleep(5)
# camera.stop_preview()

# take 5 pics
camera.start_preview()
for i in range(5):
    sleep(5)
    camera.capture('/home/pi/Desktop/image%s.jpg' % i)
camera.stop_preview()

# video record
# camera.start_preview()
# camera.start_recording('/home/pi/Desktop/video.h264')
# sleep(5)
# camera.stop_recording()
# camera.stop_preview()