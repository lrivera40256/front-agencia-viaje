import { Car, Plane } from "lucide-react";
import type { Car as CarType, Plane as PlaneType } from "../types/vehicle.type";

interface Props {
  vehicle: CarType | PlaneType;
  onSelect: (v: CarType | PlaneType) => void;
}

export function Vehicle({ vehicle, onSelect }: Props) {
  const isPlane = vehicle.type === "aeronave";

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="
        cursor-pointer bg-white rounded-2xl p-5 
        shadow-sm hover:shadow-md 
        border border-gray-200 hover:border-purple-400 
        transition-all
      "
    >
      {/* Icono */}
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-gray-100 rounded-full shadow-inner">
          {isPlane ? (
            <Plane className="w-7 h-7 text-purple-600" />
          ) : (
            <Car className="w-7 h-7 text-purple-600" />
          )}
        </div>
      </div>

      {/* Título */}
      <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
        {vehicle.brand} {vehicle.model}
      </h3>

      {/* Datos generales */}
      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-medium text-gray-700">Tipo:</span> {vehicle.type === "carro" ? "Carro" : "Aeronave"}</p>
        <p><span className="font-medium text-gray-700">Color:</span> {vehicle.color}</p>
        <p><span className="font-medium text-gray-700">Capacidad:</span> {vehicle.capacity} pasajeros</p>
      </div>

      {/* Si es avión, mostrar aerolínea */}
      {isPlane && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">Aerolínea:</p>
          <p className="text-gray-800 font-medium">
            {(vehicle as PlaneType).airline?.name}
          </p>
        </div>
      )}
    </div>
  );
}
