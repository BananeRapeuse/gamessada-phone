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

function setDevice(device) {
    document.getElementById('deviceSelection').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    if (device === 'mobile') {
        canvas.width = 600;
        canvas.height = 600;
    } else {
        canvas.width = 1200;
        canvas.height = 1200;
    }
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
}
