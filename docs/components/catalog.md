# Component: Catalog & Service Cards
The Catalog implements faceted search and a responsive grid of Service Cards.
## Service Card Ribbons
Ribbons are created using a diagonal transform on an absolute container with `overflow-hidden`.
```svelte
<!-- Service Card Snippet -->
<div class="relative overflow-hidden rounded-3xl glass-premium group">
  <!-- Ribbon -->
  <div class="absolute top-0 right-0 w-28 h-28 pointer-events-none">
    <div class="bg-cyan-500 text-white text-[10px] font-bold py-1.5 w-[160%] text-center transform rotate-45 translate-x-[25%] translate-y-[35%]">
      IMEI
    </div>
  </div>
  <div class="p-6">
    <h3 class="text-xl font-bold">{service.name}</h3>
    <p class="text-sm text-muted-foreground">{service.description}</p>
    <div class="mt-6 flex justify-between items-center">
      <span class="text-2xl font-bold text-cyan-600">${service.price}</span>
      <a href="/service/{service.id}" class="btn-premium px-6 py-2 rounded-full">Unlock</a>
    </div>
  </div>
</div>
```
## Category Selector
Built as a custom Popover using Svelte's conditional rendering.
- **Mobile**: Use a full-screen or bottom-sheet overlay.
- **Desktop**: Use absolute positioning relative to the trigger.
- **State**: Use `$state` array for `selectedCategories`.