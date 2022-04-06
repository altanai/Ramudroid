import cv2
import subprocess

fullbody_cascade = cv2.CascadeClassifier('haarmodels/haarcascade_profileface.xml')

# img_path = '/home/pi/Ramudroid/imgs/1.jpeg'
# grab an image
# cmd = "raspistill -vf -w 640 -h 480 -o " + img_path + ''
# subprocess.call(cmd, shell=True)
img_path = 'imgs/2.jpg'

img = cv2.imread(img_path)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

faces = fullbody_cascade.detectMultiScale(gray, 1.3, 5)
print("no of faces detected ")
print(len(faces))

for (x, y, w, h) in faces:
    img = cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)
    roi_gray = gray[y:y + h, x:x + w]
    roi_color = img[y:y + h, x:x + w]

img_path_processed = '/home/pi/Ramudroid/imgs/2.jpeg'
cv2.imwrite(img_path_processed, img)
