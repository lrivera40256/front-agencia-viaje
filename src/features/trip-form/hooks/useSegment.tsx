// useTripWizard.ts
import { useEffect, useState } from "react";
import type { Segment } from "../types/segment.types";

export function useTripSegment() {
  const [segment, setSegment] = useState<Segment>();
  const create = (order: number): Segment => {
    const newSeg: Segment = {
      order,
      cityFrom: 0,
      cityTo: 0,
      departamentFrom:0,
      departamentTo:0,
      dateFrom: new Date(),
      dateTo: new Date(),
      hotel: 0,
    };
    setSegment(newSeg);
    return newSeg;
  };
  const updateField = (field: keyof Segment, value: Segment[keyof Segment]) => {
    console.log(field,value);
    
    setSegment(s => s ? { ...s, [field]: value } : undefined);
  }

  return {

    updateField,
    create,
    segment,
    setSegment

  };
}
