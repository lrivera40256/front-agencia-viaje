import type { FormField } from '@/components/form/types';
import type {
	TransportItinerary,
	Travel,
	Journey,
	ServiceTransportation,
} from '../types/TransportItinerary';
import { Form } from '@/components/form/Form';

interface TransportItineraryFormProps {
	itinerary: TransportItinerary | null;
	travels: Travel[];
	journeys: Journey[];
	serviceTransportations: ServiceTransportation[];
	onSubmit: (itinerary: TransportItinerary) => void;
	onCancel: () => void;
}

export function TransportItineraryForm({
	itinerary,
	travels,
	journeys,
	serviceTransportations,
	onSubmit,
	onCancel,
}: TransportItineraryFormProps) {
	const fields: FormField[] = [
		{
			name: 'sequence',
			label: 'Secuencia',
			type: 'text',
			required: true,
			placeholder: 'Ej: 1, 2, 3...',
		},
		{
			name: 'travel_id',
			label: 'Viaje',
			type: 'select',
			required: true,
			options: travels.map((travel) => ({
				label: travel.name || `Viaje ${travel.id}`,
				value: travel.id?.toString() || '',
			})),
		},
		{
			name: 'journey_id',
			label: 'Trayecto',
			type: 'select',
			required: true,
			options: journeys.map((journey) => ({
				label: journey.name || `Trayecto ${journey.id}`,
				value: journey.id?.toString() || '',
			})),
		},
		{
			name: 'service_transportation_id',
			label: 'Servicio de Transporte',
			type: 'select',
			required: true,
			options: serviceTransportations.map((service) => ({
				label: service.name || `Servicio ${service.id}`,
				value: service.id?.toString() || '',
			})),
		},
	];

	const handleSubmit = (formData: any) => {
		const selectedTravel = travels.find((t) => t.id === parseInt(formData.travel_id));
		const selectedJourney = journeys.find((j) => j.id === parseInt(formData.journey_id));
		const selectedService = serviceTransportations.find(
			(s) => s.id === parseInt(formData.service_transportation_id)
		);

		const itineraryData: TransportItinerary = {
			...itinerary,
			sequence: parseInt(formData.sequence),
			travel_id: parseInt(formData.travel_id),
			journey_id: parseInt(formData.journey_id),
			service_transportation_id: parseInt(formData.service_transportation_id),
			travel: selectedTravel,
			journey: selectedJourney,
			serviceTransportation: selectedService,
		};
		onSubmit(itineraryData);
	};

	return (
		<Form
			fields={fields}
			onSubmit={handleSubmit}
			onCancel={onCancel}
			title={itinerary ? 'Editar Itinerario de Transporte' : 'Nuevo Itinerario de Transporte'}
			initialValues={{
				sequence: itinerary?.sequence?.toString() || '',
				travel_id: itinerary?.travel_id?.toString() || '',
				journey_id: itinerary?.journey_id?.toString() || '',
				service_transportation_id: itinerary?.service_transportation_id?.toString() || '',
			}}
		/>
	);
}
