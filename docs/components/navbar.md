# Component: Navbar
The GSM Nexus Navbar uses a "Sticky Glass" effect with a custom dropdown implementation.
## Svelte 5 Logic
Use `$state` for mobile menu toggle and scroll detection.
```svelte
<script>
  let mobileMenuOpen = $state(false);
  let scrolled = $state(false);
  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => scrolled = window.scrollY > 20);
  }
</script>
<nav class="sticky top-0 z-50 w-full transition-all border-b {scrolled ? 'bg-background/80 backdrop-blur-xl py-2' : 'bg-transparent py-4 border-transparent'}">
  <div class="max-w-7xl mx-auto px-4 flex h-12 items-center justify-between">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2">
      <div class="bg-cyan-500 rounded-xl p-1.5 shadow-lg shadow-cyan-500/20">
        <Cpu class="w-5 h-5 text-white" />
      </div>
      <span class="text-xl font-bold tracking-tighter">GSM<span class="text-cyan-500">NEXUS</span></span>
    </a>
    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-8">
      <a href="/catalog" class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-500">Services</a>
      <a href="/track" class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-500">Tracking</a>
    </div>
    <!-- Actions -->
    <div class="flex items-center gap-3">
      <button onclick={() => mobileMenuOpen = true} class="md:hidden">
        <Menu class="h-5 w-5" />
      </button>
    </div>
  </div>
</nav>
<!-- Mobile Drawer Implementation -->
{#if mobileMenuOpen}
  <div transition:fade class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]">
    <div transition:fly={{ x: 300 }} class="absolute right-0 top-0 bottom-0 w-[300px] bg-background border-l p-6">
      <button onclick={() => mobileMenuOpen = false} class="mb-8">Close</button>
      <!-- Mobile Links -->
    </div>
  </div>
{/if}