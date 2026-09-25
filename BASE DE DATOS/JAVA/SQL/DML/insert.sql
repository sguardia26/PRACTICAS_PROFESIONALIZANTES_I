INSERT INTO cursos (nombre_curso, turno) VALUES 
('5to Informática 1°', 'TARDE'),
('5to Informática 2°', 'TARDE'),

INSERT INTO alumnos (dni, nombre, apellido, email, edad, id_curso_fk) VALUES 
('42111222', 'Madelein Ailen', 'Hualpa Aguilar', 'mhulpa@cen.edu.ar', 17, 1),
('43222333', 'Leonel Uriel', 'Alamo Villegas', 'lalamo@cen.edu.ar', 16, 1),
('43444555', 'Pamela Melody', 'Benitez Quispe', 'pbenitez@cen.edu.ar', 17, 2),
('42999888', 'Matias Agustin', 'Carrizo', 'mcarrizo@cen.edu.ar', 18, 3),
('44000111', 'Tiago Agustin', 'Ahumada Olivares', 'tahumada@cen.edu.ar', 16, 1);

INSERT INTO notas (id_alumno_fk, materia, calificacion, fecha_evaluacion) VALUES 
(1, 'Backend - JS', 9.50, '2026-05-15'),
(1, 'Backend - Java', 8.00, '2026-06-20'),
(2, 'Backend - JS', 10.00, '2026-05-15'),
(2, 'Frontend - HTML/CSS', 9.00, '2026-04-10'),
(3, 'Backend - JS', 3.50, '2026-05-15'),
(4, 'Servidores', 7.50, '2026-06-01');