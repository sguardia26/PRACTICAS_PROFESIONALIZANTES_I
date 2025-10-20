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

// 5. En el HTML (¡Importante la seguridad!)
?>
<table>
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($alumnos as $alumno): ?>
            <tr>
                <td><?= htmlspecialchars($alumno['nombre']) ?></td>
                <td><?= htmlspecialchars($alumno['apellido']) ?></td>
                <td><?= htmlspecialchars($alumno['email']) ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>