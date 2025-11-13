import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { Quota } from '@/features/quotas/types/Quota';
import {
	createQuota,
	deleteQuotaById,
	getQuotas,
	updateQuota,
} from '@/features/quotas/services/quotaService';
import { getTravels } from '@/features/travels/services/travelService';
import type { Travel } from '@/features/travels/types/Travel';

export function useQuota() {
	const [showForm, setShowForm] = useState(false);
	const [quotaToEdit, setQuotaToEdit] = useState<Quota | null>(null);
	const [quotas, setQuotas] = useState<Quota[]>([]);
	const [travels, setTravels] = useState<Travel[]>([]);
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState(false);

	const handleAdd = () => {
		setQuotaToEdit(null);
		setShowForm(true);
	};

	const handleSubmit = async (quota: Quota) => {
		// Validations
		if (!quota.travel_id) {
			toast.error('Por favor selecciona un viaje');
			return;
		}

		if (quota.amount <= 0) {
			toast.error('El monto debe ser mayor a 0');
			return;
		}

		if (quota.number_payments <= 0) {
			toast.error('El número de pagos debe ser mayor a 0');
			return;
		}

		try {
			if (quota.id) {
				await updateQuota(quota);
				toast.success('Cuota actualizada exitosamente');
				setShowForm(false);
			} else {
				await createQuota(quota);
				toast.success('Cuota creada exitosamente');
				setShowForm(false);
			}
			await loadQuotas();
		} catch (error) {
			console.error(error);
			toast.error('Error al guardar la cuota');
		}
	};

	const visibleQuotas = useMemo(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return quotas;
		return quotas.filter((quota) => {
			const travelName = quota.travel?.name?.toLowerCase() || '';
			return (
				travelName.includes(q) ||
				quota.amount.toString().includes(q) ||
				quota.number_payments.toString().includes(q)
			);
		});
	}, [quotas, filter]);

	const loadQuotas = async () => {
		setLoading(true);
		try {
			const data = await getQuotas();
			setQuotas(
				data.map((item) => ({
					id: item.id,
					amount: item.amount,
					number_payments: item.number_payments,
					travel_id: item.travel_id,
					travel: item.travel,
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
				}))
			);
		} catch (error) {
			toast.error('Error al cargar cuotas');
		} finally {
			setLoading(false);
		}
	};

	const loadTravels = async () => {
		try {
			const data = await getTravels();
			setTravels(data);
		} catch (error) {
			toast.error('Error al cargar viajes');
		}
	};

	const handleEdit = (quota: Quota) => {
		setQuotaToEdit(quota);
		setShowForm(true);
	};

	const handleSearch = (q: string) => {
		setFilter(q);
	};

	const handleDelete = async (quota: Quota) => {
		if (!confirm('¿Eliminar esta cuota?')) return;
		setLoading(true);
		try {
			await deleteQuotaById(quota.id!);
			toast.success('Cuota eliminada exitosamente');
			await loadQuotas();
		} catch (error) {
			toast.error('Error al eliminar cuota');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadQuotas();
		loadTravels();
	}, []);

	return {
		handleSubmit,
		handleAdd,
		handleEdit,
		quotas: visibleQuotas,
		setShowForm,
		handleSearch,
		handleDelete,
		quotaToEdit,
		showForm,
		loading,
		travels,
	};
}

export default useQuota;
