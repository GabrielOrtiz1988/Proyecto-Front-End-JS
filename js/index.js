//import { productos } from './productos.js';
import { AgregarAlCarrito } from "./funcionesCarrito.js";
import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("contenedor-tarjetas");
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
//----------------------------------//
//Pedir productos al json con fetch//
//---------------------------------//
fetch("./data/productos.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error(`Error HTTP status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) =>{
        data.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");
        // tarjeta.dataset.id = producto.id;
        
        const imagen = document.createElement("img");
        imagen.src = producto.imagen;
        imagen.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        // Option 1: Simple formatting
        precio.textContent = `$${producto.precio.toLocaleString()}`;
        // Option 2: With decimals
        //precio.textContent = `$${producto.precio.toLocaleString(`es-AR`,{minimumFractionDigits: 2})}`;

        const botonAgregar = document.createElement("button");
        botonAgregar.classList.add("boton-agregar");
        botonAgregar.textContent = "Agregar al carrito";
        botonAgregar.addEventListener("click", () => {
            AgregarAlCarrito(producto);
        });

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(descripcion);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(botonAgregar);
        contenedor.appendChild(tarjeta);
    });

    })
    .catch((error) => console.error("Error al cargar los productos:", error))


    //productos.forEach((producto) => {
        //const tarjeta = document.createElement("article");
        //tarjeta.classList.add("card");
        //tarjeta.dataset.id = producto.id;
        
        //const img = document.createElement("img");
        //img.src = producto.img;
        //img.alt = producto.nombre;
        //img.width = "400";

        //const titulo = document.createElement("h3");
        //titulo.textContent = producto.nombre;

        //const precio = document.createElement("p");
        //precio.textContent = `$${producto.precio}`;

        //const boton = document.createElement("button");
        //boton.classList.add("btn");
        //boton.textContent = "Agregar al carrito";

        //boton.addEventListener("click", () => {
            //AgregarAlCarrito(producto);
        //});

        //tarjeta.appendChild(img);
        //tarjeta.appendChild(titulo);
        //tarjeta.appendChild(precio);
        //tarjeta.appendChild(boton);

        //contenedor.appendChild(tarjeta);
    //});
});