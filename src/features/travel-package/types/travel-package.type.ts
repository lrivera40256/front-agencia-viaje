export interface TravelPackage {
    id: number;
    name: string;
    description: string | null;
    start_date: string;
    end_date: string;
    price: string | null;
    plans?: Plan[];
    itineraries?: Itinerary[];
    customers?: User[];
}

export interface Plan {
    id: number;
    name: string;
    description: string;
    price: string;
    duration_days: number;
    activities?: Activity[];
}

export interface Activity {
    id: number;
    name: string;
    description: string;
    city: string;
}

export interface Itinerary {
    order: number;
    origin: string;
    destination: string;
    vehicle: Vehicle;
    rooms?: Room[];
}

export interface Vehicle {
    brand: string;
    type: string;
    model: number;
}
export interface User{
    name: string;
    email: string;
    user_id: string;
}

export interface Room {
    number: string;
    price_per_night: string;
}