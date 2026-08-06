//Capturar los elementos del HTML
const btnAccion = document.getElementById("btn-accion");
const btnRestaurar = document.getElementById("btn-restaurar");
const mensaje = document.getElementById("mensaje-bienvenida");
const inputNombre = document.getElementById("input-nombre");

//Escuchar Eventos (AddEventListener)
btnAccion.addEventListener("click", function() {
    //Obtenemos el valor escrito en el input
    let nombreIngresado = inputNombre.value;

    //Validación básica: Si no escribió nada
    if (nombreIngresado === "") {
        alert("Por favor, ingresa un nombre primero.");
        return;
    }

    //Modificamos el DOM: Cambiar el texto
    mensaje.textContent = `¡Hola, ${nombreIngresado}! Ya estás programando el DOM.`;
    
    //Modificamos el DOM: Cambiar estilos (Bootstrap)
    mensaje.classList.remove("text-dark");
    mensaje.classList.add("text-success", "fw-bold");
});

//Evento para el botón restaurar
btnRestaurar.addEventListener("click", function() {
    mensaje.textContent = "Bienvenido al sistema. Esperando acción...";
    mensaje.classList.remove("text-success", "fw-bold");
    inputNombre.value = ""; //Limpiamos el input
});