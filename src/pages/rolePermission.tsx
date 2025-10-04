import { useEffect, useState } from 'react';
import {
	createRolePermission,
	deleteRolePermissionById,
	getRolePermission,
} from '../services/rolePermissionService';
import type { RolePermission } from '../models/RolePermission';
import Table from '../components/Table';
import Form from '../components/Form';
import { getPermissions } from '../services/permissionService';
import { getRoles } from '@/services/roleService';
import { toast } from 'sonner';

const rolePermissionPage: React.FC = () => {
	const [rolesPermissions, setRolesPermissions] = useState<Object[]>([]);
	const [permissions, setPermissions] = useState<{ value: string; label: string }[]>([]);
	const [roles, setRoles] = useState<{ value: string; label: string }[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);

	const loadData = async () => {
		const rolesPermissions = await getRolePermission();

		try {
			const data = rolesPermissions.map((rp) => ({
				...rp,
				role: rp.role.name,
				permission: rp.permission.url,
				method: rp.permission.method,
			}));
			setRolesPermissions(data);
		} catch (error) {
			throw error;
		}
	};

	const loadPermissions = async () => {
		const permissions = await getPermissions();
		try {
			const data = permissions.map((p) => ({
				value: p._id,
				label: `${p.method}: ${p.url}`,
			}));
			setPermissions(data);
		} catch (error) {
			throw error;
		}
	};

	const loadRoles = async () => {
		const roles = await getRoles();
		try {
			const data = roles.map((r) => ({
				value: r._id,
				label: r.name,
			}));
			setRoles(data);
		} catch (error) {
			throw error;
		}
	};

	const handleDelete = async (rolePermission: RolePermission) => {
		await deleteRolePermissionById(rolePermission._id);
		loadData();
	};

	const addRolePermission = () => {
		setShowForm(true);
		console.log('Agregar rol - permiso');
	};
	const closeForm = () => {
		setShowForm(false);
	};

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		if (showForm) {
			loadPermissions();
			loadRoles();
		}
		loadData();
	}, [showForm]);

	return (
		<>
			<Table
				tableName="Roles - Permisos"
				titles={['Rol', 'Permiso','Metodo']}
				data={rolesPermissions}
				onAdd={addRolePermission}
				actions={[
					{
						label: 'Eliminar',
						onClick: handleDelete,
						variant: 'danger',
					},
				]}
				emptyMessage={loading ? 'Cargando...' : 'No hay role-permiso'}
				className="mt-4"
			/>
			{showForm && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
						<Form
							title="Crear rol - permiso"
							fields={[
								{
									name: 'permission',
									label: 'Permiso',
									type: 'select',
									options: permissions,
								},
								{
									name: 'role',
									label: 'Rol',
									type: 'select',
									options: roles,
								},
							]}
							initialValues={{ permission: '', role: '' }}
							onSubmit={async (values) => {
								try {
									await createRolePermission(values.role, values.permission);
									toast.success('Rol-permiso creado exitosamente');
								} catch (error) {
									toast.error('Error al crear rol-permiso');
								}
								setShowForm(false);
							}}
							submitText="Crear"
						/>
						<button
							className="mt-1 w-full py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold"
							onClick={closeForm}
						>
							Cancelar
						</button>
					</div>
				</div>
			)}
		</>
	);
};
export default rolePermissionPage;
