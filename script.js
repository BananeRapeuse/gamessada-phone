const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', (e) => {
    drawing = true;
    const touch = e.touches[0];
    ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
});
canvas.addEventListener('touchend', () => {
    drawing = false;
    ctx.beginPath();
});
canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    draw(touch);
});

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    const x = event.clientX || event.touches[0].clientX;
    const y = event.clientY || event.touches[0].clientY;

    ctx.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
    const dataURL = canvas.toDataURL();
    const img = document.createElement('img');
    img.src = dataURL;
    document.getElementById('savedDrawings').appendChild(img);
    clearCanvas();
}

function selectDeviceType(type) {
    document.getElementById('deviceSelection').style.display = 'none';
    document.getElementById('resolutionSelection').style.display = 'block';
    if (type === 'computer') {
        document.getElementById('computerOptions').style.display = 'block';
        document.getElementById('mobileOptions').style.display = 'none';
    } else {
        document.getElementById('computerOptions').style.display = 'none';
        document.getElementById('mobileOptions').style.display = 'block';
    }
}

function selectMobileType(type) {
    document.getElementById('mobileOptions').style.display = 'none';
    if (type === 'apple') {
        document.getElementById('appleOptions').style.display = 'block';
        document.getElementById('otherMobileOptions').style.display = 'none';
    } else {
        document.getElementById('appleOptions').style.display = 'none';
        document.getElementById('otherMobileOptions').style.display = 'block';
    }
}

function setResolution(width, height) {
    document.getElementById('resolutionSelection').style.display = 'none';
    document.getElementById('game').style.display = 'flex';

    document.body.style.width = `${width}px`;
    document.body.style.height = `${height}px`;

    canvas.width = width * 0.9;
    canvas.height = height * 0.8;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
}
