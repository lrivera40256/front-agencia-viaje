
import { DatePicker } from "../components/DatePicker";
import { SectionCard } from "../components/SectionCard";
import { useSegment } from "../contexts/segmentContext";

export const DateStepContainer = () => {
    const { segment, updateField } = useSegment();
    return (
        <SectionCard title="Selección de Fechas">
            <DatePicker
                startDate={segment?.dateFrom}
                endDate={segment?.dateTo}
                updateStartDate={(date: Date) => updateField('dateFrom', date)}
                updateEndDate={(date: Date) => updateField('dateTo', date)}
            />
        </SectionCard>
    );
}