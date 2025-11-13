import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VehicleForm } from '../components/VehicleForm';
import { VehicleTable } from '../components/VehicleTable';
import { useVehicle } from '../hooks/useVehicle';

export function VehiclePage() {
	const {
		vehicles,
		showForm,
		vehicleToEdit,
		loading,
		handleAdd,
		handleEdit,
		handleDelete,
		handleSearch,
		handleSubmit,
		setShowForm,
	} = useVehicle();

	return (
		<div className="w-full">
			<VehicleTable
				vehicles={vehicles}
				loading={loading}
				onAdd={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onSearch={handleSearch}
			/>

			<Dialog open={showForm} onOpenChange={setShowForm}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{vehicleToEdit ? 'Editar Vehículo' : 'Nuevo Vehículo'}
						</DialogTitle>
					</DialogHeader>
					<VehicleForm
						vehicle={vehicleToEdit}
						onSubmit={handleSubmit}
						onCancel={() => setShowForm(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default VehiclePage;
