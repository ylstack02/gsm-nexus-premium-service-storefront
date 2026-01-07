export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
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
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'rejected';
export interface Order {
  id: string;
  serviceId: string;
  customerEmail: string;
  formData: Record<string, string>;
  status: OrderStatus;
  createdAt: number;
  updatedAt: number;
  trackingId: string;
}
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number;
}