// CreateTripWizard.tsx
import { WizardLayout } from "../components/WizardLayout";
import { StepperControls } from "../components/steps/StepperControls";
import { DateStepContainer } from "../containers/DateStepContainer";
import { DestinationContainer } from "../containers/DestinationContainer";
import { TouristActivitiesStepContainer } from "../containers/TouristAtivitiesStepContainer";
import { useEffect, useRef } from "react";
import { useWizard } from "../contexts/wizardContext";
import { useSegment } from "../contexts/segmentContext";
import { HotelStepContainer } from "../containers/HotelStepComtainer";
import { useSegments } from "../contexts/segmentsContext";
import { SegmentListContainer } from "@/features/trip-journeys/containers/SegmentListContainer";
import { RoomStepContainer } from "../containers/RoomStepContainer";
import { VehicleStepContainer } from "../containers/VehicleStepContainer";
import { useProfile } from "@/features/profile/contexts/ProfileContext";

const CreateTripWizard = () => {
    const { step } = useWizard();
    const { create } = useSegment();
    const list = useSegments();
    const initialized = useRef(false);
    const {segments} = useSegments();
    const {profile,refreshProfile}=useProfile();

    useEffect(() => {
        const prueba = async () => {   
            await refreshProfile();
            console.log(profile);
        }
        prueba();
        
        if (!initialized.current) {
            initialized.current = true;
            console.log(segments.length);
            create(segments.length);
        }
    }, []);


    return (
        <div>
            <WizardLayout step={step}>
                {step === 1 && <DateStepContainer />}
                {step === 2 && <DestinationContainer />}
                {step === 3 && <HotelStepContainer />}
                {step === 4 && <RoomStepContainer />}
                {step === 5 && <VehicleStepContainer />}
                {step === 6 && <TouristActivitiesStepContainer />}
                {step === 7 && <SegmentListContainer/>}
            </WizardLayout>
            <StepperControls />
        </div>

    );
};
export default CreateTripWizard;