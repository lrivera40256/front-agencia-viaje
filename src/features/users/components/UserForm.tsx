import { Form } from "@/components/form/Form"
import { FormField } from "@/components/form/types"
import { User } from "../types/User"

export function UserForm({ initial, onSubmit, onCancel,fields }: {
  initial?: User
  onSubmit: (r: User) => Promise<void> | void
  onCancel: () => void
  fields: FormField[]
}) {

  return (
    <Form
      title={initial ? "Editar Usuario" : "Nuevo Usuario"}
      fields={fields}
      initialValues={initial || { name: "", email: "", password: "" }}
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitText={initial ? "Actualizar" : "Crear"}
    />
  )
}
