import { DestinationationPicker } from "./LocationPicker";
import { City, Departament } from "../types/locationTrip.types";
import { SectionCard } from "./SectionCard";
interface DestinationationsPickerProps {
  departamentFrom: number;
  departamentTo: number;
  cityFrom: number | null;
  cityTo: number | null;
  onDepartamentFromChange: (deptId: number, type: 'from' | 'to') => void;
  onDepartamentToChange: (deptId: number, type: 'from' | 'to') => void;
  onCityFromChange: (cityId: number) => void;
  onCityToChange: (cityId: number) => void;
  departaments: Departament[];
  departamentsAvailables: Departament[];
  citiesFrom: City[];
  citiesTo: City[];
}
export const DestinationationsPicker = ({
  departamentFrom,
  departamentTo,
  cityFrom,
  cityTo,
  onDepartamentFromChange,
  onDepartamentToChange,
  onCityFromChange,
  onCityToChange,
  departaments,
  citiesFrom,
  citiesTo,
  departamentsAvailables
}: DestinationationsPickerProps) => {

  return (
    <SectionCard title="Selección de Origen y Destino">
      <div className="flex flex-col md:flex-row gap-8">
        <DestinationationPicker
          title="Origen"
          departaments={departaments}
          departament={departamentFrom}
          city={cityFrom}
          cities={citiesFrom}
          onDepartamentChange={onDepartamentFromChange}
          onCityChange={onCityFromChange}
          color="blue"
        />

        <DestinationationPicker
          title="Destino"
          departaments={departamentsAvailables}
          departament={departamentTo}
          city={cityTo}
          cities={citiesTo}
          onDepartamentChange={onDepartamentToChange}
          onCityChange={onCityToChange}
          color="red"
        />
      </div>
    </SectionCard>

  );
};
