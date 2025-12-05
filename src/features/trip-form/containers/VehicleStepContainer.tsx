import { useEffect, useRef, useState } from "react";
import { VehicleTypeToggle } from "../components/VehicleTypeToggle";
import { VehicleList } from "@/features/vehicles/components/VehiclesList";
import { useVehicle } from "@/features/vehicles/hooks/useVehicle";
import { SectionCard } from "../components/SectionCard";
import { useWizard } from "../contexts/wizardContext";
import { useSegment } from "../contexts/segmentContext";
import { Car, Plane } from "@/features/vehicles/types/vehicle.type";
import { useSegments } from "../contexts/segmentsContext";

export const VehicleStepContainer = () => {
    const { vehicles, type, setType } = useVehicle();
    const { next, setStep } = useWizard();
    const { segment, updateField } = useSegment();
    const { segments, addSegment } = useSegments();
    const initialized = useRef(false);

    const handleSelect = (vehicleId: Car | Plane) => {
        updateField("vehicle", vehicleId);
        next();

    }
    return (
        <SectionCard onAction={() => setStep(6)} title="Selección de vehículo">
            <VehicleTypeToggle value={type} onChange={setType}>
                <VehicleList vehicles={vehicles || []} onSelect={handleSelect} />
            </VehicleTypeToggle>
        </SectionCard>
    );
}