
// Main elements from html

const from = document.getElementById('form-coche');
const listaCoches = document.getElementById('lista-coche');
const contador = document.getElementById('contador');
const btnresumen = document.getElementById('btn-resumen');

// input fields from html
const marcaI = document.getElementById('marca');
const modeloI = document.getElementById('modelo');
const anioI = document.getElementById('anio');
const precioI = document.getElementById('precio');

let coches = [];

function agregarCoche() {
    const marca = marcaI.value.trim();
    const modelo = modeloI.value.trim();
    const anio = anioI.value();
    const precio = precioI.value();
}

function mostrarCoches(coche) { 
}
function mostrarResumen() {
  
}  

function calcularPromedio(){

}