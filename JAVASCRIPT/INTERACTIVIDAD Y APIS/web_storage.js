//Guardar un dato (Set)
//Se guarda en formato clave-valor. Siempre se almacena como texto (String).
localStorage.setItem("temaEscogido", "oscuro");
localStorage.setItem("usuarioLogueado", "SebasGuardia2026");

console.log("Datos guardados en LocalStorage.");

//Leer un dato (Get)
let temaActual = localStorage.getItem("temaEscogido");
console.log(`El tema configurado por el usuario es: ${temaActual}`);

//Eliminar un dato específico (Remove)
localStorage.removeItem("usuarioLogueado");
console.log("Usuario deslogueado (dato eliminado).");

//Limpiar todo el almacenamiento (Clear)
//Descomentar la siguiente línea para borrar todo el LocalStorage del dominio
//localStorage.clear();