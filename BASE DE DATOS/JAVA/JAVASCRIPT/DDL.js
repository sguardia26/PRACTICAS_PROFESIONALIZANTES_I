// DDL: Creación de la Base de Datos y Tablas
async function ejecutarBackendSQL() {
    let conexion;

    try {
        console.log(' Conectando al servidor MySQL de MAMP...');
        conexion = await mysql.createConnection(configConexion);
        console.log(' Conexión exitosa al servidor MySQL.\n');

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

        // Seleccionamos la base de datos para las consultas posteriores
        await conexion.changeUser({ database: 'escuela_tech_db' });
        
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