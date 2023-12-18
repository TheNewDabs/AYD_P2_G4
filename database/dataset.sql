-- Insertar datos en la tabla Usuarios
INSERT INTO Usuarios (Nombre, Apellido, Telefono, Email, Contraseña, Fecha_Nacimiento, Rol) VALUES
('Juan', 'Pérez', '123456789', 'juan.perez@example.com', 'contraseña123', '1980-04-01', 'Cliente'),
('Maria', 'López', '987654321', 'maria.lopez@example.com', 'contraseña321', '1985-07-15', 'Cuidador');

-- Insertar datos en la tabla Mascotas
INSERT INTO Mascotas (Nombre, Edad, Especie, Raza, Comportamiento, Contacto_Veterinario, Comentarios_Extra, ID_Usuario) VALUES
('Firulais', 5, 'Perro', 'Labrador', 'Amigable y juguetón', 'vet@example.com', 'Le gusta correr en el parque', 1),
('Michi', 3, 'Gato', 'Siames', 'Independiente y curioso', 'vet@example.com', 'Necesita una dieta especial', 1);

-- Insertar datos en la tabla Hospedajes
INSERT INTO Hospedajes (ID_Mascota, Fecha_Inicio, Fecha_Fin, Estado, ID_Cuidador) VALUES
(1, '2023-01-10', '2023-01-15', 'Comiendo', 2),
(2, '2023-01-12', '2023-01-18', 'Jugando', 2);

-- Insertar datos en la tabla Reseñas
INSERT INTO Reseñas (ID_Usuario, Comentario, Calificación) VALUES
(1, 'Excelente servicio y atención a mi mascota.', 5),
(1, 'Muy satisfecho con el cuidado proporcionado.', 4);

-- Insertar datos en la tabla Perfil del Cuidador (si se utiliza)
INSERT INTO Perfil_Cuidador (ID_Usuario, Experiencia, Calificaciones) VALUES
(2, 'Más de 5 años de experiencia en cuidado de mascotas.', 4.5);
