class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

let puntos = [];

function generarPuntos() {
    puntos = [];
    const numPuntos = Math.floor(Math.random() * (20 - 3 + 1)) + 3;

    for (let i = 0; i < numPuntos; i++) {
        const x = Math.floor(Math.random() * 600);
        const y = Math.floor(Math.random() * 400);
        puntos.push(new Punto(x, y));
    }

    dibujar();
}

function dibujar() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ordenar los puntos en sentido antihorario
    puntos.sort((a, b) => Math.atan2(a.y - canvas.height / 2, a.x - canvas.width / 2) - 
                          Math.atan2(b.y - canvas.height / 2, b.x - canvas.width / 2));

    const esConvexo = verificarConvexidad(puntos);
    document.getElementById('result').innerText = esConvexo ? "La figura es convexa." : "La figura es cóncava.";

    // Trazado rasterizado
    ctx.beginPath();
    ctx.moveTo(puntos[0].x, puntos[0].y);

    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i].x, puntos[i].y);
    }

    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function verificarConvexidad(puntos) {
    let sign = 0;

    for (let i = 0; i < puntos.length; i++) {
        const p1 = puntos[i];
        const p2 = puntos[(i + 1) % puntos.length];
        const p3 = puntos[(i + 2) % puntos.length];

        const det = (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
        if (det !== 0) {
            if (sign === 0) {
                sign = Math.sign(det);
            } else if (Math.sign(det) !== sign) {
                return false; // Cóncava
            }
        }
    }
    return true; // Convexa
}

document.getElementById('generateBtn').addEventListener('click', generarPuntos);

// Generar puntos inicialmente
generarPuntos();
