import { useState } from 'react';
import { configuration } from '../types/configuration.type';
import { useNavigate } from 'react-router-dom';
import { useSegment } from '../contexts/segmentContext';
import { useSegments } from '../contexts/segmentsContext';
import { TripService } from '../components/services/tripService';
import { useAuthContext } from '@/features/auth/contexts/AuthProvider';

export const useTripWizard = () => {
	const [step, setStep] = useState<number>(1);
	const { create } = useSegment();
	const { segments, modifiedSegment } = useSegments();
	const { segment } = useSegment();
	const navigate = useNavigate();
	const { user } = useAuthContext();

	const formatDate = (date: string | Date | null | undefined): string | null => {
		if (!date) return null;
		if (typeof date === 'string') return date.split('T')[0];
		return new Date(date).toISOString().split('T')[0];
	};

	const configuration: configuration[] = [
		{
			steps: [2, 3, 4, 5, 6],
			label: 'Atras',
			action: () => setStep((s) => s - 1),
			status: false,
		},
		{
			steps: [1, 2, 3, 4, 5, 6],
			label: 'Siguiente',
			action: () => {
				console.log(segment);
				modifiedSegment(segment);
				setStep((s) => s + 1);
			},
			status: false,
		},
		{
			steps: [7],
			label: 'Agregar',
			action: () => {
				if (segments.length === 0) {
					create(0);
					setStep(1);
					return;
				}
				const lastSegment = segments[segments.length - 1];
				create(
					segments.length,
					lastSegment.dateTo,
					lastSegment.cityTo,
					lastSegment.departamentTo
				);
				setStep(1);
			},
			status: true,
		},
		{
			steps: [7],
			label: 'guardar',
			action: async () => {
				try {
					console.log('guardar viaje');
					const items = segments.map((segment) => ({
						hotel_id: segment.hotel.id,
						plan_ids: segment.plans.map((plan) => plan.id),
						room_ids: segment.rooms.map((room) => room.id),
						cityFrom: segment.cityFrom.id,
						cityTo: segment.cityTo.id,
						vehicle: segment.vehicle.id,
						order: segment.order,
						date_from: formatDate(segment.dateFrom),
						date_to: formatDate(segment.dateTo),
					}));

					const payload = { items };
					console.log(payload);
					await TripService.createTrip(payload);
                    console.log(user);
                    
					if (user?.id) {
						navigate(`/travel-packages/${user.id}`, { state: { from: 'trip-form' } });
					} else {
						console.error('No se encontró el ID del usuario para redirigir.');
						navigate('/travel-packages', { state: { from: 'trip-form' } });
					}
				} catch (error) {
					console.error('Error creating trip:', error);
				}
			},
			status: true,
		},
	];

	const next = () => setStep((s) => s + 1);
	const back = () => setStep((s) => s - 1);
	return { step, next, back, configuration, setStep };
};
