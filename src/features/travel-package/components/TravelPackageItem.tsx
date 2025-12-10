import React, { useState, useCallback } from 'react';
import { TravelPackage } from '../types/travel-package.type';
import { useParams } from 'react-router-dom';
import { useTravelPackagePayment } from '../hooks/useTravelPackagePayment';
import { TravelPackageHeader } from './TravelPackageHeader';
import { TravelPackageContent } from './TravelPackageContent';
import { FinancingModal, QuotasSelectionModal } from './modals';
import { toast } from 'sonner';
import { createCustomerTravel } from '../services/travelPackageService';
import { useProfile } from '@/features/profile/contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';
interface TravelPackageItemProps {
	package: TravelPackage;
	createCustomer?: (payload: {
		name: string;
		email: string;
		password: string;
		travel_id: number;
	}) => void;
}

export function TravelPackageItem({
	package: travelPackage,
	createCustomer,
}: TravelPackageItemProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const { customerId } = useParams<{ customerId: string }>();
	const { profile } = useProfile();
const navigate = useNavigate();

	const {
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
	} = useTravelPackagePayment({ travelPackage });


	const handleToggleExpand = useCallback(() => {
		setIsExpanded((prev) => !prev);
	}, []);

	const handlePayClick = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			openFinancingModal();
		},
		[openFinancingModal]
	);

	const handleSaveClick = useCallback(async (e: React.MouseEvent) => {
		e.stopPropagation();
		const response = await createCustomerTravel(profile.user._id, travelPackage.id);
		if(!response){
			toast.error("Error al guardar el viaje");
			return;
		}	
		navigate(`/travel-packages/${profile.user._id}`);
		toast.success("Viaje guardado exitosamente");
		
	}, []);

	
	const handleCreateCustomer = useCallback(
		(payload: { name: string; email: string; password: string }) => {
			createCustomer?.({ ...payload, travel_id: travelPackage.id });
		},
		[createCustomer, travelPackage.id]
	);

	const handleBackToFinancing = useCallback(() => {
		closeQuotasModal();
		openFinancingModal();
	}, [closeQuotasModal, openFinancingModal]);

	const showPayButton = Boolean(customerId);

	return (
		<>
			<div className="border rounded-lg overflow-hidden shadow-sm bg-white">
				<TravelPackageHeader
					travelPackage={travelPackage}
					isExpanded={isExpanded}
					onToggle={handleToggleExpand}
					showPayButton={showPayButton}
					onPayClick={handlePayClick}
					onSaveClick={handleSaveClick}
					isLoading={isLoading}
				/>
				<TravelPackageContent
					travelPackage={travelPackage}
					isExpanded={isExpanded}
					onCreateCustomer={handleCreateCustomer}
				/>
			</div>

			<FinancingModal
				isOpen={isFinancingModalOpen}
				onClose={closeFinancingModal}
				onFinance={openQuotasModal}
				onPayNow={handlePayNow}
				totalAmount={quotas[0]?.amount}
				isLoading={isLoading}
			/>

			<QuotasSelectionModal
				isOpen={isQuotasModalOpen}
				onClose={closeQuotasModal}
				onBack={handleBackToFinancing}
				onConfirm={handleConfirmFinancing}
				numCuotas={numCuotas}
				setNumCuotas={setNumCuotas}
				quotas={quotas}
				isLoading={isLoading}
			/>
		</>
	);
}
