import type { Permission } from './Permission';
import type { Role } from './Role';

export interface RolePermission {
	_id: string;
	role: Role;
	permission: Permission;
}
