import numpy as np
import cv2
import subprocess

fullbody_cascade = cv2.CascadeClassifier('haarmodels/haarcascade_fullbody.xml')
lowerbody_cascade = cv2.CascadeClassifier('haarmodels/haarcascade_lowerbody.xml')

# img_path = '/home/pi/Ramudroid/rpi_object_detection_opencv_python/image_object_detection/imgs/1.jpg'
# grab an image
# cmd = "raspistill -vf -w 640 -h 480 -o " + img_path + ''
# subprocess.call(cmd, shell=True)

img_path = 'imgs/1.jpg'

img = cv2.imread(img_path)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

bodies = fullbody_cascade.detectMultiScale(gray, 1.3, 5)
for (x, y, w, h) in bodies:
    img = cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
    roi_gray = gray[y:y + h, x:x + w]
    roi_color = img[y:y + h, x:x + w]

    lowerbodies = lowerbody_cascade.detectMultiScale(roi_gray)
    for (ex, ey, ew, eh) in lowerbodies:
        cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)

cv2.imshow('img', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
