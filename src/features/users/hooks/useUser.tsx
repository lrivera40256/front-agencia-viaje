import { User } from "@/features/users/types/User";
import { set } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createUser, deleteUserById, getUserByName, getUsers, updateUser } from "../services/userService";
import { useNavigate, useParams } from "react-router";

export function useUser() {
    const [showForm, setShowForm] = useState(false)
    const navigate = useNavigate()
    const [userToEdit, setUserToEdit] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const [filter, setFilter] = useState("")
    const [loading, setLoading] = useState(false)
    const handleAdd = () => {
        setUserToEdit(null)
        setShowForm(true)
    }
    const handleSubmit = async (user: User) => {
        if (user.name.trim() === "" || user.email.trim() === "") {
            toast.error("Por favor completa todos los campos obligatorios")
            return
        }
        try {
            if (user._id) {
                await updateUser(user)
                toast.success("Usuario actualizado exitosamente")
                setShowForm(false)
            } else {
                await createUser(user)
                toast.success("Usuario creado exitosamente")
                setShowForm(false)
            }
        } catch (error) {
            toast.error("Error al guardar el usuario")
            console.log(error);
        }
    }
    const visibleUsers = useMemo(() => {
        const q = filter.trim().toLowerCase()
        if (!q) return users.map(r => { return { _id: r._id, name: r.name, email: r.email } })
        return users.filter(r => r.name.toLowerCase().includes(q)).map(r => { return { _id: r._id, name: r.name, email: r.email } })
    }, [users, filter])

    const loadUsers = async () => {
        setLoading(true)
        try {
            const data = await getUsers()
            setUsers(data)
        } catch {
            toast.error("Error al cargar usuarios")
        } finally {
            setLoading(false)
        }
    }
    const handleEdit = (user: User) => {
        setUserToEdit(user)
        setShowForm(true)
    }
    const handleSearch = async (q: string) => {
        setFilter(q)
        if (!q.trim()) return loadUsers()

        if (q.includes("@")) {
            try {
                const found = await getUserByName(q.trim())
                setUsers(found ? [found] : [])
            } catch {
                setUsers([])
            }
            return
        }

        const lower = q.toLowerCase()
        setUsers(prev =>
            prev.filter(r => r.name?.toLowerCase().includes(lower))
        )
    }
    const handleDelete = async (user: User) => {
        if (!confirm("¿Eliminar este usuario?")) return
        setLoading(true)
        try {
            await deleteUserById(user._id)
            toast.success("Usuario eliminado exitosamente")
            await loadUsers()
        } catch {
            toast.error("Error al eliminar usuario")
        } finally {
            setLoading(false)
        }
    }
    const onRoleClick = (user: User) => {
        navigate(`/roles/${user._id}`);
    }
    useEffect(() => {
        loadUsers()
    }, [])
    return {
        handleSubmit,
        handleAdd,
        handleEdit,
        users: visibleUsers,
        setShowForm,
        handleSearch,
        handleDelete,
        userToEdit,
        showForm,
        loading,
        onRoleClick
    }

}