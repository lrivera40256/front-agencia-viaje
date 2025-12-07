import React, { useState } from 'react';
import { TravelPackage, Itinerary, Plan } from '../types/travel-package.type';
import {
	ChevronDown,
	MapPin,
	Bed,
	Plane,
	Bus,
	Train,
	Car,
	DollarSign,
	Activity,
	Hotel,
	Calendar,
} from 'lucide-react';

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

function ItineraryDetails({ itinerary }: { itinerary: Itinerary }) {
	return (
		<div className="p-3 border rounded-md bg-white shadow-sm">
			<h4 className="font-semibold text-md mb-2 flex items-center text-gray-700">
				<MapPin className="w-4 h-4 mr-2 text-blue-500" /> Trayecto: {itinerary.origin} →{' '}
				{itinerary.destination}
			</h4>
			{itinerary.vehicle && (
				<div className="text-sm flex items-center my-1 text-gray-600">
					{getTransportIcon(itinerary.vehicle.type)}
					<span>
						{itinerary.vehicle.brand} {itinerary.vehicle.model} (
						{itinerary.vehicle.type})
					</span>
				</div>
			)}
			{itinerary.rooms?.map((room, index) => (
				<div key={index} className="text-sm flex items-center my-1 pl-6 text-gray-600">
					<Bed className="w-4 h-4 mr-2 text-purple-500" />
					<span>
						Habitación {room.number} - ${Number(room.price_per_night).toLocaleString()}
						/noche
					</span>
				</div>
			))}
		</div>
	);
}

function PlanDetails({ plan }: { plan: Plan }) {
	return (
		<div className="p-3 border rounded-md bg-white shadow-sm">
			<h4 className="font-semibold text-md mb-2 flex items-center text-gray-700">
				<Hotel className="w-4 h-4 mr-2 text-orange-500" /> Plan: {plan.name}
			</h4>
			<p className="text-sm text-gray-600 mb-2">{plan.description}</p>
			{plan.activities?.map((activity) => (
				<div
					key={activity.id}
					className="text-sm flex items-center my-1 pl-6 text-gray-600"
				>
					<Activity className="w-4 h-4 mr-2 text-teal-500" />
					<span>
						{activity.name} en {activity.city}
					</span>
				</div>
			))}
		</div>
	);
}

function getTransportIcon(type: string) {
	const className = 'w-4 h-4 mr-2 text-gray-600';
	const lowerType = type.toLowerCase();
	if (lowerType.includes('avión'))
		return <Plane className={className} />;
	if (lowerType.includes('carro'))
		return <Car className={className} />;
}
