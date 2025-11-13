import { useEffect, useMemo, useState } from "react";
import type { ServiceTransportation } from "@/features/transportation/types/ServiceTransportation";
import { ServiceTransportationService } from "@/features/transportation/services";

export default function useServiceTransportation() {
  const [items, setItems] = useState<ServiceTransportation[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<ServiceTransportation | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await ServiceTransportationService.list();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = () => {
    setItemToEdit(null);
    setShowForm(true);
  };
  const handleEdit = (row: ServiceTransportation) => {
    setItemToEdit(row);
    setShowForm(true);
  };
  const handleDelete = async (row: ServiceTransportation) => {
    if (!row.id) return;
    setLoading(true);
    try {
      await ServiceTransportationService.remove(row.id);
      await fetchAll();
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (values: ServiceTransportation) => {
    setLoading(true);
    try {
      if (values.id) {
        await ServiceTransportationService.update(values);
      } else {
        await ServiceTransportationService.create(values);
      }
      setShowForm(false);
      await fetchAll();
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    showForm,
    itemToEdit,
    fetchAll,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSubmit,
    setShowForm,
  } as const;
}
