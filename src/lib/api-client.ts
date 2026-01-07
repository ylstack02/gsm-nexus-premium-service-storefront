import { ApiResponse, Service, ServiceCategory } from "../../shared/types"
import { MOCK_SERVICES, MOCK_CATEGORIES } from "../../shared/mock-data"
const SIMULATED_DELAY = 600;
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
  // Simulate rare random errors for RouteErrorBoundary testing
  if (Math.random() < 0.005) {
    throw new Error('Random simulated network failure');
  }
  // Handle URL parameters for Mock API
  const url = new URL(path, window.location.origin);
  const pathname = url.pathname;
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
  if (pathname === '/api/categories') {
    return MOCK_CATEGORIES as unknown as T;
  }
  if (pathname.startsWith('/api/services/')) {
    const id = pathname.split('/').pop();
    const service = MOCK_SERVICES.find(s => s.id === id);
    if (!service) throw new Error('Service not found');
    return service as unknown as T;
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