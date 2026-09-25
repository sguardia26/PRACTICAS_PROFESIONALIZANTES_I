SELECT 
    materia, 
    COUNT(*) AS total_evaluaciones, 
    ROUND(AVG(calificacion), 2) AS promedio_materia,
    MAX(calificacion) AS nota_maxima,
    MIN(calificacion) AS nota_minima
FROM notas
GROUP BY materia
HAVING AVG(calificacion) >= 7.00;