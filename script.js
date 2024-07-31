// Fonction pour gérer la sélection des résolutions
function updateResolution(resolution) {
    let width, height;
    switch (resolution) {
        case '720p':
            width = 1280;
            height = 720;
            break;
        case '1080p':
            width = 1920;
            height = 1080;
            break;
        case '2K':
            width = 2560;
            height = 1440;
            break;
        case '4K':
            width = 3840;
            height = 2160;
            break;
        case '8K':
            width = 7680;
            height = 4320;
            break;
        default:
            width = window.innerWidth;
            height = window.innerHeight;
            break;
    }
    // Ajuste la taille du canvas en fonction de la résolution
    document.getElementById('canvas').width = width;
    document.getElementById('canvas').height = height;
    // Redessiner l'intégralité du contenu du canvas
    redrawCanvas();
}

// Fonction pour gérer la sélection des couleurs
function updateColorSelection(position, color) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    switch (position) {
        case 'haut':
            // Remplir la partie supérieure du canvas avec la couleur sélectionnée
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
            break;
        case 'bas':
            // Remplir la partie inférieure du canvas avec la couleur sélectionnée
            ctx.fillStyle = color;
            ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
            break;
        case 'gauche':
            // Remplir la partie gauche du canvas avec la couleur sélectionnée
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
            break;
        case 'droite':
            // Remplir la partie droite du canvas avec la couleur sélectionnée
            ctx.fillStyle = color;
            ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
            break;
    }
    // Redessiner le canvas après la modification des couleurs
    redrawCanvas();
}

// Fonction pour l'outil seau
function fillBucket(x, y, color) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getPixelColor(x, y);

    function getPixelColor(x, y) {
        const index = (y * canvas.width + x) * 4;
        return [data[index], data[index + 1], data[index + 2], data[index + 3]];
    }

    function setPixelColor(x, y, color) {
        const index = (y * canvas.width + x) * 4;
        data[index] = color[0];
        data[index + 1] = color[1];
        data[index + 2] = color[2];
        data[index + 3] = color[3];
    }

    function floodFill(x, y) {
        const stack = [[x, y]];
        const newColor = color;

        while (stack.length) {
            const [x, y] = stack.pop();
            if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
            const currentColor = getPixelColor(x, y);
            if (!colorsMatch(currentColor, targetColor)) continue;

            setPixelColor(x, y, newColor);
            stack.push([x + 1, y]);
            stack.push([x - 1, y]);
            stack.push([x, y + 1]);
            stack.push([x, y - 1]);
        }
    }

    function colorsMatch(color1, color2) {
        return color1[0] === color2[0] &&
               color1[1] === color2[1] &&
               color1[2] === color2[2] &&
               color1[3] === color2[3];
    }

    floodFill(x, y);
    ctx.putImageData(imageData, 0, 0);
}

// Fonction pour redessiner le canvas après modification
function redrawCanvas() {
    // Code pour redessiner le canvas si nécessaire
}

// Fonction principale de gestion des outils
function handleToolSelection(tool) {
    switch (tool) {
        case 'seau':
            // Activer l'outil seau
            canvas.addEventListener('click', function(event) {
                const rect = canvas.getBoundingClientRect();
                const x = Math.floor((event.clientX - rect.left) / (rect.right - rect.left) * canvas.width);
                const y = Math.floor((event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);
                const color = [255, 0, 0, 255]; // Couleur par défaut ou à sélectionner
                fillBucket(x, y, color);
            });
            break;
        // Autres outils à ajouter ici
    }
}

// Fonction d'initialisation
function initialize() {
    // Sélection des résolutions
    document.getElementById('resolution-select').addEventListener('change', function(event) {
        updateResolution(event.target.value);
    });

    // Sélection des couleurs
    document.getElementById('color-position-select').addEventListener('change', function(event) {
        const position = event.target.value;
        const color = [0, 255, 0, 255]; // Couleur par défaut ou à sélectionner
        updateColorSelection(position, color);
    });

    // Sélection des outils
    document.getElementById('tool-select').addEventListener('change', function(event) {
        handleToolSelection(event.target.value);
    });

    // Initialisation avec la résolution par défaut
    updateResolution('720p');
}

window.onload = initialize;
