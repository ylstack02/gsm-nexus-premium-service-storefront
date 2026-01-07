import type { Service, ServiceCategory, User, Chat, ChatMessage } from './types';
export const MOCK_CATEGORIES: ServiceCategory[] = [
  { id: 'cat-1', name: 'Apple Unlocks', slug: 'apple-unlocks', iconName: 'Smartphone', description: 'Factory unlock services for all iPhone models.' },
  { id: 'cat-2', name: 'Samsung FRP', slug: 'samsung-frp', iconName: 'ShieldCheck', description: 'Remote removal of Google Account locks.' },
  { id: 'cat-3', name: 'Server Logs', slug: 'server-logs', iconName: 'Server', description: 'Instant server check services and database logs.' },
  { id: 'cat-4', name: 'Xiaomi Services', slug: 'xiaomi-auth', iconName: 'Cpu', description: 'Mi Account removal and Auth flashing.' },
];
export const MOCK_SERVICES: Service[] = [
  {
    id: 'svc-1',
    categoryId: 'cat-1',
    name: 'iPhone Worldwide Unlock (All Models)',
    description: 'Permanent factory unlock for any carrier worldwide. Supports iPhone 6 to iPhone 15 Pro Max.',
    price: 45.00,
    currency: 'USD',
    deliveryTime: '1-3 Days',
    status: 'available',
    featured: true,
    schema: {
      fields: [
        { name: 'imei', label: 'IMEI Number', type: 'imei', required: true, validation: { minLength: 15, maxLength: 15, message: 'IMEI must be 15 digits' } },
        { name: 'model', label: 'Device Model', type: 'select', required: true, options: [
          { label: 'iPhone 15 Pro Max', value: '15pm' },
          { label: 'iPhone 15', value: '15' },
          { label: 'iPhone 14 Series', value: '14' },
          { label: 'iPhone 13 Series', value: '13' }
        ]}
      ]
    }
  },
  {
    id: 'svc-2',
    categoryId: 'cat-2',
    name: 'Samsung FRP Removal (Instant)',
    description: 'Instant remote removal of Google FRP lock via USB Redirector.',
    price: 15.50,
    currency: 'USD',
    deliveryTime: '5-30 Mins',
    status: 'available',
    featured: true,
    schema: {
      fields: [
        { name: 'model', label: 'Device Model', type: 'text', required: true, placeholder: 'e.g. SM-G991B' },
        { name: 'connection_id', label: 'USB Redirector ID', type: 'text', required: true }
      ]
    }
  },
  {
    id: 'svc-3',
    categoryId: 'cat-3',
    name: 'iPhone GSX Full Report',
    description: 'Comprehensive Apple GSX check providing warranty, activation, and purchase info.',
    price: 1.99,
    currency: 'USD',
    deliveryTime: '1-5 Mins',
    status: 'available',
    schema: {
      fields: [
        { name: 'imei', label: 'IMEI or Serial Number', type: 'text', required: true }
      ]
    }
  }
];
export const MOCK_USERS: User[] = [{ id: 'u1', name: 'Guest User' }];
export const MOCK_CHATS: Chat[] = [];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [];