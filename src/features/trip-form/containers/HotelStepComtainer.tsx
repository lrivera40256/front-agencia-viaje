import { HotelList } from "@/features/accommodation/components/HotelList";
import { SectionCard } from "../components/SectionCard";
import { useWizard } from "../contexts/wizardContext";

export const HotelStepContainer = () => {
    const { setStep } = useWizard();
    return (
        <SectionCard onAction={() => setStep(7)} title="Selección de alojamiento">
        <HotelList></HotelList>
        </SectionCard>
    );
}