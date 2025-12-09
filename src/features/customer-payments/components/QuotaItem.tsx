import { PaymentQuota } from '../types/travel.type';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, CheckCircle, Loader2 } from 'lucide-react';

interface QuotaItemProps {
	quota: PaymentQuota;
	onPayClick: (quota: PaymentQuota) => void;
	isPaymentLoading: boolean;
	isPayingThisQuota: boolean;
}

export const QuotaItem = ({
	quota,
	onPayClick,
	isPaymentLoading,
	isPayingThisQuota,
}: QuotaItemProps) => {
	const isPaid = quota.status === 'paid';

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('es-CO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<Card
			className={`transition-all ${
				isPaid ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
			}`}
		>
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div
							className={`w-10 h-10 rounded-full flex items-center justify-center ${
								isPaid ? 'bg-green-100' : 'bg-blue-100'
							}`}
						>
							<span
								className={`font-bold ${isPaid ? 'text-green-600' : 'text-blue-600'}`}
							>
								{quota.number_quota}
							</span>
						</div>

						<div>
							<div className="flex items-center gap-2 mb-1">
								<span className="font-semibold text-gray-900">
									Cuota #{quota.number_quota}
								</span>
								<Badge
									variant={isPaid ? 'default' : 'secondary'}
									className={isPaid ? 'bg-green-500' : ''}
								>
									{isPaid ? 'Pagada' : 'Pendiente'}
								</Badge>
							</div>

							<div className="flex items-center gap-4 text-sm text-gray-500">
								<span className="flex items-center gap-1">
									<CreditCard className="h-4 w-4" />
									{formatCurrency(quota.amount)}
								</span>
								<span className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									Vence: {formatDate(quota.due_date)}
								</span>
							</div>
						</div>
					</div>

					<div>
						{isPaid ? (
							<Button
								disabled
								variant="outline"
								className="gap-2 text-green-600 border-green-300"
							>
								<CheckCircle className="h-4 w-4" />
								Pagada
							</Button>
						) : (
							<Button
								onClick={() => onPayClick(quota)}
								disabled={isPaymentLoading}
								className="gap-2"
							>
								{isPayingThisQuota ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin" />
										Procesando...
									</>
								) : (
									<>
										<CreditCard className="h-4 w-4" />
										Pagar
									</>
								)}
							</Button>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default QuotaItem;
