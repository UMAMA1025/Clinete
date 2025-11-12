document.addEventListener("DOMContentLoaded", () => {
  const btnCargar = document.getElementById("cargar");
  const btnListar = document.getElementById("personajeList");
  const selectPersonajes = document.getElementById("selectPersonajes");
  const form = document.forms["formulario"];

  let personajesJSON = [];
  let datosXML;

  // Helper to fetch and parse XML
  async function fetchXML(url) {
    const response = await fetch(url);
    const text = await response.text();
    return new DOMParser().parseFromString(text, "application/xml");
  }

  // Load JSON and populate dropdown
  async function loadJSON() {
    try {
      const res = await fetch("hp_characters.json");
      if (!res.ok) throw new Error("Error loading JSON");
      const data = await res.json();
      personajesJSON = data.personajes;

      selectPersonajes.innerHTML = "<option value=''>Selecciona un personaje</option>";
      personajesJSON.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.code;
        opt.textContent = p.name;
        selectPersonajes.appendChild(opt);
      });
    } catch (error) {
      console.error(error);
      alert("Error cargando JSON ❌");
    }
  }

  // Load XML (for when a character is selected)
  async function loadXML() {
    if (!datosXML) {
      try {
        datosXML = await fetchXML("hp_datos.xml");
      } catch (error) {
        console.error(error);
        alert("Error cargando XML ❌");
      }
    }
  }

  // Button events
  btnCargar.addEventListener("click", async () => {
    await loadJSON();
    alert("Datos JSON cargados ✅");
  });

  btnListar.addEventListener("click", async () => {
    await loadJSON();
    alert("Lista de personajes cargada ✅");
  });

  // When selecting a character, fill form from XML
  selectPersonajes.addEventListener("change", async () => {
    const code = selectPersonajes.value;
    if (!code) return;

    await loadXML(); // make sure XML is loaded

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

    const getValue = tag => {
      const el = data.getElementsByTagName(tag)[0];
      return el && el.textContent ? el.textContent.trim() : "";
    };

    form.species.value = getValue("species");
    form.house.value = getValue("house");
    form.dateOfBirth.value = getValue("dateOfBirth");
    form.actor.value = getValue("actor");

    const gender = getValue("gender");
    form.male.checked = gender === "male";
    form.female.checked = gender === "female";

    const img = getValue("images");
    form.foto.src = img ? img : "";
    form.foto.alt = selectPersonajes.options[selectPersonajes.selectedIndex].text;
  });
});
