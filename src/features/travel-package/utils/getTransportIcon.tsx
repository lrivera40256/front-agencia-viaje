import { Plane, Bus, Train, Car } from 'lucide-react';

export function getTransportIcon(type: string) {
	const className = 'w-4 h-4 mr-2 text-gray-600';
	const lowerType = type.toLowerCase();
	if (lowerType.includes('plane') || lowerType.includes('aeronave')) return <Plane className={className} />;
	if (lowerType.includes('car') || lowerType.includes('carro')) return <Car className={className} />;
	return <Car className={className} />;
}
