import React from 'react';
import { ChevronDown, DollarSign, Calendar } from 'lucide-react';
import { TravelPackage } from '../types/travel-package.type';

interface TravelPackageHeaderProps {
	travelPackage: TravelPackage;
	isExpanded: boolean;
	onToggle: () => void;
	showPayButton: boolean;
	onPayClick: (e: React.MouseEvent) => void;
	onSaveClick: (e: React.MouseEvent) => void;
	isLoading?: boolean;
}

export function TravelPackageHeader({
	travelPackage,
	isExpanded,
	onToggle,
	showPayButton,
	onPayClick,
	onSaveClick,
	isLoading = false,
}: TravelPackageHeaderProps) {
	const formatDate = (dateString: string) => {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const formatPrice = (price: number | null | undefined) => {
		if (price == null) return 'Precio no disponible';
		return `$${Number(price).toLocaleString()}`;
	};

	return (
		<div className="p-4 cursor-pointer flex justify-between items-start" onClick={onToggle}>
			<div className="flex-grow mr-4">
				<h3 className="font-bold text-lg text-gray-800">{travelPackage.name}</h3>
				<p className="text-sm text-gray-600">
					{travelPackage.description || 'Sin descripción.'}
				</p>
				<div className="flex items-center text-gray-500 text-sm mt-2">
					<Calendar className="h-4 w-4 mr-2" />
					<span>
						{formatDate(travelPackage.start_date)} -{' '}
						{formatDate(travelPackage.end_date)}
					</span>
				</div>
				<div className="flex items-center text-gray-800 mt-2">
					<DollarSign className="h-5 w-5 mr-2 text-green-600" />
					<span className="text-lg font-semibold">
						{formatPrice(Number(travelPackage.price))}
					</span>
				</div>
			</div>
			<div className="flex flex-col items-end flex-shrink-0">
				{showPayButton ? (
					<button
						onClick={onPayClick}
						disabled={isLoading}
						className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Cargando...' : 'Pagar'}
					</button>
				) : (
					<button
						onClick={onSaveClick}
						disabled={isLoading}
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Guardar Viaje
					</button>
				)}
				<ChevronDown
					className={`transform transition-transform duration-200 ${
						isExpanded ? 'rotate-180' : ''
					}`}
				/>
			</div>
		</div>
	);
}
