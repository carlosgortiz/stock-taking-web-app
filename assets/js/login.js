
var abrirModalEl = document.querySelector(".login-hero");
var modalLoginEl = document.querySelector(".modal-login");
var cerrarModalLoginEl = document.querySelector(".modal-cerrar-login");
var modalformularioEl = document.querySelector(".modal-formulario");
var botonEl = document.querySelector("#boton");
var usuarioEl = document.querySelector("#usuario");
var passwordEl = document.querySelector("#password");

usuarioEl.value = "Admin";
passwordEl.value = "....";

function acceso(event) {
    event.preventDefault();
    if (usuarioEl.value == "Admin" && passwordEl.value == "....") {
        console.log('HA ENTRADO Admin');
        // modalformularioEl.classList.remove("modal-mostrar-formulario");
        window.location.href = "index.html";
    }

    if (usuarioEl.value == "hola" && passwordEl.value == "mundo") {
        console.log("Que tal mundo");
        modalformularioEl.classList.remove("modal-mostrar-formulario");
        window.location.href = "index.html";
    }

    if (usuarioEl.value = '' && passwordEl.value == '') {
        console.log('ERROR');  
    }
} 

abrirModalEl.addEventListener('click', (event) => {
    event.preventDefault();
    modalLoginEl.classList.add("modal-mostrar-login");
        botonEl.addEventListener('click', acceso);
});

cerrarModalLoginEl.addEventListener('click', (event) => {
    event.preventDefault();
    modalLoginEl.classList.remove("modal-mostrar-login");
    modalformularioEl.classList.add("modal-mostrar-formulario");
    // botonEl.addEventListener('click', acceso);
});


