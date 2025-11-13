import { Travel } from '@/features/travels/types/Travel';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
	createTravel,
	deleteTravelById,
	getTravels,
	updateTravel,
} from '../services/travelService';
import { useNavigate } from 'react-router-dom';

export function useTravel() {
	const [showForm, setShowForm] = useState(false);
	const navigate = useNavigate();
	const [travelToEdit, setTravelToEdit] = useState<Travel | null>(null);
	const [travels, setTravels] = useState<Travel[]>([]);
	const [allTravels, setAllTravels] = useState<Travel[]>([]);
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState(false);

	const handleAdd = () => {
		setTravelToEdit(null);
		setShowForm(true);
	};

	const handleSubmit = async (travel: Travel) => {
		if (travel.name.trim() === '') {
			toast.error('El nombre del viaje es obligatorio');
			return;
		}
		if (travel.description.trim() === '') {
			toast.error('La descripción es obligatoria');
			return;
		}
		if (!travel.start_date) {
			toast.error('La fecha de inicio es obligatoria');
			return;
		}
		if (!travel.end_date) {
			toast.error('La fecha de fin es obligatoria');
			return;
		}
		if (!travel.price || travel.price <= 0) {
			toast.error('El precio debe ser mayor a 0');
			return;
		}

		setLoading(true);
		try {
			if (travel._id || travel.id) {
				await updateTravel(travel);
				toast.success('Viaje actualizado exitosamente');
				setShowForm(false);
			} else {
				await createTravel(travel);
				toast.success('Viaje creado exitosamente');
				setShowForm(false);
			}
		} catch (error) {
			toast.error('Error al guardar el viaje');
			console.log(error);
		} finally {
			setLoading(false);
			loadTravels();
		}
	};

	const visibleTravels = useMemo(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return allTravels;
		return allTravels.filter(
			(t) => t.name?.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)
		);
	}, [allTravels, filter]);

	const loadTravels = async () => {
		setLoading(true);
		try {
			const data = await getTravels();
			setTravels(data);
			setAllTravels(data);
			setFilter('');
		} catch {
			toast.error('Error al cargar viajes');
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (travel: Travel) => {
		setTravelToEdit(travel);
		setShowForm(true);
	};

	const handleSearch = (q: string) => {
		setFilter(q);
	};

	const handleDelete = async (travel: Travel) => {
		if (!confirm(`¿Eliminar el viaje "${travel.name}"?`)) return;
		setLoading(true);
		try {
			await deleteTravelById(travel._id || travel.id.toString());
			toast.success('Viaje eliminado exitosamente');
			await loadTravels();
		} catch {
			toast.error('Error al eliminar viaje');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadTravels();
	}, []);

	return {
		handleSubmit,
		handleAdd,
		handleEdit,
		travels: visibleTravels,
		allTravels,
		setShowForm,
		handleSearch,
		handleDelete,
		travelToEdit,
		showForm,
		loading,
		setFilter,
	};
}
