import { createContext, ReactNode, useContext } from "react";
import { Segment } from "../types/segment.types";
import { useSegmentsContainer } from "../hooks/useSegementsContainer";

export interface segmentsContextType {
    segments: Segment[];
    addSegment: (segment: Segment) => void;
}
const SegmentsContext = createContext<segmentsContextType | undefined>(undefined);
export const SegmentsProvider = ({ children }: { children: ReactNode }) => {
  const {segments,addSegment} = useSegmentsContainer();
  return (
    <SegmentsContext.Provider
      value={{segments, addSegment }}
    >
      {children}
    </SegmentsContext.Provider>
  );
};
// Hook de acceso
export const useSegments = () => {
  const context = useContext(SegmentsContext);
  if (!context) {
    throw new Error("useSegments must be used within a SegmentsProvider");
  }
  return context;
};