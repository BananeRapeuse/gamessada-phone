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

    // Ajuster la taille de la page pour correspondre à la résolution de l'appareil
    document.documentElement.style.width = width + 'px';
    document.documentElement.style.height = height + 'px';
    document.body.style.width = width + 'px';
    document.body.style.height = height + 'px';

    var canvas = document.getElementById('drawingCanvas');
    
    // Ajuster la taille du canvas légèrement plus petite que la page pour laisser de l'espace pour les boutons
    if (deviceType === 'iPhone' || deviceType === 'iPad' || deviceType === 'iPod' || deviceType === 'other') {
        canvas.width = width - 50;  // Légèrement plus petit que la page
        canvas.height = height - 150; // Laisser de l'espace pour les boutons
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
});
