# GSM Nexus: Technical Premium Documentation
GSM Nexus is a high-fidelity digital storefront designed specifically for the GSM unlock and repair industry. This documentation serves as a blueprint for migrating the existing React/Zustand architecture to a **Svelte 5** environment, focusing on raw performance, "Technical Premium" aesthetics, and zero-dependency component logic.
## Design Philosophy: Technical Premium
The aesthetic prioritizes clean lines, glassmorphism, and purposeful motion.
- **Color Identity**: Primary Cyan (#0ea5e9) against Slate backgrounds.
- **Typography**: Inter for UI, JetBrains Mono for technical data (IMEIs, Order IDs).
- **Depth**: Multi-layered backgrounds with mesh gradients and blur effects.
## The Svelte 5 Transition
We are moving away from React's hook-based state and external UI libraries (ShadCN, Radix) towards Svelte's native primitives.
| React Stack | Svelte 5 Alternative |
| :--- | :--- |
| React 18 / Vite | SvelteKit / Vite |
| Zustand | Svelte Runes ($state, $derived) |
| Framer Motion | Svelte Transitions / Custom CSS |
| Lucide React | Lucide Svelte |
| React Hook Form | Standard HTML Forms + Svelte Logic |
## Core Implementation Rules
1. **Zero External UI Libraries**: All components (Sliders, Drawers, Popovers) must be built from scratch using Svelte 5 to ensure maximum speed and bundle size optimization.
2. **Standard Tailwind**: Stick to built-in Tailwind utilities for 99% of styling.
3. **Runes First**: Use `$state` for component state and `$props` for component communication.
4. **Visual Fidelity**: Maintain the exact layout, spacing (max-w-7xl), and responsive behavior of the original React version.
## Getting Started
To begin the migration, follow the `theme-setup.md` guide to synchronize your CSS environment with the "Nexus" design system.