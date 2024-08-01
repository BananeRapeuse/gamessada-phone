function selectDeviceType(deviceType) {
    document.getElementById('deviceSelection').style.display = 'none';
    document.getElementById('resolutionSelection').style.display = 'block';
    
    if (deviceType === 'computer') {
        document.getElementById('computerOptions').style.display = 'block';
    } else if (deviceType === 'mobile') {
        document.getElementById('mobileOptions').style.display = 'block';
    }
}

function selectMobileType(mobileType) {
    document.getElementById('mobileOptions').style.display = 'none';
    
    if (mobileType === 'apple') {
        document.getElementById('appleOptions').style.display = 'block';
    } else if (mobileType === 'other') {
        document.getElementById('otherMobileOptions').style.display = 'block';
    }
}

function setResolution(width, height) {
    document.getElementById('resolutionSelection').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    document.body.style.width = width + 'px';
    document.body.style.height = height + 'px';

    var canvas = document.getElementById('drawingCanvas');
    canvas.width = width;
    canvas.height = height;

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);
}

function clearCanvas() {
    var canvas = document.getElementById('drawingCanvas');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
    var canvas = document.getElementById('drawingCanvas');
    var dataUrl = canvas.toDataURL();
    var img = document.createElement('img');
    img.src = dataUrl;
    document.getElementById('savedDrawings').appendChild(img);
}
