import { Activity, Hotel } from "lucide-react";
import { Plan } from "../types/travel-package.type";

export function PlanDetails({ plan }: { plan: Plan }) {
    return (
        <div className="p-3 border rounded-md bg-white shadow-sm">
            <h4 className="font-semibold text-md mb-2 flex items-center text-gray-700">
                <Hotel className="w-4 h-4 mr-2 text-orange-500" /> Plan: {plan.name}
            </h4>
            <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
            {plan.activities?.map((activity) => (
                <div
                    key={activity.id}
                    className="text-sm flex items-center my-1 pl-6 text-gray-600"
                >
                    <Activity className="w-4 h-4 mr-2 text-teal-500" />
                    <span>
                        {activity.name} en {activity.city}
                    </span>
                </div>
            ))}
        </div>
    );
}