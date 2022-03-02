import cv2
import numpy as np

MIN_MATCH_COUNT = 30

detector = cv2.SIFT()

FLANN_INDEX_KDITREE = 0
flannParam = dict(algorithm=FLANN_INDEX_KDITREE, tree=5)
flann = cv2.FlannBasedMatcher(flannParam, {})

imgpath = '/Users/altanaibisht/computer_vision/object_detection_imageai/2.jpg'
# imgpath = '/home/pi/Ramudroid/imgs/1.jpeg'
trainImg = cv2.imread(imgpath, 0)
trainKP, trainDesc = detector.detectAndCompute(trainImg, None)

cam = cv2.VideoCapture(0)
while True:
    ret, QueryImgBGR = cam.read()
    QueryImg = cv2.cvtColor(QueryImgBGR, cv2.COLOR_BGR2GRAY)
    queryKP, queryDesc = detector.detectAndCompute(QueryImg, None)
    matches = flann.knnMatch(queryDesc, trainDesc, k=2)

    goodMatch = []
    for m, n in matches:
        if (m.distance < 0.75 * n.distance):
            goodMatch.append(m)
    if (len(goodMatch) > MIN_MATCH_COUNT):
        tp = []
        qp = []
        for m in goodMatch:
            tp.append(trainKP[m.trainIdx].pt)
            qp.append(queryKP[m.queryIdx].pt)
        tp, qp = np.float32((tp, qp))
        H, status = cv2.findHomography(tp, qp, cv2.RANSAC, 3.0)
        h, w = trainImg.shape
        trainBorder = np.float32([[[0, 0], [0, h - 1], [w - 1, h - 1], [w - 1, 0]]])
        queryBorder = cv2.perspectiveTransform(trainBorder, H)
        cv2.polylines(QueryImgBGR, [np.int32(queryBorder)], True, (0, 255, 0), 5)
    else:
        print ("Not Enough match found- " + len(goodMatch) + MIN_MATCH_COUNT)
    cv2.imshow('result', QueryImgBGR)
    if cv2.waitKey(10) == ord('q'):
        break
cam.release()
cv2.destroyAllWindows()
