const request = require("supertest");
const app = require("../index");

// Test de la ruta inicial
describe("GET /", () => {
  it("Deberia responder un saludo del grupo 4", (done) => {
    request(app).get("/").expect("Content-Type", /json/).expect(200, done);
  });
});

// Test Creacion de un usuario
describe("POST /usuarios/register", () => {
  it("Deberia crear un usuario", (done) => {
    request(app)
      .post("/usuarios/register")
      .send({
        nombre: "Juan",
        apellido: "Pérez",
        numeroTelefono: "123456789",
        correoElectronico: "juan2.perez@example.com",
        contrasenia: "Password123",
        fechaNacimiento: "1990-01-01",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Test Login del usuario
describe("POST /usuarios/login", () => {
  it("Deberia logear un usuario", (done) => {
    request(app)
      .post("/usuarios/login")
      .send({
        correoElectronico: "juan.perez@example.com",
        contrasenia: "Password123",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Test Actualizar usuario
/**### 🟠 [PUT] /usuarios/editar/:userID 

- **Descripción**
  - Editar usuario
- **Content-Type de la solicitud**

  ```json
    {
    "nombre": "NuevoNombre",
    "apellido": "NuevoApellido",
    "numeroTelefono": "987654321",
    "correoElectronico": "nuevo.correo@example.com",
    "contraseña": "NuevaContraseña123",
    "fechaNacimiento": "1995-05-15"
    } */
describe("PUT /usuarios/editar/:userID", () => {
  it("Deberia actualizar un usuario", (done) => {
    request(app)
      .put("/usuarios/editar/1")
      .send({
        nombre: "NuevoNombre",
        apellido: "NuevoApellido",
        numeroTelefono: "987654321",
        correoElectronico: "nuevo.correo@example.com",
        contraseña: "Password123",
        nuevaContraseña: "NuevaContraseña123",
        fechaNacimiento: "1995-05-15"
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Test Eliminar usuario
describe("DELETE /usuarios/eliminar", () => {
  it("Deberia eliminar un usuario", (done) => {
    request(app)
      .delete("/usuarios/eliminar/1")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});


// Test ingresar libro
/*
- **Descripción**
  - Ingreso de libro
- **Content-Type de la solicitud**

  ```json
  {
    "titulo": "El Señor de los Anillos 2",
    "sinopsis": "Una novela épica de fantasía que sigue las aventuras de Frodo Bolsón para destruir un anillo maligno.",
    "precioCompra": 20.99,
    "precioRenta": 5.99,
    "fechaDevolucionRenta": "2023-01-01",
    "autor": "J.R.R. Tolkien",
    "anoPublicacion": 1954,
    "editorial": "Minotauro",
    "estado": "Disponible"
  }
  ```
*/
describe("POST /libros/ingresar", () => {
  it("Deberia ingresar un libro", (done) => {
    request(app)
      .post("/libros/ingresar")
      .send({
        titulo: "El Señor de los Anillos 2",
        sinopsis:
          "Una novela épica de fantasía que sigue las aventuras de Frodo Bolsón para destruir un anillo maligno.",
        precioCompra: 20.99,
        precioRenta: 5.99,
        fechaDevolucionRenta: "2023-01-01",
        autor: "J.R.R. Tolkien",
        anoPublicacion: 1954,
        editorial: "Minotauro",
        estado: "Disponible"
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

/**
 * ### 🟠 [PUT] /libros/actualizar/:libroID

- **Descripción**
  - Actualizacion de libro
- **Content-Type de la solicitud**

  ```json
  {
    "titulo": "El Señor de los Anillos: Las Dos Torres",
    "sinopsis": "Segunda parte de la trilogía épica que sigue las aventuras de Frodo Bolsón y la Compañía del Anillo.",
    "precioCompra": 25.99,
    "precioRenta": 6.99,
    "fechaDevolucionRenta": "2023-02-01",
    "autor": "J.R.R. Tolkien",
    "anoPublicacion": 1954,
    "editorial": "Minotauro"
  }
  ```

- **Estructura de la respuesta**
  ```json
  {
    "message": "Libro actualizado con éxito"
  }
  ```
 */
describe("PUT /libros/actualizar/:libroID", () => {
  it("Deberia actualizar un libro", (done) => {
    request(app)
      .put("/libros/actualizar/1")
      .send({
        titulo: "El Señor de los Anillos: Las Dos Torres",
        sinopsis:
          "Segunda parte de la trilogía épica que sigue las aventuras de Frodo Bolsón y la Compañía del Anillo.",
        precioCompra: 25.99,
        precioRenta: 6.99,
        fechaDevolucionRenta: "2023-02-01",
        autor: "J.R.R. Tolkien",
        anoPublicacion: 1954,
        editorial: "Minotauro"
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
}); 



/**
 * 
### 🟣 [GET] /libros

- **Descripción**
  - Obtiene todos las libros existentes.
- **Estructura de la respuesta**
  ```json
  [
    {
      "LibroID": 1,
      "Titulo": "El Señor de los Anillos: Las Dos Torres",
      "Sinopsis": "Segunda parte de la trilogía épica que sigue las aventuras de Frodo Bolsón y la Compañía del Anillo.",
      "PrecioCompra": "25.99",
      "PrecioRenta": "6.99",
      "FechaDevolucionRenta": "2023-02-01T06:00:00.000Z",
      "Autor": "J.R.R. Tolkien",
      "AnoPublicacion": 1954,
      "Editorial": "Minotauro",
      "Estado": "Ocupado"
    },
    {
      "LibroID": 2,
      "Titulo": "El Señor de los Anillos 2",
      "Sinopsis": "Una novela épica de fantasía que sigue las aventuras de Frodo Bolsón para destruir un anillo maligno.",
      "PrecioCompra": "20.99",
      "PrecioRenta": "5.99",
      "FechaDevolucionRenta": "2023-01-01T06:00:00.000Z",
      "Autor": "J.R.R. Tolkien",
      "AnoPublicacion": 1954,
      "Editorial": "Minotauro",
      "Estado": "Disponible"
    }
  ]
  ```
 */
describe("GET /libros", () => {
  it("Deberia obtener todos los libros", (done) => {
    request(app)
      .get("/libros")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Test Creacion de un usuario
describe("POST /usuarios/register", () => {
  it("Deberia crear un usuario", (done) => {
    request(app)
      .post("/usuarios/register")
      .send({
        nombre: "Juan",
        apellido: "Pérez",
        numeroTelefono: "123456789",
        correoElectronico: "juan2.perez@example.com",
        contrasenia: "Password123",
        fechaNacimiento: "1990-01-01",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

/**
 * ### 🟢 **[POST] /libros/comentar/:libroID**

- **Descripción**
  - Comentar libro
- **Content-Type de la solicitud**

  ```json
  {
    "usuarioID": 1,  // Reemplaza con el ID real del usuario
    "comentario": "Este libro es increíble. ¡Lo super recomiendo!"
  }

  ```
 */
describe("POST /libros/comentar/:libroID", () => {
  it("Deberia comentar un libro", (done) => {
    request(app)
      .post("/libros/comentar/1")
      .send({
        usuarioID: 2,
        comentario: "Este libro es increíble. ¡Lo super recomiendo!"
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

/**### 🔴 [DELETE] /libros/eliminar/:libroID

- **Descripción**
  - Eliminar libro 
  */
  describe("DELETE /libros/eliminar/:libroID", () => {
    it("Deberia eliminar un libro", (done) => {
      request(app)
        .delete("/libros/eliminar/1")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });


// ======================== TEST TOMAS ========================

describe("POST /libros/alquilar", () => {
  it("Deberia alquilar un libro", (done) => {
    request(app)
      .post("/libros/alquilar")
      .send({
        UserID: 2,
        libroID : 52,
        fechaDevolucionRenta: "2024-10-15"
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("POST /libros/comprar", () => {
  it("Deberia comprar un libro", (done) => {
    request(app)
      .post("/libros/comprar")
      .send({
        UserID: 2,
        libroID : 53
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("PUT /libros/devolver", () => {
  it("Deberia devolver el libro", (done) => {
    request(app)
      .put("/libros/devolver")
      .send({
        UserID: 2,
        libroID : 52
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
}); 

describe("GET /libros/historial/compra", () => {
  it("Deberia obtener todos los libros que ha comprado un usuario", (done) => {
    request(app)
      .get("/libros")
      .send({
        UserID: 2
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /libros/historial/alquiler", () => {
  it("Deberia obtener todos los libros que ha alquilado un usuario", (done) => {
    request(app)
      .get("/libros/historial/alquiler")
      .send({
        UserID: 2
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /libros/historial/compra", () => {
  it("Deberia obtener todos los libros que ha comprado un usuario", (done) => {
    request(app)
      .get("/libros/historial/compra")
      .send({
        UserID: 2
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /libros/alquilar (Error 400)", () => {
  it("Deberia devolver un error 400 al alquilar un libro sin UserID", (done) => {
    request(app)
      .post("/libros/alquilar")
      .send({
        libroID: 52,
        fechaDevolucionRenta: "2024-10-15"
      })
      .expect("Content-Type", /json/)
      .expect(400, done);
  });
});


describe("GET /libros/historial/compra (Error 400)", () => {
  it("Deberia devolver un error 404 al obtener historial de compras de un usuario inexistente", (done) => {
    request(app)
      .get("/libros/historial/compra")
      .send({
        UserID: 9999 // ID de usuario que no existe
      })
      .expect("Content-Type", /json/)
      .expect(400, done);
  });
});