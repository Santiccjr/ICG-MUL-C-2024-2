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

function ordenarPuntos(puntos) {
    const centerX = 600 / 2;
    const centerY = 400 / 2;

    const angulos = puntos.map(p => ({
        punto: p,
        angulo: Math.atan2(p.y - centerY, p.x - centerX)
    }));

    return burbuja(angulos).map(a => a.punto);
}

function burbuja(angulos) {
    for (let i = 0; i < angulos.length; i++) {
        for (let j = 0; j < angulos.length - 1; j++) {
            if (angulos[j].angulo > angulos[j + 1].angulo) {
                [angulos[j], angulos[j + 1]] = [angulos[j + 1], angulos[j]];
            }
        }
    }
    return angulos;
}

function dibujar() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ordenar los puntos
    const puntosOrdenados = ordenarPuntos(puntos);

    const esConvexo = verificarConvexidad(puntosOrdenados);
    document.getElementById('result').innerText = esConvexo ? "La figura es convexa." : "La figura es cóncava.";

    // Trazado rasterizado
    ctx.beginPath();
    ctx.moveTo(puntosOrdenados[0].x, puntosOrdenados[0].y);

    for (let i = 1; i < puntosOrdenados.length; i++) {
        ctx.lineTo(puntosOrdenados[i].x, puntosOrdenados[i].y);
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
