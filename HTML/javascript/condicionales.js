import promptSync from 'prompt-sync';
const prompt = promptSync();

//COMPARAR EL MAYOR DE DOS NUMEROS.
/*let numero1 = parseInt(prompt("Ingresar el primer numero: "));
let numero2 = parseInt(prompt("Ingresar el segundo numero: "));
//DOBLE
if(numero1>numero2){
    console.log("El primer numero es el MAYOR, ", numero1);
}else{
    console.log("El segundo numero es el MAYOR, ", numero2);
}*/

//POSITIVO NEGATIVO NEUTRO ENTEROS
let numero = parseInt(prompt("Ingresar el numero: "));

switch (true) {
    case (numero > 0):
        console.log("El numero ingresado es POSITIVO", numero);
        break;
    case (numero < 0):
        console.log("El numero ingresado es NEGATIVO", numero);
        break;
    case (numero == 0):
        console.log("El numero ingresado es NEUTRO ", numero);
        break;
    default:
        console.log("NO FUNCIONA");
        break;
}