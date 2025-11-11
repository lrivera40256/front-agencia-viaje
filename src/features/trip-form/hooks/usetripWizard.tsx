import { useState } from "react";
import { configuration } from "../types/configuration.type";
import { useNavigate } from "react-router";
import { useSegment } from "../contexts/segmentContext";
import { useSegments } from "../contexts/segmentsContext";

export const useTripWizard = () => {
    const [step, setStep] = useState<number>(1);
    const {create} = useSegment();
    const { segments } = useSegments();
    const configuration: configuration[] = [
        { steps: [2, 3, 4, 5], label: "Atras", action: () => setStep(s => s - 1) },
        { steps: [1, 2, 3, 4, 5], label: "Siguiente", action: () => setStep(s => s + 1) },
        {
            steps: [6], label: "Agregar", action: () => {
                const lastSegment = segments[segments.length - 1];
                create(segments.length, lastSegment.dateTo, lastSegment.cityTo, lastSegment.departamentTo);
                setStep(1)
            }
        },
    ]
    const next = () => setStep(s => s + 1);
    const back = () => setStep(s => s - 1);
    return { step, next, back, configuration };
}