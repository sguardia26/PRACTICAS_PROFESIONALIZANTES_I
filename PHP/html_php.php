<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP – Resumen de conceptos</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            background: #f4f6f9;
            color: #333;
        }
        header {
            background: #1e3c72;
            background: linear-gradient(to right, #2a5298, #1e3c72);
            color: white;
            padding: 20px;
            text-align: center;
        }
        h1 {
            margin: 0;
            font-size: 28px;
        }
        main {
            max-width: 900px;
            margin: 20px auto;
            padding: 20px;
        }
        section {
            background: white;
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
        }
        section h2 {
            color: #2a5298;
            border-bottom: 2px solid #ddd;
            padding-bottom: 5px;
        }
        section h3 {
            margin-top: 15px;
            color: #444;
        }
        code {
            background: #eee;
            padding: 3px 6px;
            border-radius: 5px;
            font-family: monospace;
        }
        footer {
            text-align: center;
            background: #2a5298;
            color: white;
            padding: 10px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <header>
        <h1>💻 PHP – Resumen de conceptos aprendidos</h1>
        <p>Variables · Arrays · Funciones · Estructuras · POO</p>
    </header>

    <main>
        <section>
            <h2>1. Hola Mundo</h2>
            <?php
                echo "¡HOLA MUNDO EN PHP!";
            ?>
        </section>

        <section>
            <h2>2. Variables</h2>
            <?php
                $numero = 5;
                $palabra = "PRACTICAS";
                echo "El número es = <b>$numero</b><br>";
                echo "La palabra es = <b>$palabra</b>";
            ?>
        </section>

        <section>
            <h2>3. Vectores</h2>
            <?php
                $vector = ["Manzana", "Banana", "Naranja"];
                echo "Primera fruta: " . $vector[0] . "<br>";
                echo "Recorrido del vector:<br>";
                foreach ($vector as $fruta) {
                    echo "- $fruta <br>";
                }
            ?>
        </section>

        <section>
            <h2>4. Matrices</h2>
            <?php
                $matriz = [
                    ["Juan", 20, "Argentina"],
                    ["Ana", 22, "Chile"],
                    ["Pedro", 19, "Uruguay"]
                ];
                echo "Primer alumno: " . $matriz[0][0] . " – Edad: " . $matriz[0][1] . "<br>";
                echo "<h3>Listado completo:</h3>";
                foreach ($matriz as $fila) {
                    echo "Nombre: $fila[0] | Edad: $fila[1] | País: $fila[2] <br>";
                }
            ?>
        </section>

        <section>
            <h2>5. Funciones</h2>
            <?php
                function saludar($nombre) {
                    return "Hola, " . $nombre . "!<br>";
                }
                echo saludar("Sebastián");
                echo saludar("Alumno");
            ?>
        </section>

        <section>
            <h2>6. Condicionales</h2>
            <?php
                $n1 = 10;
                $n2 = 20;
                if ($n1 > $n2) {
                    echo "$n1 es mayor que $n2";
                } elseif ($n1 == $n2) {
                    echo "Los números son iguales";
                } else {
                    echo "$n2 es mayor que $n1";
                }
            ?>
        </section>

        <section>
            <h2>7. Bucles</h2>
            <?php
                echo "<h3>Bucle for (números del 1 al 5)</h3>";
                for ($i = 1; $i <= 5; $i++) {
                    echo $i . " ";
                }

                echo "<h3>Bucle while (números pares hasta 10)</h3>";
                $i = 2;
                while ($i <= 10) {
                    echo $i . " ";
                    $i += 2;
                }
            ?>
        </section>

        <section>
            <h2>8. POO – Clases y Objetos</h2>
            <?php
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
            ?>
        </section>

        <section>
            <h2>9. Herencia y Polimorfismo</h2>
            <?php
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

                $animales = [new Perro("Boby"), new Gato("Michi")];
                foreach ($animales as $animal) {
                    echo $animal->nombre . " dice: " . $animal->hacerSonido();
                }
            ?>
        </section>
    </main>

    <footer>
        <p>Desarrollado en clase – Prácticas con PHP</p>
    </footer>
</body>
</html>