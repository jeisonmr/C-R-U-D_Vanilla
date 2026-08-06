# Arquitectura del Proyecto

Este proyecto está desarrollado siguiendo una **arquitectura por capas** con una clara **separación de responsabilidades (Separation of Concerns)**. Aunque no implementa estrictamente Clean Architecture, toma varios de sus principios para mantener un código organizado, escalable y fácil de mantener.

## Estructura del proyecto

```text
src/
│
├── actions/
├── components/
├── interfaces/
├── mappers/
├── pages/
├── routes/
├── services/
└── stores/
```

---

# Flujo de la aplicación

Cuando un usuario interactúa con la aplicación, el flujo general es el siguiente:

```text
Usuario
   │
   ▼
Page
   │
   ▼
Component
   │
   ▼
Store
   │
   ▼
Action
   │
   ▼
Service
   │
   ▼
API
   │
   ▼
Mapper
   │
   ▼
Store
   │
   ▼
Component
```

Cada capa tiene una responsabilidad específica.

---

# Carpetas

## 📁 pages/

Contiene las pantallas de la aplicación.

Su responsabilidad es construir la vista utilizando componentes y conectarse con el estado de la aplicación.

**Ejemplos:**

* UsersPage
* HomePage
* TodoPage

**Responsabilidades**

* Organizar la interfaz.
* Consumir información del Store.
* Responder a eventos del usuario.

No debe contener lógica de negocio.

---

## 📁 components/

Contiene componentes reutilizables.

Ejemplos:

* UserTable
* Pagination
* Navbar
* Button
* Modal

Los componentes únicamente reciben información mediante propiedades (`props`) y renderizan la interfaz.

No deberían realizar llamadas HTTP ni contener lógica de negocio.

---

## 📁 stores/

Contiene el estado global de la aplicación.

Generalmente se utiliza Zustand para almacenar información compartida entre componentes.

Ejemplo de estado:

```ts
users
currentPage
selectedUser
loading
```

Ejemplo de acciones del store:

```ts
nextPage()

previousPage()

setUsers()

setLoading()
```

### Responsabilidad

Administrar el estado de la aplicación.

No debería contener la lógica del negocio.

---

## 📁 actions/

Representa los **casos de uso** de la aplicación.

Cada archivo describe una operación que el sistema sabe realizar.

Ejemplos:

```text
loadUsers
createUser
updateUser
deleteUser
```

Estas funciones coordinan el trabajo entre el Store y los Services.

Ejemplo:

```text
deleteUser(id)
```

La acción puede:

* llamar al servicio correspondiente;
* manejar la respuesta;
* actualizar el estado cuando sea necesario.

---

## 📁 services/

Contiene toda la comunicación con servicios externos.

Generalmente utiliza Axios o Fetch.

Ejemplos:

```text
GET /users

POST /users

PUT /users

DELETE /users
```

### Responsabilidad

Hablar con la API.

No debe conocer cómo se muestra la información ni cómo se administra el estado.

---

## 📁 mappers/

Convierte datos externos en modelos que utiliza la aplicación.

Ejemplo:

La API responde:

```json
{
    "first_name": "Fernando",
    "last_name": "Herrera"
}
```

La aplicación utiliza:

```ts
{
    firstName: "Fernando",
    lastName: "Herrera"
}
```

El Mapper realiza la transformación.

### Beneficios

* Desacopla la aplicación del backend.
* Si cambia la API, únicamente cambia el Mapper.
* El resto del proyecto permanece igual.

---

## 📁 interfaces/

Contiene las interfaces y tipos de TypeScript.

Ejemplos:

```text
User

Todo

LoginResponse
```

Estas interfaces describen únicamente la estructura de los datos.

No contienen lógica.

---

## 📁 routes/

Define la navegación de la aplicación.

Ejemplo:

```text
/

users

users/:id

about
```

Su responsabilidad es asociar cada URL con una página.

---

# Separación de responsabilidades

Cada carpeta tiene un único propósito.

| Carpeta        | Responsabilidad                                       |
| -------------- | ----------------------------------------------------- |
| **pages**      | Pantallas de la aplicación.                           |
| **components** | Componentes reutilizables de la interfaz.             |
| **stores**     | Estado global de la aplicación.                       |
| **actions**    | Casos de uso y operaciones del negocio.               |
| **services**   | Comunicación con APIs y servicios externos.           |
| **mappers**    | Transformación de datos entre la API y la aplicación. |
| **interfaces** | Definición de modelos e interfaces.                   |
| **routes**     | Configuración de rutas y navegación.                  |

---

# Ejemplo: eliminar un usuario

```text
Usuario
   │
   ▼
Botón "Eliminar"
   │
   ▼
Action (deleteUser)
   │
   ▼
Service
   │
   ▼
API
   │
   ▼
Respuesta
   │
   ▼
Store actualiza el estado
   │
   ▼
Componentes se renderizan nuevamente
```

---

# Ejemplo: cambiar de página

```text
Usuario
   │
   ▼
Botón "Siguiente"
   │
   ▼
Store.nextPage()
   │
   ▼
currentPage = 2
   │
   ▼
Action.loadUsers(currentPage)
   │
   ▼
Service
   │
   ▼
API
   │
   ▼
Mapper
   │
   ▼
Store
   │
   ▼
Componentes actualizados
```

En este caso:

* **El Store** administra el estado de la interfaz (`currentPage`).
* **La Action** ejecuta el caso de uso de obtener usuarios.
* **El Service** realiza la petición HTTP.
* **El Mapper** adapta la respuesta de la API al modelo interno.
* **Los Components** muestran la información al usuario.

---

# Beneficios de esta arquitectura

* Separación clara de responsabilidades.
* Código más fácil de mantener.
* Mayor reutilización de lógica.
* Menor acoplamiento entre la interfaz y la API.
* Facilita las pruebas unitarias.
* Escalable para proyectos medianos y grandes.

---

# Resumen

Esta arquitectura divide la aplicación en capas con responsabilidades bien definidas:

* **Presentación:** `pages`, `components`, `routes`.
* **Estado:** `stores`.
* **Aplicación:** `actions`.
* **Infraestructura:** `services`, `mappers`.
* **Modelos:** `interfaces`.

Esta organización permite que cada parte del sistema tenga una única responsabilidad, haciendo que el proyecto sea más limpio, mantenible y sencillo de evolucionar.
