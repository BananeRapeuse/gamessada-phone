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

function setResolution(width, height, deviceType) {
    document.getElementById('resolutionSelection').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    // Set the body size to match the device resolution
    document.body.style.width = width + 'px';
    document.body.style.height = height + 'px';

    var canvas = document.getElementById('drawingCanvas');
    
    // Adjust canvas size slightly smaller than the page to accommodate buttons
    if (deviceType === 'iPhone' || deviceType === 'iPad' || deviceType === 'iPod' || deviceType === 'other') {
        canvas.width = width - 50;  // Slightly smaller than the body
        canvas.height = height - 150; // Leave space for buttons
    } else {
        canvas.width = width - 200;
        canvas.height = height - 200;
    }

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
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

// Enable drawing functionality
document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('drawingCanvas');
    var context = canvas.getContext('2d');
    var drawing = false;

    canvas.addEventListener('mousedown', function(e) {
        drawing = true;
        context.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener('mousemove', function(e) {
        if (drawing) {
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
        }
    });

    canvas.addEventListener('mouseup', function() {
        drawing = false;
    });

    canvas.addEventListener('mouseout', function() {
        drawing = false;
    });
});
