export interface Plan {
  id?: number;
  name: string;
  description?: string | null;
  duration_days?: number | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  activities?: any[];
}

export default Plan;
