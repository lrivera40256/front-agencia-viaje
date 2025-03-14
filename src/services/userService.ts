import { User } from "../models/User";

const API_URL = import.meta.env.VITE_API_URL + "/users" || "";

class UserService {
    async getUsers(): Promise<User[]> {
        console.log("Fetching users from: " + API_URL);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Error al obtener usuarios");
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            if (!response.ok) throw new Error("Usuario no encontrado");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async createUser(user: Omit<User, "id">): Promise<User | null> {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error("Error al crear usuario");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateUser(id: number, user: Partial<User>): Promise<User | null> {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!response.ok) throw new Error("Error al actualizar usuario");
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async deleteUser(id: number): Promise<boolean> {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Error al eliminar usuario");
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

// Exportamos una instancia de la clase para reutilizarla
export const userService = new UserService();
