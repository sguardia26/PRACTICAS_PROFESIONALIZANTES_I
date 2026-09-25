-- LEFT JOIN: Todos los alumnos, tengan o no notas registradas (rellena con NULL)
SELECT 
    a.nombre,
    a.apellido,
    n.materia,
    COALESCE(n.calificacion, 0.00) AS calificacion
FROM alumnos a
LEFT JOIN notas n ON a.id_alumno = n.id_alumno_fk;