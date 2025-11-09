import { useState } from "react";

export const useTripWizard = () => {
    const [step, setStep] = useState<number>(1);
    const next = () => setStep(s => s + 1);
    const back = () => setStep(s => s - 1);
    return { step, next, back };
}