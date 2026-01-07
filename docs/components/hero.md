# Component: Hero
The Hero section features an animated headline and a "Terminal Simulation" card.
## Typing Animation (Svelte 5)
Instead of Framer Motion's `AnimatePresence`, use Svelte's transition system.
```svelte
<script>
  const words = ["iPhone Unlocks", "FRP Removal", "Server Checks"];
  let index = $state(0);
  setInterval(() => {
    index = (index + 1) % words.length;
  }, 3000);
</script>
<div class="text-4xl md:text-7xl font-bold">
  Next-Gen <br />
  <span class="text-gradient-cyan">
    {#key index}
      <span in:fly={{ y: 20, duration: 400 }} out:fly={{ y: -20, duration: 400 }} class="absolute">
        {words[index]}
      </span>
    {/key}
  </span>
</div>
```
## Terminal Simulation Card
Recreate the code terminal with Lucide icons and fixed-width fonts.
- **Visuals**: Glass-premium background, red/amber/cyan window controls.
- **Interactions**: Use a Svelte `$state` to simulate "Processing..." status pulses.
```svelte
<div class="glass-premium rounded-3xl p-8 shadow-2xl relative">
  <div class="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
    <div class="flex gap-2">
      <div class="w-3 h-3 rounded-full bg-red-500/40"></div>
      <div class="w-3 h-3 rounded-full bg-amber-500/40"></div>
      <div class="w-3 h-3 rounded-full bg-cyan-500/40"></div>
    </div>
  </div>
  <div class="font-mono text-sm space-y-4">
    <p class="text-cyan-500">$ nexus init --secure</p>
    <p class="text-muted-foreground">Verifying RSA Signature...</p>
    <p class="text-emerald-500">[OK] Handshake: Node-Global-7</p>
  </div>
</div>