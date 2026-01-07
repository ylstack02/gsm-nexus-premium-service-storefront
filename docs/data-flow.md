# Data Flow & State
Svelte 5 Runes replace the need for complex state management libraries like Zustand.
## Global Store (Runes)
Create a `.svelte.ts` file for shared state.
```typescript
// src/lib/store.svelte.ts
export const cart = $state({
  items: [],
  get total() {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  },
  add(service, formData) {
    this.items = [{ service, formData }]; // Singleton cart logic
  }
});
```
## Form Logic
Handle dynamic forms using standard Svelte bindings.
```svelte
<script>
  let { service } = $props();
  let formData = $state({});
</script>
<form onsubmit={handleSubmit}>
  {#each service.schema.fields as field}
    <label>{field.label}</label>
    <input 
      type={field.type} 
      bind:value={formData[field.name]} 
      required={field.required}
    />
  {/each}
  <button type="submit">Order Now</button>
</form>
```
## API Client
The `api-client.ts` remains largely the same, but integrate it with SvelteKit's `fetch` for server-side compatibility if needed. Ensure all requests handle the `SIMULATED_DELAY` to show loading skeletons.