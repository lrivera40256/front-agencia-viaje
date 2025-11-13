import { Table } from '@/components/table/Table';
import { Travel } from '../types/Travel';

export interface TravelTableData {
	_id: string;
	name: string;
	description: string;
	startDate: string;
	endDate: string;
	price: string;
}

// Función para parsear fechas del backend
const parseDateFromBackend = (dateValue: any): string => {
	if (!dateValue) {
		return 'N/A';
	}

	try {
		let dateObj: Date | null = null;

		// Si es un objeto con propiedades tipo Luxon DateTime
		if (typeof dateValue === 'object' && dateValue !== null) {
			if (dateValue.year && dateValue.month && dateValue.day) {
				dateObj = new Date(dateValue.year, dateValue.month - 1, dateValue.day);
			}
			// Si es un objeto con constructor nombre "DateTime" (Luxon)
			else if (dateValue.constructor && dateValue.constructor.name === 'DateTime') {
				dateObj = new Date(dateValue.toISO?.() || dateValue.toString());
			}
			// Si es un Date
			else if (dateValue instanceof Date) {
				dateObj = dateValue;
			}
		}
		// Si es un string
		else if (typeof dateValue === 'string') {
			dateObj = new Date(dateValue);
		}
		// Si es un número (timestamp)
		else if (typeof dateValue === 'number') {
			dateObj = new Date(dateValue);
		}

		// Si no se logró crear la fecha
		if (!dateObj) {
			return 'Error al parsear';
		}

		// Verificar que sea una fecha válida
		if (isNaN(dateObj.getTime())) {
			return 'Fecha inválida';
		}

		// Retornar en formato local
		return dateObj.toLocaleDateString('es-ES');
	} catch (error) {
		return 'Error al parsear';
	}
};

export interface TravelTableProps {
	travels: Travel[];
	loading?: boolean;
	onAdd: () => void;
	onDelete: (travel: Travel) => void | Promise<void>;
	onEdit?: (travel: Travel) => void;
	onSearch?: (q: string) => void;
}

export function TravelTable({
	travels,
	loading,
	onAdd,
	onDelete,
	onEdit,
	onSearch,
}: TravelTableProps) {
	const travelDataMap = new Map<string, Travel>();

	const tableData = travels.map((t) => {
		const data: TravelTableData = {
			_id: t._id || t.id?.toString(),
			name: t.name,
			description: t.description,
			startDate: parseDateFromBackend(t.start_date),
			endDate: parseDateFromBackend(t.end_date),
			price: `$${t.price.toLocaleString()}`,
		};
		travelDataMap.set(t._id || t.id?.toString(), t);
		return data;
	});

	const actions = [
		...(onEdit
			? [
					{
						label: 'Editar',
						variant: 'primary' as const,
						onClick: (row: TravelTableData) => {
							const travel = travelDataMap.get(row._id);
							if (travel) onEdit(travel);
						},
					},
				]
			: []),
		{
			label: 'Eliminar',
			variant: 'danger' as const,
			onClick: (row: TravelTableData) => {
				const travel = travelDataMap.get(row._id);
				if (travel) onDelete(travel);
			},
		},
	];

	return (
		<Table<TravelTableData>
			tableName="Viajes"
			titles={['Nombre', 'Descripción', 'Fecha Inicio', 'Fecha Fin', 'Precio']}
			data={tableData}
			actions={actions}
			onAdd={onAdd}
			search={
				onSearch
					? {
							onSearch,
							placeholder: 'Buscar viaje...',
							debounceMs: 400,
							hideButton: true,
						}
					: undefined
			}
			emptyMessage={loading ? 'Cargando...' : 'No hay viajes'}
		/>
	);
}
