export interface TouristActivity {
  id?: number;
  name: string;
  description?: string | null;
  city_id: number;
  price?: number | null;
  is_active?: boolean;
 
}

export default TouristActivity;
