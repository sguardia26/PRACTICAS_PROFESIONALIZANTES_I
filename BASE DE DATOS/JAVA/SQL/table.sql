CREATE TABLE cursos (
    -- Clave Primaria autonumerada
    id_curso INT AUTO_INCREMENT PRIMARY KEY, 
    -- Restricción de Unicidad    
    nombre_curso VARCHAR(50) NOT NULL UNIQUE,
    -- Valor predeterminado
    turno VARCHAR(20) NOT NULL DEFAULT 'Mañana'  
);