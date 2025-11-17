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
import { DepartamentService } from '@/services/departamentService';
import { Departament } from '@/models/departaments';
import { ShowerHead } from 'lucide-react';

export function useJourney() {
	const [showForm, setShowForm] = useState(false);
	const [journeyToEdit, setJourneyToEdit] = useState<Journey | null>(null);
	const [journeys, setJourneys] = useState<Journey[]>([]);
	const [departments, setDepartments] = useState<Departament[]>([]);
	const [originCities, setOriginCities] = useState<City[]>([]);
	const [destinationCities, setDestinationCities] = useState<City[]>([]);
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

			setJourneys(
				data.map((item: any) => {
					// Enriquecer journeys con información de ciudades si no la tienen
					let origin = item.origin;
					let destination = item.destination;

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

	const loadCitiesByDepartment = async (departmentId: number, departamentOrigin: boolean) => {
		try {
			const response: City[] = await CitiesService.getCitiesByDepartament(departmentId);
			if (departamentOrigin) {
				setOriginCities(response);
				return;
			}
			setDestinationCities(response);
		} catch (error) {
			toast.error('Error al cargar ciudades');
			if (departamentOrigin) {
				setOriginCities([]);
				return;
			}
			setDestinationCities([]);
		}
	};

	const loadDepartments = async ()=> {
		try {
			const respose: Departament[] = await DepartamentService.getAllDepartaments();
			setDepartments(respose);
		} catch (error) {
			toast.error('Error al cargar departamentos');
		}
	}

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
	}, []);

	// Recargar journeys cuando las ciudades estén disponibles para enriquecerlas
  useEffect(() => {
		if (!showForm) return;
		loadDepartments();
	}, [showForm])

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
		originCities,
		destinationCities,
		departments,
		loadCitiesByDepartment,
	};
}

export default useJourney;
