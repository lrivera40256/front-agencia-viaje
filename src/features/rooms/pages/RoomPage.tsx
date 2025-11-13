import { useRoom } from '../hooks/useRoom';
import { RoomForm } from '../components/RoomForm';
import { RoomTable } from '../components/RoomTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect } from 'react';
import api from '@/interceptors/msLogicInterceptor';

export function RoomPage() {
	const {
		handleSubmit,
		handleAdd,
		handleEdit,
		rooms,
		setShowForm,
		handleSearch,
		handleDelete,
		roomToEdit,
		showForm,
		loading,
		hotels,
		setHotels,
	} = useRoom();

	// Cargar hoteles reales desde la API
	useEffect(() => {
		const loadHotels = async () => {
			try {
				const response = await api.get('/hotels');
				setHotels(response.data);
			} catch (error) {
				console.error('Error loading hotels:', error);
				// Si falla, usar array vacío para que el usuario vea que no hay hoteles
				setHotels([]);
			}
		};
		loadHotels();
	}, [setHotels]);

	return (
		<div className="w-full space-y-6">
			<RoomTable
				rooms={rooms}
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
							{roomToEdit ? 'Editar Habitación' : 'Crear Nueva Habitación'}
						</DialogTitle>
					</DialogHeader>
					<RoomForm
						room={roomToEdit}
						hotels={hotels}
						onSubmit={handleSubmit}
						onCancel={() => setShowForm(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default RoomPage;
