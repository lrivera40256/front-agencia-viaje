import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import UserLogicForm from '../components/UserLogicForm';
import UserLogicTable from '../components/UserLogicTable';
import { useUserLogic } from '../hooks/useUserLogic';

export function UserLogicPage() {
	const {
		handleSubmit,
		handleAdd,
		handleEdit,
		users,
		setShowForm,
		handleSearch,
		handleDelete,
		userToEdit,
		showForm,
		loading,
		documentTypes,
	} = useUserLogic();

	return (
		<div className="p-6">
			<UserLogicTable
				users={users}
				loading={loading}
				onAdd={handleAdd}
				onDelete={handleDelete}
				onEdit={handleEdit}
				onSearch={handleSearch}
			/>

			<Dialog open={showForm} onOpenChange={setShowForm}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>
							{userToEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
						</DialogTitle>
						<DialogDescription>
							{userToEdit
								? 'Modifica la información del usuario'
								: 'Completa el formulario para crear un nuevo usuario'}
						</DialogDescription>
					</DialogHeader>
					<UserLogicForm
						user={userToEdit || undefined}
						onSubmit={handleSubmit}
						documentTypes={documentTypes}
						onCancel={() => setShowForm(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default UserLogicPage;
