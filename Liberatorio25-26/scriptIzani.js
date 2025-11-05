// examen izani

class Coche {
  marca;
  modelo;
  anio;
  precio;

  constructor(marca, modelo, anio, precio){
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.precio = precio;
  }

  getPrecio(){
    return this.precio;
  }

}

function agregarCoche() {
  const fecha = new Date();
  const marca = document.getElementById('marca');
  const modelo = document.getElementById('modelo');
  const anio = document.getElementById('anio');
  const precio = document.getElementById('precio');


  if (!marca || !modelo  || !anio || !precio ) {
    alert("No puede haber ningun campo vacio.");
  } else {
    if (anio > fecha){
      alert("Fecha incorrecta.");
    } else {
      const coche = new Coche(marca, modelo, anio, precio);
      arrayCoches = coche;
      alert("coche creado" + marca); //borrar luego
      
      const contador = document.getElementById('contador');
      contador =+ 1;
    }
    


  }

}

function mostrarCoches(coche) { 
  
  


  // Si no existe la imagen, carga la de por defecto "none.jpg"
  img.onerror = () => { 
    img.onerror = null; 
    img.src = `imagenes/none.jpg`; 
  };
}

function mostrarResumen() {
  
}  

function calcularPromedio(){

}

const arrayCoches = [];

const boton = document.getElementsByClassName('btn');
boton.addEventListener("click", Function(), agregarCoche());

const boton2 = document.getElementsByClassName('btn-secondary');
boton.addEventListener("click", Function(), mostrarResumen());

