import { useJourney } from '../hooks/useJourney';
import { JourneyForm } from '../components/JourneyForm';
import { JourneyTable } from '../components/JourneyTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function JourneyPage() {
	const {
		handleSubmit,
		handleAdd,
		handleEdit,
		journeys,
		setShowForm,
		handleSearch,
		handleDelete,
		journeyToEdit,
		showForm,
		loading,
		cities,
	} = useJourney();

	return (
		<div className="w-full space-y-6">
			<JourneyTable
				journeys={journeys}
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
							{journeyToEdit ? 'Editar Trayecto' : 'Crear Nuevo Trayecto'}
						</DialogTitle>
					</DialogHeader>
					<JourneyForm
						journey={journeyToEdit}
						cities={cities}
						onSubmit={handleSubmit}
						onCancel={() => setShowForm(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default JourneyPage;
