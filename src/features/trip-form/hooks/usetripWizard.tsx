import { useState } from "react";
import { configuration } from "../types/configuration.type";
import { useNavigate } from "react-router";
import { useSegment } from "../contexts/segmentContext";
import { useSegments } from "../contexts/segmentsContext";
import { useEpayco } from "../hooks/useEpayco";

export const useTripWizard = () => {
    const [step, setStep] = useState<number>(1);
    const { create } = useSegment();
    const { segments, modifiedSegment } = useSegments();
    const { segment } = useSegment();
    const { openEpaycoCheckout } = useEpayco();
    const configuration: configuration[] = [
        {
            steps: [2, 3, 4, 5], label: "Atras", action: () => setStep(s => s - 1), status: false
        },
        {
            steps: [1, 2, 4, 5], label: "Siguiente", action: () => {
                modifiedSegment(segment);
                setStep(s => s + 1)
            }, status: false
        },
        {
            steps: [6], label: "Agregar", action: () => {
                if (segments.length === 0) {
                    create(0);
                    setStep(1);
                    return;
                }
                const lastSegment = segments[segments.length - 1];
                create(segments.length, lastSegment.dateTo, lastSegment.cityTo, lastSegment.departamentTo);
                setStep(1)
            }, status: true
        },
        {
            steps: [6],
            label: "Guardar viaje y pagar",
            action: () => {
                
                // openEpaycoCheckout({
                // total: 20000,
                // productName: "Paquete turístico Cartagena",
                // productDescription: "Vuelo + hotel por 3 noches",
                // });
            },
            status: false,
        },
    ]
    const next = () => setStep(s => s + 1);
    const back = () => setStep(s => s - 1);
    return { step, next, back, configuration, setStep };
}