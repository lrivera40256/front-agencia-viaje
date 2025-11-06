import { useState } from "react"
import type { Role } from "../types/role.types"

export function useRoleForm(initial?: Role) {
  const [form, setForm] = useState<Role>(
    initial || { name: "", description: "" }
  )

  const handleChange = (field: keyof Role, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const reset = () => setForm({ name: "", description: "" })

  return { form, handleChange, reset }
}
