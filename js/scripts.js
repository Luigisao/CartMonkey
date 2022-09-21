
console.table(juegos)

let carrito=[]
let productosJSON = [];

//Constructor Pelicula

class Juego{
    constructor(juego) {
        this.id = juego.id;
        this.nombre = juego.nombre;
        this.saga= juego.saga;
        this.precio = juego.precio;
        this.imagen = juego.imagen;
        this.cantidad = 1;
    }

}

if(localStorage.getItem("carrito")!=null){
   carrito=JSON.parse(localStorage.getItem("carrito"));
   actualizarTabla()
}else{
   carrito=[]
}

//llamo a mis cards
imprimirProductosEnHTML(juegos);

function imprimirProductosEnHTML() {
console.log(productosJSON)
  let contenedor = document.getElementById("contenedor");

  for (const juego of productosJSON) {
    let card = document.createElement("div");

    card.innerHTML = `
    <div class="hero-container">
    <div class="main-container">
        <div class="poster-container">
            <a href="#"><img src=${juego.img} class="poster" /></a>
        </div>
        <div class="ticket-container">
            <div class="ticket__content">
                <h4 class="ticket__game-title">${juego.nombre}</h4>
                <p class="ticket__game-slogan">
                    ${juego.plataforma}
                </p>
                <p class="ticket__current-price">$${juego.precio}</p>
                <button class="ticket__buy-btn" id="btn${juego.id}">Buy It</button>
            </div>
        </div>
    </div>
        `;
    contenedor.append(card);
  }
  for (const juego of productosJSON) {
    document.getElementById(`btn${juego.id}`).addEventListener('click', function() {
       agregarAlCarrito(juego);
     });
   };

}
id="btn${juego.id}"

//---------------------------------------------------

 //Agregar al carrito

 function agregarAlCarrito(nuevoJuego) {
    let encontrado = carrito.find(p => p.id == nuevoJuego.id);
    console.log(encontrado);
    if (encontrado == undefined) {
     let juegoCarrito= new Juego (nuevoJuego);
   carrito.push(juegoCarrito);
   console.log(carrito);
   Swal.fire(
      "Juego: "+nuevoJuego.nombre,
      "Se agrego al carrito",
      "success"
    );
   document.getElementById("tabla").innerHTML+=`
   <tr>
       <td>${juegoCarrito.saga}</td>
       <td>${juegoCarrito.nombre}</td>
       <td id='${juegoCarrito.id}'> ${juegoCarrito.cantidad}</td>
       <td>${juegoCarrito.precio}</td>
       
   </tr>`;

}else {
    let posicion = carrito.findIndex(p => p.id == nuevoJuego.id);
    carrito[posicion].cantidad += 1;
    Swal.fire(
        "Se agrego otra unidad de "+nuevoJuego.nombre,
        "Se agrego al carrito",
        "success"
      );
    document.getElementById(nuevoJuego.id).innerHTML=carrito[posicion].cantidad;
}
document.querySelector("#precioTotal").innerText=(`Total: $ ${calcularTotal()}`);
localStorage.setItem("carrito",JSON.stringify(carrito));
}

//Funcion Suma Total

function calcularTotal() {
    let suma = 0;
    for (const juego of carrito) {
        suma = suma + (juego.precio * juego.cantidad);
    }
    return suma;
}

//funcion para el json asi queda el carrito cargado

function actualizarTabla (){
    for (const juego of carrito){
       document.getElementById("tabla").innerHTML+=`
       <tr>
       <td>${juego.formato}</td>
       <td>${juego.nombre}</td>
       <td id='${juego.id}'> ${juego.cantidad}</td>
       <td>${juego.precio}</td>
   </tr>`;
    }document.querySelector("#precioTotal").innerText=(`Total: $ ${calcularTotal()}`);
 }


//Filtro Busqueda de Juegos
const busqueda = document.querySelector('#buscar');
const resultado = document.querySelector('.juegos');
console.log(resultado);


const filtrar = ()=>{
   resultado.innerHTML=''

   const texto = busqueda.value.toLowerCase();
   filtroJuegos=[]
   for (let juego of juegos) {
     let card = document.createElement("div");
     let nombre = juego.nombre.toLowerCase();
     if (nombre.indexOf(texto) !== -1){
      filtroJuegos.push(juego)
       card.innerHTML = `

    <div class="hero-container">
    <div class="main-container">
        <div class="poster-container">
            <a href="#"><img src=${juego.img} class="poster" /></a>
        </div>
        <div class="ticket-container">
            <div class="ticket__content">
                <h4 class="ticket__game-title">${juego.nombre}</h4>
                <p class="ticket__game-slogan">
                    ${juego.plataforma}
                </p>
                <p class="ticket__current-price">$${juego.precio}</p>
                <button class="ticket__buy-btn" id="btn${juego.id}">Buy It</button>
            </div>
        </div>
    </div>
         ` 
         resultado.append(card);
    
  };
} 
console.log (filtroJuegos)
    filtroJuegos.forEach(juego => {
    document.getElementById(`btn${juego.id}`).addEventListener('click', function() {
    console.log ()
    agregarAlCarrito(juego);
   });
 });
}
 busqueda.addEventListener('keyup', filtrar);

//---------------------------------------------------

//-Botones del carrito

const btnfinalizar = document.getElementById('finalizar')
btnfinalizar.addEventListener('click', ()=> {
  if ((carrito).length !== 0){
    Swal.fire({
      title: "Pedido confirmado",
      text: "Disfruta de las mejores aventuras",
      icon: 'success',
    })
    eliminarFila ()
  }else{
    Swal.fire({
      title: 'No Podemos Aceptar La solicitud ',
      text: 'Debes llenar tu carrito!',
      imageUrl: 'https://media1.tenor.com/images/9fc6cdf78e5ffaf7ce46cca60e856a58/tenor.gif?itemid=18792945',
    })

  }
})

let borrarCarrito =document.getElementById("borrarCarrito");
borrarCarrito.onclick=()=>{
   eliminarFila()
    Swal.fire({
        title: 'Carrito Vacio!',
        
    });
    
   }
   
function eliminarFila(){
   tabla.innerHTML=""
   carrito= []
   localStorage.setItem("carrito",JSON.stringify(carrito))
   document.querySelector("#precioTotal").innerText=(`Total: $ ${calcularTotal()}`);

}

//GETJSON de productos.json

document.addEventListener(`DOMContentLoaded`, ()  =>{
    fechtData()
    console.log(fechtData)
})

const fechtData= async ()=>{
 try {
    const URLJSON="objetos.json"
    const resp=await fetch("objetos.json")
    const data= await resp.json()
    productosJSON = data;
    imprimirProductosEnHTML();
 }catch (error){
    console.log(error)
}
}