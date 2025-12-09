import { TravelCustomer } from '../types/travel.type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign } from 'lucide-react';

interface TravelItemProps {
	travel: TravelCustomer;
	onClick?: () => void;
}

export function TravelItem({ travel, onClick }: TravelItemProps) {
	if (!travel || !travel.travel) {
		return null;
	}

	const formatDate = (dateString: string | undefined | null) => {
		if (!dateString) return 'N/A';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('es-CO', {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			});
		} catch {
			return dateString;
		}
	};

	const formatPrice = (price: number | undefined | null) => {
		if (price === undefined || price === null) return '$0';
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
		}).format(price);
	};

	const getStatusBadge = (status: string | undefined) => {
		switch (status) {
			case 'inPayment':
				return (
					<Badge
						variant="outline"
						className="bg-yellow-100 text-yellow-800 border-yellow-300"
					>
						En proceso de pago
					</Badge>
				);
			case 'paid':
				return (
					<Badge
						variant="outline"
						className="bg-green-100 text-green-800 border-green-300"
					>
						Pagado
					</Badge>
				);
			default:
				return (
					<Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
						{status || 'Desconocido'}
					</Badge>
				);
		}
	};

	const { travel: travelData } = travel;

	return (
		<Card
			className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
			onClick={onClick}
		>
			<CardHeader className="pb-2">
				<div className="flex justify-between items-start">
					<CardTitle className="text-lg font-semibold">
						{travelData?.name || `Viaje #${travelData?.id || travel.id}`}
					</CardTitle>
					{getStatusBadge(travel.status)}
				</div>
			</CardHeader>
			<CardContent className="space-y-3">
				{/* Descripción */}
				{travelData?.description && (
					<p className="text-sm text-gray-600">{travelData.description}</p>
				)}

				{/* Fechas */}
				<div className="flex items-center gap-2 text-sm text-gray-600">
					<Calendar className="h-4 w-4" />
					<span>
						{formatDate(travelData?.start_date)} - {formatDate(travelData?.end_date)}
					</span>
				</div>

				{/* Precio */}
				<div className="flex items-center gap-2 text-sm font-medium">
					<DollarSign className="h-4 w-4 text-green-600" />
					<span className="text-green-600">{formatPrice(travelData?.price)}</span>
				</div>

				{/* Info adicional */}
				<div className="flex justify-between items-center pt-2 border-t">
					<span className="text-xs text-gray-500">ID: {travel.id}</span>
					<span className="text-xs text-gray-500">
						Reservado: {formatDate(travel.created_at)}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
