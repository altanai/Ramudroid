import numpy as np
import cv2
import matplotlib.pyplot as plt
import subprocess

fullbody_cascade = cv2.CascadeClassifier('haarmodels/haarcascade_fullbody.xml')
lowerbody_cascade = cv2.CascadeClassifier('haarmodels/haarcascade_lowerbody.xml')

img_path = '/home/pi/Ramudroid/imgs/1.jpeg'
# grab an image
cmd = "raspistill -vf -w 640 -h 480 -o " + img_path + ''
subprocess.call(cmd, shell=True)

# img_path = 'imgs/1.jpg'

img = cv2.imread(img_path)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

bodies = fullbody_cascade.detectMultiScale(gray, 1.3, 5)
print("bodies " + bodies[0])

for (x, y, w, h) in bodies:
    img = cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
    roi_gray = gray[y:y + h, x:x + w]
    roi_color = img[y:y + h, x:x + w]

    lowerbodies = lowerbody_cascade.detectMultiScale(roi_gray)
    for (ex, ey, ew, eh) in lowerbodies:
        cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)
        print("roi_color" + roi_color)
        print("ex" + ex)
        print("ey" + ey)

img_path_processed = '/home/pi/Ramudroid/imgs/2.jpeg'
cv2.imwrite(img_path_processed, img)

# cv2.imshow('img', img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()

# b, g, r = cv2.split(img)
# frame_rgb = cv2.merge((r, g, b))
# plt.imshow(frame_rgb)
# plt.title('Matplotlib')
# plt.show()
