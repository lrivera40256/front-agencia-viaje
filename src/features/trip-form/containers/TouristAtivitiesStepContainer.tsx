import React, { useState } from 'react';
import { useSegments } from '../contexts/segmentsContext';
import PlansSelector from '@/features/plans/components/PlansSelector';
import { useSegment } from '../contexts/segmentContext';
import Plan from '@/features/plans/types/Plan';
import { SectionCard } from '../components/SectionCard';
import { useWizard } from '../contexts/wizardContext';

export function TouristActivitiesStepContainer() {
    const [editingIndex, setEditingIndex] = useState<boolean>(false);
    const { segment, updateField } = useSegment();
    const { setStep } = useWizard();
    const openForSegment = () => {
        setEditingIndex(true);
    };

    const close = () => setEditingIndex(false);
    const handleChangeForSegment = (selectedPlans: Plan[]) => {
        updateField('plans', selectedPlans);

    };

    return (
        <SectionCard onAction={() => setStep(7)} title={`Seleccion de planes para la ciudad ${segment.cityTo?.name}`}>
            <PlansSelector
                cityId={segment.cityTo?.id}
                initialSelected={segment.plans?.map(plan => plan.id) ?? []}
                onChange={(selected) => handleChangeForSegment(selected)}
            />

            <div className="mt-4 flex justify-end">
                <button onClick={close} className="px-4 py-2 bg-gray-100 rounded">Cerrar</button>
            </div>
        </SectionCard>
    );
}

export default TouristActivitiesStepContainer;