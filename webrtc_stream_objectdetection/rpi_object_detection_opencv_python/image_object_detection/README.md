# Haarcascade classifier based object detection 

A haar casacde is a classifier which is used to detect the object for which it has been trained for, from the source.
trained by superimposing the positive image over a set of negative images

Available haarcascades - https://github.com/opencv/opencv/tree/master/data/haarcascades
 

## Debugging 

**Issue1** no object detected 
```bash
cascadedetect.cpp:1698: error: (-215:Assertion failed) !empty() in function 'detectMultiScale'
```
**solution**

**Issue2** module matpotlib not found
```bash
(cv) root@raspberrypi:/home/pi/Ramudroid/rpi_object_detection_opencv_python# python3 detectpeople.py 
Traceback (most recent call last):
  File "detectpeople.py", line 3, in <module>
    import matplotlib.pyplot as plt
ModuleNotFoundError: No module named 'matplotlib'
```
**solution**
```bash
pip3 install matplotlib
```