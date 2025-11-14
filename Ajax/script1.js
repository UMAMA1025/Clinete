  document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------
    // DOM PART (UI references)
    // ----------------------------
    const btnCargar = document.getElementById("cargar");
    const selectPersonajes = document.getElementById("selectPersonajes");
    const form = document.forms["formulario"];

    let personajesJSON = [];
    let datosXML;

    // ----------------------------
    // EVENT: Click "Cargar Datos"
    // ----------------------------
    btnCargar.addEventListener("click", () => {
      // ----------------------------
      // AJAX PART: Load JSON
      // ----------------------------
      const xhrJSON = new XMLHttpRequest();
      xhrJSON.open("GET", "hp_characters.json", true);
      xhrJSON.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          personajesJSON = JSON.parse(this.responseText).personajes;

          // ----------------------------
          // DOM PART: Fill select with JSON data
          // ----------------------------
          selectPersonajes.innerHTML = "<option value=''>Selecciona un personaje</option>";
          personajesJSON.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.code;
            opt.textContent = p.name;
            selectPersonajes.appendChild(opt);
          });

          // ----------------------------
          // AJAX PART: Load XML
          // ----------------------------
          const xhrXML = new XMLHttpRequest();
          xhrXML.open("GET", "hp_datos.xml", true);
          xhrXML.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
              datosXML = this.responseXML;

              // ----------------------------
              // DOM PART: Notify user
              // ----------------------------
              alert("Datos cargados correctamente ✅");
            }
          };
          xhrXML.send();
        }
      };
      xhrJSON.send();
    });

    // ----------------------------
    // EVENT: Character selection
    // ----------------------------
    selectPersonajes.addEventListener("change", () => {
      const code = selectPersonajes.value;
      if (!code || !datosXML) return;

      // ----------------------------
      // DOM/AJAX HYBRID: Find character in XML
      // ----------------------------
      const personajes = datosXML.getElementsByTagName("personaje");
      let personajeSeleccionado = null;

      for (let i = 0; i < personajes.length; i++) {
        const codeXML = personajes[i].getElementsByTagName("code")[0].textContent.trim();
        if (codeXML === code) {
          personajeSeleccionado = personajes[i];
          break;
        }
      }

      if (!personajeSeleccionado) return;

      const data = personajeSeleccionado.getElementsByTagName("data")[0];

      // ----------------------------
      // DOM PART: Fill form fields
      // ----------------------------
      const getValue = tag => {
        const el = data.getElementsByTagName(tag)[0];
        return el ? el.textContent.trim() : "";
      };

      form.species.value = getValue("species");
      form.house.value = getValue("house");
      form.dateOfBirth.value = getValue("dateOfBirth");
      form.actor.value = getValue("actor");

      const gender = getValue("gender");
      form.male.checked = gender === "male";
      form.female.checked = gender === "female";

      const img = getValue("image");
      form.foto.src = img || "";
      form.foto.alt = selectPersonajes.options[selectPersonajes.selectedIndex].text;
    });

  });