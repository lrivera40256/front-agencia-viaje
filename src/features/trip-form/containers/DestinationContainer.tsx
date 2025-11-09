import { useEffect, useState } from "react";
import { useDepartament } from "@/hooks/useDepartament";
import { useCities } from "@/hooks/useCities";
import { DestinationationsPicker } from "../components/DestinationationsPicker";
import { useSegment } from "../contexts/segmentContext";

export const DestinationContainer = () => {
    const { segment, updateField } = useSegment();
    const { departaments } = useDepartament()
    const { citiesFrom, refreshCitiesFrom, refreshCitiesTo, citiesTo } = useCities()

    const handleDepartamentChange = (deptId: number, type: 'from' | 'to') => {
        if (type === 'from') {
            updateField('departamentFrom', deptId);
            refreshCitiesFrom(deptId)
        } else {
            updateField('departamentTo', deptId);
            refreshCitiesTo(deptId)
        }
    };
    useEffect(() => {
        refreshCitiesFrom(segment.departamentFrom);
        refreshCitiesTo(segment.departamentTo);
    }, [segment?.departamentFrom, segment?.departamentTo]);
    if (!citiesFrom || !citiesTo) {
        return null;
    }

    return (
        
        <DestinationationsPicker
            departamentFrom={segment?.departamentFrom}
            departamentTo={segment?.departamentTo}
            cityFrom={segment?.cityFrom}
            cityTo={segment?.cityTo}
            onDepartamentFromChange={handleDepartamentChange}
            onDepartamentToChange={handleDepartamentChange}
            onCityFromChange={(cityId) => updateField('cityFrom', cityId)}
            onCityToChange={(cityId) => updateField('cityTo', cityId)}
            departaments={departaments}
            citiesFrom={citiesFrom}
            citiesTo={citiesTo}
        />
    );
};
