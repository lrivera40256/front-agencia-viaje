import { Form } from '@/components/form/Form';
import type { FormField } from '@/components/form/types';
import type { User } from '../types/User';

interface UserLogicFormProps {
	user?: User;
	onSubmit: (user: User) => void | Promise<void>;
	documentTypes: string[];
	onCancel?: () => void;
}

export function UserLogicForm({ user, onSubmit, documentTypes, onCancel }: UserLogicFormProps) {
	const fields: FormField[] = [
		{
			name: 'name',
			label: 'Nombre completo',
			type: 'text',
			placeholder: 'Ej: Juan Carlos Pérez',
			required: true,
		},
		{
			name: 'email',
			label: 'Email',
			type: 'email',
			placeholder: 'Ej: juan@example.com',
			required: true,
		},
		{
			name: 'phone',
			label: 'Teléfono',
			type: 'text',
			placeholder: 'Ej: 3001234567',
			required: true,
		},
		{
			name: 'identification_number',
			label: 'Número de identificación',
			type: 'text',
			placeholder: 'Ej: 1234567890',
			required: true,
		},
		{
			name: 'document_type',
			label: 'Tipo de documento',
			type: 'select',
			placeholder: 'Selecciona un tipo',
			options: documentTypes.map((type) => ({
				value: type,
				label: type,
			})),
			required: true,
		},
		{
			name: 'birth_date',
			label: 'Fecha de nacimiento',
			type: 'text',
			placeholder: 'YYYY-MM-DD',
			required: true,
		},
	];

	const handleSubmit = async (formData: Record<string, any>) => {
		const userData: User = {
			...(user?.id && { id: user.id }),
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			identification_number: formData.identification_number,
			document_type: formData.document_type,
			birth_date: formData.birth_date,
		};

		await onSubmit(userData);
	};

	const initialValues: Record<string, any> = user
		? {
				name: user.name,
				email: user.email,
				phone: user.phone,
				identification_number: user.identification_number,
				document_type: user.document_type,
				birth_date: user.birth_date,
			}
		: {
				name: '',
				email: '',
				phone: '',
				identification_number: '',
				document_type: '',
				birth_date: '',
			};

	return (
		<Form
			title={user ? 'Actualizar Usuario' : 'Crear Usuario'}
			fields={fields}
			initialValues={initialValues}
			onSubmit={handleSubmit}
			onCancel={onCancel}
			submitText={user ? 'Actualizar' : 'Crear'}
		/>
	);
}

export default UserLogicForm;
