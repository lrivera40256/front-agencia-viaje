import { useEffect, useState } from 'react';
import { createRole, deleteRole, getRoles, updateRole } from '../services/roleService';
import type { Role } from '../models/Role';
import Table from '../components/Table';
import { Trash2, Plus } from 'lucide-react';
import Form, { FormField } from '@/components/Form';
import { toast } from 'sonner';

const RolePage: React.FC = () => {
	const [roles, setRoles] = useState<Role[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [isEditRole, setIsEditRole] = useState<boolean>(false);
	const [roleToEdit, setRoleToEdit] = useState<Role>({ name: '', description: '' });

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
		try {
			const data = await getRoles();
			setRoles(data);
		} finally {
			setLoading(false);
		}
	};

	const deleteRoleById = async (row: Role) => {
		if (!confirm(`Eliminar rol "${row.name}"?`)) return;
		try {
			await deleteRole(row._id);
			toast.success('Rol eliminado exitosamente');
			loadData();
		} catch (error) {
			toast.error('Error al eliminar rol');
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

	useEffect(() => {
		loadData();
	}, []);

	return (
		<div>
			<Table
				tableName="Roles"
				titles={['Nombre', 'Descripción']}
				data={roles}
				onAdd={addRole}
				actions={[
					{
						label: 'Eliminar',
						onClick: deleteRoleById,
						variant: 'danger',
					},
					{
						label: 'Editar',
						onClick: editRole,
						variant: 'primary',
					},
				]}
				emptyMessage={loading ? 'Cargando...' : 'No hay roles'}
				className="mt-4"
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
							title="Agregar Rol"
							fields={userFields}
							onSubmit={onSubmit}
							initialValues={roleToEdit}
							submitText={isEditRole ? 'Actualizar' : 'Crear'}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default RolePage;
