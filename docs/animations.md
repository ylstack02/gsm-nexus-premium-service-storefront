# Animations & Transitions
Migrating from Framer Motion to Svelte's native animation engine.
## Transition Mappings
| Effect | Framer Motion | Svelte 5 |
| :--- | :--- | :--- |
| Fade In | `initial={{opacity: 0}}` | `transition:fade` |
| Slide Up | `y: 20` | `transition:fly={{ y: 20 }}` |
| Scale In | `scale: 0.9` | `transition:scale={{ start: 0.9 }}` |
| Stagger | `staggerChildren` | Manual delay or CSS `transition-delay` |
## Spring Physics
Svelte provides spring stores for smooth UI movements (like the active step indicator).
```svelte
<script>
  import { spring } from 'svelte/motion';
  const coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.1,
    damping: 0.25
  });
</script>
```
## Technical Glows
Use CSS `@keyframes` for the background mesh movements to offload work from the JS main thread.
```css
@keyframes mesh-drift {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(5%, 5%) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
}