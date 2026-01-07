# Routing & Lifecycle
GSM Nexus uses SvelteKit's directory-based routing.
## Directory Mapping
```text
src/routes/
├── +page.svelte              (Home)
├── catalog/
│   └── +page.svelte          (Catalog Listing)
├── service/
│   └── [id]/
│       └── +page.svelte      (Dynamic Order Form)
├── checkout/
│   └── +page.svelte          (Checkout Process)
��── track/
    └── +page.svelte          (Live Tracking)
```
## Data Fetching
In Svelte 5, use `+page.ts` for load functions to hydrate the UI.
```typescript
// src/routes/service/[id]/+page.ts
import { getServiceById } from '$lib/api';
export const load = async ({ params }) => {
  const service = await getServiceById(params.id);
  return { service };
};
```
## Navigation
Use SvelteKit's `goto` for programmatic navigation (e.g., after order success).
```javascript
import { goto } from '$app/navigation';
const handleSuccess = (trackingId) => goto(`/track?id=${trackingId}`);