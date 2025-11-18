import { Form } from '@/components/form/Form';
import { FormField } from '@/components/form/types';
import { Journey } from '@/features/journeys/types/Journey';
import type { ServiceTransportation } from '@/features/transportation/types/ServiceTransportation';
import { Vehicle } from '@/features/vehicle-management/types/Vehicle';

interface Props {
	vehicles?: Vehicle[];
	journeys?: Journey[];
	initial?: Partial<ServiceTransportation> | null;
	onSubmit: (v: ServiceTransportation) => Promise<void> | void;
	onCancel: () => void;
}

const formatDateInput = (iso?: string) => (iso ? new Date(iso).toISOString().slice(0, 10) : '');
const toISO = (d?: string) => (d ? new Date(d).toISOString() : '');

export function ServiceTransportationForm({
	initial,
	onSubmit,
	onCancel,
	vehicles,
	journeys,
}: Props) {
	const fields = [
		{ name: 'start_date', label: 'Fecha inicio', type: 'date', required: true },
		{ name: 'end_date', label: 'Fecha fin', type: 'date', required: true },
		{ name: 'cost', label: 'Costo', type: 'text', required: true },
		{
			name: 'vehicle_id',
			label: 'Vehiculo',
			type: 'select',
			required: true,
			options:
				vehicles?.map((v) => ({
					label: v.brand + ' - ' + v.color || '',
					value: v.id?.toString() || '',
				})) || [],
		},
		{
			name: 'journey_id',
			label: 'Trayecto',
			type: 'select',
			required: true,
			options:
				journeys?.map((j) => ({
					label: `${j.origin.name} -> ${j.destination.name}`,
					value: j.id?.toString() || '',
				})) || [],
		},
	] as FormField[];

	const initialValues: any = initial
		? {
				...initial,
				start_date: formatDateInput(initial.start_date),
				end_date: formatDateInput(initial.end_date),
			}
		: {
				start_date: formatDateInput(new Date().toISOString()),
				end_date: formatDateInput(new Date().toISOString()),
				cost: 0,
				vehicle_id: undefined,
				journey_id: undefined,
			};

	const submit = async (values: any) => {
		const payload: ServiceTransportation = {
			...(initial || {}),

			start_date: values.start_date,
			end_date: values.end_date,

			cost: Number(values.cost),  

			transportation_id: Number(values.vehicle_id),
			journey_id: Number(values.journey_id),
		};

		await onSubmit(payload);
	};

	return (
		<Form<ServiceTransportation>
			title={initial?.id ? 'Editar servicio' : 'Nuevo servicio'}
			fields={fields}
			initialValues={initialValues}
			onSubmit={submit as any}
			onCancel={onCancel}
			submitText={initial?.id ? 'Actualizar' : 'Crear'}
		/>
	);
}

export default ServiceTransportationForm;
