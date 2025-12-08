import { Itinerary } from '../../types/travel-package.type';
import { Bed, MapPin } from 'lucide-react';
import { getTransportIcon } from '../../utils/getTransportIcon';

export function ItineraryDetails({ itinerary }: { itinerary: Itinerary }) {
	return (
		<div className="p-3 border rounded-md bg-white shadow-sm">
			<h4 className="font-semibold text-md mb-2 flex items-center text-gray-700">
				<MapPin className="w-4 h-4 mr-2 text-blue-500" /> Trayecto: {itinerary.origin} → {' '}
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
