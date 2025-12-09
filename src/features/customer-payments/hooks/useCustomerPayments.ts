import { useEffect, useState, useCallback } from 'react';
import { TravelCustomer, PaymentQuota } from '../types/travel.type';
import { CustomerPaymentsService } from '../services/CustomerPaymentsService';
import { useProfile } from '@/features/auth';
import { toast } from 'sonner';
import usePayQuota from '@/features/travel-package/components/payQuota';

export function useCustomerPayments() {
	const [travels, setTravels] = useState<TravelCustomer[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Estado para el viaje seleccionado
	const [selectedTravel, setSelectedTravel] = useState<TravelCustomer | null>(null);
	const [isPaymentLoading, setIsPaymentLoading] = useState(false);
	const [payingQuotaId, setPayingQuotaId] = useState<number | null>(null);

	const { profile } = useProfile();
	const { handlePayQuota } = usePayQuota();

	const fetchCustomerPayments = useCallback(async (userId: string) => {
		if (!userId) {
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const payments = await CustomerPaymentsService.getCustomerPayments(userId);
			setTravels(payments);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Error al cargar los viajes';
			setError(errorMessage);
			toast.error(errorMessage);
			setTravels([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (profile?.user?._id) {
			fetchCustomerPayments(profile.user._id);
		} else {
			setIsLoading(false);
		}
	}, [profile, fetchCustomerPayments]);

	const selectTravel = useCallback((travel: TravelCustomer) => {
		setSelectedTravel(travel);
	}, []);

	const clearSelectedTravel = useCallback(() => {
		setSelectedTravel(null);
	}, []);

	const handlePayQuotaClick = useCallback(
		async (quota: PaymentQuota) => {
			if (quota.status === 'paid') {
				toast.info('Esta cuota ya fue pagada');
				return;
			}

			setIsPaymentLoading(true);
			setPayingQuotaId(quota.id);

			try {
				const paymentData = await CustomerPaymentsService.payQuota(quota.id);

				if (!paymentData?.publicKey) {
					throw new Error(
						'La respuesta del servidor no contiene los datos de pago necesarios'
					);
				}

				await handlePayQuota(paymentData);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Error al procesar el pago';
				toast.error(errorMessage);
			} finally {
				setIsPaymentLoading(false);
				setPayingQuotaId(null);
			}
		},
		[handlePayQuota]
	);

	const refreshTravels = useCallback(async () => {
		if (profile?.user?._id) {
			await fetchCustomerPayments(profile.user._id);

			// Si hay un viaje seleccionado, actualizarlo con los nuevos datos
			if (selectedTravel) {
				const updatedTravel = travels.find((t) => t.id === selectedTravel.id);
				if (updatedTravel) {
					setSelectedTravel(updatedTravel);
				}
			}
		}
	}, [profile, fetchCustomerPayments, selectedTravel, travels]);

	const quotas = selectedTravel?.quotas || [];

	return {
		travels,
		isLoading,
		error,
		refreshTravels,
		selectedTravel,
		quotas,
		isLoadingQuotas: false,
		quotasError: null,
		selectTravel,
		clearSelectedTravel,
		handlePayQuotaClick,
		isPaymentLoading,
		payingQuotaId,
	};
}