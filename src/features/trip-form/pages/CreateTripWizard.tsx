// CreateTripWizard.tsx
import { WizardLayout } from "../components/WizardLayout";
import { StepperControls } from "../components/steps/StepperControls";
import { DateStepContainer } from "../containers/DateStepContainer";
import { DestinationContainer } from "../containers/DestinationContainer";
import { useEffect, useRef } from "react";
import { useSegmentsContainer } from "../hooks/useSegementsContainer";
import { useWizard } from "../contexts/wizardContext";
import { useSegment } from "../contexts/segmentContext";

const CreateTripWizard = () => {
    const { step } = useWizard();
    const { create } = useSegment();
    const list = useSegmentsContainer();
    useEffect(() => {
        if (list.segments.length === 0) {
            const newSeg = create(0);
            list.addSegment(newSeg);
        }
    }, []);

    return (
        <div>
            <WizardLayout step={step}>
                {step === 1 && <DateStepContainer />}
                {step === 2 && <DestinationContainer />}
            </WizardLayout>
            <StepperControls />
        </div>

    );
};
export default CreateTripWizard;