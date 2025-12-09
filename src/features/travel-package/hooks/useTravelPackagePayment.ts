import { useState, useCallback } from 'react';
import { TravelPackage, Quota } from '../types/travel-package.type';
import { useQuota } from './useQuota';
import { createQuota, createMultipleQuotas } from '../services/quotaService';
import usePayQuota from '../components/payQuota';
import { toast } from 'sonner';

interface UseTravelPackagePaymentProps {
	travelPackage: TravelPackage;
}

interface UseTravelPackagePaymentReturn {
	// Modal states
	isFinancingModalOpen: boolean;
	isQuotasModalOpen: boolean;
	// Modal handlers
	openFinancingModal: () => void;
	closeFinancingModal: () => void;
	openQuotasModal: () => void;
	closeQuotasModal: () => void;
	// Quota data
	numCuotas: number;
	setNumCuotas: (num: number) => void;
	quotas: Quota[];
	// Payment handlers
	handlePayNow: () => Promise<void>;
	handleConfirmFinancing: () => Promise<void>;
	// Loading state
	isLoading: boolean;
}

export function useTravelPackagePayment({
	travelPackage,
}: UseTravelPackagePaymentProps): UseTravelPackagePaymentReturn {
	const [isFinancingModalOpen, setIsFinancingModalOpen] = useState(false);
	const [isQuotasModalOpen, setIsQuotasModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { numCuotas, setNumCuotas, quotas, calculateQuotas } = useQuota();
	const { handlePayQuota } = usePayQuota();

	const openFinancingModal = useCallback(async () => {
		setIsLoading(true);
		try {
			await calculateQuotas(
				Number(travelPackage.price),
				Number(travelPackage.travel_customer_id)
			);
			setIsFinancingModalOpen(true);
		} catch (error) {
			toast.error('Error al calcular las cuotas');
			console.error('Error calculating quotas:', error);
		} finally {
			setIsLoading(false);
		}
	}, [travelPackage.price, travelPackage.travel_customer_id, calculateQuotas]);

	const closeFinancingModal = useCallback(() => {
		setIsFinancingModalOpen(false);
	}, []);

	const openQuotasModal = useCallback(() => {
		setIsFinancingModalOpen(false);
		setIsQuotasModalOpen(true);
	}, []);

	const closeQuotasModal = useCallback(() => {
		setIsQuotasModalOpen(false);
	}, []);

	const handlePayNow = useCallback(async () => {
		if (!quotas[0]) {
			toast.error('No hay información de cuotas disponible');
			return;
		}

		setIsLoading(true);
		try {
			const paymentData = await createQuota(quotas[0], true);
			console.log('Payment data received from backend:', paymentData);

			if (!paymentData || !paymentData.publicKey) {
				throw new Error(
					'La respuesta del servidor no contiene los datos de pago necesarios'
				);
			}

			await handlePayQuota(paymentData);
			closeFinancingModal();
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message || error?.message || 'Error al procesar el pago';
			toast.error(errorMessage);
			console.error('Error processing payment:', error);
		} finally {
			setIsLoading(false);
		}
	}, [quotas, handlePayQuota, closeFinancingModal]);

	const handleConfirmFinancing = useCallback(async () => {
		if (!quotas[numCuotas - 1]) {
			toast.error('No hay información de cuotas disponible');
			return;
		}

		setIsLoading(true);
		try {
			await createMultipleQuotas({
				data: quotas[numCuotas - 1],
				numQuotas: numCuotas,
			});
			toast.success('Financiación confirmada exitosamente');
			closeQuotasModal();
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message || 'Error al confirmar la financiación';
			toast.error(errorMessage);
			console.error('Error confirming financing:', error);
		} finally {
			setIsLoading(false);
		}
	}, [quotas, numCuotas, closeQuotasModal]);

	return {
		isFinancingModalOpen,
		isQuotasModalOpen,
		openFinancingModal,
		closeFinancingModal,
		openQuotasModal,
		closeQuotasModal,
		numCuotas,
		setNumCuotas,
		quotas,
		handlePayNow,
		handleConfirmFinancing,
		isLoading,
	};
}
