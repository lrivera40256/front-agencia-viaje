import { Form } from '@/components/form/Form';
import { FormField } from '@/components/form/types';
import { Travel } from '../types/Travel';

export function TravelForm({
	initial,
	onSubmit,
	onCancel,
	fields,
}: {
	initial?: Travel;
	onSubmit: (r: Travel) => Promise<void> | void;
	onCancel: () => void;
	fields: FormField[];
}) {
	return (
		<Form
			title={initial ? 'Editar Viaje' : 'Nuevo Viaje'}
			fields={fields}
			initialValues={
				initial || {
					name: '',
					description: '',
					start_date: '',
					end_date: '',
					price: 0,
				}
			}
			onSubmit={onSubmit}
			onCancel={onCancel}
			submitText={initial ? 'Actualizar' : 'Crear'}
		/>
	);
}
