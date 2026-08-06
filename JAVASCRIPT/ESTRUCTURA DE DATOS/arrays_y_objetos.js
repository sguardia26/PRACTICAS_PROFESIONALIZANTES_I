//Arrays (Listas ordenadas de datos)
let materias = ["HTML5", "CSS3", "Bootstrap", "JavaScript"];

console.log("=== Lista de Materias ===");
console.log(`Materia actual: ${materias[3]}`); //índice 3

//Recorrer un array con un bucle for moderno (for...of)
console.log("Plan de estudios completo:");
for (let materia of materias) {
    console.log("- " + materia);
}

//Objetos Literales (Estructuras clave:valor)
const perfilEstudiante = {
    nombre: "María",
    apellido: "Gómez",
    edad: 18,
    lenguajesFavoritos: ["JavaScript", "Python"],
    activo: true
};

console.log("\n=== Perfil del Estudiante (Objeto) ===");
console.log(`Estudiante: ${perfilEstudiante.nombre} ${perfilEstudiante.apellido}`);
console.log(`Primer lenguaje favorito: ${perfilEstudiante.lenguajesFavoritos[0]}`);