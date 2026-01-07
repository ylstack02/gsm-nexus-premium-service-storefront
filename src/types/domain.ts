export type FieldType = 'text' | 'number' | 'imei' | 'select' | 'textarea';
export interface FormField {
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  required: boolean;
  options?: { label: string; value: string }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}
export interface ServiceSchema {
  fields: FormField[];
}
export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  deliveryTime: string;
  status: 'available' | 'maintenance' | 'deprecated';
  featured?: boolean;
  schema: ServiceSchema;
}
export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description?: string;
}
export interface ServiceGroup {
  id: string;
  title: string;
  iconName: string;
  serviceIds: string[];
}
export interface TrustMetric {
  label: string;
  value: string;
  suffix?: string;
}