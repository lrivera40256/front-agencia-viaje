import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { BankCard } from "@/features/bank-cards/types/BankCard";
import {
  createBankCard,
  deleteBankCardById,
  getBankCardById,
  getBankCards,
  getBankCardsByCustomer,
  updateBankCard,
} from "@/features/bank-cards/services/bankCardService";
import { useNavigate } from "react-router";
import { CustomerService } from "@/features/user/services";
import type { Customer } from "@/features/user/types/customer.type";

export function useBankCard(customerId?: number | string) {
  const [showForm, setShowForm] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<BankCard | null>(null);
  const [cards, setCards] = useState<BankCard[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = () => {
    setCardToEdit(customerId ? { customer_id: Number(customerId) } as BankCard : null);
    setShowForm(true);
  };

  const handleSubmit = async (card: BankCard) => {
    // Validaciones de campos requeridos
    if (!card.card_holder?.trim()) {
      toast.error("El nombre del titular es obligatorio");
      return;
    }
    if (!card.provider?.trim()) {
      toast.error("El proveedor de la tarjeta es obligatorio");
      return;
    }
    if (!card.card_number?.trim()) {
      toast.error("El número de tarjeta es obligatorio");
      return;
    }
    if (card.card_number.length < 16) {
      toast.error("El número de tarjeta debe tener al menos 16 dígitos");
      return;
    }
    if (card.card_number.length > 19) {
      toast.error("El número de tarjeta no puede exceder 19 dígitos");
      return;
    }
    if (!card.expiration_date?.trim()) {
      toast.error("La fecha de expiración es obligatoria");
      return;
    }
    // Validar formato MM/YY
    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationRegex.test(card.expiration_date)) {
      toast.error("La fecha de expiración debe tener el formato MM/YY");
      return;
    }
    if (!card.cvv?.trim()) {
      toast.error("El CVV es obligatorio");
      return;
    }
    if (card.cvv.length < 3 || card.cvv.length > 4) {
      toast.error("El CVV debe tener entre 3 y 4 dígitos");
      return;
    }
    if (!card.card_type) {
      toast.error("El tipo de tarjeta es obligatorio");
      return;
    }
    if (card.card_type !== 'debit' && card.card_type !== 'credit') {
      toast.error("El tipo de tarjeta debe ser débito o crédito");
      return;
    }
    if (!card.status) {
      toast.error("El estado de la tarjeta es obligatorio");
      return;
    }
    if (!card.customer_id) {
      toast.error("El cliente es obligatorio");
      return;
    }

    setLoading(true);
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
    } catch (error) {
      toast.error("Error al guardar la tarjeta");
      console.log(error);
    } finally {
      setLoading(false);
      loadCards();
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
      const data = customerId ? await getBankCardsByCustomer(customerId) : await getBankCards();
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
      setCards(mapped);
    } catch (error) {
      toast.error("Error al cargar tarjetas");
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      const data = await CustomerService.getCustomers();
      setCustomers(data);
    } catch (error) {
      toast.error("Error al cargar clientes");
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
    if (!customerId) {
      loadCustomers();
    }
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
    customerId,
    customers,
  };
}

export default useBankCard;
