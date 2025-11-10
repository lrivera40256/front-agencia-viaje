import { useEffect, useState } from "react";
import { useDepartament } from "@/hooks/useDepartament";
import { useCities } from "@/hooks/useCities";
import { DestinationationsPicker } from "../components/DestinationationsPicker";
import { useSegment } from "../contexts/segmentContext";
import { Departament } from "@/models/departaments";

export const DestinationContainer = () => {
    const { segment, updateField } = useSegment();
    const { getDepartaments, getDepartamentsWithAvailableHotels } = useDepartament()
    const [departaments, setDepartaments] = useState<Departament[]>([]);
    const [departamentsAvailables,setDepartamentsAvailables] = useState<Departament[]>([]);
    const { citiesFrom, refreshCitiesFrom, refreshCitiesTo, citiesTo } = useCities()

    const handleDepartamentChange = (dep: Departament, type: 'from' | 'to') => {
        if (type === 'from') {
            updateField('departamentFrom', dep);
            refreshCitiesFrom(dep.id)
        } else {
            updateField('departamentTo', dep);
            refreshCitiesTo(dep.id)
        }
    };
    useEffect(() => {
        const fetchDepartaments = async () => {
            const data = await getDepartaments();
            const dataAvailables = await getDepartamentsWithAvailableHotels();
            setDepartamentsAvailables(dataAvailables);
            setDepartaments(data);
        }
        fetchDepartaments();
    }, []);
    useEffect(() => {
        refreshCitiesFrom(segment.departamentFrom.id);
        refreshCitiesTo(segment.departamentTo.id);
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
            departamentsAvailables={departamentsAvailables}
            citiesFrom={citiesFrom}
            citiesTo={citiesTo}
        />
    );
};
