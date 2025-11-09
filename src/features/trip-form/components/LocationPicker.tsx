import { Select } from "@/components/Select";
import { MapPin } from "lucide-react";
import { City, Departament } from "../types/locationTrip.types";

interface DestinationationPickerProps {
    title: string;
    departaments: Departament[];
    departament: number | null;
    city: number | null;
    cities: City[];
    onDepartamentChange: (deptId: number, type: 'from' | 'to') => void;
    onCityChange: (cityId: number) => void;
    color: string;
}

export const DestinationationPicker = ({
    departaments,
    title,
    departament,
    city,
    cities,
    onDepartamentChange,
    onCityChange,
    color
}: DestinationationPickerProps) => {

    // ✅ Mapa de colores que Tailwind sí va a generar
    const colors = {
        red: {
            dot: "bg-red-500",
            icon: "text-red-500",
        },
        blue: {
            dot: "bg-blue-500",
            icon: "text-blue-500",
        },
        indigo: {
            dot: "bg-indigo-500",
            icon: "text-indigo-500",
        },
        green: {
            dot: "bg-green-500",
            icon: "text-green-500",
        },
        yellow: {
            dot: "bg-yellow-500",
            icon: "text-yellow-500",
        }
    };

    // ✅ Si el color no existe, usa azul por defecto
    const currentColor = colors[color as keyof typeof colors] ?? colors.blue;

    const handleDepartamentChange = (deptId: number) => {
        onDepartamentChange(deptId, title === "Origen" ? "from" : "to");
    };

    return (
        <div className="flex-1 space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                {title}
                <span className={`h-1 w-1 rounded-full ${currentColor.dot}`} />
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-inner space-y-3">
                <Select
                    data={departaments}
                    title="Departamento"
                    value={departament}
                    onChange={handleDepartamentChange}
                    icon={<MapPin size={16} className={currentColor.icon} />}
                />

                <Select
                    data={cities}
                    title="Ciudad"
                    value={city}
                    onChange={onCityChange}
                    icon={<MapPin size={16} className={currentColor.icon} />}
                />
            </div>
        </div>
    );
};
