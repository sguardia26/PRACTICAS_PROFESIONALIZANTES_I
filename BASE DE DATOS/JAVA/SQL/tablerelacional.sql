CREATE TABLE alumnos (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(15) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    -- Restricción de Validación (CHECK)
    edad INT CHECK (edad >= 13),                 
    id_curso_fk INT,
    
    -- Clave Foránea e Integridad Referencial
    CONSTRAINT fk_alumnos_cursos 
        FOREIGN KEY (id_curso_fk) 
        REFERENCES cursos(id_curso) 
        -- Si se borra el curso, pasa a NULL
        ON DELETE SET NULL
        -- Actualización en cascada                       
        ON UPDATE CASCADE                        
);

CREATE TABLE notas (
    id_nota INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno_fk INT NOT NULL,
    materia VARCHAR(50) NOT NULL,
    calificacion DECIMAL(4, 2) NOT NULL CHECK (calificacion BETWEEN 1.00 AND 10.00),
    fecha_evaluacion DATE NOT NULL,
    
    CONSTRAINT fk_notas_alumnos 
        FOREIGN KEY (id_alumno_fk) 
        REFERENCES alumnos(id_alumno)
        -- Si se elimina el alumno, borra sus notas 
        ON DELETE CASCADE                        
        ON UPDATE CASCADE
);