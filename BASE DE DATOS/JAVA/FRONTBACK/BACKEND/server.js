import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;

//Permite peticiones desde el Frontend
app.use(cors());
//Permite leer datos JSON en el body de las peticiones
app.use(express.json());

//Configuración de la conexión a MySQL en MAMP
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    multipleStatements: true
};

let pool;

async function iniciarBaseDeDatos() {
    try {
        const conexionInicial = await mysql.createConnection(dbConfig);
        
        //CREATE
        await conexionInicial.query(`
            CREATE DATABASE IF NOT EXISTS escuela_tech_db
            CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `);
        await conexionInicial.end();

        //POOL
        pool = mysql.createPool({
            ...dbConfig,
            database: 'escuela_tech_db',
            waitForConnections: true,
            connectionLimit: 10
        });

        //TABLE
        await pool.query(`
            CREATE TABLE IF NOT EXISTS cursos (
                id_curso INT AUTO_INCREMENT PRIMARY KEY,
                nombre_curso VARCHAR(50) NOT NULL UNIQUE,
                turno VARCHAR(20) NOT NULL DEFAULT 'Mañana'
            );

            CREATE TABLE IF NOT EXISTS alumnos (
                id_alumno INT AUTO_INCREMENT PRIMARY KEY,
                dni VARCHAR(15) NOT NULL UNIQUE,
                nombre VARCHAR(50) NOT NULL,
                apellido VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                edad INT CHECK (edad >= 13),
                id_curso_fk INT,
                CONSTRAINT fk_alumnos_cursos FOREIGN KEY (id_curso_fk) REFERENCES cursos(id_curso) ON DELETE SET NULL
            );

            CREATE TABLE IF NOT EXISTS notas (
                id_nota INT AUTO_INCREMENT PRIMARY KEY,
                id_alumno_fk INT NOT NULL,
                materia VARCHAR(50) NOT NULL,
                calificacion DECIMAL(4,2) NOT NULL,
                CONSTRAINT fk_notas_alumnos FOREIGN KEY (id_alumno_fk) REFERENCES alumnos(id_alumno) ON DELETE CASCADE
            );
        `);

        //INSERT
        const [cursos] = await pool.query('SELECT COUNT(*) AS total FROM cursos');
        if (cursos[0].total === 0) {
            await pool.query(`
                INSERT INTO cursos (nombre_curso, turno) VALUES 
                ('5to Informática A', 'Mañana'),
                ('5to Informática B', 'Tarde');
            `);
        }

        console.log(' Base de Datos e Infraestructura MySQL listas.');
    } catch (error) {
        console.error(' Error al inicializar MySQL:', error.message);
    }
}

//GET
app.get('/api/cursos', async (req, res) => {
    try {
        const [cursos] = await pool.query('SELECT * FROM cursos');
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//GET(DQL)(INNER JOIN)
app.get('/api/alumnos', async (req, res) => {
    try {
        const query = `
            SELECT 
                a.id_alumno, a.dni, a.nombre, a.apellido, a.email, a.edad,
                COALESCE(c.nombre_curso, 'Sin Curso') AS curso
            FROM alumnos a
            LEFT JOIN cursos c ON a.id_curso_fk = c.id_curso
            ORDER BY a.id_alumno DESC
        `;
        const [alumnos] = await pool.query(query);
        res.json(alumnos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//POST(DML)
app.post('/api/alumnos', async (req, res) => {
    const { dni, nombre, apellido, email, edad, id_curso_fk } = req.body;

    if (!dni || !nombre || !apellido || !email || !edad) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    try {
        const query = `
            INSERT INTO alumnos (dni, nombre, apellido, email, edad, id_curso_fk)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [resultado] = await pool.execute(query, [dni, nombre, apellido, email, edad, id_curso_fk || null]);

        res.status(201).json({
            mensaje: 'Alumno registrado con éxito en la Base de Datos',
            id_alumno: resultado.insertId
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'El DNI o el Email ya se encuentran registrados.' });
        }
        res.status(500).json({ error: error.message });
    }
});

//DELET
app.delete('/api/alumnos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM alumnos WHERE id_alumno = ?';
        const [resultado] = await pool.execute(query, [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Alumno no encontrado.' });
        }

        res.json({ mensaje: 'Alumno eliminado de la base de datos.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Servidor
app.listen(PORT, () => {
    console.log(` Servidor Backend corriendo en http://localhost:${PORT}`);
    iniciarBaseDeDatos();
});