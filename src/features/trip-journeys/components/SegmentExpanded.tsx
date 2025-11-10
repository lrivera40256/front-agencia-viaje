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
          label="Departamento origen ID" 
          value={segment.departamentFrom} 
        />

        <DetailRow 
          label="Departamento destino ID" 
          value={segment.departamentTo} 
        />

        <DetailRow 
          label="Ciudad origen ID" 
          value={segment.cityFrom} 
        />

        <DetailRow 
          label="Ciudad destino ID" 
          value={segment.cityTo} 
        />

        <DetailRow 
          label="Hotel ID" 
          value={segment.hotel} 
        />
      </div>
    </div>
  );
};
