import { TravelCustomer, PaymentQuota } from '../types/travel.type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MapPin, Calendar, CreditCard } from 'lucide-react';
import { QuotaItem } from './QuotaItem';

interface TravelDetailProps {
	travel: TravelCustomer;
	onBack: () => void;
	onPayQuota: (quota: PaymentQuota) => void;
	isPaymentLoading: boolean;
	payingQuotaId: number | null;
}

export const TravelDetail = ({
	travel,
	onBack,
	onPayQuota,
	isPaymentLoading,
	payingQuotaId,
}: TravelDetailProps) => {
	const quotas = travel.quotas || [];
	const paidQuotas = quotas.filter((q) => q.status === 'paid').length;
	const totalQuotas = quotas.length;
	const progressPercent = totalQuotas > 0 ? (paidQuotas / totalQuotas) * 100 : 0;

	const totalPaid = quotas
		.filter((q) => q.status === 'paid')
		.reduce((sum, q) => sum + q.amount, 0);

	const totalPending = quotas
		.filter((q) => q.status === 'pending')
		.reduce((sum, q) => sum + q.amount, 0);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
		}).format(amount);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" onClick={onBack}>
					<ArrowLeft className="h-5 w-5" />
				</Button>
				<div>
					<h2 className="text-xl font-bold text-gray-900">
						{travel.travel?.name || 'Detalle del Viaje'}
					</h2>
					<p className="text-gray-500 text-sm">Gestiona las cuotas de tu viaje</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span className="flex items-center gap-2">
							<MapPin className="h-5 w-5 text-blue-500" />
							Información del Viaje
						</span>
						<Badge variant={travel.status === 'paid' ? 'default' : 'secondary'}>
							{travel.status === 'paid' ? 'Pagado' : 'En Proceso'}
						</Badge>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="flex items-center gap-3">
							<Calendar className="h-5 w-5 text-gray-400" />
							<div>
								<p className="text-sm text-gray-500">Fechas</p>
								<p className="font-medium">
									{travel.travel?.start_date
										? new Date(travel.travel.start_date).toLocaleDateString(
												'es-CO'
											)
										: 'N/A'}{' '}
									-{' '}
									{travel.travel?.end_date
										? new Date(travel.travel.end_date).toLocaleDateString(
												'es-CO'
											)
										: 'N/A'}
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<CreditCard className="h-5 w-5 text-gray-400" />
							<div>
								<p className="text-sm text-gray-500">Precio Total</p>
								<p className="font-medium">
									{formatCurrency(travel.travel?.price || 0)}
								</p>
							</div>
						</div>
						<div>
							<p className="text-sm text-gray-500">Descripción</p>
							<p className="font-medium text-sm">
								{travel.travel?.description || 'Sin descripción'}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Progreso de Pagos</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">
								{paidQuotas} de {totalQuotas} cuotas pagadas
							</span>
							<span className="font-medium">{Math.round(progressPercent)}%</span>
						</div>
						<Progress value={progressPercent} className="h-3" />
						<div className="grid grid-cols-2 gap-4 mt-4">
							<div className="bg-green-50 p-3 rounded-lg">
								<p className="text-sm text-green-600">Pagado</p>
								<p className="text-lg font-bold text-green-700">
									{formatCurrency(totalPaid)}
								</p>
							</div>
							<div className="bg-orange-50 p-3 rounded-lg">
								<p className="text-sm text-orange-600">Pendiente</p>
								<p className="text-lg font-bold text-orange-700">
									{formatCurrency(totalPending)}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<div>
				<h3 className="text-lg font-semibold mb-4">Cuotas ({totalQuotas})</h3>
				{quotas.length === 0 ? (
					<Card>
						<CardContent className="p-6 text-center text-gray-500">
							No hay cuotas registradas para este viaje.
						</CardContent>
					</Card>
				) : (
					<div className="space-y-3">
						{quotas.map((quota) => (
							<QuotaItem
								key={quota.id}
								quota={quota}
								onPayClick={onPayQuota}
								isPaymentLoading={isPaymentLoading}
								isPayingThisQuota={payingQuotaId === quota.id}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default TravelDetail;
