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

// Clase para puntos con encapsulamiento
class Punto extends Primitiva {
    #x;
    #y;
    
    constructor(x, y, color) {
        super(color);
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    dibujar() {
        const punto = this.crearElemento('circle');
        punto.setAttribute('cx', this.#x);
        punto.setAttribute('cy', this.#y);
        punto.setAttribute('r', 1);
        punto.setAttribute('fill', this.getColor()); 
        svgCanvas.appendChild(punto);
    }
}

// Clase para líneas usando dos puntos
class Linea extends Primitiva {
    #punto1;
    #punto2;

    constructor(punto1, punto2, color) {
        super(color);
        this.#punto1 = punto1;
        this.#punto2 = punto2;
    }

    dibujar() {
        const linea = this.crearElemento('line');
        linea.setAttribute('x1', this.#punto1.getX());
        linea.setAttribute('y1', this.#punto1.getY());
        linea.setAttribute('x2', this.#punto2.getX());
        linea.setAttribute('y2', this.#punto2.getY());
        svgCanvas.appendChild(linea);
    }
}

// Clase para circunferencias usando un punto para las coordenadas del centro
class Circunferencia extends Primitiva {
    #centro;
    #r;

    constructor(centro, r, color) {
        super(color);
        this.#centro = centro;
        this.#r = r;
    }

    dibujar() {
        const circunferencia = this.crearElemento('circle');
        circunferencia.setAttribute('cx', this.#centro.getX());
        circunferencia.setAttribute('cy', this.#centro.getY());
        circunferencia.setAttribute('r', this.#r);
        svgCanvas.appendChild(circunferencia);

        // Dibuja el centro de la circunferencia
        this.#centro.dibujar();
    }
}

// Clase para elipses usando un punto para las coordenadas del centro
class Elipse extends Primitiva {
    #centro;
    #rx;
    #ry;

    constructor(centro, rx, ry, color) {
        super(color);
        this.#centro = centro;
        this.#rx = rx;
        this.#ry = ry;
    }

    dibujar() {
        const elipse = this.crearElemento('ellipse');
        elipse.setAttribute('cx', this.#centro.getX());
        elipse.setAttribute('cy', this.#centro.getY());
        elipse.setAttribute('rx', this.#rx);
        elipse.setAttribute('ry', this.#ry);
        svgCanvas.appendChild(elipse);

        // Dibuja el centro de la elipse
        this.#centro.dibujar();
    }
}

// Crear los puntos
const punto1 = new Punto(10 , 50, 'red');
const punto2 = new Punto(200, 200, 'red');
const centro1 = new Punto(300, 100, 'blue'); 
const centro2 = new Punto(400, 300, 'green');

// Crear la línea con dos puntos
const linea = new Linea(punto1, punto2, 'black');

// Crear otras primitivas
const circunferencia = new Circunferencia(centro1, 50, 'black');
const elipse = new Elipse(centro2, 80, 50, 'black');

// Dibujar las primitivas en el lienzo
punto1.dibujar();
punto2.dibujar();
linea.dibujar();
circunferencia.dibujar();
elipse.dibujar();
