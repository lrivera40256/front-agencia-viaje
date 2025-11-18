import { Journey } from "@/features/journeys";
import { Travel } from "@/features/travels";
import { ServiceTransportation } from "@/features/transportation/types/ServiceTransportation";

export interface TransportItinerary {
	id?: number;
	sequence: number;
	travel_id: number;
	journey_id: number;
	service_transportation_id: number;
	travel?: Travel;
	journey?: Journey;
	serviceTransportation?: ServiceTransportation;
	createdAt?: string;
	updatedAt?: string;
}

export default TransportItinerary;
