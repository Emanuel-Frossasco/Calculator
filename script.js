let pantalla;
let valorActual = "0";
let valorAnterior = "";
let operacionActual = "";
let expresionCompleta = "";

document.addEventListener("DOMContentLoaded", () => {
    pantalla = document.getElementById("pantalla");
});

function modoCientificoActivo() {
    return document.getElementById("calculadora").classList.contains("modo-cientifico");
}

function cambiarModo() {
    const calc = document.getElementById("calculadora");
    const btn = document.getElementById("botonModo");
    if (modoCientificoActivo()) {
        calc.classList.remove("modo-cientifico");
        btn.textContent = "Modo Científico";
    } else {
        calc.classList.add("modo-cientifico");
        btn.textContent = "Modo Básico";
    }
    expresionCompleta = "";
    valorActual = "0";
    actualizarPantalla();
}

function agregarNumero(t) {
    if (modoCientificoActivo()) {
        expresionCompleta += t;
        valorActual = t;
        actualizarPantalla();
        return;
    }
    if (valorActual === "0") valorActual = t;
    else valorActual += t;
    actualizarPantalla();
}

function agregarConstante(c) {
    const val = (c === "pi") ? "pi" : "e";
    if (modoCientificoActivo()) {
        expresionCompleta += val;
        valorActual = val;
    }else{
        valorActual = (c === "pi" ? Math.PI : Math.E).toString();
    }
    actualizarPantalla();
}

function funcionCientifica(f) {
    if (modoCientificoActivo()) {
        expresionCompleta += f + "(";
        valorActual = f + "(";
        actualizarPantalla();
        return;
    }
}

function operacion(op) {
    if (modoCientificoActivo()) {
        const o = op === "÷" ? "/" : (op === "x" ? "*" : op);
        expresionCompleta += o;
        valorActual = o;
        actualizarPantalla();
        return;
    }
    if (valorAnterior !== "") calcular();
    operacionActual = op;
    valorAnterior = valorActual;
    valorActual = "0";
}

function aplicarPorcentaje() {
    const actual = parseFloat(valorActual);
    if (!valorAnterior || !operacionActual) {
        const resultado = actual / 100;
        valorActual = resultado.toString();
        actualizarPantalla();
        return;
    }
    const anterior = parseFloat(valorAnterior);
    const resultado = anterior * (actual / 100);
    valorActual = resultado.toString();
    actualizarPantalla();
}

function cambiarSigno() {
    if (modoCientificoActivo()) {
        expresionCompleta += "*(-1)";
        valorActual = "-";
        actualizarPantalla();
        return;
    }
    valorActual = (parseFloat(valorActual) * -1).toString();
    actualizarPantalla();
}

function evaluarExpresion() {
    let exp = expresionCompleta;
    if (!exp || exp.trim() === "") return;
    exp = exp.replace(/×/g, "*").replace(/÷/g, "/").replace(/π/g, "pi");
    exp = exp.replace(/\s+/g, "");
    exp = exp.replace(/[+\-*/.]$/g, "");
    // Autocerrar paréntesis
    const abiertos = (exp.match(/\(/g) || []).length;
    const cerrados = (exp.match(/\)/g) || []).length;
    if (abiertos > cerrados) exp += ")".repeat(abiertos - cerrados);
    if (/[;{}<>]/.test(exp)) {
        valorActual = "Error";
        expresionCompleta = "";
        actualizarPantalla();
        return;
    }
    const mathFns = {
        sin: x => Math.sin(x * Math.PI / 180),
        cos: x => Math.cos(x * Math.PI / 180),
        tan: x => Math.tan(x * Math.PI / 180),
        log: x => (Math.log10 ? Math.log10(x) : Math.log(x) / Math.log(10)),
        ln:  x => Math.log(x),
        sqrt: Math.sqrt,
        exp: Math.exp,
        pow: x => Math.pow(x, 2),
        pi: Math.PI,
        e: Math.E
    };
    try {
        const fn = new Function(...Object.keys(mathFns), `return (${exp});`);
        const result = fn(...Object.values(mathFns));
        valorActual = (result === undefined || result === null) ? "Error" : result.toString();
    } catch (err) {
        valorActual = "Error";
    }
    expresionCompleta = "";
    actualizarPantalla();
}

function calcular() {
    if (modoCientificoActivo()) {
        evaluarExpresion();
        return;
    }
    const a = parseFloat(valorAnterior);
    const b = parseFloat(valorActual);
    let r = 0;
    switch (operacionActual) {
        case "+": r = a + b; break;
        case "-": r = a - b; break;
        case "x": r = a * b; break;
        case "÷": r = a / b; break;
    }
    valorActual = r.toString();
    valorAnterior = "";
    operacionActual = "";
    actualizarPantalla();
}

function limpiar() {
    valorActual = "0";
    valorAnterior = "";
    operacionActual = "";
    expresionCompleta = "";
    actualizarPantalla();
}

function actualizarPantalla() {
    if (!modoCientificoActivo()) {
        pantalla.textContent = valorActual;
    }else{
        pantalla.textContent = expresionCompleta || valorActual;
    }
}

window.cambiarModo = cambiarModo;
window.agregarConstante = agregarConstante;
window.funcionCientifica = funcionCientifica;
window.cambiarSigno = cambiarSigno;
window.aplicarPorcentaje = aplicarPorcentaje;
window.agregarNumero = agregarNumero;
window.operacion = operacion;
window.calcular = calcular;
window.limpiar = limpiar;
