<?php
// 1. Incluir la conexión
require_once 'conexion.php';

$alumnos = []; // Inicializar un array para los resultados

try {
    // 2. Preparar la consulta SQL (sin variables, se puede usar query)
    // Para consistencia, usaremos prepare() y execute() siempre.
    $sql = "SELECT id, nombre, apellido, email FROM alumnos ORDER BY apellido ASC";
    $stmt = $pdo->prepare($sql);
    
    // 3. Ejecutar la consulta
    $stmt->execute();
    
    // 4. Obtener todos los resultados
    // fetchAll() devuelve un array con todas las filas
    $alumnos = $stmt->fetchAll();

} catch (\PDOException $e) {
    // Manejo de error
    echo "Error al consultar los alumnos: " . $e->getMessage();
}
?>
