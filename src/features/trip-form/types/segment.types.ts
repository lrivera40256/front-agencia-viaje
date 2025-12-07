import { Hotel } from "@/features/accommodation/types/hotel.type";
import { City, Departament } from "./locationTrip.types";
import { Room } from "@/features/accommodation/types/room.type";
import { VehicleType } from "@/features/vehicles/types/vehicle.type";
import Plan from "@/features/plans/types/Plan";

export interface Segment {
  order: number;
  dateFrom: Date;
  dateTo: Date;
  departamentFrom: Departament;
  departamentTo: Departament;
  cityFrom: City;
  cityTo: City;
  vehicle?: VehicleType;
  hotel: Hotel;
  rooms: Room[];
  plans?: Plan[];
}
