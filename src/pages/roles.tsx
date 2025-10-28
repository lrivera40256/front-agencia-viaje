import { useEffect, useMemo, useState } from 'react';
import {
	createRole,
	deleteRole,
	getRoles,
	getRoleByName,
	updateRole,
} from '../features/roles/services/roleService';
import type { Role } from '../models/Role';
import Table, { TableAction } from '../components/Table';
import { Trash2, Plus } from 'lucide-react';
import Form, { FormField } from '@/components/Form';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import {
	createUserRole,
	deleteUserRole,
	getRolesByUserId,
	getRolesToAddUser,
} from '@/services/userRoleService';
import { getUserById } from '@/services/userService';
import { LoadingOverlay } from '@/components/Loader';

const RolePage: React.FC = () => {
	const [roles, setRoles] = useState<Role[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [isEditRole, setIsEditRole] = useState<boolean>(false);
	const [roleToEdit, setRoleToEdit] = useState<Role>({ name: '', description: '' });
	const { id } = useParams<{ id: string }>();
	const [userName, setUserName] = useState('');
	const [allRoles, setAllRoles] = useState<Role[]>([]);
	const [filter, setFilter] = useState('');

	const [rolesToAdd, setRolesToAdd] = useState<{ value: string; label: string }[]>([]);
	const navigate = useNavigate();

	const userFields: FormField[] = [
		{
			name: 'name',
			label: 'Nombre',
			placeholder: 'Ingresa el nombre',
		},
		{
			name: 'description',
			label: 'Descripción',
			placeholder: 'Ingresa la descripción',
		},
	];
	const loadData = async () => {
		setLoading(true);
		if (id) {
			try {
				const data = await getRolesByUserId(id);
				const name = await getUserById(id);
				setUserName(name.name);
				setRoles(data);
				setAllRoles(data);
			} catch (error) {
				toast.error('Error al cargar los roles del usuario');
			} finally {
				setLoading(false);
			}
		} else {
			try {
				const data = await getRoles();
				setRoles(data);
				setAllRoles(data);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleSearch = async (q: string) => {
		setFilter(q);
		if (!q.trim()) {
			// restaurar lista completa
			setRoles(allRoles);
			return;
		}
		// Si parece un email (contiene @) intenta llamada directa
		if (q.includes('@')) {
			setLoading(true);
			try {
				const found = await getRoleByName(q.trim());
				setRoles(found ? [found] : []);
			} catch {
				// No encontrado -> lista vacía
				setRoles([]);
			} finally {
				setLoading(false);
			}
			return;
		}

		const lower = q.toLowerCase();
		setRoles(
			allRoles.filter(
				(u) =>
					u.name?.toLowerCase().includes(lower) || u.name?.toLowerCase().includes(lower)
			)
		);
	};

	const visibleRoles = useMemo(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return roles;
		return roles.filter(
			(u) => u.name?.toLowerCase().includes(q) || u.name?.toLowerCase().includes(q)
		);
	}, [roles, filter]);

	const loadRolesToAdd = async () => {
		setLoading(true);
		try {
			const data = await getRolesToAddUser(id);
			console.log(data);

			const roles = data.map((r) => ({
				value: r._id,
				label: r.name,
			}));
			setRolesToAdd(roles);
		} catch (error) {
			toast.error('Error al cargar los roles para agregar');
		} finally {
			setLoading(false);
		}
	};

	const deleteRoleById = async (row: Role) => {
		if (!confirm(`Eliminar rol "${row.name}"?`)) return;
    setLoading(true);
		if (id) {
			try {
				await deleteUserRole(id, row._id);
				toast.success('Rol eliminado del usuario exitosamente');
			} catch (error) {
				toast.error('Error al eliminar rol del usuario');
			} finally {
				loadData();
				loadRolesToAdd();
        setLoading(false);
			}
		} else {
			try {
				await deleteRole(row._id);
				toast.success('Rol eliminado exitosamente');
				loadData();
			} catch (error) {
				toast.error('Error al eliminar rol');
      }finally{
        setLoading(false);
			}
		}
	};
	const validateForm = (values: Role) => {
		if (!values.name || values.name.trim() === '' || values.description.trim() === '') {
			toast.error('Todos los campos son obligatorios');
			return false;
		}
		return true;
	};
	const editRole = (role: Role) => {
		setIsEditRole(true);
		setShowForm(true);
		setRoleToEdit(role);
	};
	const addRole = () => setShowForm(true);

	const handleViewRoles = (role: Role) => {
		if(id)navigate(`/permisos/${role._id}`);
    else navigate(`/tablaPermiso/${role._id}`);
	};

	const onSubmit = async (role: Role) => {
		if (!validateForm(role)) return;
		if (isEditRole) {

			await updateRole(role);
			toast.success('Rol actualizado exitosamente');
		} else {
			try {
				await createRole(role);
				toast.success('Rol creado exitosamente');
			} catch (error) {
				toast.error('Error al crear rol');
			}
		}
		setRoleToEdit({ name: '', description: '' });
		setShowForm(false);
		setIsEditRole(false);
		loadData();
	};
	const fieldToAddRole: FormField[] = [
		{
			name: 'role',
			label: 'Rol',
			placeholder: 'Selecciona un rol',
			type: 'select',
			options: rolesToAdd,
		},
	];
	const addRoleToUser = async (values) => {
		try {
			await createUserRole(id, values.role);
			toast.success('Rol agregado al usuario exitosamente');
		} catch (error) {
			toast.error('Error al agregar rol al usuario');
		} finally {
			setShowForm(false);
			loadData();
			loadRolesToAdd();
		}
	};
	useEffect(() => {
		loadData();
		if (id) loadRolesToAdd();
	}, []);

	function getActions(): TableAction[] {
		const actions: TableAction[] = [
			{
				label: 'Editar',
				onClick: editRole,
				variant: 'primary',
			},
			{
				label: 'Eliminar',
				onClick: deleteRoleById,
				variant: 'danger',
			},
			{
				label: 'Permisos',
				onClick: handleViewRoles,
				variant: 'neutral',
			},
		];
		if (id) {
			actions.shift();
		}
		return actions;
	}

	return (
		<div>
      {loading && <LoadingOverlay />}
			<Table
				tableName={id ? 'Roles del usuario ' + userName : 'Roles'}
				titles={['Nombre', 'Descripción']}
				data={visibleRoles.map((u) => ({
					_id: u._id,
					nombre: u.name,
					descripcion: u.description,
				}))}
				onAdd={addRole}
				actions={getActions()}
				emptyMessage={loading ? 'Cargando...' : 'No hay roles'}
				className="mt-4"
				search={{
					onSearch: handleSearch,
					placeholder: 'Buscar rol...',
					debounceMs: 400,
					hideButton: true,
				}}
			/>
			{showForm && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
						<Form
							onCancel={() => {
								setShowForm(false);
								setIsEditRole(false);
								setRoleToEdit({ name: '', description: '' });
							}}
							title={id ? 'Agregar Rol' : 'Crear Rol'}
							fields={id ? fieldToAddRole : userFields}
							onSubmit={id ? addRoleToUser : onSubmit}
							initialValues={id ? { role: '' } : roleToEdit}
							submitText={isEditRole ? 'Actualizar' : 'Crear'}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default RolePage;
