import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TransportItineraryForm } from '../components/TransportItineraryForm';
import { TransportItineraryTable } from '../components/TransportItineraryTable';
import { useTransportItinerary } from '../hooks/useTransportItinerary';

export function TransportItineraryPage() {
	const {
		itineraries,
		showForm,
		itineraryToEdit,
		loading,
		travels,
		journeys,
		serviceTransportations,
		handleAdd,
		handleEdit,
		handleDelete,
		handleSearch,
		handleSubmit,
		setShowForm,
	} = useTransportItinerary();

	return (
		<div className="w-full">
			<TransportItineraryTable
				itineraries={itineraries}
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
							{itineraryToEdit
								? 'Editar Itinerario de Transporte'
								: 'Nuevo Itinerario de Transporte'}
						</DialogTitle>
					</DialogHeader>
					<TransportItineraryForm
						itinerary={itineraryToEdit}
						travels={travels}
						journeys={journeys}
						serviceTransportations={serviceTransportations}
						onSubmit={handleSubmit}
						onCancel={() => setShowForm(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default TransportItineraryPage;
