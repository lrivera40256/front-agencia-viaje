// Renderiza todos los JourneyItem

import { Segment } from '@/features/trip-form/types/segment.types';
import { SegmentItem } from './SegmentItem';

interface SegmentListProps {
  segments: Segment[];
  openId: string | number | null;
  onToggle: (order:number) => void;
}

export const SegmentList = ({ segments, openId, onToggle }: SegmentListProps) => {
	return (
		<div>
			{segments.map(s => (
				<SegmentItem
					key={s.order}
					segment={s}
					isOpen={openId === s.order}
					onToggle={() => onToggle(s.order)}
				/>
			))}
		</div>
	);
};
