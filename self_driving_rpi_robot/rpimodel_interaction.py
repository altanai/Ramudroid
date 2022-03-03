import tensorflow as tf
import numpy as np
import cv2
import time
import picamera
import picamera.array
import RPi.GPIO as gpio

# import keras
# from tensorflow.keras import models
# from keras import models

def init():
    gpio.setmode(gpio.BOARD)
    gpio.setup(36,gpio.OUT)
    gpio.setup(33,gpio.OUT)
    gpio.setup(10,gpio.OUT)
    gpio.setup(11,gpio.OUT)    
    
def forward():
    init()
#     gpio.output(36, False)
#     gpio.output(33, False)
    gpio.output(10, False)
    gpio.output(11, True)
    gpio.cleanup()
    
def reverse():
    init()
#     gpio.output(36, False)
#     gpio.output(33, False)
    gpio.output(10, True)
    gpio.output(11, False)
    gpio.cleanup()
    
def left():
    init()
    gpio.output(36, True)
    gpio.output(33, False)
#     gpio.output(10, False)
#     gpio.output(11, False)
    gpio.cleanup()
    
def right():
    init()
    gpio.output(36, False)
    gpio.output(33, True)
#     gpio.output(10, False)
#     gpio.output(11, False)
    gpio.cleanup()
    
def stop():
    init()
    gpio.output(36, False)
    gpio.output(33, False)
    gpio.output(10, False)
    gpio.output(11, False)
    gpio.cleanup()
    
def gpio_fun(vin):
    if  '1' in vin :
        left()
        print("Left")
         
    if '2' in vin:
        right()
        print("Right")

    if '3' in vin:
        reverse()
        print("Back")
    
    if '4' in vin:
        forward()
        print("Forward")
    
    if '0' in vin:
        stop()
        print("Stop")



model_path = "C:/Users/vinay/OneDrive/Desktop/Major/model_v2.h5"
# img_path = "C:/Users/vinay/OneDrive/Desktop/Major/training_data/img-1555735745.jpg"

def prepare(img_path):
    IMG_SIZE = 50
    old_img = cv2.imread(img_path, 1)
    cv2.imshow("img" , old_img)
    img = cv2.resize(old_img, (IMG_SIZE, IMG_SIZE))
    return img.reshape(-1 ,IMG_SIZE, IMG_SIZE, 3)


model = tf.keras.models.load_model(model_path)
print("\n Model Loaded \n")
print(model.summary())


# a = model.predict([prepare(img_path)])
# print(a)

# print(max(a[0]))
# print("Prediction value is ", list(a[0]).index(max(a[0])))
# val = list(a[0]).index(max(a[0]))
# val = [i for i, x in enumerate(a[0]) if x == max(a[0])]
# print(val)


def fun(val_lst):
    vin = ""
    if 0 in val_lst:
        print("stop")
        vin += "0"
    if 1 in val_lst:
        print("Forward")
        vin += "4"
    return vin

try:
    with picamera.PiCamera() as camera:
        with picamera.array.PiRGBArray(camera) as stream:
            camera.resolution = (50, 50)
            while True:
                camera.capture(stream, 'bgr', use_video_port=True)
                pred = model.predict([prepare(stream.array)])
                print("prediction ",pred)
                val = [i for i, x in enumerate(pred[0]) if x == max(pred[0])]
                digit = fun(val)
                print("digit ",digit)
                gpio_fun(str(digit))

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

