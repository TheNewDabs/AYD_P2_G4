require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const util = require("./util");
const moment = require("moment");
const host = process.env.SV_HOST;
const port = process.env.SV_PORT;
const nodemailer = require('nodemailer');


// Configuracion
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Middleware
app.use(express.json({ limit: "10mb" })); // Middleware para manejar JSON y tamanio maximo del JSON
app.use(cors({ origin: "*" })); // CORS


// Configura el transporte de Nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail', // Reemplaza con tu servicio de correo electrónico
  auth: {
      user: process.env.EMAIL_USER, // Tu dirección de correo electrónico
      pass: process.env.EMAIL_PASSWORD // Tu contraseña de correo electrónico
  }
});

// Función para enviar correo electrónico
function enviarCorreoVerificacion(usuarioEmail, usuarioNombre) {
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: usuarioEmail,
      subject: 'Verificación de Cuenta',
      text: `Hola ${usuarioNombre},\n\nPor favor, verifica tu cuenta haciendo clic en el siguiente enlace:\n\n[Enlace de verificación]`
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log('Correo enviado: ' + info.response);
      }
  });
}

app.post("/usuarios/register2", (req, res) => {
// ... Lógica para registrar al usuario
const parametro = req.body;
// Después del registro exitoso, enviar correo de verificación
enviarCorreoVerificacion(parametro.email, parametro.nombre);
});

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
          parametro.email,
          hashed,
          parametro.fechaNacimiento,
          parametro.rol,
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
  const query =
    "SELECT ID_Usuario, Contraseña, Rol, nombre FROM Usuarios WHERE Email = ?";

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
app.get("/usuarios", async (req, res) => {
  try {
    // Obtener todos los libros de la base de datos
    const [usuarios] = await db.promise().query("SELECT * FROM Usuarios");

    // Enviar la lista de libros como respuesta
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint para eliminar un usuario (solo accesible para administradores)
app.delete("/usuarios/eliminar/:userID", async (req, res) => {
  try {
    // Extraer el ID del usuario de los parámetros de la solicitud
    const { userID } = req.params;

    // Eliminar el usuario de la base de datos
    await db
      .promise()
      .query("DELETE FROM Usuarios WHERE ID_Usuario = ?", [userID]);

    // Enviar respuesta de éxito
    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar un usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint para editar un usuario
app.put("/usuarios/editar/:userID", async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const {
      nombre,
      apellido,
      telefono,
      email,
      contraseña,
      nuevaContraseña,
      fechaNacimiento,
    } = req.body;
    const { userID } = req.params;

    // Verificar la contraseña del usuario
    const [usuarios] = await db
      .promise()
      .query("SELECT contraseña FROM Usuarios WHERE ID_Usuario = ?", [userID]);
    const contraseñaCorrecta = await util.comparePassword(
      contraseña,
      usuarios[0].contraseña
    );

    if (!contraseñaCorrecta) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    util
      .hashPassword(nuevaContraseña)
      .then((hashedPassword) => {
        const hashed = hashedPassword;
        db.promise().query(
          "UPDATE Usuarios SET nombre = ?, apellido = ?, telefono = ?, email = ?, contraseña = ?, fechaNacimiento = ? WHERE ID_Usuario = ?",
          [nombre, apellido, telefono, email, hashed, fechaNacimiento, userID]
        );
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
    res.json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    console.error("Error al editar un usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/** Creacion del perfil de la Masctota */
app.post("/mascotas/register", (req, res) => {
  // Se recibe los parámetros que posee esta entidad
  const parametro = req.body;

  // Consulta SQL para insertar datos en la tabla Mascotas
  const query =
    "INSERT INTO Mascotas (Nombre, Edad, Especie, Raza, Comportamiento, Contacto_Veterinario, Comentarios_Extra, ID_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      parametro.nombre,
      parametro.edad,
      parametro.especie,
      parametro.raza,
      parametro.comportamiento,
      parametro.contactoVeterinario,
      parametro.comentariosExtra,
      parametro.idUsuario, // Asegúrate de que este ID sea el del usuario que crea el perfil de la mascota
    ],
    (err, result) => {
      if (err) {
        console.error("Error al insertar la mascota:", err);
        res.json({
          success: false,
          mensaje: "Ha ocurrido un error al insertar la mascota",
        });
      } else {
        res.json({
          success: true,
          mensaje: "Perfil de mascota creado correctamente",
          id_insertado: result.insertId,
        });
      }
    }
  );
});

app.post("/hospedajes/create", (req, res) => {
  const { idMascota, fechaInicio, fechaFin } = req.body;

  // Aquí puedes añadir validaciones para los datos recibidos

  // Inserta un nuevo registro en la tabla Hospedajes
  const query =
    "INSERT INTO Hospedajes (ID_Mascota, Fecha_Inicio, Fecha_Fin, Estado) VALUES (?, ?, ?, 'Pendiente')";
  db.query(query, [idMascota, fechaInicio, fechaFin], (err, result) => {
    if (err) {
      console.error("Error al crear el hospedaje:", err);
      res.json({
        success: false,
        mensaje: "Ha ocurrido un error al registrar el hospedaje",
      });
    } else {
      res.json({
        success: true,
        mensaje: "Hospedaje registrado correctamente",
        idHospedaje: result.insertId,
      });
    }
  });
});

app.get("/mascotas/hospedadas", (req, res) => {
  // Consulta SQL para obtener las mascotas hospedadas
  // Se asume que el estado 'Pendiente' indica una mascota actualmente en el hotel pero no ha sido atendida por un cuidador
  const query = `
      SELECT m.ID_Mascota, m.Nombre, m.Especie, m.Raza, h.Fecha_Inicio, h.Fecha_Fin, h.Estado
      FROM Mascotas m
      INNER JOIN Hospedajes h ON m.ID_Mascota = h.ID_Mascota
      WHERE h.Estado = 'Pendiente'`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error al obtener las mascotas hospedadas:", err);
      res.json({
        success: false,
        mensaje: "Ha ocurrido un error al obtener las mascotas hospedadas",
      });
    } else {
      res.json({
        success: true,
        mensaje: "Mascotas hospedadas obtenidas correctamente",
        mascotas: result,
      });
    }
  });
});

app.put("/hospedajes/assign", (req, res) => {
  // Se reciben los parámetros necesarios
  const { idMascota, idCuidador } = req.body;

  // Comprobar que el cuidador no tenga ya el máximo de 2 mascotas asignadas
  const queryCuidador =
    "SELECT COUNT(*) AS Cantidad FROM Hospedajes WHERE ID_Cuidador = ?";
  db.query(queryCuidador, [idCuidador], (err, result) => {
    if (err) {
      console.error(
        "Error al obtener la cantidad de mascotas asignadas al cuidador:",
        err
      );
      res.json({
        success: false,
        mensaje:
          "Ha ocurrido un error al obtener la cantidad de mascotas asignadas al cuidador",
      });
    } else {
      if (result[0].Cantidad >= 2) {
        res.json({
          success: false,
          mensaje: "El cuidador ya tiene el máximo de mascotas asignadas",
        });
      } else {
        // Continuar con la asignación de la mascota
        // Actualiza la tabla de Hospedajes para asignar la mascota al cuidador
        const query =
          "UPDATE Hospedajes SET ID_Cuidador = ? WHERE ID_Mascota = ? AND ID_Cuidador IS NULL";
        db.query(query, [idCuidador, idMascota], (err, result) => {
          if (err) {
            console.error("Error al asignar la mascota:", err);
            res.json({
              success: false,
              mensaje: "Ha ocurrido un error al asignar la mascota",
            });
          } else if (result.affectedRows === 0) {
            res.json({
              success: false,
              mensaje: "Mascota no disponible o ya asignada",
            });
          } else {
            res.json({
              success: true,
              mensaje: "Mascota asignada correctamente al cuidador",
              idCuidador: idCuidador,
              idMascota: idMascota,
            });
          }
        });
      }
    }
  });
});

app.put("/hospedajes/updateEstado", (req, res) => {
  const { idHospedaje, nuevoEstado } = req.body;

  // Aquí podrías añadir validaciones para el ID del hospedaje y el nuevo estado

  // Actualizar el estado del hospedaje en la tabla Hospedajes
  const query = "UPDATE Hospedajes SET Estado = ? WHERE ID_Hospedaje = ?";
  db.query(
      query,
      [nuevoEstado, idHospedaje],
      (err, result) => {
          if (err) {
              console.error("Error al actualizar el estado del hospedaje:", err);
              res.json({
                  success: false,
                  mensaje: "Ha ocurrido un error al actualizar el estado del hospedaje"
              });
          } else if (result.affectedRows === 0) {
              res.json({
                  success: false,
                  mensaje: "Hospedaje no encontrado o no modificado"
              });
          } else {
              res.json({
                  success: true,
                  mensaje: "Estado del hospedaje actualizado correctamente"
              });
          }
      }
  );
});

app.get("/cuidadores/mascotasAsignadas/:idCuidador", (req, res) => {
  const idCuidador = req.params.idCuidador;

  // Consulta SQL para obtener las mascotas asignadas al cuidador
  const query = `
      SELECT m.ID_Mascota, m.Nombre, m.Especie, m.Raza, h.Fecha_Inicio, h.Fecha_Fin, h.Estado
      FROM Mascotas m
      INNER JOIN Hospedajes h ON m.ID_Mascota = h.ID_Mascota
      WHERE h.ID_Cuidador = ?`;

  db.query(query, [idCuidador], (err, result) => {
      if (err) {
          console.error("Error al obtener las mascotas asignadas:", err);
          res.json({
              success: false,
              mensaje: "Ha ocurrido un error al obtener las mascotas asignadas"
          });
      } else {
          res.json({
              success: true,
              mensaje: "Mascotas asignadas obtenidas correctamente",
              mascotas: result
          });
      }
  });
});


/** Inicia el servidor y hace que escuche en el puerto especificado */
app.listen(port, host, () => {
  console.log(`La API está escuchando en http://${host}:${port}`);
});

module.exports = app;
