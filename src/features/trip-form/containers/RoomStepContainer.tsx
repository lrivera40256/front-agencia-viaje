import { RoomList } from "@/features/accommodation/components/RoomsList";
import { SectionCard } from "../components/SectionCard";
import { useWizard } from "../contexts/wizardContext";

export const RoomStepContainer = () => {
  const { setStep } = useWizard();
  return (
    <SectionCard onAction={() => setStep(7)} title="Selección de habitaciones">
      <RoomList></RoomList>
    </SectionCard>
  );
}