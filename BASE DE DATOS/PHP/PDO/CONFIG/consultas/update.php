<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    require_once 'conexion.php';

    // 1. Obtener datos (incluyendo el ID)
    $id_alumno = $_POST['id_alumno'] ?? null;
    $nombre = $_POST['nombre'] ?? '';
    $apellido = $_POST['apellido'] ?? '';
    $email = $_POST['email'] ?? '';

    if (!$id_alumno) {
        echo "ID de alumno no proporcionado.";
        exit;
    }
    // (Validación de datos...)

    try {
        // 2. Preparar la consulta UPDATE
        // ¡El orden de los '?' es crucial!
        $sql = "UPDATE alumnos SET nombre = ?, apellido = ?, email = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        
        // 3. Ejecutar, pasando los valores en el orden del SQL
        $stmt->execute([$nombre, $apellido, $email, $id_alumno]);

        // 4. Redirigir al listado
        header('Location: index.php?status=updated');
        exit;

    } catch (\PDOException $e) {
        echo "Error al actualizar el alumno: " . $e->getMessage();
    }
}
?>