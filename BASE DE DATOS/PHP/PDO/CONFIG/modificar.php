<?php
require_once 'consultas/conexion.php';
$alumno = null;
$error_message = '';

$id_alumno = $_GET['id'] ?? null;
if (!$id_alumno) {
    header('Location: index.php');
    exit;
}

try {
    $sql_get = "SELECT * FROM alumnos WHERE id = ?";
    $stmt_get = $pdo->prepare($sql_get);
    $stmt_get->execute([$id_alumno]);
    $alumno = $stmt_get->fetch();

    if (!$alumno) {
        $error_message = "Alumno no encontrado.";
    }
} catch (\PDOException $e) {
    $error_message = "Error al buscar el alumno: " . $e->getMessage();
}


require_once 'consultas/update.php';
require_once '../template/cabecera.php';
?>

<h2>Modificar Alumno</h2>
<hr>

<?php if (!empty($error_message)): ?>
    <div class="alert alert-danger"><?= $error_message ?></div>
<?php endif; ?>

<?php if ($alumno): ?>
<div class="row">
    <div class="col-md-8">
        <form action="actualizar.php" method="POST">
            
            <input type="hidden" name="id_alumno" value="<?= $alumno['id'] ?>">
            
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" 
                       value="<?= htmlspecialchars($alumno['nombre']) ?>" required>
            </div>
            
            <div class="mb-3">
                <label for="apellido" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="apellido" name="apellido" 
                       value="<?= htmlspecialchars($alumno['apellido']) ?>" required>
            </div>
            
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" 
                       value="<?= htmlspecialchars($alumno['email']) ?>" required>
            </div>
            
            <button type="submit" class="btn btn-success">Actualizar Alumno</button>
            <a href="index.php" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
</div>
<?php endif; ?>

<?php
require_once 'template/pie.php';
?>