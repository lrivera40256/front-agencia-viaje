import React, { useEffect, useState } from 'react';
import type { Plan } from '../types/Plan';
import type { TouristActivity } from '@/features/tourist-activities/types/TouristActivity';

interface Props {
  initial?: Plan;
  onCancel: () => void;
  onCreated: (plan: Plan) => void;
  activities: TouristActivity[];
}

export const CreatePlanForm = ({  onCancel, onCreated ,activities}: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<number | ''>('');
  const [selectedActivityIds, setSelectedActivityIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);


  const toggleActivity = (id: number) => {
    setSelectedActivityIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const plan: Partial<Plan> = {
        name,
        description,
        duration_days: typeof duration === 'number' ? duration : undefined,
        activities: selectedActivityIds,
        is_active: true,
      };
      onCreated(plan as Plan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <input className="border px-3 py-2 rounded" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea className="border px-3 py-2 rounded" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" className="border px-3 py-2 rounded" placeholder="Duración (días)" value={duration as any} onChange={(e) => setDuration(e.target.value ? Number(e.target.value) : '')} />

      <div>
        <div className="text-sm font-semibold mb-2">Actividades</div>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-auto">
          {activities.map((a: any) => (
            <label key={a.id} className="text-sm">
              <input type="checkbox" className="mr-2" checked={selectedActivityIds.includes(a.id)} onChange={() => toggleActivity(a.id)} />
              {a.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded bg-gray-100">Cancelar</button>
        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white">{loading ? 'Creando...' : 'Crear plan'}</button>
      </div>
    </form>
  );
};

export default CreatePlanForm;
