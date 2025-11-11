import { useState } from "react";
import { configuration } from "../types/configuration.type";
import { useNavigate } from "react-router";

export const useTripWizard = () => {
    const [step, setStep] = useState<number>(1);
    const navigate = useNavigate();
    const configuration:configuration []= [
        { steps: [2,3,4,5], label: "Atras", action: ()=>setStep(s=>s-1) },
        { steps: [1,2,3,4,5], label: "Siguiente", action: ()=>setStep(s=>s+1) },
        { steps: [6], label: "Agregar", action: ()=>{navigate("/form")} },
    ]
    const next = () => setStep(s => s + 1);
    const back = () => setStep(s => s - 1);
    return { step, next, back, configuration };
}