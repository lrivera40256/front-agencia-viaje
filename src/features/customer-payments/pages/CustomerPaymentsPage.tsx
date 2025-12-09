import { useCustomerPayments } from '../hooks/useCustomerPayments';
import { TravelList } from '../components/TravelList';
import { TravelDetail } from '../components/TravelDetail';
import { TravelCustomer } from '../types/travel.type';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CustomerPaymentsPage = () => {
	const {
		travels,
		isLoading,
		error,
		refreshTravels,
		selectedTravel,
		selectTravel,
		clearSelectedTravel,
		handlePayQuotaClick,
		isPaymentLoading,
		payingQuotaId,
	} = useCustomerPayments();

	const handleTravelClick = (travel: TravelCustomer) => {
		selectTravel(travel);
	};

	if (selectedTravel) {
		return (
			<div className="container mx-auto px-4 py-6">
				<TravelDetail
					travel={selectedTravel}
					onBack={clearSelectedTravel}
					onPayQuota={handlePayQuotaClick}
					isPaymentLoading={isPaymentLoading}
					payingQuotaId={payingQuotaId}
				/>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Mis Pagos</h1>
					{!isLoading && !error && travels.length > 0 && (
						<p className="text-gray-600">
							{travels.length} viaje{travels.length !== 1 ? 's' : ''} en proceso
						</p>
					)}
				</div>
				<Button
					onClick={refreshTravels}
					variant="outline"
					size="sm"
					className="gap-2"
					disabled={isLoading}
				>
					<RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
					Actualizar
				</Button>
			</div>

			<TravelList
				travels={travels}
				isLoading={isLoading}
				error={error}
				onRefresh={refreshTravels}
				onTravelClick={handleTravelClick}
			/>
		</div>
	);
};

export default CustomerPaymentsPage;
