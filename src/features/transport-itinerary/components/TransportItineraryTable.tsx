import { Table } from '@/components/table/Table';
import type { TransportItinerary } from '../types/TransportItinerary';

export interface TransportItineraryTableData {
	id: string;
	sequence: string;
	travel: string;
	journey: string;
	serviceTransportation: string;
}

export interface TransportItineraryTableProps {
	itineraries: TransportItinerary[];
	loading?: boolean;
	onAdd: () => void;
	onDelete: (itinerary: TransportItinerary) => void | Promise<void>;
	onEdit?: (itinerary: TransportItinerary) => void;
	onSearch?: (q: string) => void;
}

export function TransportItineraryTable({
	itineraries,
	loading,
	onAdd,
	onDelete,
	onEdit,
	onSearch,
}: TransportItineraryTableProps) {
	const itineraryDataMap = new Map<string, TransportItinerary>();

	const tableData = itineraries.map((i) => {
		const data: TransportItineraryTableData = {
			id: i.id?.toString() || '',
			sequence: i.sequence?.toString() || 'N/A',
			travel: i.travel?.name || `Viaje ${i.travel_id}`,
			journey: i.journey?.name || `Trayecto ${i.journey_id}`,
			serviceTransportation:
				i.serviceTransportation?.name || `Servicio ${i.service_transportation_id}`,
		};
		itineraryDataMap.set(i.id?.toString() || '', i);
		return data;
	});

	const actions = [
		...(onEdit
			? [
					{
						label: 'Editar',
						variant: 'primary' as const,
						onClick: (row: TransportItineraryTableData) => {
							const itinerary = itineraryDataMap.get(row.id);
							if (itinerary) onEdit(itinerary);
						},
					},
				]
			: []),
		{
			label: 'Eliminar',
			variant: 'danger' as const,
			onClick: (row: TransportItineraryTableData) => {
				const itinerary = itineraryDataMap.get(row.id);
				if (itinerary) onDelete(itinerary);
			},
		},
	];

	return (
		<Table<TransportItineraryTableData>
			tableName="Itinerarios de Transporte"
			titles={['Secuencia', 'Viaje', 'Trayecto', 'Servicio de Transporte']}
			data={tableData}
			actions={actions}
			onAdd={onAdd}
			search={
				onSearch
					? {
							onSearch,
							placeholder: 'Buscar por secuencia, viaje, trayecto o servicio...',
							debounceMs: 400,
							hideButton: true,
						}
					: undefined
			}
			emptyMessage={loading ? 'Cargando...' : 'No hay itinerarios de transporte'}
		/>
	);
}
