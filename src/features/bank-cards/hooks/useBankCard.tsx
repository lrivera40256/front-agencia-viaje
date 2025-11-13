import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { BankCard } from "@/features/bank-cards/types/BankCard";
import {
  createBankCard,
  deleteBankCardById,
  getBankCardById,
  getBankCards,
  updateBankCard,
} from "@/features/bank-cards/services/bankCardService";
import { useNavigate } from "react-router";

export function useBankCard(customerId?: number | string) {
  const [showForm, setShowForm] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<BankCard | null>(null);
  const [cards, setCards] = useState<BankCard[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    setCardToEdit(null);
    setShowForm(true);
  };

  const handleSubmit = async (card: BankCard) => {
    if (!card.card_number?.trim() || !card.card_holder?.trim()) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    

    try {
      if (card.id) {
        await updateBankCard(card);
        toast.success("Tarjeta actualizada exitosamente");
        setShowForm(false);
      } else {
        await createBankCard(card);
        toast.success("Tarjeta creada exitosamente");
        setShowForm(false);
      }
      await loadCards();
    } catch (error) {
      console.error(error);
      const serverMsg = (error as any)?.response?.data?.message || (error as any)?.response?.data || null;
      if (serverMsg) toast.error(typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg));
      else toast.error("Error al guardar la tarjeta");
    }
  };

  const visibleCards = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter((r) => r.card_holder?.toLowerCase().includes(q) || r.card_number?.includes(q));
  }, [cards, filter]);

  const loadCards = async () => {
    setLoading(true);
    try {
      const data = await getBankCards();
      const mapped = (data || []).map((c) => ({
        id: c.id,
        card_holder: c.card_holder,
        card_type: c.card_type,
        provider: c.provider,
        card_number: c.card_number,
        expiration_date: c.expiration_date,
        status: c.status,
        is_default: c.is_default,
        customer_id: c.customer_id,
        cvv: c.cvv,
      }));
      if (customerId) setCards(mapped.filter((c) => String(c.customer_id) === String(customerId)));
      else setCards(mapped);
    } catch (error) {
      toast.error("Error al cargar tarjetas");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (card: BankCard) => {
    setCardToEdit(cards.find((c) => c.id === card.id));
    setShowForm(true);
  };

  const handleSearch = async (q: string) => {
    setFilter(q);
    if (!q.trim()) return loadCards();
    const lower = q.toLowerCase();
    setCards((prev) => prev.filter((r) => r.card_holder?.toLowerCase().includes(lower) || r.card_number?.includes(q)));
  };

  const handleDelete = async (card: BankCard) => {
    if (!confirm("¿Eliminar esta tarjeta bancaria?")) return;
    setLoading(true);
    try {
      await deleteBankCardById(card.id!);
      toast.success("Tarjeta eliminada exitosamente");
      await loadCards();
    } catch (error) {
      toast.error("Error al eliminar tarjeta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, [customerId]);

  return {
    handleSubmit,
    handleAdd,
    handleEdit,
    cards: visibleCards,
    setShowForm,
    handleSearch,
    handleDelete,
    cardToEdit,
    showForm,
    loading,
    navigate,
    loadCards,
  };
}

export default useBankCard;
