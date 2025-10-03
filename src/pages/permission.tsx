import { useEffect, useState } from 'react';
import { Permission } from '../models/Permission';
import {
	createPermission,
	deletePermissionById,
	getPermissions,
	getPermissionsByRoleId,
	modifiedPermission,
} from '../services/permissionService';
import Table, { TableAction } from '../components/Table';
import Form, { FormField } from '../components/Form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteRolePermissionByRoleAndPermission } from '@/services/rolePermissionService';

const initialValues: Permission = {
	url: '',
	method: '',
	model: '',
};

const methods = [
	{ value: 'GET', label: 'GET' },
	{ value: 'PUT', label: 'PUT' },
	{ value: 'PATCH', label: 'PATCH' },
	{ value: 'DELETE', label: 'DELETE' },
	{ value: 'POST', label: 'POST' },
];

const permissionFields: FormField[] = [
	{
		name: 'url',
		label: 'URL',
		placeholder: 'Ejemplo: /usuarios/...',
		required: true,
	},
	{
		name: 'method',
		label: 'Método',
		type: 'select',
		options: methods,
		required: true,
	},
	{
		name: 'model',
		label: 'Modelo',
		placeholder: 'Ejemplo: Permission',
		required: true,
	},
];

const PermissionPage: React.FC = () => {
	const [permissions, setPermissions] = useState<Permission[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [editingPermission, setEditingPermission] = useState<Permission | null>(null);
	const { id } = useParams<{ id: string }>();

	const currentInitialValues: Permission = editingPermission
		? {
				url: editingPermission.url,
				method: editingPermission.method,
				model: editingPermission.model,
			}
		: initialValues;

	const closeForm = () => {
		setShowForm(false);
		setEditingPermission(null);
	};

	const loadData = async () => {
		setLoading(true);
		if (id) {
			try {
				const data = await getPermissionsByRoleId(id);
				setPermissions(data);
			} catch (error) {
				toast.error('Error al cargar los roles del usuario');
			} finally {
				setLoading(false);
			}
		} else {
			try {
				const permissions = await getPermissions();
				setPermissions(permissions);
			} catch (error) {
				throw error;
			}
		}
	};

	const handleDelete = async (permission: Permission) => {
		loadData();
		if (!confirm(`¿Eliminar permiso "${permission.method}: ${permission.url}"?`)) return;
		if (id) {
			try {
				await deleteRolePermissionByRoleAndPermission(id, permission._id);
				toast.success('Permiso eliminado del rol exitosamente');
			} catch (error) {
				toast.error('Error al eliminar permiso del rol');
			} finally {
				loadData();
				// loadRolesToAdd();
			}
		} else {
			try {
				await deletePermissionById(permission._id);
				setPermissions((prev) => prev.filter((u) => u._id !== permission._id));
			} catch (error) {
				throw error;
			}
		}
	};

	const handleAddPermission = () => {
		setShowForm(true);
	};

	const handleUpdatePermission = async (row: Permission) => {
		// Lógica para modificar permiso
		setEditingPermission({
			_id: row._id,
			url: row.url,
			method: row.method,
			model: row.model,
		});
		console.log('Modificando permiso');
		setShowForm(true);
	};

	const handleSubmit = async (values: Permission) => {
		// Validaciones mínimas
		if (!values.method?.trim()) {
			alert('El método es obligatorio');
			return;
		}
		if (!values.model?.trim()) {
			alert('El modelo es obligatorio');
			return;
		}
		if (!values.url?.trim()) {
			alert('La URL es obligatoria');
			return;
		}

		if (editingPermission) {
			await modifiedPermission({
				_id: editingPermission._id,
				url: values.url,
				method: values.method,
				model: values.model,
			});
		} else {
			const payload = {
				url: values.url,
				method: values.method,
				model: values.model,
			};
			console.log(payload);
			await createPermission(payload);
		}
		closeForm();
		loadData();
	};

	function getActions(): TableAction[] {
		const actions: TableAction[] = [
			{
				onClick: handleUpdatePermission,
				label: 'Editar',
				variant: 'primary',
			},
			{
				label: 'Eliminar',
				onClick: handleDelete,
				variant: 'danger',
			},
		];
		if (id) {
			actions.shift();
		}
		return actions;
	}

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div>
			<Table
				tableName="Permisos"
				data={permissions}
				titles={['Url', 'Método', 'Modelo']}
				actions={getActions()}
				onAdd={handleAddPermission}
				emptyMessage={loading ? 'Cargando...' : 'No hay permisos'}
				className="mt-4"
			/>
			{showForm && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
						<Form
							key={editingPermission?._id ?? 'new'}
							title={editingPermission ? 'Modificar permiso' : 'Crear permiso'}
							fields={permissionFields}
							initialValues={currentInitialValues}
							onSubmit={handleSubmit}
							onCancel={closeForm}
							submitText={editingPermission ? 'Guardar cambios' : 'Crear'}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
export default PermissionPage;
