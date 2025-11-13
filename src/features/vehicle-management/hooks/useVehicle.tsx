import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { Vehicle } from '@/features/vehicle-management/types/Vehicle';
import {
	createVehicle,
	deleteVehicleById,
	getVehicles,
	updateVehicle,
} from '@/features/vehicle-management/services/vehicleService';

export function useVehicle() {
	const [showForm, setShowForm] = useState(false);
	const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState(false);

	const handleAdd = () => {
		setVehicleToEdit(null);
		setShowForm(true);
	};

	const handleSubmit = async (vehicle: Vehicle) => {
		// Validations
		if (!vehicle.brand || !vehicle.brand.trim()) {
			toast.error('Por favor ingresa la marca del vehículo');
			return;
		}

		if (!vehicle.type) {
			toast.error('Por favor selecciona el tipo de vehículo');
			return;
		}

		if (!vehicle.model || vehicle.model <= 0) {
			toast.error('Por favor ingresa un modelo válido');
			return;
		}

		if (!vehicle.color || !vehicle.color.trim()) {
			toast.error('Por favor ingresa el color del vehículo');
			return;
		}

		if (!vehicle.capacity || vehicle.capacity <= 0) {
			toast.error('Por favor ingresa una capacidad válida');
			return;
		}

		try {
			if (vehicle.id) {
				await updateVehicle(vehicle);
				toast.success('Vehículo actualizado exitosamente');
				setShowForm(false);
			} else {
				await createVehicle(vehicle);
				toast.success('Vehículo creado exitosamente');
				setShowForm(false);
			}
			await loadVehicles();
		} catch (error) {
			console.error(error);
			toast.error('Error al guardar el vehículo');
		}
	};

	const visibleVehicles = useMemo(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return vehicles;
		return vehicles.filter((vehicle) => {
			const brand = vehicle.brand?.toLowerCase() || '';
			const color = vehicle.color?.toLowerCase() || '';
			const type = vehicle.type?.toLowerCase() || '';
			const model = vehicle.model?.toString() || '';
			return brand.includes(q) || color.includes(q) || type.includes(q) || model.includes(q);
		});
	}, [vehicles, filter]);

	const loadVehicles = async () => {
		setLoading(true);
		try {
			const data = await getVehicles();
			setVehicles(
				data.map((item: any) => ({
					id: item.id,
					brand: item.brand,
					type: item.type,
					model: item.model,
					color: item.color,
					capacity: item.capacity,
					gps_id: item.gps_id,
					gps: item.gps,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
				}))
			);
		} catch (error) {
			toast.error('Error al cargar vehículos');
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (vehicle: Vehicle) => {
		setVehicleToEdit(vehicle);
		setShowForm(true);
	};

	const handleSearch = (q: string) => {
		setFilter(q);
	};

	const handleDelete = async (vehicle: Vehicle) => {
		if (!confirm('¿Eliminar este vehículo?')) return;
		setLoading(true);
		try {
			await deleteVehicleById(vehicle.id!);
			toast.success('Vehículo eliminado exitosamente');
			await loadVehicles();
		} catch (error) {
			toast.error('Error al eliminar vehículo');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadVehicles();
	}, []);

	return {
		handleSubmit,
		handleAdd,
		handleEdit,
		vehicles: visibleVehicles,
		setShowForm,
		handleSearch,
		handleDelete,
		vehicleToEdit,
		showForm,
		loading,
	};
}

export default useVehicle;
