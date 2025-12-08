// ...existing code...
import React, { useState } from "react";
import { User as UserIcon, Plus, X } from "lucide-react";
import { User as UserType } from "../types";

export function UsersDetails({
    users,
    onCreateUser,
}: {
    users: UserType[];
    onCreateUser?: (payload: { name: string; email: string, password: string }) => void;
}) {
    const [showCreate, setShowCreate] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string>();
    const [password, setPassword] = useState<string>(null);


    const resetForm = () => {
        setName("");
        setEmail("");
        setError(null);
        setPassword("");
    };

    const openCreate = () => {
        resetForm();
        setShowCreate(true);
    };

    const closeCreate = () => {
        resetForm();
        setShowCreate(false);
    };

    const handleCreate = () => {
        if (!name.trim() || !email.trim() || !password) {
            setError("Nombre, email y contraseña son obligatorios.");
            return;
        }
        // validación simple de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Email no válido.");
            return;
        }
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setError(null);
        // acción viene del componente padre
        onCreateUser?.({ name: name.trim(), email: email.trim(), password: password.trim() });
        closeCreate();
    };

    return (
        <div className="p-3 border rounded-md bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-md flex items-center text-gray-700">
                    <UserIcon className="w-4 h-4 mr-2 text-orange-500" />
                    Integrantes del viaje
                </h4>

                {onCreateUser!=undefined && (
                    <button
                        type="button"
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md shadow-sm hover:bg-blue-700 transition"
                        aria-label="Crear usuario"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Añadir persona</span>
                    </button>
                )}  
            </div>

            <div className="space-y-3">
                {users && users.length > 0 ? (
                    users.map((u) => (
                        <div
                            key={u.user_id}
                            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-orange-50 w-10 h-10 flex items-center justify-center text-orange-600">
                                    <UserIcon className="w-5 h-5" />
                                </div>

                                <div>
                                    <div className="text-sm font-semibold text-gray-800">{u.name}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{u.email}</div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-sm text-gray-500">No hay usuarios disponibles.</div>
                )}
            </div>

            {/* Create user modal */}
            {showCreate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={closeCreate} />
                    <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold text-gray-800">Crear usuario</h3>
                            <button
                                type="button"
                                onClick={closeCreate}
                                className="p-1 rounded hover:bg-gray-100"
                                aria-label="Cerrar"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="p-4 space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Nombre completo"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">Contraseña</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Contraseña"
                                />
                            </div>

                            {error && <div className="text-sm text-red-600">{error}</div>}

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeCreate}
                                    className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCreate}
                                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ...existing code...