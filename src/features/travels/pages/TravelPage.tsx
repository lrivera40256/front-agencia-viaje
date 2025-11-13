import { TravelTable } from '../components/TravelTable';
import { useTravel } from '../hooks/useTravel';
import { LoadingOverlay } from '@/components/Loader';
import { FormField } from '@/components/form/types';
import { TravelForm } from '../components/TravelForm';

export default function TravelPage() {
	const {
		travels,
		loading,
		showForm,
		travelToEdit,
		handleSubmit,
		handleAdd,
		handleDelete,
		handleEdit,
		handleSearch,
		setShowForm,
	} = useTravel();

	const fields = [
		{ name: 'name', label: 'Nombre del viaje', required: true, type: 'text' },
		{
			name: 'description',
			label: 'Descripción',
			type: 'textarea',
			required: true,
		},
		{
			name: 'start_date',
			label: 'Fecha de inicio',
			type: 'date',
			required: true,
		},
		{
			name: 'end_date',
			label: 'Fecha de fin',
			type: 'date',
			required: true,
		},
		{
			name: 'price',
			label: 'Precio',
			type: 'number',
			required: true,
		},
	] as FormField[];

	return (
		<div>
			{loading && <LoadingOverlay />}

			<TravelTable
				travels={travels}
				loading={loading}
				onAdd={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onSearch={handleSearch}
			/>

			{showForm && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
					<div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-sm my-12 max-h-screen overflow-y-auto">
						<TravelForm
							fields={fields}
							initial={travelToEdit}
							onSubmit={handleSubmit}
							onCancel={() => setShowForm(false)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
