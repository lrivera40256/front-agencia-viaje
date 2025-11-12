import { useState } from 'react';
import { configuration } from '../types/configuration.type';
import { useNavigate } from 'react-router';
import { useSegment } from '../contexts/segmentContext';
import { useSegments } from '../contexts/segmentsContext';

export const useTripWizard = () => {
	const [step, setStep] = useState(1);
	const { create } = useSegment();
	const { segments } = useSegments();

	const [configuration, setConfiguration] = useState<configuration[]>([
		{ steps: [2, 3, 4, 5], label: 'Atras', action: () => setStep((s) => s - 1), status: true },
		{
			steps: [1, 2, 4, 5],
			label: 'Siguiente',
			action: () => setStep((s) => s + 1),
			status: true,
		},
		{
			steps: [6],
			label: 'Agregar',
			action: () => {
				const last = segments[segments.length - 1];
				create(segments.length, last.dateTo, last.cityTo, last.departamentTo);
				setStep(1);
			},
			status: true,
		},
		{ steps: [1, 2, 3, 4, 5], label: 'Guardar', action: () => setStep(6), status: false },
	]);

	const updateConfigurationStatus = (index: number, newStatus: boolean) => {
		setConfiguration((prev) => {
			const updated = [...prev];
			if (updated[index]) {
				updated[index] = { ...updated[index], status: newStatus };
			}
			return updated;
		});
	};

	const setOnlyTheseActive = (activeIndexes: number[]) => {
		const excludedIndex = 2;
		setConfiguration((prev) =>
			prev.map((item, index) => {
				if (index === excludedIndex) return item;
				return {
					...item,
					status: activeIndexes.includes(index),
				};
			})
		);
	};

	const next = () => setStep((s) => s + 1);
	const back = () => setStep((s) => s - 1);
	return { step, setStep, next, back, configuration, setOnlyTheseActive };
};
