SELECT 
    c.nombre_curso,
    a.apellido,
    a.nombre,
    n.materia,
    n.calificacion
FROM cursos c
INNER JOIN alumnos a ON c.id_curso = a.id_curso_fk
INNER JOIN notas n ON a.id_alumno = n.id_alumno_fk
WHERE n.calificacion >= 6.00
ORDER BY c.nombre_curso, a.apellido;