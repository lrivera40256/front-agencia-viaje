import { useState } from "react";
import { Segment } from "../types/segment.types";

export const useSegmentsContainer = () => {
    // Hook logic here
    const [segments, setSegments] = useState<Segment[]>([]);
    const addSegment = (segment: Segment) => {
        if (!segments.find(s => s.order === segment.order)) {
            setSegments(prev => [...prev, segment]);
        }
    }
    return {
        segments,
        addSegment
    };
}