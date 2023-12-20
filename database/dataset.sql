-- Insertar datos en la tabla Usuarios
INSERT INTO Usuarios (Nombre, Apellido, Telefono, Email, Contraseña, Fecha_Nacimiento, Rol) VALUES
('Juan', 'Pérez', '123456789', 'juan.perez@example.com', 'contraseña123', '1980-04-01', 'Cliente'),
('Maria', 'López', '987654321', 'maria.lopez@example.com', 'contraseña321', '1985-07-15', 'Cuidador'),
('Pedro', 'González', '123456789', 'pedro@example.com', "contraseña123", '1990-01-01', 'Cliente');
('Maria', 'López', '987654321', 'maria.lopez@example.com', 'contraseña321', '1985-07-15', 'Cuidador'),


INSERT INTO Usuarios (Nombre, Apellido, Telefono, Email, Contraseña, Fecha_Nacimiento, Rol) VALUES
('Juan',  'Pérez', '44332211', 'juan@gmail.com',  'Contraseña123', '1990-01-01', 'Cliente'),
('María', 'Pérez', '44332211', 'maria@gmail.com', 'Contraseña123', '1988-05-15', 'Cliente'),
('Pedro', 'Pérez', '44332211', 'pedro@gmail.com', 'Contraseña123', '1995-11-20', 'Cliente');

INSERT INTO Usuarios (Nombre, Apellido, Telefono, Email, Contraseña, Fecha_Nacimiento, Rol) VALUES
('Carlos','Pérez', '44332211', 'carlos@gmail.com','Contraseña123', '1990-01-01', 'Cliente'),
('Ines',  'Pérez', '44332211', 'ines@gmail.com',  'Contraseña123', '1988-05-15', 'Cliente'),
('Ivana', 'Pérez', '44332211', 'ivana@gmail.com', 'Contraseña123', '1995-11-20', 'Cliente');



-- Insertar datos en la tabla Mascotas
INSERT INTO Mascotas (Nombre, Edad, Especie, Raza, Comportamiento, Contacto_Veterinario, Comentarios_Extra, ID_Usuario) VALUES
('Firulais', 5, 'Perro', 'Labrador', 'Amigable y juguetón', 'vet@example.com', 'Le gusta correr en el parque', 1),
('Michi', 3, 'Gato', 'Siames', 'Independiente y curioso', 'vet@example.com', 'Necesita una dieta especial', 1);


INSERT INTO Mascotas (Nombre, Edad, Especie, Raza, Comportamiento, Contacto_Veterinario, Comentarios_Extra, ID_Usuario)
VALUES
('Duke', 3, 'Perro', 'Labrador', 'Juguetón', 'vetmax@example.com', 'Sin comentarios adicionales', 1),
('Spike', 4, 'Perro', 'Bulldog', 'Tranquilo', 'vetrocky@example.com', 'Le gusta jugar con la pelota', 2),
('Canela', 5, 'Perro', 'Poodle', 'Energética', 'vetbella@example.com', 'Le encanta correr al aire libre', 3),
('Chucho', 2, 'Perro', 'Golden Retriever', 'Amigable', 'vetbuddy@example.com', 'Le encanta jugar con pelotas', 1),
('Molly', 3, 'Perro', 'Dálmata', 'Activa', 'vetmolly@example.com', 'Adora correr al aire libre', 2),
('Nala', 4, 'Perro', 'Pastor Alemán', 'Protectora', 'vetnala@example.com', 'Es muy leal a su familia', 3),
('Ronco', 2, 'Perro', 'Bulldog Francés', 'Juguetón', 'vetrocky@example.com', 'Le encanta pasear por el parque', 1),
('Lola', 4, 'Perro', 'Pug', 'Carismático', 'vetlola@example.com', 'Adora estar rodeado de personas', 2);





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


