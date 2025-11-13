# Feature: Rooms (Habitaciones)

Esta feature implementa la gestión completa de habitaciones de hotel con CRUD (Create, Read, Update, Delete).

## Descripción

Permite gestionar habitaciones asociadas a hoteles, con información como número de habitación, precio por noche, disponibilidad y relación con hoteles.

## Estructura

```
rooms/
├── components/
│   ├── RoomForm.tsx       # Formulario para crear/editar habitaciones
│   └── RoomTable.tsx      # Tabla que lista todas las habitaciones
├── hooks/
│   └── useRoom.tsx        # Hook principal con lógica de estado
├── pages/
│   └── RoomPage.tsx       # Página principal de habitaciones
├── services/
│   └── roomService.ts     # Servicio para interactuar con API
├── types/
│   └── Room.ts            # Tipos TypeScript para habitaciones
└── README.md
```

## Funcionalidades

- ✅ **Crear**: Nueva habitación con validaciones
- ✅ **Leer**: Listar todas las habitaciones
- ✅ **Actualizar**: Editar habitación existente
- ✅ **Eliminar**: Borrar habitación con confirmación
- ✅ **Buscar**: Filtrar por número de habitación o hotel
- ✅ **Disponibilidad**: Mostrar estado de disponibilidad

## Validaciones

- Número de habitación requerido y único
- Precio por noche válido (> 0)
- Hotel asociado requerido
- Disponibilidad booleana

## Endpoints API

```
GET    /rooms              # Obtener todas las habitaciones
POST   /rooms              # Crear nueva habitación
GET    /rooms/:id          # Obtener habitación por ID
GET    /rooms/hotel/:id    # Obtener habitaciones de un hotel
GET    /rooms/available    # Obtener habitaciones disponibles
PATCH  /rooms/:id          # Actualizar habitación
DELETE /rooms/:id          # Eliminar habitación
```

## Relaciones

- **Hotel**: Cada habitación pertenece a un hotel
- **RoomTransportItinerary**: Una habitación puede tener múltiples itinerarios de transporte

## Integración

Para integrar esta feature en la aplicación:

1. Importar en `src/routes/index.ts`:
```typescript
import RoomPage from '@/features/rooms/pages/RoomPage';

export const routes = [
  {
    path: '/habitaciones',
    component: RoomPage,
    title: 'habitaciones',
  },
  // ... otras rutas
];
```

2. Usar en componentes:
```typescript
import { RoomPage } from '@/features/rooms/pages/RoomPage';

// En un componente
<RoomPage />
```

## Notas

- El formulario usa validaciones booleanas para disponibilidad
- Los precios se convierten a número automáticamente
- La tabla muestra precios formateados con separador de miles
- La búsqueda es en tiempo real con debounce
