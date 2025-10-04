import { useEffect, useMemo, useState } from 'react';
import { Permission } from '../models/Permission';
import {
	createPermission,
	deletePermissionById,
	getPermissions,
	getPermissionsByRoleId,
	getPermissionByModel,
	modifiedPermission,
} from '../services/permissionService';
import Table, { TableAction } from '../components/Table';
import Form, { FormField } from '../components/Form';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
	createRolePermission,
	deleteRolePermissionByRoleAndPermission,
	getPermissionsToAddRole,
} from '@/services/rolePermissionService';
import { url } from 'inspector';
import { set } from 'date-fns';
import { LoadingOverlay } from '@/components/Loader';

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
	const [permissionToAdd, setPermissionToAdd] = useState<{ value: string; label: string }[]>([]);
	const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
	const [filter, setFilter] = useState('');
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
				setAllPermissions(data);
			} catch (error) {
				toast.error('Error al cargar los roles del usuario');
			} finally {
				setLoading(false);
			}
		} else {
			try {
				const permissions = await getPermissions();
				setPermissions(permissions);
				setAllPermissions(permissions);
			} catch (error) {
				throw error;
			}finally{
				setLoading(false);
			}
		}
	};

	const handleSearch = async (q: string) => {
			setFilter(q);
			if (!q.trim()) {
				// restaurar lista completa
				setPermissions(allPermissions);
				return;
			}

			if (q.includes('@')) {
				setLoading(true);
				try {
					const found = await getPermissionByModel(q.trim());
					setPermissions(found ? [found] : []);
				} catch {
					// No encontrado -> lista vacía
					setPermissions([]);
				} finally {
					setLoading(false);
				}
				return;
			}
	
			const lower = q.toLowerCase();
			setPermissions(
				allPermissions.filter(
					(u) =>
						u.model?.toLowerCase().includes(lower) || u.model?.toLowerCase().includes(lower)
				)
			);
		};

		const visiblePermissions = useMemo(() => {
			const q = filter.trim().toLowerCase();
			if (!q) return permissions;
			return permissions.filter(
				(u) => u.model?.toLowerCase().includes(q) || u.model?.toLowerCase().includes(q)
			);
		}, [permissions, filter]);

	const handleSearch = async (q: string) => {
			setFilter(q);
			if (!q.trim()) {
				// restaurar lista completa
				setPermissions(allPermissions);
				return;
			}

			if (q.includes('@')) {
				setLoading(true);
				try {
					const found = await getPermissionByModel(q.trim());
					setPermissions(found ? [found] : []);
				} catch {
					// No encontrado -> lista vacía
					setPermissions([]);
				} finally {
					setLoading(false);
				}
				return;
			}
	
			const lower = q.toLowerCase();
			setPermissions(
				allPermissions.filter(
					(u) =>
						u.model?.toLowerCase().includes(lower) || u.model?.toLowerCase().includes(lower)
				)
			);
		};

		const visiblePermissions = useMemo(() => {
			const q = filter.trim().toLowerCase();
			if (!q) return permissions;
			return permissions.filter(
				(u) => u.model?.toLowerCase().includes(q) || u.model?.toLowerCase().includes(q)
			);
		}, [permissions, filter]);

	const loadPermissionToAdd = async () => {
		setLoading(true);
		try {
			const data = await getPermissionsToAddRole(id);

			const permissions = data.map((p) => ({
				value: p._id,
				label: `${p.method}: ${p.url}`,
			}));
			setPermissionToAdd(permissions);
		} catch (error) {
			toast.error('Error al cargar los permisos para agregar');
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (permission: Permission) => {
		loadData();
		if (!confirm(`¿Eliminar permiso "${permission.method}: ${permission.url}"?`)) return;
		setLoading(true);
		if (id) {
			try {
				await deleteRolePermissionByRoleAndPermission(id, permission._id);
				toast.success('Permiso eliminado del rol exitosamente');
			} catch (error) {
				toast.error('Error al eliminar permiso del rol');
			} finally {
				loadData();
				loadPermissionToAdd();
				setLoading(false);
			}
		} else {
			try {
				await deletePermissionById(permission._id);
				setPermissions((prev) => prev.filter((u) => u._id !== permission._id));
			} catch (error) {
				throw error;
			}finally{
				setLoading(false);
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
		setLoading(true);
		if (editingPermission) {
			try{
				await modifiedPermission({
					_id: editingPermission._id,
					url: values.url,
					method: values.method,
					model: values.model,
				});
			} catch (error) {
				toast.error('Error al modificar permiso');
				throw error;
			}finally{
				setLoading(false);
			}
		} else {
			const payload = {
				url: values.url,
				method: values.method,
				model: values.model,
			};
			try {
				await createPermission(payload);
			} catch (error) {
				toast.error('Error al crear permiso');
				throw error;
			}finally{
				setLoading(false);
			}
		}
		closeForm();
		loadData();
	};

	const fieldToAddPermission: FormField[] = [
		{
			name: 'permission',
			label: 'Permiso',
			placeholder: 'Selecciona un permiso',
			type: 'select',
			options: permissionToAdd,
		},
	];

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

	const addPermissionToRole = async (values) => {
		setLoading(true);
		try {
			setShowForm(false);
			await createRolePermission(id, values.permission);
			toast.success('Permiso agregado al rol exitosamente');
		} catch (error) {
			toast.error('Error al agregar permiso al rol');
		} finally {
			loadData();
			loadPermissionToAdd();
			setLoading(false);
			
		}
	};

	useEffect(() => {
		loadData();
		if (id) loadPermissionToAdd();
	}, []);

	return (
		<div>
			 {loading && <LoadingOverlay />}
			<Table
				tableName={id ? 'Permisos del rol ' + id : 'Permisos'}
				data={visiblePermissions.map((u) => ({
					_id: u._id,
					url: u.url,
					metodo: u.method,
					modelo: u.model,
				}))}
				titles={['Url', 'Método', 'Modelo']}
				actions={getActions()}
				onAdd={handleAddPermission}
				emptyMessage={loading ? 'Cargando...' : 'No hay permisos'}
				className="mt-4"
				search={{
					onSearch: handleSearch,
					placeholder: 'Buscar permiso...',
					debounceMs: 400,
					hideButton: true,
				}}
			/>
			{showForm && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-sm my-12">
						{id && permissionToAdd.length === 0 ? (
							<div className="text-center space-y-3 py-6">
								<h3 className="text-lg font-semibold">
									No hay permisos disponibles
								</h3>
								<p className="text-sm text-gray-600">
									Este rol ya tiene asignados todos los permisos.
								</p>
								<button
									onClick={closeForm}
									className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
								>
									Cerrar
								</button>
							</div>
						) : (
							<Form
								key={editingPermission?._id ?? 'new'}
								title={
									editingPermission
										? 'Modificar permiso'
										: id
											? 'Agregar permiso al rol'
											: 'Crear permiso'
								}
								fields={id ? fieldToAddPermission : permissionFields}
								initialValues={currentInitialValues}
								onSubmit={id ? addPermissionToRole : handleSubmit}
								onCancel={closeForm}
								submitText={
									editingPermission ? 'Guardar cambios' : id ? 'Agregar' : 'Crear'
								}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
export default PermissionPage;
