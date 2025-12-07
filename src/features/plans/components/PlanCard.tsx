import React, { useState } from 'react';
import type { Plan } from '../types/Plan';
import type { TouristActivity } from '@/features/tourist-activities/types/TouristActivity';

interface Props {
  plan: Plan;
  activities?: TouristActivity[];
  selected?: boolean;
  onClick?: (plan: Plan) => void;
}

export const PlanCard = ({ plan, activities = [], selected, onClick }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick?.(plan)}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.(plan)}
      className={`cursor-pointer p-4 border rounded-lg bg-white hover:shadow-md transition ${selected ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <h4 className="font-semibold text-sm">{plan.name}</h4>
          {plan.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{plan.description}</p>}
        </div>

        <div className="text-right text-xs text-gray-600">
          <div>{plan.duration_days ? `${plan.duration_days} días` : '—'}</div>
          <div className="mt-2">{plan.is_active ? 'Activo' : 'Inactivo'}</div>
        </div>
      </div>

      <div className="mt-3">
        <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }} className="text-xs text-blue-600 underline">
          {open ? 'Ocultar actividades' : `Ver actividades (${activities.length})`}
        </button>

        {open && activities.length > 0 && (
          <div className="mt-2 text-sm text-gray-700 border-t pt-2 max-h-48 overflow-auto">
            {activities.map((a) => (
              <div key={a.id} className="mb-2">
                <div className="font-medium">{a.name} {a.price ? <span className="text-gray-600">· ${a.price}</span> : null}</div>
                {a.description ? <div className="text-xs text-gray-500">{a.description}</div> : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
