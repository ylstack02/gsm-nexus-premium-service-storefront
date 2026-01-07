import { ApiResponse, Service, ServiceCategory } from "../../shared/types"
import { MOCK_SERVICES, MOCK_CATEGORIES } from "../../shared/mock-data"
const SIMULATED_DELAY = 600;
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  // Simulate network latency for all API calls
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  // Mocking internal routes for Phase 1
  if (path === '/api/services') {
    return MOCK_SERVICES as unknown as T;
  }
  if (path === '/api/categories') {
    return MOCK_CATEGORIES as unknown as T;
  }
  if (path.startsWith('/api/services/')) {
    const id = path.split('/').pop();
    const service = MOCK_SERVICES.find(s => s.id === id);
    if (!service) throw new Error('Service not found');
    return service as unknown as T;
  }
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...init })
  const json = (await res.json()) as ApiResponse<T>
  if (!res.ok || !json.success || json.data === undefined) throw new Error(json.error || 'Request failed')
  return json.data
}
export const getServices = () => api<Service[]>('/api/services');
export const getCategories = () => api<ServiceCategory[]>('/api/categories');
export const getServiceById = (id: string) => api<Service>(`/api/services/${id}`);