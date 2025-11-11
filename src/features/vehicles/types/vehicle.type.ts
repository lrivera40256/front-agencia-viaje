import { Airline } from "./airline.type";

export interface Vehicle {
    id:number,
    type: "carro" | "aeronave" ;
    capacity: number;
    color: string;
    model: number;
    brand: string;
}
export interface Plane extends Vehicle {
    id:number;
    airline:Airline;
}
export interface Car extends Vehicle {  
    id:number;
    license_plate: string;
}
export type VehicleType = Plane | Car;
    