# Page: Home
Assembling the high-conversion landing page.
## Layout Structure
Wrap the page in a standard responsive container.
```svelte
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div class="py-16 md:py-24 space-y-24">
    <Hero />
    <TrustBar />
    <Partners />
    <ServiceSlider />
    <OrderFlowGuide />
    <CategoryGrid />
    <ResellerGrid />
  </div>
</div>
```
## Key Modules
1. **TrustBar**: 4-column metrics (Orders, Success Rate, Latency).
2. **Partners**: Infinite marquee using CSS `translateX`.
3. **ServiceSlider**: Uses native `overflow-x-auto` with `snap-x` or a Svelte-native Embla wrapper.
4. **ResellerGrid**: 4-column grid of authorized nodes with trust scores.
## Performance Optimization
- Use `loading="lazy"` for avatar images in Testimonials.
- Implement the "Scale Your GSM Business" CTA as a single large glassmorphic card with a cyan mesh background.