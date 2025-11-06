import type { User } from '../features/users/types/User';
import type { Role } from './Role';

export interface UserRole {
	_id: string;
	user: User;
	role: Role;
}
