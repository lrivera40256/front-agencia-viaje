import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { User } from '@/features/user-logic/types/User';
import {
	createUser,
	deleteUserById,
	getUsers,
	updateUser,
} from '@/features/user-logic/services/userLogicService';

const DOCUMENT_TYPES = ['CC', 'TI', 'CE', 'PAS'];

export function useUserLogic() {
	const [showForm, setShowForm] = useState(false);
	const [userToEdit, setUserToEdit] = useState<User | null>(null);
	const [users, setUsers] = useState<User[]>([]);
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState(false);

	const handleAdd = () => {
		setUserToEdit(null);
		setShowForm(true);
	};

	const handleSubmit = async (user: User) => {
		// Validations
		if (!user.name || user.name.trim().length < 8) {
			toast.error('El nombre debe tener al menos 8 caracteres');
			return;
		}

		if (!user.email || !isValidEmail(user.email)) {
			toast.error('Por favor ingresa un email válido');
			return;
		}

		if (!user.phone || user.phone.trim().length < 6) {
			toast.error('El teléfono debe tener al menos 6 caracteres');
			return;
		}

		if (!user.identification_number || user.identification_number.trim().length < 4) {
			toast.error('El número de identificación debe tener al menos 4 caracteres');
			return;
		}

		if (!user.document_type) {
			toast.error('Por favor selecciona un tipo de documento');
			return;
		}

		if (!user.birth_date) {
			toast.error('Por favor selecciona una fecha de nacimiento');
			return;
		}

		try {
			if (user.id) {
				await updateUser(user);
				toast.success('Usuario actualizado exitosamente');
				setShowForm(false);
			} else {
				await createUser(user);
				toast.success('Usuario creado exitosamente');
				setShowForm(false);
			}
			await loadUsers();
		} catch (error: any) {
			console.error(error);
			const message = error?.response?.data?.message || 'Error al guardar el usuario';
			toast.error(message);
		}
	};

	const visibleUsers = useMemo(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return users;
		return users.filter((user) => {
			const name = user.name?.toLowerCase() || '';
			const email = user.email?.toLowerCase() || '';
			const phone = user.phone?.toLowerCase() || '';
			const identificationNumber = user.identification_number?.toLowerCase() || '';
			return (
				name.includes(q) ||
				email.includes(q) ||
				phone.includes(q) ||
				identificationNumber.includes(q)
			);
		});
	}, [users, filter]);

	const loadUsers = async () => {
		setLoading(true);
		try {
			const data = await getUsers();
			setUsers(
				data.map((item) => ({
					id: item.id,
					name: item.name,
					email: item.email,
					phone: item.phone,
					identification_number: item.identification_number,
					document_type: item.document_type,
					birth_date: item.birth_date,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
				}))
			);
		} catch (error) {
			toast.error('Error al cargar usuarios');
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (user: User) => {
		setUserToEdit(user);
		setShowForm(true);
	};

	const handleSearch = (q: string) => {
		setFilter(q);
	};

	const handleDelete = async (user: User) => {
		if (!confirm('¿Eliminar este usuario?')) return;
		setLoading(true);
		try {
			await deleteUserById(user.id!);
			toast.success('Usuario eliminado exitosamente');
			await loadUsers();
		} catch (error) {
			toast.error('Error al eliminar usuario');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadUsers();
	}, []);

	return {
		handleSubmit,
		handleAdd,
		handleEdit,
		users: visibleUsers,
		setShowForm,
		handleSearch,
		handleDelete,
		userToEdit,
		showForm,
		loading,
		documentTypes: DOCUMENT_TYPES,
	};
}

const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export default useUserLogic;
