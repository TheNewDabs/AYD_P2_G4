-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS huellita_feliz;
USE huellita_feliz;

-- Crear tabla con logica para correo y token
CREATE TABLE IF NOT EXISTS Validador (
    ID_Validador INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(100) UNIQUE,
    Token VARCHAR(255)
);

-- Crear tabla de Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50),
    Telefono VARCHAR(15),
    Email VARCHAR(100) UNIQUE,
    Contraseña VARCHAR(255),
    Fecha_Nacimiento DATE,
    Rol ENUM('Cliente', 'Cuidador')
);

-- Crear tabla de Mascotas
CREATE TABLE IF NOT EXISTS Mascotas (
    ID_Mascota INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50),
    Edad INT,
    Especie VARCHAR(50),
    Raza VARCHAR(50),
    Comportamiento TEXT,
    Contacto_Veterinario VARCHAR(100),
    Comentarios_Extra TEXT,
    ID_Usuario INT,
    EstaHospedado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);

-- Crear tabla de Hospedajes
CREATE TABLE IF NOT EXISTS Hospedajes (
    ID_Hospedaje INT AUTO_INCREMENT PRIMARY KEY,
    ID_Mascota INT,
    Fecha_Inicio DATE,
    Fecha_Fin DATE,
    Estado ENUM('Comiendo', 'Paseando', 'Bañado', 'Tomando la siesta', 'Jugando', 'Pendiente', 'Listo para devolver'),
    ID_Cuidador INT,
    FOREIGN KEY (ID_Mascota) REFERENCES Mascotas(ID_Mascota),
    FOREIGN KEY (ID_Cuidador) REFERENCES Usuarios(ID_Usuario)
);


ALTER TABLE Hospedajes ADD CONSTRAINT chk_fechas CHECK (Fecha_Inicio < Fecha_Fin);

-- Crear tabla de Reseñas
CREATE TABLE IF NOT EXISTS Reseñas (
    ID_Reseña INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT,
    Comentario TEXT,
    Calificación INT,
    Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);

-- Crear tabla de Perfil del Cuidador (opcional)
CREATE TABLE IF NOT EXISTS Perfil_Cuidador (
    ID_Usuario INT PRIMARY KEY,
    Experiencia TEXT,
    Calificaciones DECIMAL(3,2),
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuario)
);
