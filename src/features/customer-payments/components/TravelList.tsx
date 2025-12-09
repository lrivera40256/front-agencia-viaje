import { TravelCustomer } from '../types/travel.type';
import { TravelItem } from './TravelItem';
import { Loader2, Plane, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TravelListProps {
	travels: TravelCustomer[];
	isLoading: boolean;
	error: string | null;
	onRefresh: () => void;
	onTravelClick?: (travel: TravelCustomer) => void;
}

export function TravelList({
	travels,
	isLoading,
	error,
	onRefresh,
	onTravelClick,
}: TravelListProps) {
	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
				<Loader2 className="h-8 w-8 animate-spin text-blue-500" />
				<p className="text-gray-600">Cargando tus viajes...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
				<AlertCircle className="h-12 w-12 text-red-500" />
				<p className="text-red-600 font-medium">{error}</p>
				<Button onClick={onRefresh} variant="outline" className="gap-2">
					<RefreshCw className="h-4 w-4" />
					Reintentar
				</Button>
			</div>
		);
	}

	if (travels.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
				<Plane className="h-12 w-12 text-gray-400" />
				<p className="text-gray-600">No tienes viajes en proceso de pago</p>
				<p className="text-sm text-gray-500">
					Cuando reserves un viaje con financiación, aparecerá aquí.
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{travels.map((travel) => (
				<TravelItem
					key={travel.id}
					travel={travel}
					onClick={() => onTravelClick?.(travel)}
				/>
			))}
		</div>
	);
}
