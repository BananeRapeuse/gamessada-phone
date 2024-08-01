import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD9yLaR3jVIwHTdjDqnkUSkf0BeNbNfF60",
    authDomain: "gamessada-phone.firebaseapp.com",
    projectId: "gamessada-phone",
    storageBucket: "gamessada-phone.appspot.com",
    messagingSenderId: "427341700711",
    appId: "1:427341700711:web:6138e16b57b5f80b17fec2",
    measurementId: "G-925J5K22HF"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

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

function selectGameMode(mode) {
    document.getElementById('gameModeSelection').style.display = 'none';
    if (mode === 'solo') {
        document.getElementById('deviceSelection').style.display = 'block';
    } else if (mode === 'multiplayer') {
        document.getElementById('multiplayerSetup').style.display = 'block';
        loadRooms();
    }
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
    } else {
        document.getElementById('otherMobileOptions').style.display = 'block';
    }
}

function setResolution(width, height) {
    document.getElementById('resolutionSelection').style.display = 'none';
    canvas.width = width;
    canvas.height = height;
    document.getElementById('game').style.display = 'block';
}

function createRoom() {
    const username = document.getElementById('username').value;
    const roomName = document.getElementById('roomName').value;
    if (username && roomName) {
        const roomRef = ref(db, 'rooms');
        const newRoomRef = push(roomRef);
        set(newRoomRef, {
            name: roomName,
            users: {
                [newRoomRef.key]: username
            }
        });
        joinRoom(newRoomRef.key);
    } else {
        alert('Veuillez entrer un pseudo et un nom de salon.');
    }
}

function loadRooms() {
    const roomsList = document.getElementById('roomsList');
    roomsList.innerHTML = '';
    const roomsRef = ref(db, 'rooms');
    onValue(roomsRef, (snapshot) => {
        snapshot.forEach((roomSnapshot) => {
            const room = roomSnapshot.val();
            const roomElement = document.createElement('div');
            roomElement.textContent = `${room.name} (${Object.keys(room.users).length} joueurs)`;
            const joinButton = document.createElement('button');
            joinButton.textContent = 'Join';
            joinButton.onclick = () => joinRoom(roomSnapshot.key);
            roomElement.appendChild(joinButton);
            roomsList.appendChild(roomElement);
        });
    });
}

function joinRoom(roomId) {
    document.getElementById('multiplayerSetup').style.display = 'none';
    const roomRef = ref(db, `rooms/${roomId}/users`);
    const username = document.getElementById('username').value;
    set(push(roomRef), username);
    document.getElementById('game').style.display = 'block';
    setupDrawingSync(roomId);
}

function setupDrawingSync(roomId) {
    const drawRef = ref(db, `rooms/${roomId}/drawings`);
    canvas.addEventListener('mouseup', () => {
        const dataURL = canvas.toDataURL();
        set(push(drawRef), dataURL);
    });

    onValue(drawRef, (snapshot) => {
        snapshot.forEach((drawingSnapshot) => {
            const dataURL = drawingSnapshot.val();
            const img = new Image();
            img.src = dataURL;
            img.onload = () => {
                ctx.drawImage(img, 0, 0);
            };
        });
    });
}
