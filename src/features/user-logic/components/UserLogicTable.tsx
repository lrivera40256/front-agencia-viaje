import { Table } from '@/components/table/Table';
import type { User } from '../types/User';

export interface UserLogicTableData {
	id: string;
	name: string;
	email: string;
	phone: string;
	identificationNumber: string;
	documentType: string;
}

export interface UserLogicTableProps {
	users: User[];
	loading?: boolean;
	onAdd: () => void;
	onDelete: (user: User) => void | Promise<void>;
	onEdit?: (user: User) => void;
	onSearch?: (q: string) => void;
}

export function UserLogicTable({
	users,
	loading,
	onAdd,
	onDelete,
	onEdit,
	onSearch,
}: UserLogicTableProps) {
	const userDataMap = new Map<string, User>();

	const tableData = users.map((u) => {
		const data: UserLogicTableData = {
			id: u.id?.toString() || '',
			name: u.name || 'N/A',
			email: u.email || 'N/A',
			phone: u.phone || 'N/A',
			identificationNumber: u.identification_number || 'N/A',
			documentType: u.document_type || 'N/A',
		};
		userDataMap.set(u.id?.toString() || '', u);
		return data;
	});

	const actions = [
		...(onEdit
			? [
					{
						label: 'Editar',
						variant: 'primary' as const,
						onClick: (row: UserLogicTableData) => {
							const user = userDataMap.get(row.id);
							if (user) onEdit(user);
						},
					},
				]
			: []),
		{
			label: 'Eliminar',
			variant: 'danger' as const,
			onClick: (row: UserLogicTableData) => {
				const user = userDataMap.get(row.id);
				if (user) onDelete(user);
			},
		},
	];

	return (
		<Table<UserLogicTableData>
			tableName="Usuarios"
			titles={['Nombre', 'Email', 'Teléfono', 'Identificación', 'Tipo Doc.']}
			data={tableData}
			actions={actions}
			onAdd={onAdd}
			search={
				onSearch
					? {
							onSearch,
							placeholder: 'Buscar usuario...',
							debounceMs: 400,
							hideButton: true,
						}
					: undefined
			}
			emptyMessage={loading ? 'Cargando...' : 'No hay usuarios'}
		/>
	);
}

export default UserLogicTable;
