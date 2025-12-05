// useTripWizard.ts
import { useEffect, useState } from "react";
import type { Segment } from "../types/segment.types";
import { City, Departament } from "../types/locationTrip.types";
import { Room } from "@/features/accommodation/types/room.type";


export function useTripSegment() {
  const [segment, setSegment] = useState<Segment>();
  const create = (order: number,dateFrom?: Date,cityFrom?: City,departamentFrom?: Departament,rooms?:Room[]): Segment => {
    const newSeg: Segment = {
      order,
      cityFrom: cityFrom || { id: 0, name: "" },
      cityTo: { id: 0, name: "" },
      departamentFrom: departamentFrom || { id: 0, name: "" },
      departamentTo: { id: 0, name: "" },
      dateFrom: dateFrom || new Date(),
      dateTo: new Date(),
      hotel: {
        id: 0,
        name: "",
        stars: 0,
        amenities: ""
      },
      rooms:  rooms || [],
    };
    console.log(newSeg);
    
    setSegment(newSeg);
    return newSeg;
  };
  const selectSegment = (seg: Segment) => { 
    setSegment(seg);
  }
  const updateField = (field: keyof Segment, value: Segment[keyof Segment]) => {
    console.log(field, value);

    setSegment(s => s ? { ...s, [field]: value } : undefined);
  }
  useEffect(() => {
    console.log(segment);
    
  }, [segment]);
  return {

    updateField,
    create,
    segment,
    setSegment,
    selectSegment

  };
}
