import type { FormField } from '@/components/form/types';
import type { Quota } from '../types/Quota';
import { Form } from '@/components/form/Form';
import type { Travel } from '@/features/travels/types/Travel';

interface QuotaFormProps {
	quota: Quota | null;
	travels: Travel[];
	onSubmit: (quota: Quota) => void;
	onCancel: () => void;
}

export function QuotaForm({ quota, travels, onSubmit, onCancel }: QuotaFormProps) {
	const fields: FormField[] = [
		{
			name: 'travel_id',
			label: 'Viaje',
			type: 'select',
			required: true,
			options: travels.map((travel) => ({
				label: travel.name,
				value: travel.id?.toString() || '',
			})),
		},
		{
			name: 'amount',
			label: 'Monto',
			type: 'text',
			required: true,
			placeholder: '0.00',
		},
		{
			name: 'number_payments',
			label: 'Número de Pagos',
			type: 'text',
			required: true,
			placeholder: '1',
		},
	];

	const handleSubmit = (formData: any) => {
		const quotaData: Quota = {
			...quota,
			travel_id: parseInt(formData.travel_id),
			amount: parseFloat(formData.amount),
			number_payments: parseInt(formData.number_payments),
		};
		onSubmit(quotaData);
	};

	return (
		<Form
			fields={fields}
			onSubmit={handleSubmit}
			onCancel={onCancel}
			title={quota ? 'Editar Cuota' : 'Nueva Cuota'}
			initialValues={{
				travel_id: quota?.travel_id?.toString() || '',
				amount: quota?.amount?.toString() || '',
				number_payments: quota?.number_payments?.toString() || '',
			}}
		/>
	);
}
