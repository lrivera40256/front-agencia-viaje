import { Table } from '@/components/table/Table';
import { useCustomer } from '../context/customerContext';
import { Customer } from '../types/customer.type';
import { useNavigate } from 'react-router';
import { C } from 'node_modules/framer-motion/dist/types.d-BJcRxCew';
import { useEffect } from 'react';

export const CustomerTable = () => {
	const { customers, loading, addCustomer, editCustomer, onDelete } = useCustomer();
	const navigate = useNavigate();
	const onCardsClick = (c: Customer) => {
		// navigate to bank cards page for this customer
		navigate(`/tarjetas/${c.id}`);
	};
	const actions = [
		{ label: 'Editar', variant: 'primary' as const, onClick: editCustomer },
		{ label: 'Eliminar', variant: 'danger' as const, onClick: onDelete },
		{ label: 'Tarjetas', variant: 'neutral' as const, onClick: onCardsClick },
	];
	if (!customers) {
		return null;
	}
	return (
		<Table<Pick<Customer, 'id' | 'name' | 'email'>>
			tableName="Clientes"
			titles={['Nombre', 'Email']}
			data={customers.map((c) => ({ id: c.id, name: c.name, email: c.email }))}
			onAdd={addCustomer}
			actions={actions}
			emptyMessage={loading ? 'Cargando...' : 'No hay clientes'}
		/>
	);
};
