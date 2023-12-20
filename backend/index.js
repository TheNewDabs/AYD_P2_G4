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
const crypto = require('crypto');

// Configuracion
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Middleware
app.use(express.json({ limit: "10mb" })); // Middleware para manejar JSON y tamanio maximo del JSON
app.use(cors({ origin: "*" })); // CORS

// Funcion para generar el token a utilizar en la base de datos para el logeo de manera correcta
function generarToken(longitud) {
  const caracteresPermitidos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const longitudCaracteres = caracteresPermitidos.length;

  let token = '';
  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = crypto.randomInt(0, longitudCaracteres);
    token += caracteresPermitidos.charAt(indiceAleatorio);
  }

  return token;
}
// Configura el transporte de Nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail', // Reemplaza con tu servicio de correo electrónico
  auth: {
      user: process.env.EMAIL_USER, // Tu dirección de correo electrónico
      pass: process.env.EMAIL_PASSWORD // Tu contraseña de correo electrónico
  }
});

// Funcion para la logica de la tabla validador
function logicaValidador(usuarioEmail, token) {

  // validar que exista un registro con el usuarioEmail que nos dan en la tabla 'Validador'
  const query = "SELECT * FROM Validador WHERE Email = ?";
  db.query(query, [usuarioEmail], (err, result) => {
      if (err) {
          console.error("Error al obtener el usuario:", err);
      } else {
          if (result.length <= 0) {
              // Si no existe, insertar el registro
              const queryInsert = "INSERT INTO Validador (Email, Token) VALUES (?, ?)";
              db.query(queryInsert, [usuarioEmail, token], (err, result) => {
                  if (err) {
                      console.error("Error al insertar el registro:", err);
                  } else {
                      console.log("Registro insertado correctamente");
                  }
              });
          } else {
              // Si existe, actualizar el registro
              const queryUpdate = "UPDATE Validador SET Token = ? WHERE Email = ?";
              db.query(queryUpdate, [token, usuarioEmail], (err, result) => {
                  if (err) {
                      console.error("Error al actualizar el registro:", err);
                  } else {
                      console.log("Registro actualizado correctamente");
                  }
              });
          }
      }
  });

}

