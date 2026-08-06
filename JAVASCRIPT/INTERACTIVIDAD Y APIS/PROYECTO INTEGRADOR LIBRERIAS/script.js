//INICIALIZAR AOS (Animaciones al Scroll)
// Obligatorio para que los elementos con 'data-aos' funcionen.
AOS.init();

//LÓGICA DE SWEETALERT2
const btnAlerta = document.getElementById("btn-alerta");

btnAlerta.addEventListener("click", () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                '¡Borrado!',
                'El sistema ha sido eliminado (mentira).',
                'success'
            );
        }
    });
});

//LÓGICA DE TOASTIFY
const btnToast = document.getElementById("btn-toast");

btnToast.addEventListener("click", () => {
    Toastify({
        text: "Cambios guardados correctamente",
        duration: 3000, //3 segundos
        close: true,    //Muestra la 'X' para cerrar
        gravity: "bottom", 
        position: "right", 
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
});