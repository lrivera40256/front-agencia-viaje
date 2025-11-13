# Feature Travel - Documentación

## Descripción
Este feature implementa la gestión completa de viajes (Travel) siguiendo la arquitectura feature-based del proyecto. Incluye operaciones CRUD, búsqueda, y una interfaz de usuario completa.

## Estructura del Feature

```
src/features/travels/
├── types/
│   ├── Travel.ts          # Interfaz TypeScript para Travel
│   └── index.ts           # Exportaciones
├── services/
│   ├── travelService.ts   # Servicios API (CRUD)
│   └── index.ts           # Exportaciones
├── hooks/
│   └── useTravel.tsx      # Custom hook con lógica de estado
├── components/
│   ├── TravelForm.tsx     # Componente de formulario
│   ├── TravelTable.tsx    # Componente de tabla
│   └── index.ts           # Exportaciones
├── pages/
│   ├── TravelPage.tsx     # Página principal
│   └── index.ts           # Exportaciones
├── contexts/              # Para futuros contextos de React
└── index.ts               # Exportaciones principales
```

## Características

### Tipos (`Travel.ts`)
- **Travel**: Interfaz que define la estructura de un viaje con propiedades:
  - `_id`: Identificador único
  - `id`: Identificador numérico
  - `name`: Nombre del viaje
  - `description`: Descripción
  - `creationDate`: Fecha de creación
  - `startDate`: Fecha de inicio
  - `endDate`: Fecha de fin
  - `price`: Precio del viaje
  - `createdAt`: Timestamp de creación
  - `updatedAt`: Timestamp de actualización
  - Relaciones: `quotas`, `travelCustomers`, `transportItineraries`, `planTravels`

### Servicios (`travelService.ts`)
Todos los servicios usan la ruta base `/travel` según las rutas del backend:

- `getTravels()`: `GET /travel` - Obtiene todos los viajes
- `getTravelById(id)`: `GET /travel/:id` - Obtiene un viaje por ID
- `createTravel(travel)`: `POST /travel` - Crea un nuevo viaje
- `updateTravel(travel)`: `PATCH /travel/:id` - Actualiza un viaje existente
- `deleteTravelById(id)`: `DELETE /travel/:id` - Elimina un viaje

### Hook (`useTravel.tsx`)
Gestiona el estado y la lógica del componente Travel:

- **Estado**:
  - `travels`: Lista de viajes visible (filtrada)
  - `allTravels`: Lista completa de viajes del servidor
  - `loading`: Estado de carga
  - `showForm`: Visibilidad del formulario
  - `travelToEdit`: Viaje en edición

- **Métodos**:
  - `handleAdd()`: Abre formulario para nuevo viaje
  - `handleEdit(travel)`: Abre formulario para editar
  - `handleDelete(travel)`: Elimina un viaje con confirmación
  - `handleSubmit(travel)`: Guarda (crea o actualiza)
  - `handleSearch(query)`: Busca viajes (client-side filtering)
  - `loadTravels()`: Recarga la lista del servidor

**Nota sobre búsqueda:**
La búsqueda se realiza **client-side** filtrando los viajes cargados por nombre y descripción, ya que el backend no incluye un endpoint específico de búsqueda.

### Componentes

#### TravelForm
Formulario reactivo para crear/editar viajes con validaciones:
- Campo de nombre
- Campo de descripción (textarea)
- Selector de fecha de inicio
- Selector de fecha de fin
- Campo de precio (número)

#### TravelTable
Tabla que muestra los viajes con:
- Columnas: Nombre, Descripción, Fecha Inicio, Fecha Fin, Precio
- Búsqueda en tiempo real (client-side)
- Acciones: Editar, Eliminar

### Página (`TravelPage.tsx`)
Página principal que orquesta todos los componentes:
- Renderiza la tabla de viajes
- Maneja el modal del formulario
- Conecta todos los handlers del hook

## Rutas Frontend
Se agregó la siguiente ruta en `src/routes/index.ts`:
```typescript
{
  path: '/viajes',
  title: 'viajes',
  component: travelPage,
}
```

Acceso: `http://localhost:5173/viajes`

## Rutas Backend (Adonis)
El feature está diseñado para trabajar con las siguientes rutas en el backend:

```
POST   /travel          - Crear viaje
GET    /travel          - Obtener todos los viajes
PATCH  /travel/:id      - Actualizar viaje
DELETE /travel/:id      - Eliminar viaje
```

