var video = document.getElementById('remote-video');
var canvas = document.getElementById('edgeCanvas');
var ctx = canvas.getContext('2d');

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (func) {
        setTimeout(func, 1000 / 60);
    };

var w = canvas.width,
    h = canvas.height;
var lastFrame;
var abs = function (v) {
    return (v ^ (v >> 31)) - (v >> 31);
};
var avg = function (i, data) {
    return (data[i] + data[i + 1] + data[i + 2]) / 3;
};

function init() {
    w = canvas.width = video.videoWidth;
    h = canvas.height = video.videoHeight;
    render();
}

function render() {
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(video, 0, 0, w, h);
    var blended = getBlendedFrame();
    ctx.putImageData(blended, 0, 0);
    rAF(render);
};

function getBlendedFrame() {
    var result = ctx.createImageData(w, h),
        resultData = result.data;
    var currentFrame = ctx.getImageData(0, 0, w, h),
        currentFrameData = currentFrame.data;
    if (!lastFrame) lastFrame = ctx.getImageData(0, 0, w, h);
    var lastFrameData = lastFrame.data;

    for (var i = 0; i < w * h * 4; i += 4) {
        var val = abs(avg(i, currentFrameData) - avg(i, lastFrameData)) > 0x1F ? 0xFF : 0;
        resultData[i] = val;
        resultData[i + 1] = val;
        resultData[i + 2] = val;
        resultData[i + 3] = 255;
    }

    lastFrame = currentFrame;

    return result;
};

navigator.getUserMedia({
    video: true
}, function (stream) {
    video.src = URL.createObjectURL(stream);
    video.addEventListener('loadedmetadata', init, false);
}, function(){});