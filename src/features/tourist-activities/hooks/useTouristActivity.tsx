import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { TouristActivity } from "@/features/tourist-activities/types/TouristActivity";
import {
  createTouristActivity,
  deleteTouristActivityById,
  getTouristActivityById,
  getTouristActivityByName,
  getTouristActivities,
  updateTouristActivity,
} from "@/features/tourist-activities/services/touristActivityService";
import { useNavigate } from "react-router";

export function useTouristActivity() {
  const [showForm, setShowForm] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<TouristActivity | null>(null);
  const [activities, setActivities] = useState<TouristActivity[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    setActivityToEdit(null);
    setShowForm(true);
  };

  const handleSubmit = async (activity: TouristActivity) => {
    if (!activity.name?.trim()) {
      toast.error("Por favor completa el nombre");
      return;
    }

    try {
      if (activity.id) {
        await updateTouristActivity(activity);
        toast.success("Actividad actualizada exitosamente");
        setShowForm(false);
      } else {
        await createTouristActivity(activity);
        toast.success("Actividad creada exitosamente");
        setShowForm(false);
      }
      await loadActivities();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar la actividad");
    }
  };

  const visibleActivities = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return activities;
    return activities.filter((r) => r.name?.toLowerCase().includes(q));
  }, [activities, filter]);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await getTouristActivities();
      setActivities(data.map((item) => ({ id: item.id, name: item.name, description: item.description, city_id: item.city_id, price: item.price, is_active: item.is_active })));
    } catch (error) {
      toast.error("Error al cargar actividades");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (activity: TouristActivity) => {
    setActivityToEdit(activity);
    setShowForm(true);
  };

  const handleSearch = async (q: string) => {
    setFilter(q);
    if (!q.trim()) return loadActivities();

    try {
      const found = await getTouristActivityByName(q.trim());
      setActivities(found ? [found] : []);
    } catch (error) {
      // fallback to client filtering
      const lower = q.toLowerCase();
      setActivities((prev) => prev.filter((r) => r.name?.toLowerCase().includes(lower)));
    }
  };

  const handleDelete = async (activity: TouristActivity) => {
    if (!confirm("¿Eliminar esta actividad turística?")) return;
    setLoading(true);
    try {
      await deleteTouristActivityById(activity.id!);
      toast.success("Actividad eliminada exitosamente");
      await loadActivities();
    } catch (error) {
      toast.error("Error al eliminar actividad");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return {
    handleSubmit,
    handleAdd,
    handleEdit,
    activities: visibleActivities,
    setShowForm,
    handleSearch,
    handleDelete,
    activityToEdit,
    showForm,
    loading,
    navigate,
  };
}

export default useTouristActivity;
