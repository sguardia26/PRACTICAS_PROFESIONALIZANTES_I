import promptSync from 'prompt-sync';
const prompt = promptSync();

//SUMA
let numero1 = parseInt(prompt("Ingresar el numero1: "));
let nuemro2 = parseInt(prompt("Ingresar el numero2: "));

let suma = nuemro2 + numero1;

console.log("La suma es: ", suma);