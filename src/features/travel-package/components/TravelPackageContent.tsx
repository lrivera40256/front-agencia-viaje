import React from 'react';
import { TravelPackage } from '../types/travel-package.type';
import { ItineraryDetails } from './ItineraryDetails';
import { PlanDetails } from './PlanDetails';
import { UsersDetails } from './UsersDetails';

interface TravelPackageContentProps {
	travelPackage: TravelPackage;
	isExpanded: boolean;
	onCreateCustomer?: (payload: { name: string; email: string; password: string }) => void;
}

export function TravelPackageContent({
	travelPackage,
	isExpanded,
	onCreateCustomer,
}: TravelPackageContentProps) {
	if (!isExpanded) return null;

	const canCreateCustomer = travelPackage.state === 'draft';

	return (
		<div className="p-4 bg-gray-50 border-t space-y-4">
			{travelPackage.itineraries?.map((itinerary, index) => (
				<ItineraryDetails key={index} itinerary={itinerary} />
			))}
			{travelPackage.plans?.map((plan) => (
				<PlanDetails key={plan.id} plan={plan} />
			))}
			{travelPackage.customers && (
				<UsersDetails
					users={travelPackage.customers}
					onCreateUser={canCreateCustomer ? onCreateCustomer : undefined}
				/>
			)}
		</div>
	);
}
