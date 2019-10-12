// -------------------------------------------------------------

var canvas = tempContext.canvas,
    isTouch = 'createTouch' in document;

addEvent(canvas, isTouch ? 'touchstart' : 'mousedown', function (e) {
    if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };

    var cache = is;

    console.log(" canvas coordinates x ->" , e.pageX , "||", canvas.offsetLeft);
    console.log(" canvas coordinates y ->" , e.pageY ," ||", canvas.offsetTop);

    if (cache.isLine) lineHandler.mousedown(e);
    else if (cache.isArc) arcHandler.mousedown(e);
    else if (cache.isRectangle) rectHandler.mousedown(e);
    else if (cache.isQuadraticCurve) quadraticHandler.mousedown(e);
    else if (cache.isBezierCurve) bezierHandler.mousedown(e);
    else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mousedown(e);
    else if (is.isPencil) pencilHandler.mousedown(e);
    else if (is.isEraser) eraserHandler.mousedown(e);
    else if (is.isText) textHandler.mousedown(e);

    drawHelper.redraw();
});

// -------------------------------------------------------------

addEvent(canvas, isTouch ? 'touchend' : 'mouseup', function (e) {
    if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };
    
    var cache = is;

    if (cache.isLine) lineHandler.mouseup(e);
    else if (cache.isArc) arcHandler.mouseup(e);
    else if (cache.isRectangle) rectHandler.mouseup(e);
    else if (cache.isQuadraticCurve) quadraticHandler.mouseup(e);
    else if (cache.isBezierCurve) bezierHandler.mouseup(e);
    else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mouseup(e);
    else if (is.isPencil) pencilHandler.mouseup(e);
    else if (is.isEraser) eraserHandler.mouseup(e);
    else if (is.isText) textHandler.mouseup(e);

    drawHelper.redraw();
});

// -------------------------------------------------------------

addEvent(canvas, isTouch ? 'touchmove' : 'mousemove', function (e) {
    if (isTouch) e = e.pageX ? e : e.touches.length ? e.touches[0] : { pageX: 0, pageY: 0 };
    
    var cache = is;

    if (cache.isLine) lineHandler.mousemove(e);
    else if (cache.isArc) arcHandler.mousemove(e);
    else if (cache.isRectangle) rectHandler.mousemove(e);
    else if (cache.isQuadraticCurve) quadraticHandler.mousemove(e);
    else if (cache.isBezierCurve) bezierHandler.mousemove(e);
    else if (cache.isDragLastPath || cache.isDragAllPaths) dragHelper.mousemove(e);
    else if (is.isPencil) pencilHandler.mousemove(e);
    else if (is.isEraser) eraserHandler.mousemove(e);
    else if (is.isText) textHandler.mousemove(e);
});

// -------------------------------------------------------------

var keyCode;

// -------------------------------------------------------------

function onkeydown(e) {
    keyCode = e.keyCode;

    if (!isControlKeyPressed && keyCode === 17) {
        isControlKeyPressed = true;
    }
}

addEvent(document, 'keydown', onkeydown);

// -------------------------------------------------------------

function onkeyup(e) {
    keyCode = e.keyCode;

    /*-------------------------- Ctrl + Z --------------------------*/
    
    if (isControlKeyPressed && keyCode === 90) {
        if (points.length) {
            points.length = points.length - 1;
            drawHelper.redraw();
        }
    }

    /*-------------------------- Ctrl + A --------------------------*/

    if (isControlKeyPressed && keyCode === 65) {
        dragHelper.global.startingIndex = 0;

        endLastPath();
        
        setSelection(find('drag-all-paths'), 'DragAllPaths');
    }

    /*-------------------------- Ctrl + C --------------------------*/
    
    if (isControlKeyPressed && keyCode === 67 && points.length) {
        copy();
    }

    /*-------------------------- Ctrl + V --------------------------*/
    if (isControlKeyPressed && keyCode === 86 && copiedStuff.length) {
        paste();
    }

    /*-------------------------- Ending the Control Key --------------------------*/
    
    if (keyCode === 17) {
        isControlKeyPressed = false;
    }
}

addEvent(document, 'keyup', onkeyup);

// -------------------------------------------------------------


var lastPoint = [];

//var selfId = (Math.random() * 10000).toString().replace('.', '');
//var selfId = window.frames[0].parent.document.getElementById("username").innerHTML;
var selfId = parent.document.getElementById("username").innerHTML;

window.addEventListener('message', function(event) {

    if (!event.data || !event.data.canvasDesignerSyncData) return;

    if (event.data.sender && event.data.sender == selfId) return;

    // drawing is shared here (array of points)
    points = event.data.canvasDesignerSyncData;

    // to support two-way sharing
    if (!lastPoint.length) {
        lastPoint = points.join('');
    }
    drawHelper.redraw(true);
}, false);

function syncPoints() {

    if (!lastPoint.length) {
        lastPoint = points.join('');
    }
    
    if (points.join('') != lastPoint) {
        syncData(points || []);
        lastPoint = points.join('');
    }
}

function syncData(data) {

    parent.postMessage({
        canvasDesignerSyncData: data,
        sender: selfId
    }, '*');
}

//parent post message is wokring 
// test this by 
// window.frames[0].parent.postMessage("hi", '*')