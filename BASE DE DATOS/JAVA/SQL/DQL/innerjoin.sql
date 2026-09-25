-- INNER JOIN: Devuelve solo coincidencias exactas entre tablas
SELECT 
    a.id_alumno,
    a.nombre,
    a.apellido,
    c.nombre_curso,
    c.turno
FROM alumnos a
INNER JOIN cursos c ON a.id_curso_fk = c.id_curso;