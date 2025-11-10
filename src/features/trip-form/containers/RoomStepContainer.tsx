import { RoomList } from "@/features/accommodation/components/RoomsList";
import { SectionCard } from "../components/SectionCard";

export const RoomStepContainer = () => {
  return (
    <SectionCard title="Selección de habitaciones">
      <RoomList></RoomList>
    </SectionCard>
  );
}