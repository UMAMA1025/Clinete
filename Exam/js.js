// 1️⃣ Contact Object Constructor
// This function defines a "Contact" with a first name, last name, and an array of phone numbers.
function Contacto(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefonos = [];
}

// Add a method to the Contact prototype to add phone numbers
Contacto.prototype.agregarTelefono = function(numero, tipo) {
    this.telefonos.push({ numero, tipo });
};

// 2️⃣ List of contacts
// This array will store all the contact objects we create
let contactos = [];

// 3️⃣ Function to create a contact form dynamically when button is clicked
document.getElementById('agregar-contacto-btn').addEventListener('click', () => {
    const formContainer = document.createElement('div'); // Create a div to hold the form
    formContainer.classList.add('contacto-form');

    // Insert HTML for the contact form
    formContainer.innerHTML = `
        <input type="text" placeholder="Nombre" class="nombre">
        <input type="text" placeholder="Apellido" class="apellido">
        <div class="telefonos">
            <div>
                <input type="text" placeholder="Teléfono">
                <select>
                    <option value="móvil">Móvil</option>
                    <option value="fijo">Fijo</option>
                </select>
            </div>
            <button class="agregar-telefono">Agregar Teléfono</button>
        </div>
        <button class="guardar-contacto">Guardar Contacto</button>
        <hr>
    `;

    // Add the form to the page
    document.getElementById('formularios-contactos').appendChild(formContainer);

    const telefonosDiv = formContainer.querySelector('.telefonos');

    // 4️⃣ Add more phone number inputs dynamically
    formContainer.querySelector('.agregar-telefono').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission
        const newTelefono = document.createElement('div'); // Create a new div for additional phone
        newTelefono.innerHTML = `
            <input type="text" placeholder="Teléfono">
            <select>
                <option value="móvil">Móvil</option>
                <option value="fijo">Fijo</option>
            </select>
        `;
        // Insert the new phone input above the "Add Phone" button
        telefonosDiv.insertBefore(newTelefono, formContainer.querySelector('.agregar-telefono'));
    });

    // 5️⃣ Save the contact when the "Save Contact" button is clicked
    formContainer.querySelector('.guardar-contacto').addEventListener('click', (e) => {
        e.preventDefault();
        const nombre = formContainer.querySelector('.nombre').value.trim();
        const apellido = formContainer.querySelector('.apellido').value.trim();

        // Check that both first name and last name are entered
        if(!nombre || !apellido){
            alert('Debe ingresar nombre y apellido.');
            return;
        }

        const contacto = new Contacto(nombre, apellido);

        // Loop through all phone number inputs and add them to the contact
        const telefonosInputs = telefonosDiv.querySelectorAll('div');
        telefonosInputs.forEach(telDiv => {
            const input = telDiv.querySelector('input');
            const select = telDiv.querySelector('select');
            if(input && input.value.trim()){
                contacto.agregarTelefono(input.value.trim(), select.value);
            }
        });

        // Add the new contact to the contacts list
        contactos.push(contacto);
        alert(`Contacto ${nombre} ${apellido} guardado.`);
    });
});

// 6️⃣ Print all contacts sorted by name
document.getElementById('imprimir-contactos-btn').addEventListener('click', () => {
    const resultado = document.getElementById('resultado');

    // Sort contacts alphabetically by first name
    contactos.sort((a, b) => a.nombre.localeCompare(b.nombre));

    let texto = '';
    contactos.forEach(c => {
        // Sort the contact's phone numbers alphabetically
        c.telefonos.sort((a, b) => a.numero.localeCompare(b.numero));
        texto += `Nombre: ${c.nombre} ${c.apellido}\n`;
        c.telefonos.forEach(t => {
            texto += `  ${t.tipo}: ${t.numero}\n`;
        });
        texto += '\n';
    });

    // Display the result or a message if there are no contacts
    resultado.textContent = texto || 'No hay contactos.';
});
