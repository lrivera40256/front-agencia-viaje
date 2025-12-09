import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { TouristActivity } from "@/features/tourist-activities/types/TouristActivity";
import {
  createTouristActivity,
  deleteTouristActivityById,
  getTouristActivityById,
  getTouristActivityByName,
  updateTouristActivity,
} from "@/features/tourist-activities/services/touristActivityService";
import { useNavigate } from "react-router";
import { CitiesService } from "@/services/citieService";
import { DepartamentService } from "@/services/departamentService";
import { Departament } from "@/models/departaments";
import type { City } from "@/features/journeys/types/Journey";

export function useTouristActivity() {
  const [showForm, setShowForm] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<TouristActivity | null>(null);
  const [activities, setActivities] = useState<TouristActivity[]>([]);
  const [departments, setDepartments] = useState<Departament[]>([]);
  const [cities, setCities] = useState<City[]>([]);
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
      // const data = await getTouristActivities();
      setActivities([]);
      // setActivities(data.map((item) => ({ id: item.id, name: item.name, description: item.description, city_id: item.city_id, price: item.price, is_active: item.is_active })));
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

  const loadDepartments = async () => {
    try {
      const response: Departament[] = await DepartamentService.getAllDepartaments();
      setDepartments(response);
    } catch (error) {
      toast.error("Error al cargar departamentos");
    }
  };

  const loadCitiesByDepartment = async (departmentId: number) => {
    try {
      const response: City[] = await CitiesService.getCitiesByDepartament(departmentId);
      setCities(response);
    } catch (error) {
      toast.error("Error al cargar ciudades");
      setCities([]);
    }
  };

  useEffect(() => {
    loadActivities();
    loadDepartments();
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
    departments,
    cities,
    loadCitiesByDepartment,
  };
}

export default useTouristActivity;
