import { Vehicle } from "@/features/vehicles/types/vehicle.type";
import { Journey } from "@/features/journeys/types/Journey";

// Frontend type mirroring the Adonis Lucid model `ServiceTransportation`.
// Dates are represented as ISO strings to play nicely with inputs and APIs.
export interface ServiceTransportation {
  id?: number;
  start_date: string; // ISO: YYYY-MM-DD or full ISO date-time
  end_date: string;   // ISO
  cost: number;
  transportation_id: number;
  journey_id: number;

  // Optional relations (populate when needed)
  vehicle?: Vehicle;
  journey?: Journey;
  transportItineraries?: any[]; // TODO: replace with a concrete TransportItinerary type

  createdAt?: string;
  updatedAt?: string;
}

export default ServiceTransportation;
