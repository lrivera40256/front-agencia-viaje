import { DetailRow } from "./DetailRow";
import { Segment } from "../../trip-form/types/segment.types";

interface SegmentExpandedProps {
  segment: Segment;
}

export const SegmentExpanded = ({ segment }: SegmentExpandedProps) => {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="bg-blue-50 p-4 rounded-md shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <DetailRow 
          label="Fecha de salida" 
          value={formatDate(segment.dateFrom)} 
        />

        <DetailRow 
          label="Fecha de regreso" 
          value={formatDate(segment.dateTo)} 
        />

        <DetailRow 
          label="Departamento origen " 
          value={segment.departamentFrom.name} 
        />

        <DetailRow 
          label="Departamento destino " 
          value={segment.departamentTo.name} 
        />

        <DetailRow 
          label="Ciudad origen " 
          value={segment.cityFrom.name} 
        />

        <DetailRow 
          label="Ciudad destino " 
          value={segment.cityTo.name} 
        />

        <DetailRow 
          label="Hotel " 
          value={segment.hotel.name} 
        />
      </div>
    </div>
  );
};
