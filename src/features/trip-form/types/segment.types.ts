import { Vehicle } from "./vehicle.types";

export interface Segment {
  order: number;
  dateFrom: Date;
  dateTo: Date;
  departamentFrom: number;
  departamentTo: number;
  cityFrom: number;
  cityTo: number;
  vehicle?: Vehicle;
  hotel: number;
  rooms: number[];
}
