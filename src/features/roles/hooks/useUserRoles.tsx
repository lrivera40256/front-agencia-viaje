import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getRolesByUserId, getRolesToAddUser, createUserRole, deleteUserRole } from "@/services/userRoleService"
import { getUserById } from "@/features/users"
import type { Role } from "../types/role.types"
import { FormField } from "@/components/form/types"

export function useUserRoles(userId?: string) {
  const [roles, setRoles] = useState<Role[]>([])
  const [availableRoles, setAvailableRoles] = useState<{ value: string; label: string }[]>([])
  const [userName, setUserName] = useState("")
  const [loading, setLoading] = useState(false)

  const loadUserRoles = async () => {
    if (!userId) return
    setLoading(true)
    try {
      const data = await getRolesByUserId(userId)
      
      const user = await getUserById(userId)
      setRoles(data)
      setUserName(user.name)
    } catch {
      toast.error("Error al cargar los roles del usuario")
    } finally {
      setLoading(false)
    }
  }

  const loadAvailableRoles = async () => {
    if (!userId) return
    setLoading(true)
    try {
      const data = await getRolesToAddUser(userId)
      setAvailableRoles(data.map((r: Role) => ({ value: r._id, label: r.name })))
    } catch {
      toast.error("Error al cargar los roles disponibles")
    } finally {
      setLoading(false)
    }
  }

  const addRole = async (roleId: string) => {
    if (!userId) return
    try {
      await createUserRole(userId, roleId)
      toast.success("Rol agregado exitosamente")
      await loadUserRoles()
      await loadAvailableRoles()
    } catch {
      toast.error("Error al agregar rol al usuario")
    }
  }

  const removeRole = async (roleId: string) => {
    if (!userId) return
    if (!confirm("¿Eliminar este rol del usuario?")) return
    try {
      await deleteUserRole(userId, roleId)
      toast.success("Rol eliminado del usuario")
      await loadUserRoles()
      await loadAvailableRoles()
    } catch {
      toast.error("Error al eliminar rol del usuario")
    }
  }

  useEffect(() => {
    loadUserRoles()
    loadAvailableRoles()
  }, [userId])

  return {
    userName,
    roles,
    availableRoles,
    loading,
    addRole,
    removeRole,
    reload: loadUserRoles,
    fields: [
      { name: "role", label: "Rol", required: true, type: "select", options: availableRoles },
    ] as FormField[],
  }
}
