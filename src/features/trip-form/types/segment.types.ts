import { Hotel } from "@/features/accommodation/types/hotel.type";
import { City, Departament } from "./locationTrip.types";
import { Vehicle } from "./vehicle.types";
import { Room } from "@/features/accommodation/types/room.type";

export interface Segment {
  order: number;
  dateFrom: Date;
  dateTo: Date;
  departamentFrom: Departament;
  departamentTo: Departament;
  cityFrom: City;
  cityTo: City;
  vehicle?: Vehicle;
  hotel: Hotel;
  rooms: Room[];
}
