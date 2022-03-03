import cv2
import time
import csv
import os
import picamera
import picamera.array
import RPi.GPIO as GPIO
GPIO.setwarnings(False)


GPIO.setmode(GPIO.BOARD)
GPIO.setup(36, GPIO.OUT)
GPIO.setup(33, GPIO.OUT)
GPIO.setup(10, GPIO.OUT)
GPIO.setup(11, GPIO.OUT)

def gpio_fun():
    val = ""
    if GPIO.input(36) == 1:
##        print("Left")
        val+="1"
    if GPIO.input(33) == 1:
##        print("Right")
        val += "2"
    if GPIO.input(10) == 1:
##        print("Back")
        val += "3"
    if GPIO.input(11) == 1:
##        print("Forward")
        val += "4"
    if 1 != (GPIO.input(36) or GPIO.input(33) or GPIO.input(10) or GPIO.input(11)):
##        print("Open")
        val += "0"
        
    print(val)
    return val

img_dir = './ training_data'
filename = 'training_data.csv'

if not os.path.exists(img_dir):
    os.makedirs(img_dir)


training_start_time = time.time()
start_time= int(time.time())

try:
 with picamera.PiCamera() as camera:
    with picamera.array.PiRGBArray(camera) as stream:
        camera.resolution = (320, 240)

        while True:
             camera.capture(stream, 'bgr', use_video_port=True)
           
             cv2.imshow("video_frames", stream.array)

             stop_time = int(time.time())
              
             print(stop_time - start_time) 
             if int(stop_time - start_time) > 0:
                 start_time = stop_time
                 print("TIME PER SEC ",int(time.time()))
                 print("part2",stop_time - start_time) 

                 # Writting the frames
                 cv2.imwrite(img_dir+'/ img-{}.jpg'.format(int(time.time())), stream.array)
                 print("image write done") 

                 # Writting the csv
                 row = []
                 row.append('img-{}'.format(int(time.time())))
                 row.append(gpio_fun())
                 with open(filename, 'a', newline='') as csvFile:
                     writer = csv.writer(csvFile)
                     writer.writerow(row)
                 csvFile.close()

             # reset the stream before the next capture
             stream.seek(0)
             stream.truncate()
            # It Means Press ESC Key to Exit the Loop
             k = cv2.waitKey(30) & 0xff
             if k ==27: 
                 break    
            
except Exception as e:
    print("type err ", e)

    
cv2.destroyAllWindows()
print("TOTAL TRAINING TIME CAPTURED ",time.time()-training_start_time)
GPIO.cleanup()
