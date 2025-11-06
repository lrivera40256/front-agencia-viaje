import { Form } from "@/components/form/Form"
import { FormField } from "@/components/form/types"
import type { Role } from "@/features/roles/types/role.types"

export function RoleForm({ initial, onSubmit, onCancel,fields }: {
  initial?: Role
  onSubmit: (r: Role) => Promise<void> | void
  onCancel: () => void
  fields: FormField[]
}) {

  return (
    <Form
      title={initial ? "Editar Rol" : "Nuevo Rol"}
      fields={fields}
      initialValues={initial || { name: "", description: "" }}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitText={initial ? "Actualizar" : "Crear"}
    />
  )
}
