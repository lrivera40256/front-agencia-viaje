export interface PermissionFlags {
	view: boolean;
	list: boolean;
	create: boolean;
	update: boolean;
	delete: boolean;
}

// La forma que regresa tu endpoint:
export interface PermissionsByModel {
	[model: string]: PermissionFlags;
}
