const svgCanvas = document.getElementById('svgCanvas');

// Clase base para las primitivas con encapsulamiento
class Primitiva {
    #color;

    constructor(color) {
        this.#color = color;
    }

    getColor() {
        return this.#color;
    }

    crearElemento(tipo) {
        const elem = document.createElementNS('http://www.w3.org/2000/svg', tipo);
        elem.setAttribute('stroke', this.getColor());
        elem.setAttribute('fill', 'none');
        return elem;
    }
}

// Clase para líneas con encapsulamiento
class Linea extends Primitiva {
    #x1;
    #y1;
    #x2;
    #y2;

    constructor(x1, y1, x2, y2, color) {
        super(color);
        this.#x1 = x1;
        this.#y1 = y1;
        this.#x2 = x2;
        this.#y2 = y2;
    }

    dibujar() {
        const linea = this.crearElemento('line');
        linea.setAttribute('x1', this.#x1);
        linea.setAttribute('y1', this.#y1);
        linea.setAttribute('x2', this.#x2);
        linea.setAttribute('y2', this.#y2);
        svgCanvas.appendChild(linea);
    }
}

// Clase para circunferencias con encapsulamiento
class Circunferencia extends Primitiva {
    #cx;
    #cy;
    #r;

    constructor(cx, cy, r, color) {
        super(color);
        this.#cx = cx;
        this.#cy = cy;
        this.#r = r;
    }

    dibujar() {
        const circunferencia = this.crearElemento('circle');
        circunferencia.setAttribute('cx', this.#cx);
        circunferencia.setAttribute('cy', this.#cy);
        circunferencia.setAttribute('r', this.#r);
        svgCanvas.appendChild(circunferencia);
    }
}

// Clase para elipses con encapsulamiento
class Elipse extends Primitiva {
    #cx;
    #cy;
    #rx;
    #ry;

    constructor(cx, cy, rx, ry, color) {
        super(color);
        this.#cx = cx;
        this.#cy = cy;
        this.#rx = rx;
        this.#ry = ry;
    }

    dibujar() {
        const elipse = this.crearElemento('ellipse');
        elipse.setAttribute('cx', this.#cx);
        elipse.setAttribute('cy', this.#cy);
        elipse.setAttribute('rx', this.#rx);
        elipse.setAttribute('ry', this.#ry);
        svgCanvas.appendChild(elipse);
    }
}

// Crear y dibujar las primitivas con encapsulamiento
const linea = new Linea(50, 50, 200, 200, 'black');
const circunferencia = new Circunferencia(300, 100, 50, 'black');
const elipse = new Elipse(400, 300, 80, 50, 'black');

// Dibujar en el lienzo
linea.dibujar();
circunferencia.dibujar();
elipse.dibujar();
