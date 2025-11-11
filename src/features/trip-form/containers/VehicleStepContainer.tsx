import { useEffect, useState } from "react";
import { VehicleTypeToggle } from "../components/VehicleTypeToggle";
import { VehicleList } from "@/features/vehicles/components/VehiclesList";
import { useVehicle } from "@/features/vehicles/hooks/useVehicle";
import { SectionCard } from "../components/SectionCard";
import { useWizard } from "../contexts/wizardContext";
import { useSegment } from "../contexts/segmentContext";
import { Car, Plane } from "@/features/vehicles/types/vehicle.type";

export const VehicleStepContainer = () => {
    const { vehicles, type, setType } = useVehicle();
    const { next } = useWizard();
    const {  updateField } = useSegment();
    const handleSelect = (vehicleId: Car | Plane) => {
        updateField("vehicle", vehicleId);
        next();
    }
    return (
        <SectionCard title="Selección de vehículo">
            <VehicleTypeToggle value={type} onChange={setType}>
                <VehicleList vehicles={vehicles || []} onSelect={handleSelect} />
            </VehicleTypeToggle>
        </SectionCard>
    );
}