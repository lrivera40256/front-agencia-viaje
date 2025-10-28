import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useRoles } from "./useRoles"
import { useUserRoles } from "./useUserRoles"
import type { Role } from "../types/role.types"
import type { GlobalRoles, UserRoles } from "../types/roles.manager.types"

export function useRolesManager() {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()
  const isUserMode = Boolean(id)

  const base: GlobalRoles | UserRoles = isUserMode
    ? (useUserRoles(id!) as UserRoles)
    : (useRoles() as GlobalRoles)

  const [showForm, setShowForm] = useState(false)
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null)

  const handleAdd = () => {
    setRoleToEdit(null)
    setShowForm(true)
  }

  const handleSubmit = async (values: any) => {
    if (isUserMode) {
      await (base as UserRoles).addRole(values.role)
    } else {
      await (base as GlobalRoles).saveRole(values)
    }
    setShowForm(false)
  }

  const handleDelete = async (role: Role) => {
    await base.removeRole(role._id)
  }

  const handleEdit = (role: Role) => {
    if (isUserMode) navigate(`/permisos/${role._id}`)
    else {
      setRoleToEdit(role)
      setShowForm(true)
    }
  }

  const handleSearch = !isUserMode ? (base as GlobalRoles).handleSearch : undefined

  const tableName = isUserMode
    ? `Roles del usuario ${(base as UserRoles).userName || ""}`
    : "Roles"

  return {
    roles: base.roles,
    loading: base.loading,
    mode: isUserMode ? "user" : "global",
    tableName,
    showForm,
    fields:base.fields,
    setShowForm,
    roleToEdit,
    handleSubmit,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSearch,
  }
}
