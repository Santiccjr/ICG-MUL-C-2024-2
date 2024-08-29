class Poligonos {
    #x;
    #y;
    #n;
    #l;

    constructor(x, y, n, l) {
        this.#x = x;
        this.#y = y;
        this.#n = n;
        this.#l = l;
    }

    cart2polar(x, y) {
        const r = Math.sqrt(x * x + y * y);
        const angle = Math.atan2(y, x);
        return [r, angle];
    }

    polar2cart(r, angle, i, d) {
        const x = r * Math.cos(i * d + angle);
        const y = r * Math.sin(i * d + angle);
        return [x, y];
    }


    findAngle(n) {
        return 2 * Math.PI / n;
    }


    Poligono() {
        const d = this.findAngle(this.#n); 
        const r = this.#l / (2 * Math.sin(Math.PI / this.#n)); 
        const vertices = [];

        for (let i = 0; i < this.#n; i++) {
            const angle = i * d; 
            const [vx, vy] = this.polar2cart(r, angle, 0, 0); 
            vertices.push([this.#x + vx, this.#y + vy]); 
        }

        this.Dibujar(vertices);
    }


    Dibujar(vertices) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(vertices[0][0], vertices[0][1]);

        for (let i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i][0], vertices[i][1]);
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
