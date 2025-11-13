import { Table } from '@/components/table/Table';
import type { Vehicle } from '../types/Vehicle';

export interface VehicleTableData {
	id: string;
	brand: string;
	type: string;
	model: string;
	color: string;
	capacity: string;
}

export interface VehicleTableProps {
	vehicles: Vehicle[];
	loading?: boolean;
	onAdd: () => void;
	onDelete: (vehicle: Vehicle) => void | Promise<void>;
	onEdit?: (vehicle: Vehicle) => void;
	onSearch?: (q: string) => void;
}

export function VehicleTable({
	vehicles,
	loading,
	onAdd,
	onDelete,
	onEdit,
	onSearch,
}: VehicleTableProps) {
	const vehicleDataMap = new Map<string, Vehicle>();

	const tableData = vehicles.map((v) => {
		const data: VehicleTableData = {
			id: v.id?.toString() || '',
			brand: v.brand || 'N/A',
			type: v.type === 'carro' ? 'Carro' : 'Aeronave',
			model: v.model?.toString() || 'N/A',
			color: v.color || 'N/A',
			capacity: v.capacity?.toString() || 'N/A',
		};
		vehicleDataMap.set(v.id?.toString() || '', v);
		return data;
	});

	const actions = [
		...(onEdit
			? [
					{
						label: 'Editar',
						variant: 'primary' as const,
						onClick: (row: VehicleTableData) => {
							const vehicle = vehicleDataMap.get(row.id);
							if (vehicle) onEdit(vehicle);
						},
					},
				]
			: []),
		{
			label: 'Eliminar',
			variant: 'danger' as const,
			onClick: (row: VehicleTableData) => {
				const vehicle = vehicleDataMap.get(row.id);
				if (vehicle) onDelete(vehicle);
			},
		},
	];

	return (
		<Table<VehicleTableData>
			tableName="Vehículos"
			titles={['Marca', 'Tipo', 'Modelo', 'Color', 'Capacidad']}
			data={tableData}
			actions={actions}
			onAdd={onAdd}
			search={
				onSearch
					? {
							onSearch,
							placeholder: 'Buscar por marca, color, tipo o modelo...',
							debounceMs: 400,
							hideButton: true,
						}
					: undefined
			}
			emptyMessage={loading ? 'Cargando...' : 'No hay vehículos'}
		/>
	);
}
