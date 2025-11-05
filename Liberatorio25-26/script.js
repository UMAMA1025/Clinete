// script.js

// Array to store all cars
const coches = [];

// Select form elements
const form = document.getElementById('form-coche');
const marcaInput = document.getElementById('marca');
const modeloInput = document.getElementById('modelo');
const anioInput = document.getElementById('anio');
const precioInput = document.getElementById('precio');
const listaCoches = document.getElementById('lista-coches');
const contador = document.getElementById('contador');
const btnResumen = document.getElementById('btn-resumen');

// Helper function to create a car HTML element
function crearCocheElemento(coche) {
  const div = document.createElement('div');
  div.classList.add('coche');

  // Check if image exists, else use none.jpg
  const img = document.createElement('img');
  const imgPath = `Imagenes/${coche.marca.toLowerCase()}.jpg`;
  img.src = imgPath;
  img.onerror = () => img.src = 'Imagenes/none.jpg';
  div.appendChild(img);

  // Car info
  const info = document.createElement('div');
  info.classList.add('coche-info');
  info.innerHTML = `
    <strong>${coche.marca} ${coche.modelo}</strong>
    Año: ${coche.anio} | Precio: €${coche.precio}
  `;
  div.appendChild(info);

  return div;
}

// Update car list on the page
function actualizarLista() {
  listaCoches.innerHTML = '';
  coches.forEach(coche => {
    listaCoches.appendChild(crearCocheElemento(coche));
  });
  contador.textContent = coches.length;
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const marca = marcaInput.value.trim();
  const modelo = modeloInput.value.trim();
  const anio = parseInt(anioInput.value.trim());
  const precio = parseFloat(precioInput.value.trim());
  const currentYear = new Date().getFullYear();

  // Validation
  if (!marca || !modelo || !anioInput.value || !precioInput.value) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  if (anio > currentYear) {
    alert(`El año no puede ser mayor que ${currentYear}.`);
    return;
  }

  // Create car object with registration date
  const coche = {
    marca,
    modelo,
    anio,
    precio,
    fechaRegistro: new Date()
  };

  coches.push(coche);

  // Update UI
  actualizarLista();

  // Reset form
  form.reset();
});

// Show summary window
btnResumen.addEventListener('click', () => {
  if (coches.length === 0) {
    alert('No hay coches registrados.');
    return;
  }

  const totalCoches = coches.length;
  const promedioPrecio = Math.round(coches.reduce((sum, c) => sum + c.precio, 0) / totalCoches);

  // Open new window
  const resumenVentana = window.open('', 'Resumen', 'width=400,height=300');
  resumenVentana.document.write(`
    <h2>Resumen de Coches</h2>
    <p>Total de coches: ${totalCoches}</p>
    <p>Precio promedio: €${promedioPrecio}</p>
    <button onclick="window.close()">Cerrar</button>
  `);
});
