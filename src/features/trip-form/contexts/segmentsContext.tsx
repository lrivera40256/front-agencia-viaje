import { createContext, ReactNode, useContext, useState } from "react";
import { Segment } from "../types/segment.types";
import { log } from "node:console";

export interface segmentsContextType {
    segments: Segment[];
    addSegment: (segment: Segment) => void;
    modifiedSegment: (segment: Segment) => void;
}
const SegmentsContext = createContext<segmentsContextType | undefined>(undefined);
export const SegmentsProvider = ({ children }: { children: ReactNode }) => {
    const [segments, setSegments] = useState<Segment[]>([]);
    const modifiedSegment = (segment: Segment) => {
        if (!segments.find(s => s.order === segment.order)) {
            console.log("nuevo");
            
            setSegments(prev => [...prev, segment]);
        } else {
            console.log("editar");
            
            setSegments(prev => prev.map(s => s.order === segment.order ? segment : s));
        }
        console.log(segments);
        

    }
    const addSegment = (segment: Segment) => {
        if (!segments.find(s => s.order === segment.order)) {
            setSegments(prev => [...prev, segment]);
        }


    }
    return (
        <SegmentsContext.Provider
            value={{ segments, addSegment, modifiedSegment }}
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