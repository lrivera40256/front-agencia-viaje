import React, { useEffect, useState } from 'react';
import { getPlansByCity, createPlan } from '../services/planService';
import PlanCard from './PlanCard';
import CreatePlanForm from './CreatePlanForm';
import type { Plan } from '../types/Plan';
import { getTouristActivitiesByCity } from '@/features/tourist-activities/services/touristActivityService';
import type { TouristActivity } from '@/features/tourist-activities/types/TouristActivity';

interface Props {
  cityId?: number | string;
  initialSelected?: number[];
  onChange?: (selected: Plan[]) => void;
}

export const PlansSelector = ({ cityId, initialSelected = [], onChange }: Props) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>(initialSelected);
  const [showCreate, setShowCreate] = useState(false);
  const [activities, setActivities] = useState<TouristActivity[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getPlansByCity(cityId);
      setPlans(data || []);
      // load activities once to map names/prices for cards
      try {
        const acts = await getTouristActivitiesByCity(cityId as number);
        setActivities(acts || []);
      } catch (err) {
        setActivities([]);
      }
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    load();
  }, [cityId]);

  const toggle = (plan: Plan) => {
    setSelectedIds((prev) => {
      const exists = prev.includes(plan.id as number);
      const next = exists ? prev.filter((id) => id !== plan.id) : [...prev, plan.id as number];
      onChange?.(plans.filter((p) => next.includes(p.id as number)));
      return next;
    });
  };

  const handleCreate = async (payload: Partial<Plan>) => {
    const created = await createPlan(payload);
    await load();
    setShowCreate(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500">{selectedIds.length} seleccionados</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowCreate(true)} className="px-2 py-1 bg-green-600 text-white text-xs rounded">Crear plan</button>
        </div>
      </div>

      {loading && <div className="text-sm text-gray-500">Cargando planes…</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {plans.map((p) => {
          const planActivities = (p.activities || [])
          return <PlanCard key={p.id} plan={p} activities={planActivities} selected={selectedIds.includes(p.id as number)} onClick={toggle} />;
        })}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCreate(false)} />
          <div className="relative z-10 w-full max-w-2xl mx-4 bg-white p-6 rounded shadow">
            <h4 className="text-lg font-semibold mb-3">Crear plan</h4>
            <CreatePlanForm activities={activities} onCancel={() => setShowCreate(false)} onCreated={async (p) => await handleCreate(p)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansSelector;
