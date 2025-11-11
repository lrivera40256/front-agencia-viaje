import { Car, Plane } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  value: "car" | "plane";
  onChange: (v: "car" | "plane") => void;
  children?: ReactNode;
}

export function VehicleTypeToggle({ value, onChange, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 w-full">

      <div className="relative flex items-center w-64 bg-blue-200 rounded-full p-1 select-none">

        <div
          className={`
            absolute top-1 left-1 h-10 
            w-[calc(50%-0.25rem)] rounded-full bg-white shadow-md 
            transition-transform duration-300
            ${value === "plane" ? "translate-x-full" : "translate-x-0"}
          `}
        />

        <button
          onClick={() => onChange("car")}
          className={`
            relative z-10 w-1/2 h-10 flex items-center justify-center gap-2
            text-sm font-medium transition-colors
            ${value === "car" ? "text-purple-600" : "text-purple-900/60"}
          `}
        >
          <Car className="w-5 h-5" />
          Cars
        </button>

        <button
          onClick={() => onChange("plane")}
          className={`
            relative z-10 w-1/2 h-10 flex items-center justify-center gap-2
            text-sm font-medium transition-colors
            ${value === "plane" ? "text-purple-600" : "text-purple-900/60"}
          `}
        >
          <Plane className="w-5 h-5" />
          Planes
        </button>
      </div>

      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
