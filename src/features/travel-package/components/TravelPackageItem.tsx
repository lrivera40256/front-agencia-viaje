import React, { useState } from 'react';
import { TravelPackage, Journey } from '../types/travel-package.type';
import {
	ChevronDown,
	MapPin,
	Calendar,
	Clock,
	Sun,
	Moon,
	Plane,
	Bus,
	Train,
	Car,
} from 'lucide-react';

interface TravelPackageItemProps {
	package: TravelPackage;
}

export function TravelPackageItem({ package: pkg }: TravelPackageItemProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border rounded-lg overflow-hidden shadow-sm">
			<div
				className="p-4 bg-white cursor-pointer flex justify-between items-center"
				onClick={() => setIsOpen(!isOpen)}
			>
				<div>
					<h3 className="font-bold text-lg">{pkg.name}</h3>
					<p className="text-sm text-gray-600">{pkg.description}</p>
					<p className="text-sm font-semibold text-blue-600 mt-1">
						${pkg.price.toLocaleString()}
					</p>
				</div>
				<ChevronDown
					className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</div>
			{isOpen && (
				<div className="p-4 bg-gray-50 border-t">
					{pkg.journeys.map((journey) => (
						<JourneyDetails key={journey.id} journey={journey} />
					))}
				</div>
			)}
		</div>
	);
}

function JourneyDetails({ journey }: { journey: Journey }) {
	return (
		<div className="mb-4 p-3 border rounded-md bg-white">
			<h4 className="font-semibold text-md mb-2 flex items-center">
				<MapPin className="w-4 h-4 mr-2" /> {journey.name}
			</h4>
			<div className="text-xs text-gray-500 flex items-center mb-2">
				<Calendar className="w-3 h-3 mr-1" />
				<span>
					{journey.start_date} to {journey.end_date}
				</span>
			</div>
			{journey.itineraries.map((itinerary) => (
				<div key={itinerary.id} className="ml-4 pl-3 border-l-2 my-2">
					<p className="font-bold text-sm">Day {itinerary.day}</p>
					<div className="text-sm flex items-center my-1">
						<Sun className="w-4 h-4 mr-2 text-yellow-500" /> {itinerary.activity.name} (
						{itinerary.activity.start_time} - {itinerary.activity.end_time})
					</div>
					{itinerary.accommodation && (
						<div className="text-sm flex items-center my-1">
							<Moon className="w-4 h-4 mr-2 text-blue-500" />{' '}
							{itinerary.accommodation.name}
						</div>
					)}
					{itinerary.transport && (
						<div className="text-sm flex items-center my-1">
							{getTransportIcon(itinerary.transport.type)}
							{itinerary.transport.details}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

function getTransportIcon(type: 'flight' | 'bus' | 'train' | 'car') {
	const className = 'w-4 h-4 mr-2 text-gray-600';
	switch (type) {
		case 'flight':
			return <Plane className={className} />;
		case 'bus':
			return <Bus className={className} />;
		case 'train':
			return <Train className={className} />;
		case 'car':
			return <Car className={className} />;
	}
}
