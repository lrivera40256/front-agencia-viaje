import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import {
  getRoles,
  getRoleByName,
  deleteRole,
  createRole,
  updateRole,
} from "../services/roleService"
import type { Role } from "../types/role.types"
import { FormField } from "@/components/form/types"

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [filter, setFilter] = useState("")
  const [loading, setLoading] = useState(false)

  const loadRoles = async () => {
    setLoading(true)
    try {
      const data = await getRoles()
      setRoles(data)
    } catch {
      toast.error("Error al cargar roles")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (q: string) => {
    setFilter(q)
    if (!q.trim()) return loadRoles()

    if (q.includes("@")) {
      try {
        const found = await getRoleByName(q.trim())
        setRoles(found ? [found] : [])
      } catch {
        setRoles([])
      }
      return
    }

    const lower = q.toLowerCase()
    setRoles(prev =>
      prev.filter(r => r.name?.toLowerCase().includes(lower))
    )
  }

  const visibleRoles = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return roles
    return roles.filter(r => r.name.toLowerCase().includes(q))
  }, [roles, filter])

  const removeRole = async (id: string) => {
    if (!confirm("¿Eliminar este rol?")) return
    setLoading(true)
    try {
      await deleteRole(id)
      toast.success("Rol eliminado exitosamente")
      await loadRoles()
    } catch {
      toast.error("Error al eliminar rol")
    } finally {
      setLoading(false)
    }
  }

  const saveRole = async (role: Role) => {
    if (!role.name || !role.description) {
      toast.error("Todos los campos son obligatorios")
      return
    }

    try {
      if (role._id) {
        await updateRole(role)
        toast.success("Rol actualizado")
      } else {
        await createRole(role)
        toast.success("Rol creado")
      }
      await loadRoles()
    } catch {
      toast.error("Error al guardar rol")
    }
  }

  useEffect(() => {
    loadRoles()
  }, [])

  return {
    roles: visibleRoles,
    loading,
    filter,
    setFilter,
    saveRole,
    removeRole,
    handleSearch, 
    reload: loadRoles,
    fields: [
      { name: "name", label: "Nombre", required: true, type: "text" },
      { name: "description", label: "Descripción", type: "textarea", required: true },
    ] as FormField[],
  }
}
