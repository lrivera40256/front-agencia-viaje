import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTravelPackages } from '../hooks/useTravelPackages';
import { TravelPackageList } from '../components/TravelPackageList';
import { LoadingOverlay } from '@/components/Loader'; // Assuming you have a Loader component

export default function TravelPackagesPage() {
	const { customerId } = useParams<{ customerId?: string }>();
	const { packages, loading, error, refresh } = useTravelPackages(
		customerId ? (customerId) : undefined
	);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">
					{customerId ? 'My Travel Packages' : 'All Travel Packages'}
				</h1>
				<button
					onClick={refresh}
					className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
					disabled={loading}
				>
					{loading ? 'Refreshing...' : 'Refresh'}
				</button>
			</div>

			{loading && <LoadingOverlay />}
			{error && <p className="text-red-500 text-center">{error}</p>}
			{!loading && !error && <TravelPackageList  />}
		</div>
	);
}
