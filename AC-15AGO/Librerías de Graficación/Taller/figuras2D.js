// script.js

document.addEventListener('DOMContentLoaded', function() {
    var dropdownToggle = document.querySelector('.dropdown-toggle');
    var dropdownMenu = document.querySelector('.dropdown-menu');
    var figureCanvas = document.getElementById('figure-canvas');
    var ctx = figureCanvas.getContext('2d');
    var cartesianButton = document.getElementById('cartesian');
    var polarButton = document.getElementById('polar');
    var updateButton = document.getElementById('update-figure');
    var xInput = document.getElementById('x-coordinate');
    var yInput = document.getElementById('y-coordinate');
    var radiusInput = document.getElementById('radius');
    var colorInput = document.getElementById('color');
    var borderColorInput = document.getElementById('border-color');
    var borderWidthInput = document.getElementById('border-width');
    var currentFigure = null;

    // Maneja el clic en el botón del menú
    dropdownToggle.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Maneja el clic en las opciones del menú
    dropdownMenu.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            var figureType = event.target.getAttribute('data-figure');
            currentFigure = figureType;
            dropdownMenu.style.display = 'none'; // Ocultar el menú después de seleccionar
            updateFigure();
        }
    });

    // Maneja la selección de coordenadas cartesianas o polares
    cartesianButton.addEventListener('click', function() {
        cartesianButton.classList.add('active');
        polarButton.classList.remove('active');
        radiusInput.disabled = false;
        xInput.disabled = false;
        yInput.disabled = false;
        updateFigure();
    });

    polarButton.addEventListener('click', function() {
        polarButton.classList.add('active');
        cartesianButton.classList.remove('active');
        radiusInput.disabled = false;
        xInput.disabled = true;
        yInput.disabled = true;
        updateFigure();
    });

    // Calcula el centro del canvas
    function getCanvasCenter() {
        return {
            x: figureCanvas.width / 2,
            y: figureCanvas.height / 2
        };
    }

    // Dibuja la figura en el canvas
    function drawFigure() {
        ctx.clearRect(0, 0, figureCanvas.width, figureCanvas.height);

        if (currentFigure) {
            var canvasCenter = getCanvasCenter();
            var x = parseFloat(xInput.value) || canvasCenter.x;
            var y = parseFloat(yInput.value) || canvasCenter.y;
            var radius = parseFloat(radiusInput.value) || 50;
            var color = colorInput.value;
            var borderColor = borderColorInput.value;
            var borderWidth = parseFloat(borderWidthInput.value) || 1;

            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;
            ctx.fillStyle = color;

            if (currentFigure === 'circle') {
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            } else if (currentFigure === 'square') {
                ctx.beginPath();
                ctx.rect(x - radius / 2, y - radius / 2, radius, radius);
                ctx.fill();
                ctx.stroke();
            } else if (currentFigure === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(x, y - radius / 2);
                ctx.lineTo(x - radius / 2, y + radius / 2);
                ctx.lineTo(x + radius / 2, y + radius / 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    updateButton.addEventListener('click', drawFigure);
});
