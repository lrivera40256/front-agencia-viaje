import { ReactNode } from 'react';
import { Pencil } from 'lucide-react';

interface DetailRowProps {
	label: string;
	value: ReactNode;
	onEdit?: () => void;
}

export const DetailRow = ({ label, value, onEdit }: DetailRowProps) => {
	return (
		<div className="flex items-center justify-between p-1 border-b border-gray-200">
			<span className="font-semibold text-gray-700">{label}</span>

			<div className="flex items-center gap-2">
				<span className="text-gray-800">{value}</span>

				{onEdit && (
					<button onClick={onEdit} className="p-1 rounded hover:bg-gray-100 transition">
						<Pencil className="w-4 h-4 text-gray-600" />
					</button>
				)}
			</div>
		</div>
	);
};