## Validaciones
El hook incluye validaciones para:
- Nombre requerido
- Descripción requerida
- Fecha de inicio requerida
- Fecha de fin requerida
- Precio mayor a 0

## Integraciones
- ✅ Axios Interceptor para llamadas API
- ✅ Toast notifications (Sonner) para feedback
- ✅ Loading overlay durante operaciones
- ✅ Componentes reutilizables del proyecto
- ✅ Formulario con tipos genéricos
- ✅ Búsqueda client-side

## Patrón Feature-Based
Este feature sigue el mismo patrón que los features existentes:
- Separación clara de responsabilidades
- Tipos centralizados
- Servicios API independientes
- Custom hooks para lógica
- Componentes presentacionales puros
- Exportaciones modulares

## Próximas Extensiones
Se puede agregar:
- Contexto React para compartir estado globalmente
- Paginación en la tabla
- Filtros avanzados por rango de fechas
- Exportación de datos
- Gestión de relaciones (Quotas, TravelCustomers, etc.)
- Búsqueda server-side si se agrega endpoint en backend

## Características

### Tipos (`Travel.ts`)
- **Travel**: Interfaz que define la estructura de un viaje con propiedades:
  - `_id`: Identificador único
  - `name`: Nombre del viaje
  - `description`: Descripción
  - `startDate`: Fecha de inicio
  - `endDate`: Fecha de fin
  - `price`: Precio del viaje
  - Relaciones: `quotas`, `travelCustomers`, `transportItineraries`, `planTravels`

### Servicios (`travelService.ts`)
- `getTravels()`: Obtiene todos los viajes
- `getTravelById(id)`: Obtiene un viaje por ID
- `getTravelByName(name)`: Búsqueda por nombre
- `createTravel(travel)`: Crea un nuevo viaje
- `updateTravel(travel)`: Actualiza un viaje existente
- `deleteTravelById(id)`: Elimina un viaje
- `getTravelsByDateRange(startDate, endDate)`: Obtiene viajes por rango de fechas

### Hook (`useTravel.tsx`)
Gestiona el estado y la lógica del componente Travel:
- **Estado**:
  - `travels`: Lista de viajes visibles
  - `loading`: Estado de carga
  - `showForm`: Visibilidad del formulario
  - `travelToEdit`: Viaje en edición

- **Métodos**:
  - `handleAdd()`: Abre formulario para nuevo viaje
  - `handleEdit(travel)`: Abre formulario para editar
  - `handleDelete(travel)`: Elimina un viaje con confirmación
  - `handleSubmit(travel)`: Guarda (crea o actualiza)
  - `handleSearch(query)`: Busca viajes
  - `loadTravels()`: Recarga la lista

### Componentes

#### TravelForm
Formulario reactivo para crear/editar viajes con validaciones:
- Campo de nombre
- Campo de descripción (textarea)
- Selector de fecha de inicio
- Selector de fecha de fin
- Campo de precio (número)

#### TravelTable
Tabla que muestra los viajes con:
- Columnas: Nombre, Descripción, Fecha Inicio, Fecha Fin, Precio
- Búsqueda en tiempo real
- Acciones: Editar, Eliminar

### Página (`TravelPage.tsx`)
Página principal que orquesta todos los componentes:
- Renderiza la tabla de viajes
- Maneja el modal del formulario
- Conecta todos los handlers del hook

## Rutas
Se agregó la siguiente ruta en `src/routes/index.ts`:
```typescript
{
  path: '/viajes',
  title: 'viajes',
  component: travelPage,
}
```

Acceso: `http://localhost:5173/viajes`

## Validaciones
El hook incluye validaciones para:
- Nombre requerido
- Descripción requerida
- Fecha de inicio requerida
- Fecha de fin requerida
- Precio mayor a 0

## Integraciones
- ✅ Axios Interceptor para llamadas API
- ✅ Toast notifications (Sonner) para feedback
- ✅ Loading overlay durante operaciones
- ✅ Componentes reutilizables del proyecto
- ✅ Formulario con tipos genéricos

## Patrón Feature-Based
Este feature sigue el mismo patrón que los features existentes:
- Separación clara de responsabilidades
- Tipos centralizados
- Servicios API independientes
- Custom hooks para lógica
- Componentes presentacionales puros
- Exportaciones modulares

## Próximas Extensiones
Se puede agregar:
- Contexto React para compartir estado globalmente
- Paginación en la tabla
- Filtros avanzados
- Exportación de datos
- Gestión de relaciones (Quotas, TravelCustomers, etc.)
