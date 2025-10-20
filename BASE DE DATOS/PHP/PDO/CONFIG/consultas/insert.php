<?php
// Validar que se recibieron datos por POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    require_once 'conexion.php';

    // 1. Obtener datos del formulario
    $nombre = $_POST['nombre'] ?? '';
    $apellido = $_POST['apellido'] ?? '';
    $email = $_POST['email'] ?? '';

    // (Aquí iría la validación de datos: que no estén vacíos, que el email sea válido, etc.)

    try {
        // 2. Preparar la consulta INSERT
        $sql = "INSERT INTO alumnos (nombre, apellido, email) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        
        // 3. Ejecutar, pasando los valores en el mismo orden que los '?'
        $stmt->execute([$nombre, $apellido, $email]);

        // 4. (Opcional) Obtener el ID del alumno recién insertado
        $nuevo_id = $pdo->lastInsertId();

        // 5. Redirigir al listado (Patrón Post-Redirect-Get)
        header('Location: index.php?status=success');
        exit;

    } catch (\PDOException $e) {
        // Manejo de errores (ej. email duplicado)
        if ($e->getCode() == 23000) { // Código de violación de integridad (ej. UNIQUE)
            echo "Error: El email ya existe.";
        } else {
            echo "Error al guardar el alumno: " . $e->getMessage();
        }
    }
}
?>