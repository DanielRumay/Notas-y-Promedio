const cantidadInput = document.getElementById("cantidadComponentes");
const contenedor = document.getElementById("contenedorEntradas");
const resultadoTotal = document.getElementById("resultadoTotal");

let componentesActuales = 0;

cantidadInput.addEventListener("input", () => {
    let cantidad = parseInt(cantidadInput.value) || 0;

    if (cantidad < 1) cantidad = 1;
    if (cantidad > 10) cantidad = 10;

    cantidadInput.value = cantidad;

    actualizarComponentes(cantidad);
    calcularResultadoTotal();
});

function actualizarComponentes(cantidad) {
    while (contenedor.children.length > cantidad * 1) {
        contenedor.removeChild(contenedor.lastChild);
    }

    for (let i = componentesActuales + 1; i <= cantidad; i++) {
        const grupo = document.createElement("div");
        grupo.className = "mb-3 row align-items-center";
        grupo.id = `Cursos-${i}`;
        grupo.innerHTML = `
            <div class="col-12 mb-1">
                <label class="form-label fw-bold">${i}° Cursos</label>
            </div>
            <div class="col-6 d-flex align-items-center mb-2">
                <label class="me-2 mb-0">Nota:</label>
                <input type="text" class="form-control entrada" data-grupo="${i}" data-tipo="a" />
            </div>
            <div class="col-6 d-flex align-items-center mb-2">
                <label class="me-2 mb-0">Credito:</label>
                <input type="text" class="form-control entrada" data-grupo="${i}" data-tipo="b" />
            </div>
        `;
        contenedor.appendChild(grupo);

        grupo.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", calcularResultadoTotal);
        });
    }

    componentesActuales = cantidad;
}

function calcularResultadoTotal() {
    let sumaTotal = 0;
    let sumaCreditos = 0;

    const grupos = document.querySelectorAll('[id^="Cursos-"]');

    grupos.forEach(grupo => {
        const inputA = grupo.querySelector('input[data-tipo="a"]');
        const inputB = grupo.querySelector('input[data-tipo="b"]');

        const valA = parseFloat(inputA?.value);
        const valB = parseFloat(inputB?.value);

        if (!isNaN(valA) && !isNaN(valB)) {
            sumaTotal += valA * valB;
            sumaCreditos += valB;
        }
    });

    if (sumaCreditos > 0) {
        resultadoTotal.textContent = (sumaTotal / sumaCreditos).toFixed(2);
    } else {
        resultadoTotal.textContent = "0.00";
    }
}

actualizarComponentes(1);