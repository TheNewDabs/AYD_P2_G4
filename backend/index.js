require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const util = require("./util");
const moment = require('moment');
const host = process.env.SV_HOST;
const port = process.env.SV_PORT;

// Configuracion
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Middleware
app.use(express.json({ limit: "10mb" })); // Middleware para manejar JSON y tamanio maximo del JSON
app.use(cors({ origin: "*" })); // CORS

/** Endpoint inicial */
app.get("/", (req, res) => {
  res.json({ message: "¡Ultrapoderoso Grupo 4!" });
});

/** Creacion de un usuario */
app.post("/usuarios/register", (req, res) => {
  // Se recibe los parametros que posee esta entidad
  const parametro = req.body;
  // Debido a que la encriptacion devuelve una promesa es necesario realizarlo de la siguiente forma
  util
    .hashPassword(parametro.contrasenia)

    .then((hashedPassword) => {
      const hashed = hashedPassword;

      //parametro.es_administrador = String(parametro.es_administrador).toLowerCase() === "true";

      const query =
        "INSERT INTO Usuarios (Nombre, Apellido, Telefono, Email, Contraseña, Fecha_Nacimiento, Rol) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(
        query,
        [
          parametro.nombre,
          parametro.apellido,
          parametro.telefono,
          parametro.Email,
          hashed,
          parametro.fechaNacimiento,
          parametro.rol
        ],
        (err, result) => {
          if (err) {
            console.error("Error al insertar el mensaje:", err);
            res.json({
              success: false,
              mensaje: "Ha ocurrido un error al insertar el usuario",
            });
          } else {
            res.json({
              success: true,
              mensaje: "Usuario creado correctamente",
              id_insertado: result.insertId,
            });
          }
        }
      );
    })
    .catch((error) => {
      console.error("Error al encriptar contraseña:", error);
      res.json({
        success: false,
        mensaje: "Ha ocurrido un error al encriptar la contraseña",
      });
    });
});

/** Login del usuario */
app.post("/usuarios/login", (req, res) => {
  // Se recibe los parametros
  const correo = req.body.correoElectronico;
  const contrasenia = req.body.contrasenia;

  // Se define el query que obtendra la contrasenia encriptada
  const query = "SELECT ID_Usuario, Contraseña, Rol, nombre FROM Usuarios WHERE Email = ?";

  // Se ejecuta el query y se realiza la comparacion de contrasenia para verificar que el inicio de sesion sea correcto
  db.query(query, [correo], (err, result) => {
    if (err) {
      console.error("Error al obtener usuario:", err);
      res.json({
        success: false,
        mensaje: "Ha ocurrido un error al obtener el usuario",
      });
    } else {
      if (result.length <= 0) {
        res.json({ success: false, mensaje: "Credenciales incorrectas" });
      } else {
        util
          .comparePassword(contrasenia, result[0].Contraseña)
          .then((esCorrecta) => {
            if (esCorrecta) {
              res.json({
                success: true,
                mensaje: "Bienvenido",
                extra: {
                  id_usuario: result[0].UserID,
                  rol: result[0].Rol,
                  Nombre: result[0].nombre,
                },
              });
            } else {
              res.json({ success: false, mensaje: "Credenciales incorrectas" });
            }
          })
          .catch((error) => {
            console.error("Error al comparar contraseñas:", error);
            res.json({
              success: false,
              mensaje: "Ha ocurrido un error al desencriptar la contraseña",
            });
          });
      }
    }
  });
});

// Endpoint para obtener todos los usuarios (solo accesible para administradores)
app.get('/usuarios', async (req, res) => {
  try {
    // Obtener todos los libros de la base de datos
    const [usuarios] = await db.promise().query('SELECT * FROM Usuarios');

    // Enviar la lista de libros como respuesta
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener la lista de usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para eliminar un usuario (solo accesible para administradores)
app.delete('/usuarios/eliminar/:userID', async (req, res) => {
  try {
    // Extraer el ID del usuario de los parámetros de la solicitud
    const { userID } = req.params;

    // Eliminar el usuario de la base de datos
    await db.promise().query('DELETE FROM Usuarios WHERE ID_Usuario = ?', [userID]);

    // Enviar respuesta de éxito
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar un usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para editar un usuario
app.put('/usuarios/editar/:userID', async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombre, apellido, telefono, email, contraseña, nuevaContraseña, fechaNacimiento } = req.body;
    const { userID } = req.params;

    // Verificar la contraseña del usuario
    const [usuarios] = await db.promise().query('SELECT contraseña FROM Usuarios WHERE ID_Usuario = ?', [userID]);
    const contraseñaCorrecta = await util.comparePassword(contraseña, usuarios[0].contraseña);

    if (!contraseñaCorrecta) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    util
      .hashPassword(nuevaContraseña)
      .then((hashedPassword) => {
        const hashed = hashedPassword;
        db.promise().query('UPDATE Usuarios SET nombre = ?, apellido = ?, telefono = ?, email = ?, contraseña = ?, fechaNacimiento = ? WHERE ID_Usuario = ?', [nombre, apellido, numeroTelefono, correoElectronico, hashed, fechaNacimiento, userID]);
      })
      .catch((error) => {
        console.error("Error al encriptar contraseña:", error);
        res.json({
          success: false,
          mensaje: "Ha ocurrido un error al encriptar la contraseña",
        });
      });
    // Actualizar la información del usuario en la base de datos

    // Enviar respuesta de éxito
    res.json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    console.error('Error al editar un usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/** Inicia el servidor y hace que escuche en el puerto especificado */
app.listen(port, host, () => {
  console.log(`La API está escuchando en http://${host}:${port}`);
});

module.exports = app;