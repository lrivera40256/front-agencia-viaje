import type { FormField } from '@/components/form/types';
import type { Vehicle } from '../types/Vehicle';
import { Form } from '@/components/form/Form';

interface VehicleFormProps {
	vehicle: Vehicle | null;
	onSubmit: (vehicle: Vehicle) => void;
	onCancel: () => void;
}

export function VehicleForm({ vehicle, onSubmit, onCancel }: VehicleFormProps) {
	const fields: FormField[] = [
		{
			name: 'brand',
			label: 'Marca',
			type: 'text',
			required: true,
			placeholder: 'Ej: Toyota, Airbus...',
		},
		{
			name: 'type',
			label: 'Tipo de Vehículo',
			type: 'select',
			required: true,
			options: [
				{ label: 'Carro', value: 'carro' },
				{ label: 'Aeronave', value: 'aeronave' },
			],
		},
		{
			name: 'model',
			label: 'Modelo (Año)',
			type: 'text',
			required: true,
			placeholder: 'Ej: 2023',
		},
		{
			name: 'color',
			label: 'Color',
			type: 'text',
			required: true,
			placeholder: 'Ej: Rojo, Azul...',
		},
		{
			name: 'capacity',
			label: 'Capacidad (Pasajeros)',
			type: 'text',
			required: true,
			placeholder: 'Ej: 5, 100...',
		},
	];

	const handleSubmit = (formData: any) => {
		const vehicleData: Vehicle = {
			...vehicle,
			brand: formData.brand,
			type: formData.type,
			model: parseInt(formData.model),
			color: formData.color,
			capacity: parseInt(formData.capacity),
		};
		onSubmit(vehicleData);
	};

	return (
		<Form
			fields={fields}
			onSubmit={handleSubmit}
			onCancel={onCancel}
			title={vehicle ? 'Editar Vehículo' : 'Nuevo Vehículo'}
			initialValues={{
				brand: vehicle?.brand || '',
				type: vehicle?.type || '',
				model: vehicle?.model?.toString() || '',
				color: vehicle?.color || '',
				capacity: vehicle?.capacity?.toString() || '',
			}}
		/>
	);
}
