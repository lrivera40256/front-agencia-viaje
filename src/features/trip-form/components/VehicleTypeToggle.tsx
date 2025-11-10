import { Car, Plane } from "lucide-react";

interface Props {
  value: "car" | "plane";
  onChange: (v: "car" | "plane") => void;
}

export function VehicleTypeToggle({ value, onChange }: Props) {
  return (
    <div className="relative flex items-center w-64 bg-blue-200 rounded-full p-1 select-none">
      
      {/* Slider */}
      <div
        className={`
          absolute top-1 left-1 h-10 w-[calc(50%-0.25rem)]
          rounded-full bg-white shadow-md transition-transform duration-300
          ${value === "plane" ? "translate-x-full" : "translate-x-0"}
        `}
      />

      {/* Cars */}
      <button
        className={`
          relative z-10 w-1/2 h-10 flex items-center justify-center gap-2
          text-sm font-medium transition-colors
          ${value === "car" ? "text-purple-600" : "text-purple-900/60"}
        `}
        onClick={() => onChange("car")}
      >
        <Car className="w-5 h-5" />
        Cars
      </button>

      {/* Planes */}
      <button
        className={`
          relative z-10 w-1/2 h-10 flex items-center justify-center gap-2
          text-sm font-medium transition-colors
          ${value === "plane" ? "text-purple-600" : "text-purple-900/60"}
        `}
        onClick={() => onChange("plane")}
      >
        <Plane className="w-5 h-5" />
        Planes
      </button>
    </div>
  );
}
