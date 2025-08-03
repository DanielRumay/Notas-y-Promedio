const num1 = document.getElementById("n1");
const num2 = document.getElementById("n2");
const num3 = document.getElementById("n3");
const num4 = document.getElementById("n4");
const resultado = document.getElementById("resultado");
const inputs = document.querySelectorAll(".entrada");
const imagen = document.getElementById("imagenResultado");
const textoImagen = document.getElementById("textoImagen");
const necesario = document.getElementById("necesario");

function actualizarResultado() {
    const val1 = parseFloat(num1.value);
    const val2 = parseFloat(num2.value);
    const val3 = parseFloat(num3.value);
    const val4 = parseFloat(num4.value);

    // Verificamos cuántos valores originales son válidos
    const valoresOriginales = [val1, val2, val3, val4];
    const entradasValidas = valoresOriginales.filter(val => !isNaN(val));

    if (entradasValidas.length < 1) {
        imagen.src = "./img/espera.png";
        return;
    }

    // Procesar cada valor SOLO si es válido
    const procesado1 = !isNaN(val1) ? val1 * 0.25 : 0;
    const procesado2 = !isNaN(val2) ? val2 * 0.2 : 0;
    const procesado3 = !isNaN(val3) ? val3 * 0.3 : 0;
    const procesado4 = !isNaN(val4) ? val4 * 0.25 : 0;

    // Suma total (solo incluye lo procesado de los campos válidos)
    let suma = 0;
    if (entradasValidas.length < 4) {
        if (!isNaN(val1)) suma += procesado1;
        if (!isNaN(val2)) suma += procesado2;
        if (!isNaN(val3)) suma += procesado3;
        if (!isNaN(val4)) suma += procesado4;

        resultado.textContent = `Nota Promedio: ${suma.toFixed(2)}`;
        imagen.src = suma < 11 ? "./img/mal.png" : "./img/bien.png";
        textoImagen.textContent = suma < 11 ? "Desaprobado" : "Aprobado";
        necesario.textContent = suma < 11 ? `Nota Faltante: ${(11-suma).toFixed(2)}` : ``;
    } else {
        suma = procesado1 + procesado2 + procesado3 + procesado4;
        resultado.textContent = `Nota Final: ${suma.toFixed(2)}`;
        imagen.src = suma < 11 ? "./img/mal.png" : "./img/bien.png";
        textoImagen.textContent = suma < 11 ? "Desaprobado" : "Aprobado";
        necesario.textContent = suma < 11 ? `Nota Faltante: ${(11-suma).toFixed(2)}` : ``;
    }
}

inputs.forEach(input => input.addEventListener("input", actualizarResultado));