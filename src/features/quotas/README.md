# Feature: Quotas (Cuotas)

Esta feature implementa la gestión completa de cuotas de viajes con CRUD (Create, Read, Update, Delete).

## Estructura de Archivos

```
src/features/quotas/
├── types/
│   └── Quota.ts              # Interfaces TypeScript del modelo Quota
├── services/
│   └── quotaService.ts       # Funciones de API (CRUD)
├── hooks/
│   └── useQuota.tsx          # Hook personalizado para lógica de estado
├── components/
│   ├── QuotaForm.tsx         # Componente de formulario
│   └── QuotaTable.tsx        # Componente de tabla
├── pages/
│   └── QuotaPage.tsx         # Página principal
├── index.ts                  # Exportaciones barrel
└── README.md                 # Este archivo
```

## Modelos

### Quota
```typescript
interface Quota {
  id?: number;
  amount: number;              // Monto total de la cuota
  number_payments: number;     // Número de pagos
  travel_id: number;           // Referencia al viaje
  travel?: Travel;             // Objeto viaje poblado
  createdAt?: string;
  updatedAt?: string;
}
```

## Funcionalidades

### CRUD Completo
- ✅ **Crear**: Nueva cuota con validaciones
- ✅ **Leer**: Listar todas las cuotas
- ✅ **Actualizar**: Editar cuota existente
- ✅ **Eliminar**: Borrar cuota con confirmación

### Validaciones
- Viaje requerido
- Monto mayor a 0
- Número de pagos mayor a 0

### Búsqueda y Filtrado
- Búsqueda por nombre del viaje
- Búsqueda por monto
- Búsqueda por número de pagos
- Filtrado en cliente

### UI/UX
- Tabla responsive con acciones
- Modal para crear/editar
- Toasts de confirmación
- Loading states
- Manejo de errores

## Rutas API

```
GET    /quota              # Obtener todas las cuotas
POST   /quota              # Crear nueva cuota
PATCH  /quota/:id          # Actualizar cuota
DELETE /quota/:id          # Eliminar cuota
```

## Uso

### En una página/componente

```tsx
import { useQuota } from '@/features/quotas';
import { QuotaPage } from '@/features/quotas';

// Opción 1: Usar el componente completo
function MyPage() {
  return <QuotaPage />;
}

// Opción 2: Usar el hook directamente
function CustomQuotaUI() {
  const {
    quotas,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSearch,
    showForm,
    setShowForm,
    quotaToEdit,
    handleSubmit,
    travels,
    loading,
  } = useQuota();

  // Tu UI personalizada aquí
}
```

## Dependencias Externas

- **sonner**: Toast notifications
- **react-router**: Navegación
- **axios**: Requests HTTP (a través de msLogicInterceptor)

## Integración con Otros Features

- Depende de `travels` para obtener la lista de viajes disponibles
- Compatible con la arquitectura feature-based establecida

## Notas de Desarrollo

1. El servicio utiliza el interceptor `msLogicInterceptor` para todas las requests
2. Las validaciones se realizan tanto en frontend como en backend
3. La búsqueda es client-side para mejor performance
4. Los timestamps se formatea automáticamente en la tabla
5. El formulario es reutilizable para create y edit
