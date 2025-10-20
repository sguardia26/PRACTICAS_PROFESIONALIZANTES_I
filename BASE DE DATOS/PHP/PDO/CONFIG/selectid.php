<?php
require_once 'conexion.php';

// 1. Obtener el ID de la URL (siempre validar)
$id_alumno = $_GET['id'] ?? null;

if (!$id_alumno) {
    header('Location: index.php'); // Redirigir si no hay ID
    exit;
}

try {
    // 2. Preparar la consulta con un marcador de posición (?)
    $sql = "SELECT nombre, apellido, email FROM alumnos WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    
    // 3. Ejecutar, pasando el ID en un array.
    // PDO se encarga de "sanitizar" el $id_alumno para evitar Inyección SQL.
    $stmt->execute([$id_alumno]);
    
    // 4. Obtener el único registro
    // fetch() devuelve una sola fila, o false si no se encontró
    $alumno = $stmt->fetch();

    if (!$alumno) {
        echo "Alumno no encontrado.";
        exit;
    }

} catch (\PDOException $e) {
    echo "Error al buscar el alumno: " . $e->getMessage();
}

// 5. Ahora puedes usar $alumno['nombre'] en los 'value' de tu formulario HTML
?>
<input type="text" name="nombre" value="<?= htmlspecialchars($alumno['nombre']) ?>">