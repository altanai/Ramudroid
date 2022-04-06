import cv2 as _cv2
import numpy as np
import subprocess
import os

class Box:

    def __init__(self, index, start_row, end_row, start_col, end_col, path):
        self.index = index
        self.start_row = start_row
        self.end_row = end_row
        self.start_col = start_col
        self.end_col = end_col
        self.path = path


def crop(img, pxstep=1000, pystep=1000):
    i = 0
    h = img.shape[0]
    w = img.shape[1]
    start_row, start_col = int(0), int(0)

    y = pystep
    while y <= h :
        start_row = 0
        x = pxstep
        while x <= w :
            end_row = int(x)
            end_col = int(y)

            i = i + 1
            print("box no : " + str(i))
            print(start_row, start_col, end_row, end_col)

            # since we only want bottom boxes 4 , 5 and 6 , store only them
            if i >= 4 and i <= 6:
                cropped_img = image[start_row:end_row, start_col:end_col]
                image_path_cropped = 'imgs/cropped_' + str(i) + '.jpeg'
                _cv2.imwrite(image_path_cropped, cropped_img)

                boxes.append(Box(i, start_row, start_col, end_row, end_col, image_path_cropped))

            start_row = x
            x += pxstep

        start_col = y
        y += pystep


# sharpening image with gaussian smoothing filter
def unsharp_mask(image, kernel_size=(5, 5), sigma=1.0, amount=1.0, threshold=0):
    """Return a sharpened version of the image, using an unsharp mask."""
    blurred = _cv2.GaussianBlur(image, kernel_size, sigma)
    sharpened = float(amount + 1) * image - float(amount) * blurred
    sharpened = np.maximum(sharpened, np.zeros(sharpened.shape))
    sharpened = np.minimum(sharpened, 255 * np.ones(sharpened.shape))
    sharpened = sharpened.round().astype(np.uint8)
    if threshold > 0:
        low_contrast_mask = np.absolute(image - blurred) < threshold
        np.copyto(sharpened, image, where=low_contrast_mask)
    return sharpened


def detect_onstruction(imgpath):
    img = _cv2.imread(imgpath)
    sharpened_image = unsharp_mask(img)
    edges = _cv2.Canny(sharpened_image, sharpened_image.shape[0], sharpened_image.shape[1])
    edges_bool = np.asarray(edges, dtype=bool)
    return (1 in edges_bool)


# main logic

# grab image
imgpath = '1.jpeg'
cmd = "raspistill -vf -w 640 -h 480 -o " + imgpath + ''
subprocess.call(cmd, shell=True)

# read image
image = _cv2.imread(imgpath)

# print the dimensions
print(image.shape)
h = image.shape[0]
w = image.shape[1]
print('Width of image:', (w, 'pixels'))
print('Height of image:', (h, 'pixels'))

# creating list for boxes
boxes = []

# Divide image into grid of 3x2
px = int(w / 3)
py = int(h / 2)
print("width of each grid box ", (px, 'pixels'))
print("height of each grid box ", (py, 'pixels'))

# call crop
crop(image, px, py)

# use box es for edge detection
# if 1 exists in then edge was detected
path_c = detect_onstruction(boxes[1].path)
if not path_c:
    print(" No Obstruction detected on centre ")
else:
    print("Obstruction detected on centre , evaluate right side")
    path_r = detect_onstruction(boxes[2].path)

    if not path_r:
        print("No Obstruction detected on right side")
    else:
        print("Obstruction detected on right side , evaluate left side")
        path_l = detect_onstruction(boxes[0].path)

        if not path_l:
            print("No Obstruction detected on left side")
        else:
            print("Obstruction detected on left side , halt or move back")
            # beep to sound obstruction in movement
            beep = lambda x: os.system("echo -n '\a';sleep 0.2;" * x)
            beep(4)