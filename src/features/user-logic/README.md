# User Logic Feature

Feature de gestión de usuarios de la lógica de negocio. Permite crear, editar, eliminar y buscar usuarios con validaciones completas.

## Estructura

```
user-logic/
├── components/
│   ├── UserLogicForm.tsx      # Formulario de creación/edición
│   ├── UserLogicTable.tsx     # Tabla de visualización
│   └── index.ts
├── hooks/
│   └── useUserLogic.tsx       # Hook de estado y lógica
├── pages/
│   └── UserLogicPage.tsx      # Página principal
├── services/
│   └── userLogicService.ts    # Llamadas API
├── types/
│   └── User.ts                # Tipos e interfaces
└── README.md
```

## Tipos de Documento Soportados

- **CC**: Cédula de Ciudadanía
- **TI**: Tarjeta de Identidad
- **CE**: Cédula de Extranjería
- **PAS**: Pasaporte

## Validaciones

### Nombre
- Mínimo 8 caracteres
- Máximo 255 caracteres

### Email
- Debe ser un email válido
- Único en la base de datos

### Teléfono
- Mínimo 6 caracteres
- Máximo 20 caracteres

### Número de Identificación
- Mínimo 4 caracteres
- Máximo 50 caracteres
- Único en la base de datos

### Documento Tipo
- Obligatorio (CC, TI, CE, PAS)

### Fecha de Nacimiento
- Formato: YYYY-MM-DD

## Uso

```typescript
import { UserLogicPage } from '@/features/user-logic/pages/UserLogicPage';

// En tu router
const UserLogicPage = lazy(() => import('@/features/user-logic/pages/UserLogicPage').then(m => ({ default: m.UserLogicPage })));
```

## API Endpoints

- `GET /user` - Obtener todos los usuarios
- `GET /user/:id` - Obtener usuario por ID
- `POST /user` - Crear nuevo usuario
- `PATCH /user/:id` - Actualizar usuario
- `DELETE /user/:id` - Eliminar usuario

## Features

- ✅ CRUD completo
- ✅ Búsqueda y filtrado
- ✅ Validaciones en cliente y servidor
- ✅ Manejo de errores
- ✅ Toast notifications
- ✅ Modal dialog para formularios
- ✅ Type-safe con TypeScript
