class Cartesiano {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    sumar(punto) {
        return new Cartesiano(this.x + punto.x, this.y + punto.y);
    }
}

class Poligonos {
    #centro;
    #n;
    #l;

    constructor(x, y, n, l) {
        this.#centro = new Cartesiano(x, y); 
        this.#n = n;
        this.#l = l;
    }

    polar2cart(r, angle) {
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        return new Cartesiano(x, y);
    }

    findAngle(n) {
        return 2 * Math.PI / n;
    }

    Poligono() {
        const d = this.findAngle(this.#n); 
        const r = this.#l / (2 * Math.sin(Math.PI / this.#n)); 
        const vertices = [];

        // Ajustamos el ángulo inicial para que la base esté horizontal en la parte inferior
        const initialAngle = -Math.PI / 2;

        for (let i = 0; i < this.#n; i++) {
            const angle = i * d + initialAngle; // Ajustamos el ángulo inicial
            const vertice = this.polar2cart(r, angle); 
            vertices.push(this.#centro.sumar(vertice)); 
        }

        this.Dibujar(vertices);
    }

    Dibujar(vertices) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);

        for (let i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }

        ctx.closePath();
        ctx.stroke();
    }
}

function dibujarPoligono() {
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);
    const l = parseFloat(document.getElementById('l').value);
    const n = parseInt(document.getElementById('n').value, 10);

    if (!isNaN(x) && !isNaN(y) && !isNaN(l) && !isNaN(n) && n >= 3) {
        const poligono = new Poligonos(x, y, n, l);
        poligono.Poligono();
    } else {
        alert("Por favor, asegúrate de que todos los valores sean válidos y que el número de lados sea al menos 3.");
    }
}
