//Declaración con 'let' (valores que pueden cambiar)
let nombreAlumno = "Juan Pérez";
let edadAlumno = 17;
let estaAprobado = true;

//Declaración con 'const' (valores fijos/constantes)
const CURSO = "5to Año Informática";
const ESCUELA = "Centro Educativo Nonogasta";

//Imprimir en consola (Nuestra principal herramienta de diagnóstico)
console.log("=== Datos del Estudiante ===");
console.log("Nombre: ", nombreAlumno);
console.log("Edad: ", edadAlumno);
console.log("Curso: ", CURSO, "-", ESCUELA);

//Operadores Básicos (Secuencial)
let notaPractica = 8;
let notaTeoria = 7;
let promedio = (notaPractica + notaTeoria) / 2;

console.log("El promedio de " + nombreAlumno + " es: " + promedio);

//Template Literals (Sintaxis moderna para concatenar)
console.log(`Estado: El alumno ${nombreAlumno} del colegio ${ESCUELA} obtuvo un ${promedio}.`);