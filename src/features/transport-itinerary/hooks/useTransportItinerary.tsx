import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type {
	TransportItinerary,
	Travel,
	Journey,
	ServiceTransportation,
} from '@/features/transport-itinerary/types/TransportItinerary';
import {
	createTransportItinerary,
	deleteTransportItineraryById,
	getTransportItineraries,
	updateTransportItinerary,
} from '@/features/transport-itinerary/services/transportItineraryService';
import api from '@/interceptors/msLogicInterceptor';

export function useTransportItinerary() {
	const [showForm, setShowForm] = useState(false);
	const [itineraryToEdit, setItineraryToEdit] = useState<TransportItinerary | null>(null);
	const [itineraries, setItineraries] = useState<TransportItinerary[]>([]);
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState(false);
	const [travels, setTravels] = useState<Travel[]>([]);
	const [journeys, setJourneys] = useState<Journey[]>([]);
	const [serviceTransportations, setServiceTransportations] = useState<ServiceTransportation[]>(
		[]
	);

	const handleAdd = () => {
		setItineraryToEdit(null);
		setShowForm(true);
	};

	const handleSubmit = async (itinerary: TransportItinerary) => {
		// Validations
		if (!itinerary.sequence || itinerary.sequence <= 0) {
			toast.error('Por favor ingresa una secuencia válida');
			return;
		}

		if (!itinerary.travel_id) {
			toast.error('Por favor selecciona un viaje');
			return;
		}

		if (!itinerary.journey_id) {
			toast.error('Por favor selecciona un trayecto');
			return;
		}

		if (!itinerary.service_transportation_id) {
			toast.error('Por favor selecciona un servicio de transporte');
			return;
		}

		try {
			if (itinerary.id) {
				await updateTransportItinerary(itinerary);
				toast.success('Itinerario de transporte actualizado exitosamente');
				setShowForm(false);
			} else {
				await createTransportItinerary(itinerary);
				toast.success('Itinerario de transporte creado exitosamente');
				setShowForm(false);
			}
			await loadItineraries();
		} catch (error) {
			console.error(error);
			toast.error('Error al guardar el itinerario de transporte');
		}
	};

	const visibleItineraries = useMemo(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return itineraries;
		return itineraries.filter((itinerary) => {
			const sequence = itinerary.sequence?.toString() || '';
			const travelName = itinerary.travel?.name?.toLowerCase() || '';
			const journeyName = itinerary.journey?.name?.toLowerCase() || '';
			const serviceName = itinerary.serviceTransportation?.name?.toLowerCase() || '';
			return (
				sequence.includes(q) ||
				travelName.includes(q) ||
				journeyName.includes(q) ||
				serviceName.includes(q)
			);
		});
	}, [itineraries, filter]);

	const loadItineraries = async () => {
		setLoading(true);
		try {
			const data = await getTransportItineraries();
			setItineraries(
				data.map((item: any) => ({
					id: item.id,
					sequence: item.sequence,
					travel_id: item.travel_id,
					journey_id: item.journey_id,
					service_transportation_id: item.service_transportation_id,
					travel: item.travel,
					journey: item.journey,
					serviceTransportation: item.serviceTransportation,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
				}))
			);
		} catch (error) {
			toast.error('Error al cargar itinerarios de transporte');
		} finally {
			setLoading(false);
		}
	};

	const loadRelatedData = async () => {
		try {
			const results = await Promise.allSettled([
				api.get('/travel'),
				api.get('/journeys'),
				api.get('/service-transportation'),
			]);

			// Handle travels
			if (results[0].status === 'fulfilled') {
				setTravels(results[0].value.data);
			} else {
				console.warn('Error loading travels');
				setTravels([]);
			}

			// Handle journeys
			if (results[1].status === 'fulfilled') {
				setJourneys(results[1].value.data);
			} else {
				console.warn('Error loading journeys');
				setJourneys([]);
			}

			// Handle service transportations
			if (results[2].status === 'fulfilled') {
				setServiceTransportations(results[2].value.data);
			} else {
				console.warn('Error loading service transportations');
				setServiceTransportations([]);
			}
		} catch (error) {
			console.error('Error loading related data:', error);
			setTravels([]);
			setJourneys([]);
			setServiceTransportations([]);
		}
	};

	const handleEdit = (itinerary: TransportItinerary) => {
		setItineraryToEdit(itinerary);
		setShowForm(true);
	};

	const handleSearch = (q: string) => {
		setFilter(q);
	};

	const handleDelete = async (itinerary: TransportItinerary) => {
		if (!confirm('¿Eliminar este itinerario de transporte?')) return;
		setLoading(true);
		try {
			await deleteTransportItineraryById(itinerary.id!);
			toast.success('Itinerario de transporte eliminado exitosamente');
			await loadItineraries();
		} catch (error) {
			toast.error('Error al eliminar itinerario de transporte');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadItineraries();
		loadRelatedData();
	}, []);

	return {
		handleSubmit,
		handleAdd,
		handleEdit,
		itineraries: visibleItineraries,
		setShowForm,
		handleSearch,
		handleDelete,
		itineraryToEdit,
		showForm,
		loading,
		travels,
		journeys,
		serviceTransportations,
	};
}

export default useTransportItinerary;
