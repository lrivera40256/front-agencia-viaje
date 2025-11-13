import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { Room } from '@/features/rooms/types/Room';
import {
	createRoom,
	deleteRoomById,
	getRooms,
	updateRoom,
} from '@/features/rooms/services/roomService';

export function useRoom() {
	const [showForm, setShowForm] = useState(false);
	const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
	const [rooms, setRooms] = useState<Room[]>([]);
	const [filter, setFilter] = useState('');
	const [loading, setLoading] = useState(false);
	const [hotels, setHotels] = useState<any[]>([]);

	const handleAdd = () => {
		setRoomToEdit(null);
		setShowForm(true);
	};

	const handleSubmit = async (room: Room) => {
		// Validations
		if (!room.room_number || !room.room_number.trim()) {
			toast.error('Por favor ingresa el número de habitación');
			return;
		}

		if (!room.price_per_night || room.price_per_night <= 0) {
			toast.error('Por favor ingresa un precio válido');
			return;
		}

		if (!room.hotel_id) {
			toast.error('Por favor selecciona un hotel');
			return;
		}

		try {
			if (room.id) {
				await updateRoom(room);
				toast.success('Habitación actualizada exitosamente');
				setShowForm(false);
			} else {
				await createRoom(room);
				toast.success('Habitación creada exitosamente');
				setShowForm(false);
			}
			await loadRooms();
		} catch (error) {
			console.error(error);
			toast.error('Error al guardar la habitación');
		}
	};

	const visibleRooms = useMemo(() => {
		const q = filter.trim().toLowerCase();
		if (!q) return rooms;
		return rooms.filter((room) => {
			const roomNumber = room.room_number?.toLowerCase() || '';
			const hotelName = room.hotel?.name?.toLowerCase() || '';
			return roomNumber.includes(q) || hotelName.includes(q);
		});
	}, [rooms, filter]);

	const loadRooms = async () => {
		setLoading(true);
		try {
			const data = await getRooms();
			const hotelMap = new Map();
			hotels.forEach((h: any) => hotelMap.set(h.id, h));

			setRooms(
				data.map((item: any) => ({
					id: item.id,
					room_number: item.room_number,
					price_per_night: item.price_per_night,
					is_available: item.is_available,
					hotel_id: item.hotel_id,
					hotel: item.hotel || hotelMap.get(item.hotel_id),
					createdAt: item.createdAt,
					updatedAt: item.updatedAt,
				}))
			);
		} catch (error) {
			toast.error('Error al cargar habitaciones');
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (room: Room) => {
		setRoomToEdit(room);
		setShowForm(true);
	};

	const handleSearch = (q: string) => {
		setFilter(q);
	};

	const handleDelete = async (room: Room) => {
		if (!confirm('¿Eliminar esta habitación?')) return;
		setLoading(true);
		try {
			await deleteRoomById(room.id!);
			toast.success('Habitación eliminada exitosamente');
			await loadRooms();
		} catch (error) {
			toast.error('Error al eliminar habitación');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadRooms();
	}, []);

	return {
		handleSubmit,
		handleAdd,
		handleEdit,
		rooms: visibleRooms,
		setShowForm,
		handleSearch,
		handleDelete,
		roomToEdit,
		showForm,
		loading,
		hotels,
		setHotels,
	};
}

export default useRoom;
