document.addEventListener("DOMContentLoaded", ()=>{

    //Get elements from html
    const btnSelect = document.getElementById("cargar");
    const selectPersons = document.getElementById("selectPersonajes");
    const form = document.form["formulario"];

    //create variables
    let personasJSON = [];
    let dataXML;

    //button cargar datos 
    btnSelect.addEventListener("click", () =>{
        //load JSON
        const xhrJSON = new XMLHttpRequest();
        xhrJSON.open("GET", "hp_characters.json", true);
        xhrJSON.onreadystatechange = function (){
            if(this.readyState === 4 && this.status === 200){
                personasJSON = JSON.parse(this.responseText).personajes;

                //fill select with json data
                selectPersons.innerHTML = "<option value=''><Selecciona un personaje</option>";
                
            }
        }
    });
});