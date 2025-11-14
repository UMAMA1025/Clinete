document.addEventListener("DOMContentLoaded", () => {
  const btnCargar = document.getElementById("cargar");
  const selectPersonajes = document.getElementById("selectPersonajes");
  const form = document.forms["formulario"];

  let personajesJSON = [];
  let datosXML;

  // When clicking "Datos"
  btnCargar.addEventListener("click", () => {
    // 1️⃣ Load JSON with AJAX
    const xhrJSON = new XMLHttpRequest();
    xhrJSON.open("GET", "hp_characters.json", true);
    xhrJSON.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const jsonData = JSON.parse(this.responseText);
        personajesJSON = jsonData.personajes;

        // Fill select
        selectPersonajes.innerHTML = "<option value=''>Selecciona un personaje</option>";
        personajesJSON.forEach(p => {
          const opt = document.createElement("option");
          opt.value = p.code;
          opt.textContent = p.name;
          selectPersonajes.appendChild(opt);
        });

        // 2️⃣ Load XML with AJAX
        const xhrXML = new XMLHttpRequest();
        xhrXML.open("GET", "hp_datos.xml", true);
        xhrXML.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            datosXML = this.responseXML;
            alert("Datos cargados correctamente ✅");
          }
        };
        xhrXML.send();
      }
    };
    xhrJSON.send();
  });

  // When selecting a character
  selectPersonajes.addEventListener("change", () => {
    const code = selectPersonajes.value;
    if (!code || !datosXML) return;

    const personajes = datosXML.getElementsByTagName("personaje");
    let personajeSeleccionado = null;

    // Find matching <personaje> by <code>
    for (let i = 0; i < personajes.length; i++) {
      const codeXML = personajes[i].getElementsByTagName("code")[0].textContent.trim();
      if (codeXML === code) {
        personajeSeleccionado = personajes[i];
        break;
      }
    }

    if (!personajeSeleccionado) return;

    const data = personajeSeleccionado.getElementsByTagName("data")[0];

    // Helper to get tag safely
    const getValue = tag => {
      const el = data.getElementsByTagName(tag)[0];
      return el && el.textContent ? el.textContent.trim() : "";
    };

    // Fill form fields
    form.species.value = getValue("species");
    form.house.value = getValue("house");
    form.dateOfBirth.value = getValue("dateOfBirth");
    form.actor.value = getValue("actor");

    // Gender
    const gender = getValue("gender");
    form.male.checked = gender === "male";
    form.female.checked = gender === "female";

   

  const images = getValue("image");
  form.foto.src = images ? images : "";
  form.foto.alt = selectPersonajes.options[selectPersonajes.selectedIndex].text;

     });
});