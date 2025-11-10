// CreateTripWizard.tsx
import { WizardLayout } from "../components/WizardLayout";
import { StepperControls } from "../components/steps/StepperControls";
import { DateStepContainer } from "../containers/DateStepContainer";
import { DestinationContainer } from "../containers/DestinationContainer";
import { useEffect, useRef } from "react";
import { useWizard } from "../contexts/wizardContext";
import { useSegment } from "../contexts/segmentContext";
import { HotelStepContainer } from "../containers/HotelStepComtainer";
import { useSegments } from "../contexts/segmentsContext";

const CreateTripWizard = () => {
    const { step } = useWizard();
    const { create } = useSegment();
    const list = useSegments();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;

            if (list.segments.length === 0) {
                const newSeg = create(0);
                list.addSegment(newSeg);
            }
        }
    }, []);


    return (
        <div>
            <WizardLayout step={step}>
                {step === 1 && <DateStepContainer />}
                {step === 2 && <DestinationContainer />}
                {step === 3 && <HotelStepContainer />}
                {/* {step === 4 && <SegmentListContainer/>} */}
            </WizardLayout>
            <StepperControls />
        </div>

    );
};
export default CreateTripWizard;