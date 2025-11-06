import { FormField } from "@/components/form/types"
import type { Role } from "./role.types"

export interface BaseRoles {
  roles: Role[]
  loading: boolean
  fields: FormField[]
  reload: () => Promise<void>
}

export interface GlobalRoles extends BaseRoles {
  saveRole: (role: Role) => Promise<void>
  removeRole: (roleId: string) => Promise<void>
  handleSearch: (q: string) => Promise<void>
}

export interface UserRoles extends BaseRoles {
  userName: string
  addRole: (roleId: string) => Promise<void>
  removeRole: (roleId: string) => Promise<void>
}
