//Inicializar variable
let notaFinal = 7.5;

//Estructura Condicional IF - ELSE
console.log("=== Evaluando Aprobación ===");
if (notaFinal >= 7) {
    console.log("Resultado: ¡Alumno Promocionado!");
} else if (notaFinal >= 4) {
    console.log("Resultado: Alumno a Examen Final.");
} else {
    console.log("Resultado: Alumno Desaprobado.");
}

//Bucle FOR (Ideal para iteraciones conocidas)
console.log("\n=== Simulador de Carga del Sistema ===");
for (let i = 1; i <= 5; i++) {
    console.log(`Cargando módulo ${i} de 5...`);
}

//Bucle WHILE (Ideal para condiciones)
console.log("\n=== Despliegue de Intentos ===");
let intentos = 3;
while (intentos > 0) {
    console.log(`Te quedan ${intentos} intentos para ingresar la contraseña.`);
    intentos--; // Restamos 1 en cada iteración
}