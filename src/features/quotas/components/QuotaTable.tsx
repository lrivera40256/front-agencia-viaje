import { Table } from '@/components/table/Table';
import type { Quota } from '../types/Quota';

export interface QuotaTableData {
	id: string;
	travelName: string;
	amount: string;
	numberPayments: string;
	createdAt: string;
}

export interface QuotaTableProps {
	quotas: Quota[];
	loading?: boolean;
	onAdd: () => void;
	onDelete: (quota: Quota) => void | Promise<void>;
	onEdit?: (quota: Quota) => void;
	onSearch?: (q: string) => void;
}

export function QuotaTable({
	quotas,
	loading,
	onAdd,
	onDelete,
	onEdit,
	onSearch,
}: QuotaTableProps) {
	const quotaDataMap = new Map<string, Quota>();

	const tableData = quotas.map((q) => {
		const data: QuotaTableData = {
			id: q.id?.toString() || '',
			travelName: q.travel?.name || 'N/A',
			amount: `$${q.amount.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
			numberPayments: q.number_payments.toString(),
			createdAt: q.createdAt ? new Date(q.createdAt).toLocaleDateString('es-ES') : 'N/A',
		};
		quotaDataMap.set(q.id?.toString() || '', q);
		return data;
	});

	const actions = [
		...(onEdit
			? [
					{
						label: 'Editar',
						variant: 'primary' as const,
						onClick: (row: QuotaTableData) => {
							const quota = quotaDataMap.get(row.id);
							if (quota) onEdit(quota);
						},
					},
				]
			: []),
		{
			label: 'Eliminar',
			variant: 'danger' as const,
			onClick: (row: QuotaTableData) => {
				const quota = quotaDataMap.get(row.id);
				if (quota) onDelete(quota);
			},
		},
	];

	return (
		<Table<QuotaTableData>
			tableName="Cuotas"
			titles={['Viaje', 'Monto', 'Número de Pagos', 'Fecha Creación']}
			data={tableData}
			actions={actions}
			onAdd={onAdd}
			search={
				onSearch
					? {
							onSearch,
							placeholder: 'Buscar cuota...',
							debounceMs: 400,
							hideButton: true,
						}
					: undefined
			}
			emptyMessage={loading ? 'Cargando...' : 'No hay cuotas'}
		/>
	);
}
