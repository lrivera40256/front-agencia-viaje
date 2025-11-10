// useTripWizard.ts
import { useEffect, useState } from "react";
import type { Segment } from "../types/segment.types";

export function useTripSegment() {
  const [segment, setSegment] = useState<Segment>();
  const create = (order: number): Segment => {
    const newSeg: Segment = {
      order,
      cityFrom: { id: 0, name: "" },
      cityTo: { id: 0, name: "" },
      departamentFrom: { id: 0, name: "" },
      departamentTo: { id: 0, name: "" },
      dateFrom: new Date(),
      dateTo: new Date(),
      hotel: {
        id: 0,
        name: "",
        stars: 0,
        amenities: ""
      },
      rooms: [],
    };
    setSegment(newSeg);
    return newSeg;
  };
  const updateField = (field: keyof Segment, value: Segment[keyof Segment]) => {
    console.log(field, value);

    setSegment(s => s ? { ...s, [field]: value } : undefined);
  }

  return {

    updateField,
    create,
    segment,
    setSegment

  };
}
