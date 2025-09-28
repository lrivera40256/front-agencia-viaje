import { useEffect, useState } from 'react';
import { Permission } from '../models/Permission';
import {
	createPermission,
	deletePermissionById,
	getPermissions,
	modifiedPermission,
} from '../services/permissionService';
import Table from '../components/Table';
import Form, { FormField } from '../components/Form';

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
		try {
			const permissions = await getPermissions();
			setPermissions(permissions);
		} catch (error) {
			throw error;
		}
	};

	const handleDelete = async (permission: Permission) => {
		loadData();
		if (!confirm(`¿Eliminar permiso "${permission.method}: ${permission.url}"?`)) return;
		try {
			await deletePermissionById(permission._id);
			setPermissions((prev) => prev.filter((u) => u._id !== permission._id));
		} catch (error) {
			throw error;
		}
	};

	const handleAddPermission = () => {
		setShowForm(true);
		console.log('Agregar permiso');
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

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div>
			<Table
				data={permissions}
				titles={['Url', 'Método', 'Modelo']}
				tableName="Permisos"
				actions={[
					{
						label: 'Eliminar',
						onClick: handleDelete,
						variant: 'danger',
					},
					{
						onClick: handleUpdatePermission,
						label: 'Modificar',
						variant: 'primary',
					},
				]}
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
