import { HotelList } from "@/features/accommodation/components/HotelList";
import { useSegment } from "../contexts/segmentContext";
import { SectionCard } from "../components/SectionCard";

export const HotelStepContainer = () => {
    
    return (
        <SectionCard title="Selección de alojamiento">
        <HotelList></HotelList>
        </SectionCard>
    );
}