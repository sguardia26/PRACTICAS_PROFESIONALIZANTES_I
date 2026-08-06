//setTimeout: Ejecuta una acción UNA SOLA VEZ después de X milisegundos.
console.log("Iniciando carga...");

setTimeout(() => {
    console.log("Han pasado 3 segundos. ¡Carga completada!");
}, 3000); //1000 milisegundos = 1 segundos

//setInterval: Ejecuta una acción REPETIDAMENTE cada X milisegundos.
let contador = 0;

const intervaloDeTiempo = setInterval(() => {
    contador++;
    console.log(`Ejecución número: ${contador}`);

    //Condición de corte: Si no lo frenamos, se ejecuta infinitamente.
    if (contador === 5) {
        clearInterval(intervaloDeTiempo); // Detiene el setInterval
        console.log("Intervalo detenido.");
    }
}, 1000); //Se repite cada 1 segundo