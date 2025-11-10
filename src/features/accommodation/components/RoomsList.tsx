import { useState } from "react";
import { Room } from "../types/room.type";
import { DataTable } from "@/components/DataTable";
import { useAccommodation } from "../hooks/useAccommodation";
import { useSegment } from "@/features/trip-form/contexts/segmentContext";

export function RoomList() {
  const {segment, updateField} = useSegment();
  const { rooms } = useAccommodation();
  const handleSetSelected = (selectedRooms: Room[]) => {
    updateField('rooms', selectedRooms);
  }
  const columns = [
    {
      key: "room_number",
      header: "Número",
      accessor: (r: Room) => r.room_number,
    },
    {
      key: "price_per_night",
      header: "Precio",
      accessor: (r: Room) => `$${r.price_per_night}`,
    },
    {
      key: "is_available",
      header: "Disponible",
      accessor: (r: Room) => (r.is_available ? "✅" : "❌"),
    },
  ];
  if (!rooms) {
    return <div>Cargando habitaciones...</div>;
  }

  return (
    <div>
      <DataTable<Room>
        data={rooms}
        columns={columns}
        selectable
        rowKey={(r) => r.id}
        selected={segment.rooms}
        onSelectChange={handleSetSelected}
      />


      <p className="mt-4">
        Seleccionadas: {JSON.stringify(segment.rooms)}
      </p>
    </div>
  );
}
