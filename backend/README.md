# 🚀 Comenzando

---

## **Requerimientos**

- **Backend**
  - [NodeJS 20](https://nodejs.org/download/release/v20.7.0/)
  - [MySQL 8](https://dev.mysql.com/downloads/installer/)
- **Frontend**
  - ReactJS

## Pruebas de enpoints
https://app.getpostman.com/join-team?invite_code=1ceafd28f95efdc68e1f24d7e0b29ada&target_code=28d5c7d491c6daeea2f5b31c375490ac

# 🔎 Objetivos del manual

---

## Módulos

- Usuario

## Convención de un Endpoint

Las convenciones para nombrar y diseñar endpoints en una API son importantes para mantener una estructura clara y coherente en la API, facilitando su comprensión y uso por parte de los desarrolladores.

### **Nombres descriptivos y en minúsculas**

Usa nombres descriptivos en minúsculas para los endpoints que reflejen la acción o el recurso al que acceden.

**Por ejemplo**:

- /usuarios
- /productos
- /ordenes.

### Utiliza sustantivos para representar recursos

Usa nombres de recursos en plural para representar colecciones de elementos

**Por ejemplo**:

- /usuario**s**
- /producto**s**
- /ordene**s**

### Usa rutas anidadas para relaciones

Para representar relaciones entre recursos, puedes utilizar rutas anidadas.

**Por ejemplo**:

Si un usuario tiene múltiples direcciones:

- /usuarios/register
- /usuarios/login

### Usa verbos HTTP de manera apropiada

Utiliza los verbos HTTP de manera adecuada y descriptiva para representar la acción que se está realizando en el endpoint.

**GET**: Para obtener información.

**POST**: Para crear un nuevo recurso.

**PUT o PATCH**: Para actualizar un recurso existente.

**DELETE**: Para eliminar un recurso.

### Evita acciones en el nombre del endpoint

Evita incluir acciones en el nombre del endpoint, como "obtener", "crear", "eliminar", etc. Utiliza los verbos HTTP para indicar la acción.

## Seguridad

Es fundamental que para fortalecer la seguridad del software al gestionar y proteger información sensible y configuraciones especificas de un proyecto hay que utilizar un archivo **.env**

Es una pieza esencial en el desarrollo de software que proporciona una capa adicional de seguridad mediante la gestión de configuraciones sensibles y datos confidenciales.

<aside>
💡 El proyecto cuenta con un archivo llamado **`.env.example`** que sirve como plantilla para configuraciones utilizadas en producción. Para adaptarlo a las credenciales específicas que se emplearán en el entorno de producción, simplemente se deben modificar los datos propuestos por las credenciales reales correspondientes.

</aside>

<aside>
❌ No subas las credenciales que se emplearan en el entorno de producción

</aside>

## Endpoints

En esta sección, encontrarás información detallada sobre los distintos puntos de acceso (endpoints) disponibles en nuestra API. Cada endpoint representa un punto de interacción específico para realizar operaciones relacionadas con la API, como obtener información, enviar datos, eliminar recursos y más.

Salvo que se especifique una estructura de respuesta distinta al consumir un endpoint específico, la estructura estándar de las respuestas es la siguiente:

```jsx
{
	"success": true|false, // Indica si la transacción se completó exitosamente
	"mensaje": "Descripción de la transacción" // Proporciona detalles sobre el resultado de la transacción
}
```

### 🟢 **[POST] /usuarios/register**

- **Descripción**
  - Crea un usuario nuevo.
- **Parámetros de la solicitud**

  - ‘correo’ _(String, obligatorio)_: Correo electrónico utilizado para el inicio de sesión.
  - ‘contrasenia’ _(String, obligatorio)_: Correo electrónico utilizado para el inicio de sesión.
  - ‘nombres’ _(String, obligatorio)_: Nombres del usuario.
  - ‘apellidos’ _(String, obligatorio)_: Apellidos del usuario.
  - ‘fecha*nacimiento’ *(String, obligatorio)\_: Fecha de nacimiento del usuario
      <aside>
      ⚠️ El formato para la fecha de nacimiento debe ser 'YYYY-MM-DD'
      
      </aside>

- **Content-Type de la solicitud**
  ```json
{
  "nombre": "Juan2",
  "apellido": "Pérez",
  "telefono": "123456789",
  "email": "juan2.perez@example.com",
  "contrasenia": "Password123",
  "fechaNacimiento": "1990-01-01",
  "rol": "Cuidador"
}
  ```
- **Estructura de la respuesta**
  ```json
  {
  	"success": true|false, // Indica si la transacción se completó exitosamente
  	"mensaje": "Descripción de la transacción" // Proporciona detalles sobre el resultado de la transacción
  	"id_insertado": [Numerico] // Indica el indice asignado del usuario creado
  }
  ```

### 🟢 **[POST] /usuarios/login**

- **Descripción**
  - Inicio de sesión de un usuario registrado.
- **Parámetros de la solicitud**
  - ‘correo’ _(String, obligatorio)_: Correo del usuario
  - ‘contrasenia’ _(String, obligatorio)_: Contraseña del usuario
- **Content-Type de la solicitud**

  ```json
  {
    "correoElectronico": "juan.perez@example.com",
    "contrasenia": "Password123"
  }
  ```

- **Estructura de la respuesta**

  ```json
  {
      "success": true,
      "mensaje": "Bienvenido",
      "extra": {
          "rol": "Cuidador",
          "Nombre": "Juan2"
      }
  }
  ```

  o

  ```json
  {
      "success": true,
      "mensaje": "Bienvenido",
      "extra": {
          "rol": "Cliente",
          "Nombre": "Juan2"
      }
  }
  ```

  o

  ```json
    {
      "success": false,
      "mensaje": "Usuario no validado"
    }
  ```

   o

   ```json
    {
    "success": false,
    "mensaje": "Credenciales incorrectas"
    }
   ```



### 🟠 [PUT] /usuarios/editar/:userID 

- **Descripción**
  - Editar usuario
- **Content-Type de la solicitud**

  ```json
  {
    "nombre": "Juan2",
    "apellido": "Pérez",
    "telefono": "123456789",
    "email": "juan2.perez@example.com",
    "contraseña": "Password123",
    "nuevaContraseña": "123",
    "fechaNacimiento": "1990-01-01"
  }
  ```

- **Estructura de la respuesta**
    ```json
    {
        "message": "Usuario actualizado con éxito"
    }

    ```

### 🔴 [DELETE] /usuarios/eliminar/:userID

- **Descripción**
  - Eliminar Usuario

### 🟢 **[POST] /usuarios/validar**

- **Descripción**
  - Validar al usuario mediante el token que se le envia al correo
- **Parámetros de la solicitud**
  - ‘email’ _(String, obligatorio)_: Correo del usuario
  - ‘token’ _(String, obligatorio)_: token que se le envia al correo del usuario
- **Content-Type de la solicitud**

  ```json
  {
    "email": "tams.morales@hotmail.com",
    "token": "ifaJkpB9yJCMwfp4BAXi"
  }
  ```
- **Estructura de la respuesta**
    ```json
    {
    "success": true,
    "mensaje": "Usuario validado correctamente",
    "id_insertado": 0
    }

    ```
    o
    ```json
    {
    "success": false,
    "mensaje": "Token incorrecto"
    }
    ```

