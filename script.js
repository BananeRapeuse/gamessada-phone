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

function setResolution(width, height, orientation) {
    document.getElementById('resolutionSelection').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    if (orientation === 'portrait') {
        document.documentElement.style.width = width + 'px';
        document.documentElement.style.height = height + 'px';
        document.body.style.width = width + 'px';
        document.body.style.height = height + 'px';
    } else {
        document.documentElement.style.width = height + 'px';
        document.documentElement.style.height = width + 'px';
        document.body.style.width = height + 'px';
        document.body.style.height = width + 'px';
    }

    var canvas = document.getElementById('drawingCanvas');
    canvas.width = width - 20;
    canvas.height = height - 150;  // Laisser de l'espace pour les boutons

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

// Activer la fonctionnalité de dessin
document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('drawingCanvas');
    var context = canvas.getContext('2d');
    var drawing = false;

    function startDrawing(e) {
        drawing = true;
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
    }

    function draw(e) {
        if (!drawing) return;
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
    }

    function stopDrawing() {
        drawing = false;
        context.closePath();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Ajouter des événements tactiles pour les appareils mobiles
    canvas.addEventListener('touchstart', function(e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', function(e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', function(e) {
        var mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
    
    // Continuation from the previous script

    canvas.addEventListener('touchcancel', function(e) {
        var mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });

    // Prevent scrolling when touching the canvas
    canvas.addEventListener('touchstart', function(e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

    canvas.addEventListener('touchend', function(e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

    canvas.addEventListener('touchmove', function(e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
});

   
