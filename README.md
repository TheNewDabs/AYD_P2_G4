# AYD_P2_G4

## Análisis de Requerimientos para la Fase 1
1. Roles y Funcionalidades

    Cuidadores:
        Gestionar el cuidado de las mascotas.
        Realizar actividades diarias con las mascotas.
        Manejar un máximo de dos mascotas simultáneamente.
        Editar su perfil y datos.
    Usuarios (Dueños de Mascotas):
        Crear perfiles para sus mascotas.
        Solicitar hospedaje para sus mascotas.
        Ver el estado de sus mascotas hospedadas.
        Editar su perfil y datos.

2. Proceso de Registro

    Recopilación de datos personales y de contacto.
    Validación de correo electrónico y seguridad de contraseña.

3. Inicio de Sesión

    Envío de código a correo electrónico en el primer inicio de sesión.
    Manejo de errores en caso de contraseña o código incorrecto.

4. Funcionalidades Específicas de Cuidadores

    Selección y atención de mascotas.
    Visualización y edición de perfiles de mascotas.
    Gestión de estados de las mascotas (comiendo, paseando, etc.).

5. Funcionalidades Específicas de Usuarios

    Creación de perfiles de mascotas con detalles específicos.
    Funcionalidad para solicitar hospedaje de mascotas.

## Diseño y Modelado
### Casos de Uso a Alto Nivel

### 1. Registro de Usuario

| Nombre | Registro de Usuario |
| --- | --- |
| Tipo | Primario |
| Roles | Usuario, Cuidador |
| Descripción | Creación de cuentas de usuario y cuidador en la plataforma. |

### 2. Inicio de Sesión

| Nombre | Inicio de Sesión |
| --- | --- |
| Tipo | Primario |
| Roles | Usuario, Cuidador |
| Descripción | Acceso seguro a la plataforma para usuarios registrados. |

### 3. Creación de Perfil de Mascota

| Nombre | Creación de Perfil de Mascota |
| --- | --- |
| Tipo | Primario |
| Roles | Usuario |
| Descripción | Creación y gestión de perfiles para las mascotas de los usuarios. |

### 4. Selección de Mascota (Cuidador)

| Nombre | Selección de Mascota |
| --- | --- |
| Tipo | Primario |
| Roles | Cuidador |
| Descripción | Selección de mascotas para cuidar por parte del cuidador. |

### 5. Hospedaje de Mascota

| Nombre | Hospedaje de Mascota |
| --- | --- |
| Tipo | Primario |
| Roles | Usuario |
| Descripción | Funcionalidad para que los usuarios soliciten el hospedaje de sus mascotas. |

### Casos de Uso Expandidos

### 1. Registro de Usuario

| Nombre | Registro de Usuario |
| --- | --- |
| Tipo | Primario |
| Roles | Usuario, Cuidador |
| Descripción | Registro en la plataforma Huellita Feliz. |
| Flujo | 1. Ingresar datos personales y de contacto. 2. Elegir rol (usuario o cuidador). 3. Crear contraseña. 4. Confirmar registro. |
| Flujo alterno | 4. Mensaje de error si el correo ya está registrado. |

### 2. Inicio de Sesión

| Nombre | Inicio de Sesión |
| --- | --- |
| Tipo | Primario |
| Roles | Usuario, Cuidador |
| Descripción | Acceso a la plataforma con credenciales de usuario. |
| Flujo | 1. Ingresar correo y contraseña. 2. Validación de credenciales. 3. Acceso concedido. |
| Flujo alterno | 2. Mensaje de error si las credenciales son incorrectas. |

### 3. Creación de Perfil de Mascota

| Nombre | Creación de Perfil de Mascota |
| --- | --- |
| Tipo | Primario |
| Roles | Usuario |
| Descripción | Creación de perfiles para mascotas. |
| Flujo | 1. Ingresar detalles de la mascota. 2. Guardar perfil. |
| Flujo alterno | No aplica. |

### 4. Selección de Mascota (Cuidador)

| Nombre | Selección de Mascota |
| --- | --- |
| Tipo | Primario |
| Roles | Cuidador |
| Descripción | Selección de mascotas para cuidado. |
| Flujo | 1. Visualizar mascotas disponibles. 2. Elegir mascota. 3. Confirmar selección. |
| Flujo alterno | 3. Mensaje de error si ya se tienen 2 mascotas. |

### 5. Hospedaje de Mascota

| Nombre | Hospedaje de Mascota |
| --- | --- |
| Tipo | Primario |
| Roles | Usuario |
| Descripción | Reserva de hospedaje para mascotas. |
| Flujo | 1. Elegir mascota del perfil. 2. Seleccionar fechas de hospedaje. 3. Confirmar reserva. |
| Flujo alterno | No aplica. |

### Historias de Usuario para la Fase 1

### Historias de Usuario para Registro e Inicio de Sesión

1. **Como** un nuevo usuario, **quiero** poder registrarme en la plataforma, **para** acceder a los servicios de hospedaje y cuidado de mascotas.
2. **Como** un usuario registrado, **quiero** iniciar sesión con mis credenciales, **para** acceder a mi cuenta y ver o gestionar la información de mis mascotas.

### Historias de Usuario para Usuarios (Clientes)

1. **Como** dueño de una mascota, **quiero** crear perfiles para mis mascotas, **para** proporcionar información detallada que ayude a los cuidadores en su atención.
2. **Como** dueño de una mascota, **quiero** solicitar hospedaje para mis mascotas en la plataforma, **para** asegurarme de que estén bien cuidadas en mi ausencia.

### Historias de Usuario para Cuidadores

1. **Como** cuidador, **quiero** poder seleccionar mascotas para cuidar, **para** gestionar mi carga de trabajo y brindar atención adecuada.
2. **Como** cuidador, **quiero** ver y actualizar el estado de las mascotas que estoy cuidando, **para** informar a los dueños sobre las actividades y el bienestar de sus mascotas.