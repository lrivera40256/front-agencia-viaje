import { useJourney } from '../hooks/useJourney';
import { JourneyForm } from '../components/JourneyForm';
import { JourneyTable } from '../components/JourneyTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"


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
		originCities,
		destinationCities,
		departments,
		loadCitiesByDepartment,
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
					<VisuallyHidden>
						<DialogTitle>Formulario</DialogTitle>
					</VisuallyHidden>
					<JourneyForm
						journey={journeyToEdit}
						originCities={originCities}
						destinationCities={destinationCities}
						departments={departments}
						onSubmit={handleSubmit}
						onCancel={() => setShowForm(false)}
						onDepartmentChange={loadCitiesByDepartment}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default JourneyPage;
