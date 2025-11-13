import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { Journey, City } from '@/features/journeys/types/Journey';
import {
	createJourney,
	deleteJourneyById,
	getJourneys,
	updateJourney,
} from '@/features/journeys/services/journeyService';
import { CitiesService } from '@/services/citieService';

export function useJourney() {
	const [showForm, setShowForm] = useState(false);
	const [journeyToEdit, setJourneyToEdit] = useState<Journey | null>(null);
	const [journeys, setJourneys] = useState<Journey[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState(false);

	const handleAdd = () => {
		setJourneyToEdit(null);
		setShowForm(true);
	};

	const handleSubmit = async (journey: Journey) => {
		// Validations
		if (!journey.origin_id) {
			toast.error('Por favor selecciona el origen');
			return;
		}

		if (!journey.destination_id) {
			toast.error('Por favor selecciona el destino');
			return;
		}

		if (journey.origin_id === journey.destination_id) {
			toast.error('El origen y destino no pueden ser iguales');
			return;
		}

		try {
			if (journey.id) {
				await updateJourney(journey);
				toast.success('Trayecto actualizado exitosamente');
				setShowForm(false);
			} else {
				await createJourney(journey);
				toast.success('Trayecto creado exitosamente');
				setShowForm(false);
			}
			await loadJourneys();
		} catch (error) {
			console.error(error);
			toast.error('Error al guardar el trayecto');
		}
	};

	const visibleJourneys = useMemo(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return journeys;
		return journeys.filter((journey) => {
			const originName = journey.origin?.name?.toLowerCase() || '';
			const destName = journey.destination?.name?.toLowerCase() || '';
			return originName.includes(q) || destName.includes(q);
		});
	}, [journeys, filter]);

	const loadJourneys = async () => {
		setLoading(true);
		try {
			const data = await getJourneys();
			console.log('📋 Journeys sin procesar:', data);
			if (data.length > 0) {
				console.log('📋 Primer journey - Keys:', Object.keys(data[0]));
				console.log('📋 Primer journey completo:', data[0]);
			}

			setJourneys(
				data.map((item: any) => {
					// Enriquecer journeys con información de ciudades si no la tienen
					let origin = item.origin;
					let destination = item.destination;

					// Si no viene origin del backend, buscar en cities
					if (!origin && item.origin_id && cities.length > 0) {
						origin = cities.find((c) => c.id === item.origin_id);
					}

					// Si no viene destination del backend, buscar en cities
					if (!destination && item.destination_id && cities.length > 0) {
						destination = cities.find((c) => c.id === item.destination_id);
					}

					return {
						id: item.id,
						origin_id: item.origin_id,
						destination_id: item.destination_id,
						origin: origin,
						destination: destination,
						createdAt: item.createdAt,
						updatedAt: item.updatedAt,
					};
				})
			);
		} catch (error) {
			toast.error('Error al cargar trayectos');
		} finally {
			setLoading(false);
		}
	};

	const loadCities = async () => {
		try {
			console.log('📍 Iniciando carga de ciudades...');
			const response = await CitiesService.getAllCities();
			console.log('📍 Respuesta del backend:', response);
			console.log('📍 Tipo de respuesta:', typeof response);
			console.log('📍 Es array?', Array.isArray(response));

			// El servicio ya retorna res.data
			let citiesData: City[] = [];

			if (Array.isArray(response)) {
				citiesData = response;
				console.log('✅ Respuesta es array, ciudades:', citiesData.length);
			} else if (response && typeof response === 'object') {
				console.log('⚠️ Respuesta es objeto, keys:', Object.keys(response));
				// Buscar un array dentro del objeto
				for (const key in response) {
					if (Array.isArray(response[key])) {
						citiesData = response[key];
						console.log(
							'✅ Array encontrado en key:',
							key,
							'cantidad:',
							citiesData.length
						);
						break;
					}
				}
			}

			console.log('📍 Ciudades finales cargadas:', citiesData.length);
			setCities(citiesData);
		} catch (error) {
			console.error('❌ Error al cargar ciudades:', error);
			toast.error('Error al cargar ciudades');
			setCities([]);
		}
	};

	const handleEdit = (journey: Journey) => {
		setJourneyToEdit(journey);
		setShowForm(true);
	};

	const handleSearch = (q: string) => {
		setFilter(q);
	};

	const handleDelete = async (journey: Journey) => {
		if (!confirm('¿Eliminar este trayecto?')) return;
		setLoading(true);
		try {
			await deleteJourneyById(journey.id!);
			toast.success('Trayecto eliminado exitosamente');
			await loadJourneys();
		} catch (error) {
			toast.error('Error al eliminar trayecto');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadJourneys();
		loadCities();
	}, []);

	// Recargar journeys cuando las ciudades estén disponibles para enriquecerlas
	useEffect(() => {
		if (cities.length > 0) {
			loadJourneys();
		}
	}, [cities]);

	return {
		handleSubmit,
		handleAdd,
		handleEdit,
		journeys: visibleJourneys,
		setShowForm,
		handleSearch,
		handleDelete,
		journeyToEdit,
		showForm,
		loading,
		cities,
	};
}

export default useJourney;
