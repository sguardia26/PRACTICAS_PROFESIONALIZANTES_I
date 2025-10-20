<?php
require_once 'conexion.php';

// 1. Obtener el ID de la URL
$id_alumno = $_GET['id'] ?? null;

if (!$id_alumno) {
    header('Location: index.php');
    exit;
}

try {
    // 2. Preparar la consulta DELETE
    $sql = "DELETE FROM alumnos WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    
    // 3. Ejecutar, pasando el ID
    $stmt->execute([$id_alumno]);

    // 4. Redirigir al listado
    header('Location: index.php?status=deleted');
    exit;

} catch (\PDOException $e) {
    // Manejo de errores (ej. si el alumno no se puede borrar por claves foráneas)
    if ($e->getCode() == 23000) {
         echo "Error: No se puede eliminar el alumno porque tiene registros asociados.";
    } else {
         echo "Error al eliminar el alumno: " . $e->getMessage();
    }
}
?>