# Component: Order Flow Guide
A 3-step visualization of the GSM service pipeline with automated animations.
## Progress Line Glow
The connecting line uses the `.progress-line-glow` utility class defined in `theme-setup.md`.
```svelte
<script>
  let activeStep = $state(0);
  setInterval(() => activeStep = (activeStep + 1) % 3, 4500);
</script>
<div class="relative grid grid-cols-1 md:grid-cols-3 gap-12">
  <!-- Desktop Connector -->
  <div class="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-800">
    <div 
      class="h-full bg-cyan-500 transition-all duration-1000" 
      style="width: {(activeStep / 2) * 100}%"
    ></div>
  </div>
  {#each steps as step, i}
    <div class="flex flex-col items-center {activeStep === i ? 'opacity-100' : 'opacity-50'}">
      <div class="w-20 h-20 rounded-2xl flex items-center justify-center transition-all {activeStep === i ? 'bg-cyan-500 scale-110 shadow-cyan-500/40' : 'bg-slate-800'}">
        <svelte:component this={step.icon} class="w-8 h-8 text-white" />
      </div>
      <h3 class="mt-6 font-bold">{step.title}</h3>
    </div>
  {/each}
</div>