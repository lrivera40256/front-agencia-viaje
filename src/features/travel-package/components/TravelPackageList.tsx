import React from 'react';
import { TravelPackage } from '../types/travel-package.type';
import { TravelPackageItem } from './TravelPackageItem';

interface TravelPackageListProps {
	packages: TravelPackage[];
}

export function TravelPackageList({ packages }: TravelPackageListProps) {
	if (packages.length === 0) {
		return <p className="text-center text-gray-500">No travel packages found.</p>;
	}

	return (
		<div className="space-y-4">
			{packages.map((pkg) => (
				<TravelPackageItem key={pkg.id} package={pkg} />
			))}
		</div>
	);
}
