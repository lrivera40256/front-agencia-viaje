import type { FormField } from '@/components/form/types';
import type { Room } from '../types/Room';
import { Form } from '@/components/form/Form';

interface RoomFormProps {
	room: Room | null;
	hotels: any[];
	onSubmit: (room: Room) => void;
	onCancel: () => void;
}

export function RoomForm({ room, hotels, onSubmit, onCancel }: RoomFormProps) {
	const fields: FormField[] = [
		{
			name: 'room_number',
			label: 'Número de Habitación',
			type: 'text',
			required: true,
			placeholder: 'Ej: 101, 102...',
		},
		{
			name: 'price_per_night',
			label: 'Precio por Noche',
			type: 'text',
			required: true,
			placeholder: 'Ej: 150000',
		},
		{
			name: 'hotel_id',
			label: 'Hotel',
			type: 'select',
			required: true,
			options: hotels.map((hotel) => ({
				label: hotel.name,
				value: hotel.id?.toString() || '',
			})),
		},
	];

	const handleSubmit = (formData: any) => {
		const selectedHotelId = parseInt(formData.hotel_id);
		const selectedHotel = hotels.find((h) => h.id === selectedHotelId);

		const roomData: Room = {
			...room,
			room_number: formData.room_number,
			price_per_night: parseFloat(formData.price_per_night),
			hotel_id: selectedHotelId,
			hotel: selectedHotel,
			is_available: room?.is_available || true,
		};
		onSubmit(roomData);
	};

	return (
		<Form
			fields={fields}
			onSubmit={handleSubmit}
			onCancel={onCancel}
			title={room ? 'Editar Habitación' : 'Nueva Habitación'}
			initialValues={{
				room_number: room?.room_number || '',
				price_per_night: room?.price_per_night || '',
				hotel_id: room?.hotel_id?.toString() || '',
			}}
		/>
	);
}
