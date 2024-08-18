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
    var radiusInput = document.getElementById('size'); // Usaremos 'size' para radio en cartesianas
    var colorInput = document.getElementById('color');
    var borderColorInput = document.getElementById('border-color');
    var borderWidthInput = document.getElementById('border-width');
    var radiusPolarInput = document.getElementById('radius-polar');
    var angleInput = document.getElementById('angle');
    var cartesianControls = document.getElementById('cartesian-controls');
    var polarControls = document.getElementById('polar-controls');
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
            updateControls();
        }
    });

    // Maneja la selección de coordenadas cartesianas o polares
    cartesianButton.addEventListener('click', function() {
        cartesianButton.classList.add('active');
        polarButton.classList.remove('active');
        cartesianControls.style.display = 'flex';
        polarControls.style.display = 'none';
        updateFigure();
    });

    polarButton.addEventListener('click', function() {
        polarButton.classList.add('active');
        cartesianButton.classList.remove('active');
        cartesianControls.style.display = 'none';
        polarControls.style.display = 'flex';
        updateFigure();
    });

    // Actualiza los controles visibles y calcula la figura
    function updateControls() {
        if (currentFigure === 'circle' || currentFigure === 'square' || currentFigure === 'triangle') {
            cartesianControls.style.display = 'flex';
            polarControls.style.display = 'none';
        } else if (currentFigure === 'polygon') {
            cartesianControls.style.display = 'flex';
            polarControls.style.display = 'none';
        }
    }

    // Dibuja la figura en el canvas
    function drawFigure() {
        ctx.clearRect(0, 0, figureCanvas.width, figureCanvas.height);

        if (currentFigure) {
            var x, y;
            var color = colorInput.value;
            var borderColor = borderColorInput.value;
            var borderWidth = parseFloat(borderWidthInput.value) || 1;
            var size = parseFloat(radiusInput.value) || 50;

            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;
            ctx.fillStyle = color;

            if (polarButton.classList.contains('active')) {
                var radiusPolar = parseFloat(radiusPolarInput.value) || size;
                var angle = parseFloat(angleInput.value) * (Math.PI / 180); // Convertir a radianes
                x = figureCanvas.width / 2 + radiusPolar * Math.cos(angle);
                y = figureCanvas.height / 2 - radiusPolar * Math.sin(angle); // Ajustar coordenadas
            } else {
                x = parseFloat(xInput.value) || figureCanvas.width / 2;
                y = parseFloat(yInput.value) || figureCanvas.height / 2;
            }

            if (currentFigure === 'circle') {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            } else if (currentFigure === 'square') {
                ctx.beginPath();
                ctx.rect(x - size / 2, y - size / 2, size, size);
                ctx.fill();
                ctx.stroke();
            } else if (currentFigure === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(x, y - size / 2);
                ctx.lineTo(x - size / 2, y + size / 2);
                ctx.lineTo(x + size / 2, y + size / 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            } else if (currentFigure === 'polygon') {
                var sides = parseInt(prompt('Número de lados del polígono:')) || 6; // Valor predeterminado en caso de no ingresar un número
                if (sides < 3) {
                    alert('Un polígono debe tener al menos 3 lados.');
                    return;
                }
                var angle = (2 * Math.PI) / sides;
                ctx.beginPath();
                for (var i = 0; i < sides; i++) {
                    ctx.lineTo(
                        x + size * Math.cos(i * angle),
                        y + size * Math.sin(i * angle)
                    );
                }
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    updateButton.addEventListener('click', drawFigure);
});
