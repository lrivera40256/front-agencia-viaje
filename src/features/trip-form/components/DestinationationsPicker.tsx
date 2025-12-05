import { DestinationationPicker } from "./LocationPicker";
import { City, Departament } from "../types/locationTrip.types";
import { SectionCard } from "./SectionCard";
import { useWizard } from "../contexts/wizardContext";
interface DestinationationsPickerProps {
  departamentFrom: Departament;
  departamentTo: Departament;
  cityFrom: City | null;
  cityTo: City | null;
  onDepartamentFromChange: (dep: Departament, type: 'from' | 'to') => void;
  onDepartamentToChange: (dep: Departament, type: 'from' | 'to') => void;
  onCityFromChange: (city: City) => void;
  onCityToChange: (city: City) => void;
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
  const { setStep } = useWizard();  
  return (
    <SectionCard onAction={() => setStep(6)} title="Selección de Origen y Destino">
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
