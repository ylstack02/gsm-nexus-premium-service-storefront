import { ApiResponse, Service, ServiceCategory, Order } from "../../shared/types"
import { MOCK_SERVICES, MOCK_CATEGORIES } from "../../shared/mock-data"
const SIMULATED_DELAY = 600;
// Internal mock state for orders
const MOCK_ORDERS: Order[] = [];
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  if (Math.random() < 0.001) {
    throw new Error('Simulated cluster timeout. Please retry.');
  }
  const url = new URL(path, window.location.origin);
  const pathname = url.pathname;
  // GET /api/services
  if (pathname === '/api/services') {
    const categories = url.searchParams.getAll('category');
    const query = url.searchParams.get('q')?.toLowerCase().trim();
    let results = [...MOCK_SERVICES];
    if (categories.length > 0) {
      results = results.filter(s => {
        const category = MOCK_CATEGORIES.find(c => c.id === s.categoryId || c.slug === s.categoryId);
        return categories.includes(s.categoryId) || 
               categories.includes(s.id) || 
               (category && (categories.includes(category.slug) || categories.includes(category.id)));
      });
    }
    if (query) {
      results = results.filter(s => {
        const category = MOCK_CATEGORIES.find(c => c.id === s.categoryId);
        return s.name.toLowerCase().includes(query) ||
               s.description.toLowerCase().includes(query) ||
               s.id.toLowerCase().includes(query) ||
               (category && category.name.toLowerCase().includes(query));
      });
    }
    return results as unknown as T;
  }
  // GET /api/categories
  if (pathname === '/api/categories') {
    return MOCK_CATEGORIES as unknown as T;
  }
  // GET /api/services/:id
  if (pathname.startsWith('/api/services/')) {
    const id = pathname.split('/').pop();
    const service = MOCK_SERVICES.find(s => s.id === id);
    if (!service) throw new Error('Service node not found');
    return service as unknown as T;
  }
  // POST /api/orders
  if (pathname === '/api/orders' && init?.method === 'POST') {
    const body = JSON.parse(init.body as string);
    const newOrder: Order = {
      id: `ord-${Math.random().toString(36).substr(2, 9)}`,
      serviceId: body.serviceId,
      customerEmail: body.customerEmail,
      formData: body.formData,
      status: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      trackingId: `NEX-${Math.floor(100000 + Math.random() * 900000)}`
    };
    MOCK_ORDERS.push(newOrder);
    return newOrder as unknown as T;
  }
  // GET /api/orders/:trackingId
  if (pathname.startsWith('/api/orders/')) {
    const idOrTracking = pathname.split('/').pop();
    const order = MOCK_ORDERS.find(o => o.trackingId === idOrTracking || o.id === idOrTracking);
    if (!order) throw new Error('Order record not found');
    return order as unknown as T;
  }
  // Fallback to real fetch (unused in this mock environment)
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  });
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !json.success || json.data === undefined) {
    throw new Error(json.error || 'API Protocol Error');
  }
  return json.data;
}
export const getServices = (params?: { category?: string | string[]; q?: string }) => {
  const query = new URLSearchParams();
  if (params?.category) {
    if (Array.isArray(params.category)) {
      params.category.forEach(c => query.append('category', c));
    } else {
      query.append('category', params.category);
    }
  }
  if (params?.q?.trim()) {
    query.append('q', params.q.trim());
  }
  return api<Service[]>(`/api/services?${query.toString()}`);
};
export const getCategories = () => api<ServiceCategory[]>('/api/categories');
export const getServiceById = (id: string) => api<Service>(`/api/services/${id}`);
export const createOrder = (orderData: { customerEmail: string; serviceId: string; formData: Record<string, string> }) =>
  api<Order>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
export const getOrderByTrackingId = (id: string) => api<Order>(`/api/orders/${id}`);