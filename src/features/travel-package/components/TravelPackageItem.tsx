import React, { useState } from 'react';
import { TravelPackage, Plan } from '../types/travel-package.type';
import {
	ChevronDown,

	DollarSign,
	Activity,
	Hotel,
	Calendar,
} from 'lucide-react';
import { ItineraryDetails } from './ItineraryDetails';
import { PlanDetails } from './PlanDetails';

interface TravelPackageItemProps {
	package: TravelPackage;
}

export function TravelPackageItem({ package: pkg }: TravelPackageItemProps) {
	const [isOpen, setIsOpen] = useState(false);

	const formatDate = (dateString: string) => {
		if (!dateString) return 'N/A';
		return new Date(dateString).toLocaleDateString('es-ES', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<div className="border rounded-lg overflow-hidden shadow-sm bg-white">
			<div
				className="p-4 cursor-pointer flex justify-between items-center"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div>
					<h3 className="font-bold text-lg text-gray-800">{pkg.name}</h3>
					<p className="text-sm text-gray-600">{pkg.description || 'Sin descripción.'}</p>
					<div className="flex items-center text-gray-500 text-sm mt-2">
						<Calendar className="h-4 w-4 mr-2" />
						<span>
							{formatDate(pkg.start_date)} - {formatDate(pkg.end_date)}
						</span>
					</div>
					<div className="flex items-center text-gray-800 mt-2">
						<DollarSign className="h-5 w-5 mr-2 text-green-600" />
						<span className="text-lg font-semibold">
							{pkg.price != null
								? `$${Number(pkg.price).toLocaleString()}`
								: 'Precio no disponible'}
						</span>
					</div>
				</div>
				<ChevronDown
					className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
				/>
			</div>
			{isOpen && (
				<div className="p-4 bg-gray-50 border-t space-y-4">
					{pkg.itineraries?.map((itinerary, index) => (
						<ItineraryDetails key={index} itinerary={itinerary} />
					))}
					{pkg.plans?.map((plan) => (
						<PlanDetails key={plan.id} plan={plan} />
					))}
				</div>
			)}
		</div>
	);
}




