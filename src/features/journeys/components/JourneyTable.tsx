import { Table } from '@/components/table/Table';
import type { Journey } from '../types/Journey';

export interface JourneyTableData {
	id: string;
	originId: string;
	destinationId: string;
}

export interface JourneyTableProps {
	journeys: Journey[];
	loading?: boolean;
	onAdd: () => void;
	onDelete: (journey: Journey) => void | Promise<void>;
	onEdit?: (journey: Journey) => void;
	onSearch?: (q: string) => void;
}

export function JourneyTable({
	journeys,
	loading,
	onAdd,
	onDelete,
	onEdit,
	onSearch,
}: JourneyTableProps) {
	const journeyDataMap = new Map<string, Journey>();

	const tableData = journeys.map((j) => {
		const data: JourneyTableData = {
			id: j.id?.toString() || '',
			originId: j.origin?.name || `ID: ${j.origin_id}`,
			destinationId: j.destination?.name || `ID: ${j.destination_id}`,
		};
		journeyDataMap.set(j.id?.toString() || '', j);
		return data;
	});

	const actions = [
		...(onEdit
			? [
					{
						label: 'Editar',
						variant: 'primary' as const,
						onClick: (row: JourneyTableData) => {
							const journey = journeyDataMap.get(row.id);
							if (journey) onEdit(journey);
						},
					},
				]
			: []),
		{
			label: 'Eliminar',
			variant: 'danger' as const,
			onClick: (row: JourneyTableData) => {
				const journey = journeyDataMap.get(row.id);
				if (journey) onDelete(journey);
			},
		},
	];

	return (
		<Table<JourneyTableData>
			tableName="Trayectos"
			titles={['Ciudad Origen', 'Ciudad Destino']}
			data={tableData}
			actions={actions}
			onAdd={onAdd}
			search={
				onSearch
					? {
							onSearch,
							placeholder: 'Buscar por ciudad...',
							debounceMs: 400,
							hideButton: true,
						}
					: undefined
			}
			emptyMessage={loading ? 'Cargando...' : 'No hay trayectos'}
		/>
	);
}
