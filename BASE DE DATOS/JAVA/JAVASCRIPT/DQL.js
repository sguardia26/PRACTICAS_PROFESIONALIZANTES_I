//DQL: Consultas de Lectura (SELECT)
async function ejecutarBackendSQL() {
    let conexion;

    try {
        console.log(' Conectando al servidor MySQL de MAMP...');
        conexion = await mysql.createConnection(configConexion);
        console.log(' Conexión exitosa al servidor MySQL.\n');

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
ejecutarBackendSQL();