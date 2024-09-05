class Cartesiana {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    sumar(punto) {
        return new Cartesiana(this.#x + punto.getX(), this.#y + punto.getY());
    }
}

class Polar {
    #radio;
    #angulo;

    constructor(radio, angulo) {
        this.#radio = radio;
        this.#angulo = angulo;
    }

    getRadio() {
        return this.#radio;
    }

    getAngulo() {
        return this.#angulo;
    }

    aCartesiana() {
        const x = this.#radio * Math.cos(this.#angulo);
        const y = this.#radio * Math.sin(this.#angulo);
        return new Cartesiana(x, y);
    }
}

class Poligonos {
    #centro;
    #n;
    #l;

    constructor(x, y, n, l) {
        this.#centro = new Cartesiana(x, y);
        this.#n = n;
        this.#l = l;
    }

    findAngle() {
        return 2 * Math.PI / this.#n;
    }

    static apotemaToLado(apotema, n) {
        return 2 * apotema * Math.tan(Math.PI / n);
    }

    Poligono() {
        const d = this.findAngle();
        const r = this.#l / (2 * Math.sin(Math.PI / this.#n));
        const vertices = [];

        const initialAngle = -Math.PI / 2;

        for (let i = 0; i < this.#n; i++) {
            const angle = i * d + initialAngle;
            const puntoPolar = new Polar(r, angle);
            const vertice = puntoPolar.aCartesiana();
            vertices.push(this.#centro.sumar(vertice));
        }

        this.Dibujar(vertices);
    }

    Dibujar(vertices) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(vertices[0].getX(), vertices[0].getY());

        for (let i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].getX(), vertices[i].getY());
        }

        ctx.closePath();
        ctx.stroke();
    }
}

function cambiarOpcion() {
    const option = document.getElementById('option').value;
    const ladoInput = document.getElementById('l');
    const apotemaInput = document.getElementById('a');

    if (option === "lado") {
        ladoInput.disabled = false;
        apotemaInput.disabled = true;
        apotemaInput.value = '';
    } else {
        ladoInput.disabled = true;
        apotemaInput.disabled = false;
        ladoInput.value = '';
    }
}

function dibujarPoligono(event) {
    if (event) event.preventDefault();

    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);
    const n = parseInt(document.getElementById('n').value, 10);
    const option = document.getElementById('option').value;
    let l = parseFloat(document.getElementById('l').value);
    let a = parseFloat(document.getElementById('a').value);

    if (!isNaN(x) && !isNaN(y) && !isNaN(n) && n >= 3) {
        if (option === 'lado' && !isNaN(l) && l > 0) {
            const poligono = new Poligonos(x, y, n, l);
            poligono.Poligono();
        } else if (option === 'apotema' && !isNaN(a) && a > 0) {
            l = Poligonos.apotemaToLado(a, n);
            const poligono = new Poligonos(x, y, n, l);
            poligono.Poligono();
        } else {
            alert("Por favor, ingresa un valor válido para el lado o el apotema.");
        }
    } else {
        alert("Por favor, asegúrate de que todos los valores sean válidos y que el número de lados sea al menos 3.");
    }
}

// Inicializamos los campos deshabilitados correctamente
cambiarOpcion();
