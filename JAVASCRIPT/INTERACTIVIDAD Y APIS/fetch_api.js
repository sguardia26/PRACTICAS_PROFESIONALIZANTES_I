//Usamos async/await porque la petición a internet toma tiempo y el código debe "esperar" la respuesta sin bloquear el resto del sistema.
async function obtenerUsuarios() {
    try {
        console.log("Solicitando datos al servidor...");
        
        //Hacemos la petición a una API pública de prueba
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
        
        //Convertimos la respuesta de texto plano a un objeto JSON manipulable
        const datos = await respuesta.json();
        
        console.log("¡Datos recibidos!");
        
        //Recorremos los datos y los mostramos
        datos.forEach(usuario => {
            console.log(`👤 ${usuario.name} - 📧 ${usuario.email}`);
        });

    } catch (error) {
        //Si no hay internet o el servidor falla, capturamos el error aquí
        console.error("Hubo un error al obtener los usuarios:", error);
    }
}

//Ejecutamos la función
obtenerUsuarios();