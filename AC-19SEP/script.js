const svgCanvas = document.getElementById('svgCanvas');

// Clase base para las primitivas
class Primitiva {
    constructor(color) {
        this.color = color;
    }

    crearElemento(tipo) {
        const elem = document.createElementNS('http://www.w3.org/2000/svg', tipo);
        elem.setAttribute('stroke', this.color);
        elem.setAttribute('fill', 'none'); // Sin relleno
        return elem;
    }
}

// Clase para líneas
class Linea extends Primitiva {
    constructor(x1, y1, x2, y2, color) {
        super(color);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar() {
        const linea = this.crearElemento('line');
        linea.setAttribute('x1', this.x1);
        linea.setAttribute('y1', this.y1);
        linea.setAttribute('x2', this.x2);
        linea.setAttribute('y2', this.y2);
        svgCanvas.appendChild(linea);
    }
}

// Clase para circunferencias
class Circunferencia extends Primitiva {
    constructor(cx, cy, r, color) {
        super(color);
        this.cx = cx;
        this.cy = cy;
        this.r = r;
    }

    dibujar() {
        const circunferencia = this.crearElemento('circle');
        circunferencia.setAttribute('cx', this.cx);
        circunferencia.setAttribute('cy', this.cy);
        circunferencia.setAttribute('r', this.r);
        svgCanvas.appendChild(circunferencia);
    }
}

// Clase para elipses
class Elipse extends Primitiva {
    constructor(cx, cy, a, b, color) {
        super(color);
        this.cx = cx;
        this.cy = cy;
        this.a = a;
        this.b = b;
    }

    dibujar() {
        const elipse = this.crearElemento('ellipse');
        elipse.setAttribute('cx', this.cx);
        elipse.setAttribute('cy', this.cy);
        elipse.setAttribute('rx', this.a);
        elipse.setAttribute('ry', this.b);
        svgCanvas.appendChild(elipse);
    }
}

// Crear y dibujar las primitivas
const lineas = new Linea(50, 50, 200, 200, 'black');
const circunferencia = new Circunferencia(300, 100, 50, 'black');
const elipse = new Elipse(400, 300, 80, 50, 'black');

// Dibujar en el lienzo
lineas.dibujar();
circunferencia.dibujar();
elipse.dibujar();
