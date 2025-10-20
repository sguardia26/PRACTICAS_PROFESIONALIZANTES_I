<?php
require_once 'consultas/conexion.php';
require_once 'template/cabecera.php';
require_once 'consultas/select.php';

// ------ LÓGICA DE ALUMNOS (simulada para este ejemplo) ------
// En tu archivo real, aquí pondrías el try/catch y el $stmt->fetchAll()
try {
    $sql = "SELECT id, nombre, apellido, email FROM alumnos ORDER BY apellido ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $alumnos = $stmt->fetchAll();
} catch (\PDOException $e) {
    echo "<div class='alert alert-danger'>Error al consultar los alumnos: " . $e->getMessage() . "</div>";
    $alumnos = [];
}


// ------ ALERTAS ------
$status = $_GET['status'] ?? '';
if ($status === 'success') {
    echo "<div class='alert alert-success alert-dismissible fade show' role='alert'>
            Alumno guardado exitosamente.
            <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
          </div>";
} elseif ($status === 'updated') {
    echo "<div class='alert alert-success alert-dismissible fade show' role='alert'>
            Alumno actualizado exitosamente.
            <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
          </div>";
} elseif ($status === 'deleted') {
    echo "<div class='alert alert-success alert-dismissible fade show' role='alert'>
            Alumno eliminado exitosamente.
            <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
          </div>";
}
?>
<main class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Alumnos</h2>
        <a href="crear.php" class="btn btn-primary">Agregar Alumno</a>
    </div>

    <div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <thead class="table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($alumnos)): ?>
                    <tr>
                        <td colspan="4" class="text-center">No hay alumnos registrados.</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($alumnos as $alumno): ?>
                        <tr>
                            <td><?= htmlspecialchars($alumno['nombre']) ?></td>
                            <td><?= htmlspecialchars($alumno['apellido']) ?></td>
                            <td><?= htmlspecialchars($alumno['email']) ?></td>
                            <td class="text-center">
                                <a href="modificar.php?id=<?= $alumno['id'] ?>" class="btn btn-warning btn-sm">Editar</a>
                                <a href="consultas/delete.php?id=<?= $alumno['id'] ?>" class="btn btn-danger btn-sm" 
                                onclick="return confirm('¿Estás seguro de que deseas eliminar a este alumno?');">
                                Eliminar
                                </a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</main>

<?php
require_once 'template/pie.php';
?>