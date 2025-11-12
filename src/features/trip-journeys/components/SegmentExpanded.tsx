import { DetailRow } from './DetailRow';
import { Segment } from '../../trip-form/types/segment.types';
import { useWizard } from '@/features/trip-form/contexts/wizardContext';

interface SegmentExpandedProps {
	segment: Segment;
}

export const SegmentExpanded = ({ segment }: SegmentExpandedProps) => {
	const { setOnlyTheseActive, step, setStep } = useWizard();
	const handleClick = (s:number, act:number[]) => {
		setStep(s);
		setOnlyTheseActive(act)
		console.log(step);
	};

	const formatDate = (date: Date) =>
		date.toLocaleDateString('es-CO', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

	return (
		<div className="bg-blue-50 p-4 rounded-md shadow-sm">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<DetailRow
					label="Fecha de salida"
					value={formatDate(segment.dateFrom)}
					onEdit={() => handleClick(1, [3])}
				/>

				<DetailRow
					label="Fecha de regreso"
					value={formatDate(segment.dateTo)}
					onEdit={() => handleClick(1, [3])}
				/>

				<DetailRow
					label="Departamento origen "
					value={segment.departamentFrom.name}
					onEdit={() => handleClick(2, [3])}
				/>

				<DetailRow
					label="Departamento destino "
					value={segment.departamentTo.name}
					onEdit={() => handleClick(2, [3])}
				/>

				<DetailRow
					label="Ciudad origen "
					value={segment.cityFrom.name}
					onEdit={() => handleClick(2, [3])}
				/>

				<DetailRow
					label="Ciudad destino "
					value={segment.cityTo.name}
					onEdit={() => handleClick(2, [3])}
				/>

				<DetailRow label="Hotel " value={segment.hotel.name} onEdit={() => handleClick} />
			</div>
		</div>
	);
};
