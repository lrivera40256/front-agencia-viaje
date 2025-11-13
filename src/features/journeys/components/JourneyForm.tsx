import type { FormField } from '@/components/form/types';
import type { Journey, City } from '../types/Journey';
import { Form } from '@/components/form/Form';
import { useEffect } from 'react';

interface JourneyFormProps {
	journey: Journey | null;
	cities: City[];
	onSubmit: (journey: Journey) => void;
	onCancel: () => void;
}

export function JourneyForm({ journey, cities, onSubmit, onCancel }: JourneyFormProps) {
	useEffect(() => {
		console.log('🏙️ Ciudades recibidas en formulario:', cities);
		console.log('🏙️ Cantidad de ciudades:', cities.length);
		if (journey) {
			console.log('🏙️ Journey a editar:', journey);
			console.log('🏙️ origin_id:', journey.origin_id);
			console.log('🏙️ destination_id:', journey.destination_id);
		}
	}, [cities, journey]);

	const fields: FormField[] = [
		{
			name: 'origin_id',
			label: 'Ciudad de Origen',
			type: 'select',
			required: true,
			options: cities.map((city) => ({
				label: city.name,
				value: city.id?.toString() || '',
			})),
		},
		{
			name: 'destination_id',
			label: 'Ciudad de Destino',
			type: 'select',
			required: true,
			options: cities.map((city) => ({
				label: city.name,
				value: city.id?.toString() || '',
			})),
		},
	];

	const handleSubmit = (formData: any) => {
		const journeyData: Journey = {
			...journey,
			origin_id: parseInt(formData.origin_id),
			destination_id: parseInt(formData.destination_id),
		};
		onSubmit(journeyData);
	};

	return (
		<Form
			fields={fields}
			onSubmit={handleSubmit}
			onCancel={onCancel}
			title={journey ? 'Editar Trayecto' : 'Nuevo Trayecto'}
			initialValues={{
				origin_id: journey?.origin_id?.toString() || '',
				destination_id: journey?.destination_id?.toString() || '',
			}}
		/>
	);
}
