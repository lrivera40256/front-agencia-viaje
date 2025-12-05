
import { DatePicker } from "../components/DatePicker";
import { SectionCard } from "../components/SectionCard";
import { useSegment } from "../contexts/segmentContext";
import { useWizard } from "../contexts/wizardContext";

export const DateStepContainer = () => {
    const { segment, updateField } = useSegment();
    const {setStep} = useWizard();
    return (    
        <SectionCard onAction={() => setStep(6)} title="Selección de Fechas">
            <DatePicker
                disable={segment?.order > 0}
                startDate={segment?.dateFrom}
                endDate={segment?.dateTo}
                updateStartDate={(date: Date) => updateField('dateFrom', date)}
                updateEndDate={(date: Date) => updateField('dateTo', date)}
            />
        </SectionCard>
    );
}