// Función para enviar correo electrónico
function enviarCorreoVerificacion(usuarioEmail, usuarioNombre) {

  token = generarToken(20);

  // Hacer la insercion o el updte a la tabla 'Validador'
  logicaValidador(usuarioEmail, token);

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: usuarioEmail,
      subject: 'Verificación de Cuenta',
      text: `Hola ${usuarioNombre},\n\nPor favor, verifica tu cuenta utilizando el siguiente token:\n\n${token}`
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
            enviarCorreoVerificacion(parametro.email, parametro.nombre);

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
  const correo = req.body.correoElectronico;
  const contrasenia = req.body.contrasenia;
  const token = contrasenia;
  // Validar que dicho correo no esté en el registro de validador
  const queryValidador = "SELECT * FROM Validador WHERE Email = ?";
  db.query(queryValidador, [correo], (err, result) => {
    if (err) {
      console.error("Error al obtener el usuario:", err);
      return res.status(500).json({
        success: false,
        mensaje: "Ha ocurrido un error al obtener el usuario",
        error: err.message,
      });
    } else {
      if (result.length > 0) {
        // El correo existe en la tabla Validador, verificar el token
        const query = "SELECT * FROM Validador WHERE Email = ? AND Token = ?";
        db.query(query, [correo, token], (err, result) => {
          if (err) {
            console.error("Error al obtener el usuario:", err);
            return res.status(500).json({
              success: false,
              mensaje: "Ha ocurrido un error al obtener el usuario",
              error: err.message,
            });
          }

          if (result.length > 0) {
            // Token correcto, obtener datos del usuario y eliminar el registro de la tabla Validador
            const queryUsuario =
              "SELECT ID_Usuario, Contraseña, Rol, Nombre, Apellido, Telefono, Fecha_Nacimiento FROM Usuarios WHERE Email = ?";
            db.query(queryUsuario, [correo], (err, resultUsuario) => {
              if (err) {
                return res.json({
                  success: false,
                  mensaje: "Ha ocurrido un error al obtener el usuario",
                });
              } else {
                if (resultUsuario.length <= 0) {
                  return res.json({
                    success: false,
                    mensaje: "Credenciales incorrectas",
                  });
                } else {
                  // Eliminar registro de la tabla Validador
                  const queryDelete =
                    "DELETE FROM Validador WHERE Email = ?";
                  db.query(queryDelete, [correo], (err, resultDelete) => {
                    if (err) {
                      console.error(
                        "Error al eliminar el registro de la tabla Validador:",
                        err
                      );
                      return res.status(500).json({
                        success: false,
                        mensaje:
                          "No se pudo eliminar el registro de la tabla Validador",
                        error: err.message,
                      });
                    }
                    console.log(
                      "Registro de Validador eliminado correctamente"
                    );
                    // Retornar respuesta sin validar la contraseña
                    return res.json({
                      success: true,
                      mensaje: "Bienvenido",
                      usuario: {
                        ID_Usuario: resultUsuario[0].ID_Usuario,
                        Nombre: resultUsuario[0].Nombre,
                        Apellido: resultUsuario[0].Apellido,
                        Telefono: resultUsuario[0].Telefono,
                        Email: correo,
                        Fecha_Nacimiento: resultUsuario[0].Fecha_Nacimiento,
                        Rol: resultUsuario[0].Rol,
                        Contraseña: '',
                      },
                    });
                  });
                }
              }
            });
          } else {
            // Token incorrecto
            return res.status(401).json({
              success: false,
              mensaje: "Token incorrecto",
            });
          }
        });
      } else {
        // El correo no existe en la tabla Validador, realizar el proceso normal para validar la contraseña
        const query =
          "SELECT ID_Usuario, Contraseña, Rol, Nombre, Apellido, Telefono, Fecha_Nacimiento FROM Usuarios WHERE Email = ?";
        db.query(query, [correo], (err, result) => {
          if (err) {
            return res.json({
              success: false,
              mensaje: "Ha ocurrido un error al obtener el usuario",
            });
          } else {
            if (result.length <= 0) {
              return res.json({
                success: false,
                mensaje: "Credenciales incorrectas",
              });
            } else {
              util
                .comparePassword(contrasenia, result[0].Contraseña)
                .then((esCorrecta) => {
                  if (esCorrecta) {
                    return res.json({
                      success: true,
                      mensaje: "Bienvenido",
                      usuario: {
                        ID_Usuario: result[0].ID_Usuario,
                        Nombre: result[0].Nombre,
                        Apellido: result[0].Apellido,
                        Telefono: result[0].Telefono,
                        Email: correo,
                        Fecha_Nacimiento: result[0].Fecha_Nacimiento,
                        Rol: result[0].Rol,
                        Contraseña: '',
                      },
                    });
                  } else {
                    return res.json({
                      success: false,
                      mensaje: "Credenciales incorrectas",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error al comparar contraseñas:", error);
                  return res.json({
                    success: false,
                    mensaje:
                      "Ha ocurrido un error al desencriptar la contraseña",
                  });
                });
            }
          }
        });
      }
    }
  });
});

//Optener usuario por ID
app.get("/usuarios/:userID", async (req, res) => {
  try {
    // Obtener el ID de usuario de los parámetros de la solicitud
    const { userID } = req.params;

    // Consultar los datos del usuario por ID (excepto la contraseña)
    const [usuario] = await db
      .promise()
      .query("SELECT ID_Usuario, Nombre, Apellido, Telefono, Email, Fecha_Nacimiento, Rol FROM Usuarios WHERE ID_Usuario = ?", [userID]);

    // Verificar si se encontró el usuario
    if (usuario.length > 0) {
      // Enviar los datos del usuario como respuesta
      res.json({
        success: true,
        mensaje: "Datos del usuario obtenidos correctamente",
        usuario: {
          ID_Usuario: resultUsuario[0].ID_Usuario,
          Nombre: resultUsuario[0].Nombre,
          Apellido: resultUsuario[0].Apellido,
          Telefono: resultUsuario[0].Telefono,
          Email: correo,
          Fecha_Nacimiento: resultUsuario[0].Fecha_Nacimiento,
          Rol: resultUsuario[0].Rol,
          Contraseña: '',
        },
      });
    } else {
      // Si no se encuentra el usuario, enviar un mensaje de error
      res.status(404).json({ success: false, mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ success: false, mensaje: "Error interno del servidor" });
  }
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
      return res.status(401).json({success: false, message: "Contraseña incorrecta" });
    }

    util
      .hashPassword(nuevaContraseña)
      .then((hashedPassword) => {
        const hashed = hashedPassword;
        db.promise().query(
          "UPDATE Usuarios SET nombre = ?, apellido = ?, telefono = ?, email = ?, contraseña = ?, Fecha_Nacimiento = ? WHERE ID_Usuario = ?",
          [nombre, apellido, telefono, email, hashed, (fechaNacimiento ? fechaNacimiento.slice(0, 10) : ''), userID]
        );
      })
      .catch((error) => {
        console.error("Error al encriptar contraseña:", error);
        res.json({
          success: false,
          message: "Ha ocurrido un error al encriptar la contraseña",
        });
      });
    // Actualizar la información del usuario en la base de datos

    // Enviar respuesta de éxito
    res.json({ 
      success: true,
      message: "Usuario actualizado con éxito" 
    });
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
  const query = `INSERT INTO Hospedajes (ID_Mascota, Fecha_Inicio, Fecha_Fin, Estado) VALUES (?, ?, ?, 'Pendiente'); 
  UPDATE Mascotas SET EstaHospedado = TRUE WHERE ID_Mascota = ?;`;
  db.query(query, [idMascota, fechaInicio, fechaFin, idMascota], (err, result) => {
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


// Endpoint para obtener todas las mascotas de un usuario que no esten ospedadadas
app.get("/usuarios/mascotasNoHospedadas/:idUsuario", (req, res) => {
  const idUsuario = req.params.idUsuario;

  // Consulta SQL para obtener las mascotas que no están hospedadas
  const query = `
      SELECT ID_Mascota, Nombre, Especie, Raza, Edad
      FROM Mascotas
      WHERE ID_Usuario = ? AND EstaHospedado = FALSE`;

  db.query(query, [idUsuario], (err, result) => {
      if (err) {
          console.error("Error al obtener las mascotas no hospedadas:", err);
          res.json({
              success: false,
              mensaje: "Ha ocurrido un error al obtener las mascotas no hospedadas"
          });
      } else {
          res.json({
              success: true,
              mensaje: "Mascotas no hospedadas obtenidas correctamente",
              mascotas: result
          });
      }
  });
});


app.delete("/mascotas/devolver", (req, res) => {
  const { idMascota } = req.body;

  // Iniciar transacción para asegurar la consistencia de los datos
  db.beginTransaction(err => {
      if (err) {
          console.error("Error al iniciar la transacción:", err);
          return res.json({
              success: false,
              mensaje: "Error al iniciar la transacción para devolver la mascota"
          });
      }

      // Paso 1: Actualizar la tabla Mascotas
      const queryMascotas = "UPDATE Mascotas SET EstaHospedado = FALSE WHERE ID_Mascota = ?";
      db.query(queryMascotas, [idMascota], (err, result) => {
          if (err) {
              return db.rollback(() => {
                  console.error("Error al actualizar Mascotas:", err);
                  res.json({
                      success: false,
                      mensaje: "Error al actualizar el estado de la mascota"
                  });
              });
          }

          // Paso 2: Eliminar el registro de hospedaje de la tabla Hospedajes
          const queryHospedajes = "DELETE FROM Hospedajes WHERE ID_Mascota = ?";
          db.query(queryHospedajes, [idMascota], (err, result) => {
              if (err) {
                  return db.rollback(() => {
                      console.error("Error al eliminar el hospedaje:", err);
                      res.json({
                          success: false,
                          mensaje: "Error al eliminar el hospedaje de la mascota"
                      });
                  });
              }

              // Si todo salió bien, commit de la transacción
              db.commit(err => {
                  if (err) {
                      return db.rollback(() => {
                          console.error("Error al hacer commit de la transacción:", err);
                          res.json({
                              success: false,
                              mensaje: "Error al finalizar la transacción para devolver la mascota"
                          });
                      });
                  }

                  res.json({
                      success: true,
                      mensaje: "Mascota devuelta y registro de hospedaje eliminado correctamente"
                  });
              });
          });
      });
  });
});


app.get("/usuarios/:idUsuario/mascotasHospedadas", (req, res) => {
  const idUsuario = req.params.idUsuario;

  // Consulta SQL para obtener las mascotas hospedadas y su estado
  const query = `
      SELECT m.ID_Mascota, m.Nombre, m.Especie, m.Raza, h.Fecha_Inicio, h.Fecha_Fin, h.Estado
      FROM Mascotas m
      INNER JOIN Hospedajes h ON m.ID_Mascota = h.ID_Mascota
      WHERE m.ID_Usuario = ?`;

  db.query(query, [idUsuario], (err, result) => {
      if (err) {
          console.error("Error al obtener las mascotas hospedadas:", err);
          res.json({
              success: false,
              mensaje: "Ha ocurrido un error al obtener las mascotas hospedadas"
          });
      } else {
          res.json({
              success: true,
              mensaje: "Mascotas hospedadas obtenidas correctamente",
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
