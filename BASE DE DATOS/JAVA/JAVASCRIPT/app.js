import mysql from 'mysql2/promise';

// Configuración de conexión al servidor MySQL local de MAMP
const configConexion = {
    host: 'localhost',
    port: 3306,             
    user: 'root',
    password: 'root',    
    multipleStatements: true
};

async function ejecutarBackendSQL() {
    let conexion;

    try {
        console.log(' Conectando al servidor MySQL de MAMP...');
        conexion = await mysql.createConnection(configConexion);
        console.log(' Conexión exitosa al servidor MySQL.\n');

        //DDL: Creación de la Base de Datos y Tablas
        console.log('--- 1. EJECUTANDO SENTENCIAS DDL ---');
        
        const scriptDDL = `
            CREATE DATABASE IF NOT EXISTS escuela_tech_db
            CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

            USE escuela_tech_db;

            DROP TABLE IF EXISTS notas;
            DROP TABLE IF EXISTS alumnos;
            DROP TABLE IF EXISTS cursos;

            CREATE TABLE cursos (
                id_curso INT AUTO_INCREMENT PRIMARY KEY,
                nombre_curso VARCHAR(50) NOT NULL UNIQUE,
                turno VARCHAR(20) NOT NULL DEFAULT 'Mañana'
            );

            CREATE TABLE alumnos (
                id_alumno INT AUTO_INCREMENT PRIMARY KEY,
                dni VARCHAR(15) NOT NULL UNIQUE,
                nombre VARCHAR(50) NOT NULL,
                apellido VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                edad INT CHECK (edad >= 13),
                id_curso_fk INT,
                CONSTRAINT fk_alumnos_cursos 
                    FOREIGN KEY (id_curso_fk) REFERENCES cursos(id_curso) 
                    ON DELETE SET NULL ON UPDATE CASCADE
            );

            CREATE TABLE notas (
                id_nota INT AUTO_INCREMENT PRIMARY KEY,
                id_alumno_fk INT NOT NULL,
                materia VARCHAR(50) NOT NULL,
                calificacion DECIMAL(4,2) NOT NULL CHECK (calificacion BETWEEN 1.00 AND 10.00),
                fecha_evaluacion DATE NOT NULL,
                CONSTRAINT fk_notas_alumnos 
                    FOREIGN KEY (id_alumno_fk) REFERENCES alumnos(id_alumno) 
                    ON DELETE CASCADE ON UPDATE CASCADE
            );
        `;

        await conexion.query(scriptDDL);
        console.log(' Base de datos "escuela_tech_db" y tablas creadas con éxito.\n');

        await conexion.changeUser({ database: 'escuela_tech_db' });

        //DML: Inserción, Actualización y Eliminación de Datos
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

        //DQL: Consultas de Lectura (SELECT)
        console.log('--- 3. EJECUTANDO CONSULTAS DQL (Lectura de Datos) ---');

        //SELECT 3.1 Consulta simple
        const [filasAlumnos] = await conexion.execute('SELECT id_alumno, nombre, apellido, email, edad FROM alumnos');
        console.log('\n Listado General de Alumnos:');
        console.table(filasAlumnos);

        //SELECT WHERE
        const sqlFiltro = 'SELECT nombre, apellido, edad FROM alumnos WHERE edad >= ?';
        const [filasFiltradas] = await conexion.execute(sqlFiltro, [17]);
        console.log('\n Alumnos de 17 años o más:');
        console.table(filasFiltradas);

        //INNER JOIN
        const sqlJoin = `
            SELECT 
                c.nombre_curso AS Curso,
                CONCAT(a.apellido, ', ', a.nombre) AS Estudiante,
                n.materia AS Materia,
                n.calificacion AS Nota
            FROM cursos c
            INNER JOIN alumnos a ON c.id_curso = a.id_curso_fk
            INNER JOIN notas n ON a.id_alumno = n.id_alumno_fk
            ORDER BY c.nombre_curso, a.apellido
        `;
        const [reporteNotas] = await conexion.execute(sqlJoin);
        console.log('\n Reporte Académico Completo (INNER JOIN de 3 Tablas):');
        console.table(reporteNotas);

        //GROUP BY - HAVING
        const sqlAgrupado = `
            SELECT 
                materia AS Materia,
                COUNT(*) AS Evaluaciones,
                ROUND(AVG(calificacion), 2) AS Promedio
            FROM notas
            GROUP BY materia
            HAVING AVG(calificacion) >= ?
        `;
        const [promedios] = await conexion.execute(sqlAgrupado, [7.00]);
        console.log('\n Promedio por Materia (GROUP BY / HAVING >= 7.00):');
        console.table(promedios);

    } catch (error) {
        console.error(' Error durante la ejecución:', error.message);
    } finally {r
        if (conexion) {
            await conexion.end();
            console.log('\n Conexión con MySQL cerrada correctamente.');
        }
    }
}
// Ejecutar la función principal
ejecutarBackendSQL();