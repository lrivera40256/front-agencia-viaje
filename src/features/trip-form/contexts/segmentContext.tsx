import { createContext, ReactNode, useContext } from "react";
import { Segment } from "../types/segment.types";
import { useTripSegment } from "../hooks/useSegment";

export interface segmentContextType {
    segment: Segment;
    setSegment: (segment: Segment) => void;
    updateField: (field: keyof Segment, value: Segment[keyof Segment]) => void;
    create: (order: number) => Segment;
}
const SegmentContext = createContext<segmentContextType | undefined>(undefined);
export const SegmentProvider = ({ children }: { children: ReactNode }) => {
  const {segment, setSegment, updateField, create} = useTripSegment();
  return (
    <SegmentContext.Provider
      value={{ segment, setSegment, updateField, create }}
    >
      {children}
    </SegmentContext.Provider>
  );
};
// Hook de acceso
export const useSegment = () => {
  const context = useContext(SegmentContext);
  if (!context) {
    throw new Error("useSegment must be used within a SegmentProvider");
  }
  return context;
};