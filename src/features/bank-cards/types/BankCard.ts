export interface BankCard {
  id?: number;
  card_holder: string;
  card_type: 'debit' | 'credit';
  provider: string;
  card_number: string;
  expiration_date: string;
  cvv?: string;
  status: 'active' | 'inactive' | 'blocked';
  is_default?: boolean;
  customer_id: number;
  createdAt?: string;
  updatedAt?: string;
}

export default BankCard;
