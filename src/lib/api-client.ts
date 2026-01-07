import { ApiResponse, Service, ServiceCategory, Order } from "../../shared/types"
import { MOCK_SERVICES, MOCK_CATEGORIES } from "../../shared/mock-data"
const SIMULATED_DELAY = 600;
// Internal mock state for orders since we don't have a real backend in this phase
const MOCK_ORDERS: Order[] = [];
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  if (Math.random() < 0.005) {
    throw new Error('Random simulated network failure');
  }
  const url = new URL(path, window.location.origin);
  const pathname = url.pathname;
  // GET /api/services
  if (pathname === '/api/services') {
    const category = url.searchParams.get('category');
    const query = url.searchParams.get('q')?.toLowerCase();
    let results = [...MOCK_SERVICES];
    if (category) results = results.filter(s => s.categoryId === category);
    if (query) results = results.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query)
    );
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
    if (!service) throw new Error('Service not found');
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
    if (!order) throw new Error('Order not found');
    return order as unknown as T;
  }
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...init
  })
  const json = (await res.json()) as ApiResponse<T>
  if (!res.ok || !json.success || json.data === undefined) {
    throw new Error(json.error || 'Request failed')
  }
  return json.data
}
export const getServices = (params?: { category?: string; q?: string }) => {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.q) query.append('q', params.q);
  const queryString = query.toString();
  return api<Service[]>(`/api/services${queryString ? `?${queryString}` : ''}`);
};
export const getCategories = () => api<ServiceCategory[]>('/api/categories');
export const getServiceById = (id: string) => api<Service>(`/api/services/${id}`);
export const createOrder = (data: { customerEmail: string; serviceId: string; formData: Record<string, string> }) => 
  api<Order>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(data)
  });
export const getOrderByTrackingId = (id: string) => api<Order>(`/api/orders/${id}`);