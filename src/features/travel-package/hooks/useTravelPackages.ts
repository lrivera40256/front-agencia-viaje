import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { TravelPackage } from '../types/travel-package.type';
import { getTravelPackages } from '../services/travelPackageService';
import { CustomerService } from '../services/customerService';

export function useTravelPackages(customerId?: string) {
	const [packages, setPackages] = useState<TravelPackage[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const loadPackages = async () => {
		setLoading(true);
		setError(null);
		try {
			const data = await getTravelPackages(customerId);
			setPackages(data);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
			setError(errorMessage);
			toast.error(`Failed to load travel packages: ${errorMessage}`);
		} finally {
			setLoading(false);
		}
	};
	const createCustomer = async (payload: { name: string; email: string; password: string,travel_id},) => {
		await CustomerService.createCustomer(payload);
		toast.success("Cliente creado exitosamente");
		loadPackages();
	};

	useEffect(() => {
		loadPackages();
	}, [customerId]);

	return {
		packages,
		loading,
		error,
		refresh: loadPackages,
		createCustomer,
	};
}
