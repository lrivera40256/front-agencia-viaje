# Feature: Journeys (Trayectos)

Esta feature implementa la gestión completa de trayectos con CRUD (Create, Read, Update, Delete).

## Estructura de Archivos

```
src/features/journeys/
├── types/
│   └── Journey.ts              # Interfaces TypeScript del modelo Journey
├── services/
│   └── journeyService.ts       # Funciones de API (CRUD)
├── hooks/
│   └── useJourney.tsx          # Hook personalizado para lógica de estado
├── components/
│   ├── JourneyForm.tsx         # Componente de formulario
│   └── JourneyTable.tsx        # Componente de tabla
├── pages/
│   └── JourneyPage.tsx         # Página principal
├── index.ts                    # Exportaciones barrel
└── README.md                   # Este archivo
```

## Modelos

### City
```typescript
interface City {
  id: number;
  name: string;
  department_id?: number;
  description?: string;
}
```

### Journey
```typescript
interface Journey {
  id?: number;
  origin_id: number;           // ID de la ciudad de origen
  destination_id: number;      // ID de la ciudad de destino
  origin?: City;               # Objeto ciudad de origen
  destination?: City;          # Objeto ciudad de destino
  createdAt?: string;
  updatedAt?: string;
}
```

## Funcionalidades

### CRUD Completo
- ✅ **Crear**: Nuevo trayecto con validaciones
- ✅ **Leer**: Listar todos los trayectos
- ✅ **Actualizar**: Editar trayecto existente
- ✅ **Eliminar**: Borrar trayecto con confirmación

### Validaciones
- Origen requerido
- Destino requerido
- Origen y destino no pueden ser iguales

### Búsqueda y Filtrado
- Búsqueda por ID de origen
- Búsqueda por ID de destino
- Filtrado en cliente

### UI/UX
- Tabla responsive con acciones
- Modal para crear/editar
- Toasts de confirmación
- Loading states
- Manejo de errores

## Rutas API

### Journeys
```
GET    /journeys              # Obtener todos los trayectos
POST   /journeys              # Crear nuevo trayecto
PATCH  /journeys/:id          # Actualizar trayecto
DELETE /journeys/:id          # Eliminar trayecto
```

### Cities (Consumidas internamente)
```
GET    /cities/                                    # Obtener todas las ciudades
GET    /cities/find/:idDepartment                # Obtener ciudades por departamento
GET    /cities/hotel-available/:idDepartment     # Obtener ciudades con hoteles disponibles
POST   /cities/charge                             # Cargar ciudades
```

## Uso

### En una página/componente

```tsx
import { useJourney } from '@/features/journeys';
import { JourneyPage } from '@/features/journeys';

// Opción 1: Usar el componente completo
function MyPage() {
  return <JourneyPage />;
}

// Opción 2: Usar el hook directamente
function CustomJourneyUI() {
  const {
    journeys,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSearch,
    showForm,
    setShowForm,
    journeyToEdit,
    handleSubmit,
    loading,
  } = useJourney();

  // Tu UI personalizada aquí
}
```

## Dependencias Externas

- **sonner**: Toast notifications
- **axios**: Requests HTTP (a través de msLogicInterceptor)
- **CitiesService**: Servicio de ciudades para cargar datos de origen/destino

## Integración con Otros Features

- Depende de `CitiesService` para obtener la lista de ciudades disponibles
- Compatible con la arquitectura feature-based establecida
- Usa el mismo componente Table que otros features
- Usa el mismo componente Form que otros features

## Notas de Desarrollo

1. El servicio utiliza el interceptor `msLogicInterceptor` para todas las requests
2. Las validaciones se realizan tanto en frontend como en backend
3. La búsqueda es client-side para mejor performance
4. Los timestamps se formatean automáticamente en la tabla
5. El formulario es reutilizable para create y edit
6. **Las ciudades se cargan automáticamente** desde el endpoint `/cities/hotel-available/:idDepartment`
7. El formulario muestra los nombres de las ciudades (no IDs) para mejor UX
8. La tabla muestra los nombres de las ciudades en lugar de IDs numéricos
9. Se valida que origen y destino sean ciudades diferentes
10. El hook `useJourney` carga automáticamente las ciudades al montar el componente
