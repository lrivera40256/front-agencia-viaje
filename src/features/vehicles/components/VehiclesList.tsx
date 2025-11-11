import { useVehicle } from "../hooks/useVehicle";
import { VehicleType } from "../types/vehicle.type";
import { Vehicle } from "./Vehicle";
interface VehiclesListProps {
    onSelect: (v: VehicleType) => void;
    vehicles: VehicleType[];
}

export function VehicleList({vehicles, onSelect}: VehiclesListProps) {
    if (!vehicles || vehicles.length === 0) {
        return (
            <p className="text-center text-gray-500 py-8">
                No hay vehículos disponibles.
            </p>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {vehicles.map((v) => (
                <Vehicle key={v.id} vehicle={v} onSelect={onSelect} />
            ))}
        </div>
    );
}
