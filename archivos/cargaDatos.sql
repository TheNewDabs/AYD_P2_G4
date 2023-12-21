
-- usuarios cuidadores

INSERT INTO Usuario (Nombre, Apellido, Telefono, CorreoElectronico, Contrasena, FechaNacimiento, Rol)
VALUES
('Tomas', 'Morales',  '11223344', 'tomas@petstore.com', 'Tomas123', '1990-01-01', 'Trabajador'),
('Daniel','Barillas', '11223344', 'daniel@petstore.com', 'Daniel123', '1988-05-15', 'Trabajador'),
('Rony',  'Ortiz',    '11223344', 'rony@petstore.com', 'Rony123', '1995-11-20', 'Trabajador'),
('Alvaro','García',   '11223344', 'alvaro@petstore.com', 'Alvaro123', '1995-11-20', 'Trabajador');

-- usuarios clientes

INSERT INTO Usuario (Nombre, Apellido, Telefono, CorreoElectronico, Contrasena, FechaNacimiento, Rol)
VALUES
('Juan',  'Pérez', '44332211', 'juan@gmail.com',  '123456', '1990-01-01', 'Cliente'),
('María', 'Pérez', '44332211', 'maria@gmail.com', '123456', '1988-05-15', 'Cliente'),
('Pedro', 'Pérez', '44332211', 'pedro@gmail.com', '123456', '1995-11-20', 'Cliente'),
('Carlos','Pérez', '44332211', 'carlos@gmail.com','123456', '1990-01-01', 'Cliente'),
('Ines',  'Pérez', '44332211', 'ines@gmail.com',  '123456', '1988-05-15', 'Cliente'),
('Ivana', 'Pérez', '44332211', 'ivana@gmail.com', '123456', '1995-11-20', 'Cliente');

-----mascotas perros

INSERT INTO Mascota (NombreMascota, Edad, Especie, Raza, Comportamiento, ContactoVeterinario, ComentariosExtra, IDUsuario)
VALUES
('Duke', 3, 'Perro', 'Labrador', 'Juguetón', 'vetmax@example.com', 'Sin comentarios adicionales', 5),
('Spike', 4, 'Perro', 'Bulldog', 'Tranquilo', 'vetrocky@example.com', 'Le gusta jugar con la pelota', 6),
('Canela', 5, 'Perro', 'Poodle', 'Energética', 'vetbella@example.com', 'Le encanta correr al aire libre', 7),
('Chucho', 2, 'Perro', 'Golden Retriever', 'Amigable', 'vetbuddy@example.com', 'Le encanta jugar con pelotas', 8),
('Molly', 3, 'Perro', 'Dálmata', 'Activa', 'vetmolly@example.com', 'Adora correr al aire libre', 9),
('Nala', 4, 'Perro', 'Pastor Alemán', 'Protectora', 'vetnala@example.com', 'Es muy leal a su familia', 10),
('Ronco', 2, 'Perro', 'Bulldog Francés', 'Juguetón', 'vetrocky@example.com', 'Le encanta pasear por el parque', 6),
('Lola', 4, 'Perro', 'Pug', 'Carismático', 'vetlola@example.com', 'Adora estar rodeado de personas', 5);

-----mascotas gatos

INSERT INTO Mascota (NombreMascota, Edad, Especie, Raza, Comportamiento, ContactoVeterinario, ComentariosExtra, IDUsuario)
VALUES
('Simba', 1, 'Gato', 'Esfinge', 'Curioso', 'vetsimba@example.com', 'Requiere cuidados especiales en la piel', 7),
('Luna', 2, 'Gato', 'Siamés', 'Cariñoso', 'vetluna@example.com', 'Necesita cepillado regular', 8),
('Nube', 1, 'Gato', 'Angora', 'Mimoso', 'vetwhiskers@example.com', 'Le gusta dormir largas siestas', 9),
('Oreo', 2, 'Gato', 'Maine Coon', 'Curioso', 'vetoreo@example.com', 'Tiene un pelaje muy abundante', 10),
('Nico', 3, 'Gato', 'Siames', 'Cariñoso', 'vetnico@example.com', 'Le gusta descansar en lugares cálidos', 5),
('Miau', 1, 'Gato', 'Persa', 'Curioso', 'vetmiau@example.com', 'Le encanta jugar con pelotas de lana', 6),
('Saga', 5, 'Gato', 'Maine Coon', 'Energético', 'vettoby@example.com', 'Le gusta explorar al aire libre', 7),
('Mochi', 4, 'Gato', 'Maine', 'Energético', 'vettoby@example.com', 'Le gusta comer ratones', 8);

