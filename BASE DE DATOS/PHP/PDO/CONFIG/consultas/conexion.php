<?php
// config/conexion.php

// 1. Credenciales de la Base de Datos
$host = 'localhost';      // O la IP del servidor de BD
$db   = 'practicas_db'; // El nombre de tu base de datos
$user = 'root';           // Tu usuario de MySQL/MariaDB
$pass = '';               // Tu contraseña
$charset = 'utf8mb4';     // Charset moderno, soporta emojis y caracteres especiales

// 2. DSN (Data Source Name)
// El DSN es una cadena que le dice a PDO qué driver usar y dónde conectarse.
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// 3. Opciones de Configuración de PDO
$options = [
    /*
     ATTR_ERRMODE: Cómo reportar errores.
     ERRMODE_EXCEPTION: Lanza una PDOException. Esto es crucial.
     Permite usar bloques try/catch para manejar errores de BD,
     en lugar de que PHP muestre warnings que exponen información sensible.
     */
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,

    /*
     ATTR_DEFAULT_FETCH_MODE: Cómo se devuelven los resultados.
     FETCH_ASSOC: Devuelve un array asociativo (ej. $fila['nombre']).
     Es más limpio que el modo por defecto (que duplica los datos).
     */
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,

    /*
     ATTR_EMULATE_PREPARES:
     alse: Desactiva la emulación de consultas preparadas.
     Le dice a PDO que use consultas preparadas NATIVAS del motor de BD.
     Esto es más seguro y eficiente.
     */
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// 4. Creación de la instancia PDO
try {
     /*
      Se crea el objeto $pdo que se usará en toda la aplicación.
      Se pasa el DSN, usuario, contraseña y las opciones.
      */
     $pdo = new PDO($dsn, $user, $pass, $options);
     
} catch (\PDOException $e) {
     /*
      Si la conexión falla, se captura la excepción.
      Se muestra un mensaje genérico al usuario y se registra el error real.
      ¡NUNCA muestres $e->getMessage() en producción!
      */
     error_log("Error de conexión a la BD: " . $e->getMessage());
     throw new \PDOException("Error de conexión. Intente más tarde.", (int)$e->getCode());
}