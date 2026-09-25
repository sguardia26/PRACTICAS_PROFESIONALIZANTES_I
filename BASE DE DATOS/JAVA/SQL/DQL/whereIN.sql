SELECT nombre, apellido 
FROM alumnos 
WHERE id_alumno IN (
    SELECT id_alumno_fk 
    FROM notas 
    WHERE calificacion > (SELECT AVG(calificacion) FROM notas)
);