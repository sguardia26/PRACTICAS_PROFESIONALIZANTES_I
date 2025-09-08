<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP – Resumen de conceptos</title>
</head>
<body>
    <h1>HTML CON PHP – Resumen de la materia</h1>

    <?php
    // ------------------------------------------------
    // 1. IMPRESIÓN EN PANTALLA
    // ------------------------------------------------
    echo "<h2>1. Hola Mundo</h2>";
    echo "¡HOLA MUNDO EN PHP! <br><br>";

    // ------------------------------------------------
    // 2. VARIABLES
    // ------------------------------------------------
    echo "<h2>2. Variables</h2>";
    $numero = 5;
    $palabra = "PRACTICAS";
    echo "El número es = $numero <br>";
    echo "La palabra es = $palabra <br><br>";

    // ------------------------------------------------
    // 3. VECTORES
    // ------------------------------------------------
    echo "<h2>3. Vectores</h2>";
    $vector = ["Manzana", "Banana", "Naranja"];
    echo "Primera fruta: " . $vector[0] . "<br>";
    echo "Recorrido del vector:<br>";
    foreach ($vector as $fruta) {
        echo "- $fruta <br>";
    }
    echo "<br>";

    // ------------------------------------------------
    // 4. MATRICES
    // ------------------------------------------------
    echo "<h2>4. Matrices</h2>";
    $matriz = [
        ["Juan", 20, "Argentina"],
        ["Ana", 22, "Chile"],
        ["Pedro", 19, "Uruguay"]
    ];
    echo "Primer alumno: " . $matriz[0][0] . " – Edad: " . $matriz[0][1] . "<br>";
    echo "Listado completo:<br>";
    foreach ($matriz as $fila) {
        echo "Nombre: $fila[0] | Edad: $fila[1] | País: $fila[2] <br>";
    }
    echo "<br>";

    // ------------------------------------------------
    // 5. FUNCIONES
    // ------------------------------------------------
    echo "<h2>5. Funciones</h2>";
    function saludar($nombre) {
        return "Hola, " . $nombre . "!<br>";
    }
    echo saludar("Sebastián");
    echo saludar("Alumno");
    echo "<br>";

    // ------------------------------------------------
    // 6. CONDICIONALES
    // ------------------------------------------------
    echo "<h2>6. Condicionales</h2>";
    $n1 = 10;
    $n2 = 20;
    if ($n1 > $n2) {
        echo "$n1 es mayor que $n2 <br>";
    } elseif ($n1 == $n2) {
        echo "Los números son iguales <br>";
    } else {
        echo "$n2 es mayor que $n1 <br>";
    }
    echo "<br>";

    // ------------------------------------------------
    // 7. BUCLES
    // ------------------------------------------------
    echo "<h2>7. Bucles</h2>";
    echo "Bucle for (números del 1 al 5):<br>";
    for ($i = 1; $i <= 5; $i++) {
        echo $i . " ";
    }
    echo "<br><br>";

    echo "Bucle while (números pares hasta 10):<br>";
    $i = 2;
    while ($i <= 10) {
        echo $i . " ";
        $i += 2;
    }
    echo "<br><br>";

    // ------------------------------------------------
    // 8. POO – CLASES Y OBJETOS
    // ------------------------------------------------
    echo "<h2>8. Programación Orientada a Objetos</h2>";

    class Persona {
        public $nombre;
        public $edad;

        public function __construct($nombre, $edad) {
            $this->nombre = $nombre;
            $this->edad = $edad;
        }

        public function presentarse() {
            return "Hola, me llamo $this->nombre y tengo $this->edad años.<br>";
        }
    }

    $p1 = new Persona("Juan", 25);
    $p2 = new Persona("Ana", 30);
    echo $p1->presentarse();
    echo $p2->presentarse();
    echo "<br>";

    // ------------------------------------------------
    // 9. HERENCIA Y POLIMORFISMO
    // ------------------------------------------------
    class Animal {
        public $nombre;
        public function __construct($nombre) {
            $this->nombre = $nombre;
        }
        public function hacerSonido() {
            return "Sonido genérico<br>";
        }
    }

    class Perro extends Animal {
        public function hacerSonido() {
            return "Guau guau 🐶<br>";
        }
    }

    class Gato extends Animal {
        public function hacerSonido() {
            return "Miau miau 🐱<br>";
        }
    }

    echo "<h3>Ejemplo de polimorfismo</h3>";
    $animales = [new Perro("Boby"), new Gato("Michi")];
    foreach ($animales as $animal) {
        echo $animal->nombre . " dice: " . $animal->hacerSonido();
    }
    ?>
</body>
</html>
