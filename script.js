let pantalla;
let valorActual = '0';
let valorAnterior = '';
let operacionActual = '';

document.addEventListener('DOMContentLoaded', function() {
    pantalla = document.getElementById('pantalla');
});

function agregarNumero(numero) {
    if (valorActual === '0') {
        valorActual = numero;
    } else {
        valorActual += numero;
    }
    actualizarPantalla();
}

function operacion(op) {
    if (valorAnterior !== '') {
        calcular();
    }
    operacionActual = op;
    valorAnterior = valorActual;
    valorActual = '0';
}

function aplicarPorcentaje() {
    const actual = parseFloat(valorActual);
    // Caso: solo número → 50 % = 0.5
    if (!valorAnterior || !operacionActual) {
        const resultado = actual / 100;
        valorActual = resultado.toString();
        actualizarPantalla();
        return;
    }
    // Caso: a + b% → b% relativo a a
    const anterior = parseFloat(valorAnterior);
    const resultado = anterior * (actual / 100);

    valorActual = resultado.toString();
    actualizarPantalla();
}

function cambiarSigno() {
    // Si el valor actual es 0, no hace nada
    if (valorActual === '0') return;
    // Convertir a número
    let numero = parseFloat(valorActual);
    // Cambiar signo
    numero = numero * -1;
    valorActual = numero.toString();
    actualizarPantalla();
}

function calcular() {
    if (operacionActual === '' || valorAnterior === '') return;
    
    let resultado;
    const anterior = parseFloat(valorAnterior);
    const actual = parseFloat(valorActual);

    if (operacionActual === '+') {
        resultado = anterior + actual;
    }else if(operacionActual === '-'){
        resultado = anterior - actual;
    }else if(operacionActual === 'x'){
        resultado = anterior * actual;
    }else if(operacionActual === '÷'){
        resultado = anterior / actual;
    }

    valorActual = resultado.toString();
    operacionActual = '';
    valorAnterior = '';
    actualizarPantalla();
}

function limpiar() {
    valorActual = '0';
    valorAnterior = '';
    operacionActual = '';
    actualizarPantalla();
}

function actualizarPantalla() {
    if (pantalla) {
        pantalla.textContent = valorActual;
    }
}

window.cambiarSigno = cambiarSigno;
window.aplicarPorcentaje = aplicarPorcentaje;
window.agregarNumero = agregarNumero;
window.operacion = operacion;
window.calcular = calcular;
window.limpiar = limpiar;