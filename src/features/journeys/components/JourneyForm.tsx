import type { FormField } from '@/components/form/types';
import type { Journey, City } from '../types/Journey';
import { Form } from '@/components/form/Form';
import { LoaderCircle } from 'lucide-react';
import { Departament } from '@/models/departaments';

interface JourneyFormProps {
	journey: Journey | null;
	originCities: City[];
	destinationCities: City[];
	onSubmit: (journey: Journey) => void;
	onCancel: () => void;
	departments?: Departament[];
	onDepartmentChange?: (departamentId: number, departamentOrigin: boolean) => void;
}

export function JourneyForm({
	journey,
	originCities,
	destinationCities,
	onSubmit,
	onCancel,
	departments,
	onDepartmentChange,
}: JourneyFormProps) {

	console.log({destinationCities});
	console.log({originCities});

	const fields: FormField[] = [
		{
			name: 'departament_origin_id',
			label: 'Departamento de origen',
			type: 'select',
			required: true,
			options: departments?.map((departament) => ({
				label: departament.name,
				value: departament.id?.toString() || '',
			})),
			onChange: (e) =>
				onDepartmentChange && onDepartmentChange(parseInt(e.target.value), true),
		},
		{
			name: 'origin_id',
			label: 'Ciudad de origen',
			type: 'select',
			required: true,
			options: originCities
				? originCities.map((city) => ({
						label: city.name,
						value: city.id?.toString() || '',
					}))
				: [],
		},
		{
			name: 'departament_destination_id',
			label: 'Departamento de destino',
			type: 'select',
			required: true,
			options: departments.map((departament) => ({
				label: departament.name,
				value: departament.id?.toString() || '',
			})),
			onChange: (e) => onDepartmentChange(parseInt(e.target.value), false),
		},
		{
			name: 'destination_id',
			label: 'Ciudad de destino',
			type: 'select',
			required: true,
			options: destinationCities
				? destinationCities.map((city) => ({
						label: city.name,
						value: city.id?.toString() || '',
					}))
				: [],
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
				departament_origin_id: "",
				departament_destination_id: "",
				origin_id:"",
				destination_id:"",
			}}
		/>
	);
}
