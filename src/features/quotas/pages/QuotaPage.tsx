import { useState } from 'react';
import { useQuota } from '../hooks/useQuota';
import { QuotaForm } from '../components/QuotaForm';
import { QuotaTable } from '../components/QuotaTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function QuotaPage() {
	const {
		handleSubmit,
		handleAdd,
		handleEdit,
		quotas,
		setShowForm,
		handleSearch,
		handleDelete,
		quotaToEdit,
		showForm,
		loading,
		travels,
	} = useQuota();

	return (
		<div className="w-full space-y-6">

			<QuotaTable
				quotas={quotas}
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
							{quotaToEdit ? 'Editar Cuota' : 'Crear Nueva Cuota'}
						</DialogTitle>
					</DialogHeader>
					<QuotaForm
						quota={quotaToEdit}
						travels={travels}
						onSubmit={handleSubmit}
						onCancel={() => setShowForm(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default QuotaPage;
