var faceCascade;

showImage = function (mat, canvas) {
    var data = mat.data(); // output is a Uint8Array that aliases directly into the Emscripten heap
    var channels = mat.channels();
    //var channelSize = mat.elemSize1();
    var ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var imdata = ctx.createImageData(mat.cols, mat.rows);

    for (var i = 0, j = 0; i < data.length; i += channels, j += 4) {
        imdata.data[j] = data[i];
        imdata.data[j + 1] = data[i + 1 % channels];
        imdata.data[j + 2] = data[i + 2 % channels];
        imdata.data[j + 3] = 255;
    }

    ctx.putImageData(imdata, 0, 0);
};

function detectFace(canvas) {
    if (!faceCascade) {
        console.log("Creating the cascade classifier");
        faceCascade = new cv.CascadeClassifier();
        faceCascade.load('../../test/data/haarcascade_frontalface_default.xml');
        //faceCascade.load('../../test/data/haarcascade_fullbody.xml');
        //faceCascade.load('../../test/data/hogcascade_pedestrians.xml');
        //faceCascade.load('../../test/data/haarcascade_lowerbody.xml');
        //faceCascade.load('models/person.xml');
    }

    var ctx = canvas.getContext('2d');
    var input = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var img = cv.matFromArray(input, 24); // 24 for rgba
    var imgGray = new cv.Mat();
    var imgColor = new cv.Mat(); // Opencv likes RGB

    cv.cvtColor(img, imgGray, cv.ColorConversionCodes.COLOR_RGBA2GRAY.value, 0);
    cv.cvtColor(img, imgColor, cv.ColorConversionCodes.COLOR_RGBA2RGB.value, 0);

    var faces = new cv.RectVector();
    var s1 = [50, 50];
    var s2 = [0, 0];
    faceCascade.detectMultiScale(imgGray, faces, 1.3, 4, 0, s1, s2);

    for (var i = 0; i < faces.size(); i += 1) {
        var faceRect = faces.get(i);
        fx = faceRect.x;
        fy = faceRect.y;
        fw = faceRect.width;
        fh = faceRect.height;
        var p1 = [fx, fy];
        var p2 = [fx + fw, fy + fh];
        var color = new cv.Scalar(255, 0, 0);
        cv.rectangle(imgColor, p1, p2, color, 2, 8, 0);
        faceRect.delete();
        color.delete();
    }

    showImage(imgColor, canvas);

    img.delete();
    imgColor.delete();
    faces.delete();
    imgGray.delete();
}
