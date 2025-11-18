import { UserTable } from "../components/UserTable";
import { useUser } from "../hooks/useUser";
import { LoadingOverlay } from "@/components/Loader";
import { FormField } from "@/components/form/types";
import { UserForm } from "../components/UserForm";

export default function RolePage() {
    const {
        users,
        loading,
        showForm,
        userToEdit,
        handleSubmit,
        handleAdd,
        handleDelete,
        handleEdit,
        handleSearch,
        setShowForm,
        onRoleClick
    } = useUser();
    const fields = [
        { name: "name", label: "Nombre", required: true, type: "text" },
        { name: "email", label: "Email", type: "email", required: true },
        ...(userToEdit ? [] : [{ name: "password", label: "Contraseña", type: "password", required: true }]),
    ] as FormField[];
    console.log(users);
    
    return (
        <div>
            {loading && <LoadingOverlay />}

            <UserTable
                users={users}
                loading={loading}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSearch={handleSearch}
                onRoleClick={onRoleClick}
            />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-3 w-full max-w-xs my-12">
                        <UserForm
                            fields={fields}
                            initial={userToEdit}
                            onSubmit={handleSubmit}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
