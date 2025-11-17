import { Table } from '@/components/table/Table';
import type { Room } from '../types/Room';

export interface RoomTableData {
	id: string;
	roomNumber: string;
	price: string;
	hotel: string;
	available: string;
}

export interface RoomTableProps {
	rooms: Room[];
	loading?: boolean;
	onAdd: () => void;
	onDelete: (room: Room) => void | Promise<void>;
	onEdit?: (room: Room) => void;
	onSearch?: (q: string) => void;
}

export function RoomTable({ rooms, loading, onAdd, onDelete, onEdit, onSearch }: RoomTableProps) {
	const roomDataMap = new Map<string, Room>();

	const tableData = rooms.map((r) => {
		const data: RoomTableData = {
			id: r.id?.toString() || '',
			roomNumber: r.room_number || 'N/A',
			price: `$${r.price_per_night.toLocaleString('es-CO')}`,
			hotel: r.hotel.name,
			available: r.is_available ? 'Sí' : 'No',
		};
		roomDataMap.set(r.id?.toString() || '', r);
		return data;
	});

	const actions = [
		...(onEdit
			? [
					{
						label: 'Editar',
						variant: 'primary' as const,
						onClick: (row: RoomTableData) => {
							const room = roomDataMap.get(row.id);
							if (room) onEdit(room);
						},
					},
				]
			: []),
		{
			label: 'Eliminar',
			variant: 'danger' as const,
			onClick: (row: RoomTableData) => {
				const room = roomDataMap.get(row.id);
				if (room) onDelete(room);
			},
		},
	];

	return (
		<Table<RoomTableData>
			tableName="Habitaciones"
			titles={['Número', 'Precio', 'Hotel', 'Disponible']}
			data={tableData}
			actions={actions}
			onAdd={onAdd}
			search={
				onSearch
					? {
							onSearch,
							placeholder: 'Buscar por número o hotel...',
							debounceMs: 400,
							hideButton: true,
						}
					: undefined
			}
			emptyMessage={loading ? 'Cargando...' : 'No hay habitaciones'}
		/>
	);
}
