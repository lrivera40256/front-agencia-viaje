import { useState } from "react";
import { Segment } from "../types/segment.types";

export const useSegmentsContainer = () => {
    // Hook logic here
    const [segments, setSegments] = useState<Segment[]>([]);
    const addSegment = (segment: Segment) => {
        setSegments(prev => [...prev, segment]);
    }
    return {
        segments,
        addSegment
    };
}