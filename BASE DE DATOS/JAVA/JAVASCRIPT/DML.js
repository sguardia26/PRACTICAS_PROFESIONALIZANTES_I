//DML: Inserción, Actualización y Eliminación de Datos
async function ejecutarBackendSQL() {
    let conexion;

    try {
        console.log(' Conectando al servidor MySQL de MAMP...');
        conexion = await mysql.createConnection(configConexion);
        console.log(' Conexión exitosa al servidor MySQL.\n');

        console.log('--- 2. EJECUTANDO SENTENCIAS DML (Consultas Preparadas) ---');

        //INSERT INTO
        const sqlInsertCurso = 'INSERT INTO cursos (nombre_curso, turno) VALUES (?, ?)';
        await conexion.execute(sqlInsertCurso, ['5to Informática A', 'Mañana']);
        await conexion.execute(sqlInsertCurso, ['5to Informática B', 'Tarde']);
        console.log(' Cursos insertados.');

        const sqlInsertAlumno = `
            INSERT INTO alumnos (dni, nombre, apellido, email, edad, id_curso_fk) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        const [resAlumno1] = await conexion.execute(sqlInsertAlumno, [
            '42111222', 'Santiago', 'Guardia', 'sguardia@escuela.edu.ar', 17, 1
        ]);
        const idAlumno1 = resAlumno1.insertId;

        const [resAlumno2] = await conexion.execute(sqlInsertAlumno, [
            '43222333', 'María', 'Gómez', 'mgomez@escuela.edu.ar', 16, 1
        ]);
        const idAlumno2 = resAlumno2.insertId;

        await conexion.execute(sqlInsertAlumno, [
            '43444555', 'Juan', 'Pérez', 'jperez@escuela.edu.ar', 17, 2
        ]);
        console.log(' Alumnos registrados.');

        //INSERT INTO
        const sqlInsertNota = `
            INSERT INTO notas (id_alumno_fk, materia, calificacion, fecha_evaluacion) 
            VALUES (?, ?, ?, ?)
        `;
        await conexion.execute(sqlInsertNota, [idAlumno1, 'Backend - JS', 9.50, '2026-05-15']);
        await conexion.execute(sqlInsertNota, [idAlumno1, 'Backend - Java', 8.00, '2026-06-20']);
        await conexion.execute(sqlInsertNota, [idAlumno2, 'Backend - JS', 10.00, '2026-05-15']);
        await conexion.execute(sqlInsertNota, [idAlumno2, 'Frontend - HTML/CSS', 3.00, '2026-04-10']);
        console.log(' Notas registradas.');

        //UPDATE
        const sqlUpdate = 'UPDATE alumnos SET email = ?, edad = ? WHERE id_alumno = ?';
        await conexion.execute(sqlUpdate, ['santiago.guardia@escuela.edu.ar', 18, idAlumno1]);
        console.log(' Registro de alumno actualizado.');

        //DELETE
        const sqlDelete = 'DELETE FROM notas WHERE calificacion < ?';
        const [resultadoDelete] = await conexion.execute(sqlDelete, [4.00]);
        console.log(` Registro de notas reprobadas eliminado. Filas afectadas: ${resultadoDelete.affectedRows}\n`);
        
    } catch (error) {
        console.error(' Error durante la ejecución:', error.message);
    } finally {r
        if (conexion) {
            await conexion.end();
            console.log('\n Conexión con MySQL cerrada correctamente.');
        }
    }
}
ejecutarBackendSQL();