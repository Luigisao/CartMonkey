

const juegos = [{
                id : "0",
                nombre: "The Secret of Monkey Island",
                saga: "Monkey",
                plataforma:"Pc",
                precio:1500,
                img: "https://tse4.mm.bing.net/th?id=OIP.SZ9_CJXE6dprPpSuf-1elwHaF1&pid=Api&P=0https://tse4.mm.bing.net/th?id=OIP.SZ9_CJXE6dprPpSuf-1elwHaF1&pid=Api&P=0",
                cantidad:1,
             },
             {
                id : "1",
                nombre: "Lechuck Revenge",
                saga: "Monkey",
                plataforma:"Pc",
                precio:2000,
                img:"https://tse2.mm.bing.net/th?id=OIP.vroLcNO0AwuF5m4-ymcRrwHaKl&pid=Api&P=0",
                cantidad:1,

             },
             {
                id : "2",
                nombre: "Course of Monkey Island",
                saga: "Monkey",
                plataforma:"Pc",
                precio:1800,
                img:"https://tse3.mm.bing.net/th?id=OIP.xraHaWT0u8g72UdKE97h3gHaJ4&pid=Api&P=0",
                cantidad:1,

             },
             {
                id : "3",
                nombre: "The shadows of the Templairs",
                saga: "Broken Sword",
                plataforma:"Pc",
                precio:1000,
                img:"https://tse3.mm.bing.net/th?id=OIP.OEO7rGCXuQa06BCdYqBuTQHaKd&pid=Api&P=0",
                cantidad:1,

             },
             {
                id : "4",
                nombre: "The Smoking Mirrors",
                saga: "Broken Sword",
                plataforma:"Pc",
                precio:1200,
                img:"https://tse4.mm.bing.net/th?id=OIP.jEoFmRVYkJIrVOyzU65ZYQHaJn&pid=Api&P=0",
                cantidad:1,

             },
             {
                id : "5",
                nombre: "The Sleeping Dragon",
                saga: "Broken Sword",
                plataforma:"Pc",
                precio:1000,
                img:"https://tse4.mm.bing.net/th?id=OIP.3g9eXNFJlTz20_NqsoXejQHaKg&pid=Api&P=0",
                cantidad:1,

             },
             {
                id : "6",
                nombre: "Grim Fandango",
                saga: "Grim",
                plataforma:"PlayStation",
                precio:2200,
                img:"https://tse3.explicit.bing.net/th?id=OIP.wKUKWivo4i17VejvbBXjfwHaJ3&pid=Api&P=0",
                cantidad:1,

             },
             {
                id : "7",
                nombre: "Indiana Jones and The Fate of Atlantis",
                saga: "Indiana",
                plataforma:"PlayStation",
                precio:1200,
                img:"https://tse1.mm.bing.net/th?id=OIP.10vnJl67dEZvgmpZ6zw-DgHaJ3&pid=Api&P=0&w=300&h=300",
                cantidad:1,

             },
             {
                id : "8",
                nombre: "Loom",
                saga: "Loom",
                plataforma:"PlayStation",
                precio:10000,
                img:"https://tse2.mm.bing.net/th?id=OIP.Mv8xw-SeCDAVKmVF3-O0aAHaJp&pid=Api&P=0",
                cantidad:1,

             }, {id : "9",
               nombre: "The last Door",
                 saga: "The last Door",
                plataforma:"Nintendo",
                precio:9000,
                img:"https://tse1.mm.bing.net/th?id=OIP.Anul0Xu9rRpyyTiBjq3DnwHaHa&pid=Api&P=0",
                cantidad:1,

          
             },
             {
          
                id : "10",
                 nombre: "The last Door 2",
                saga: "The last Door",
                plataforma:"Nintendo",
                precio:10000,
                img:"https://tse4.mm.bing.net/th?id=OIP.-Kmd_NZCgbUtiqHvODCJyQHaIp&pid=Api&P=0",
                cantidad:1,
             }
             ];




const contenedorProducts = document.getElementById('contenedor');

const contenedorCart = document.getElementById('cartcontainer');

const botonVaciar = document.getElementById('vaciarCart');

const contadorCart = document.getElementById('contadorCart')

const precioTotal = document.getElementById('precioTotal')

let cart = []


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'))
        actCart()
    }
})

botonVaciar.addEventListener('click', ()=>{
    cart.length = 0 ;
    actCart()
})

juegos.forEach((producto)=>{
    const div = document.createElement('div')
    div.classList.add('Games')
    div.innerHTML = `
    
    <div class="hero-container">
    <div class="main-container">
        <div class="poster-container">
            <a href="#"><img src=${producto.img} class="poster" /></a>
        </div>
        <div class="ticket-container">
            <div class="ticket__content">
                <h4 class="ticket__movie-title">${producto.nombre}</h4>
                <p class="ticket__movie-slogan">
                    ${producto.plataforma}
                </p>
                <p class="ticket__current-price">$${producto.precio}</p>
                <button class="ticket__buy-btn" id="agregar${producto.id}">Buy It</button>
            </div>
        </div>
    </div>
 
`
    contenedorProducts.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () =>{

        agregarAlCarrito(producto.id)

    })
    
})




const eliminarDelCarrito = (prodId) =>{
    const item = cart.find((prod) => prod.id === prodId)
    const indice = cart.indexOf(item)
    cart.splice(indice, 1)
    actCart()
}

const agregarAlCarrito = (prodId) =>{
    const existe = cart.some(prod => prod.id === prodId)

    if(existe){
        const prod = cart.map(prod => {
            if(prod.id === prodId){
                prod.cantidad++ }
        })
    } else {

    const item = juegos.find((prod) => prod.id === prodId);
    cart.push(item)
}
    actCart()
}

const sumarCantidad = (prod) =>{



}


const actCart = () =>{
 contenedorCart.innerHTML = ""
    cart.forEach((prod) =>{
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p class="mover">${prod.nombre}</p>
        <p class="mover">Precio :${prod.precio}</p>
        <p class="mover">Saga:${prod.saga}</p>
        <p class="mover">plataforma: ${prod.plataforma}</p>
        <p class="mover"> Cantidad: ${prod.cantidad}</p>
        <button onclick="sumarCantidad(${prod.cantidad})"class="boton-add">+</button>
        <button  class="boton-eliminar" >-</button>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-offcart">Eliminar</button>`
        contenedorCart.appendChild(div)

        localStorage.setItem('cart', JSON.stringify(cart))
    })
    contadorCart.innerText = cart.length
    precioTotal.innerText = cart.reduce((acc, prod) => acc + prod.precio, 0)
}

