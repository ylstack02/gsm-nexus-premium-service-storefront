# Theme Configuration
Synchronize your `tailwind.config.js` and `app.css` to match the GSM Nexus technical aesthetic.
## Tailwind Configuration
```javascript
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Cyan 500
        background: {
          light: '#ffffff',
          dark: '#020617' // Slate 950
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      borderRadius: {
        '4xl': '2rem'
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  }
}
```
## Global CSS Utilities
Place these in your `src/app.css` to enable the "Technical Premium" effects.
```css
@layer components {
  .glass-premium {
    @apply bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl;
  }
  .cyan-glow {
    box-shadow: 0 0 20px -5px rgba(14, 165, 233, 0.4);
  }
  .text-gradient-cyan {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600;
  }
  /* Animated progress line for OrderFlowGuide */
  .progress-line-glow {
    background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.8), transparent);
    background-size: 200% 100%;
    animation: flow-glow 3s infinite linear;
  }
}
@keyframes flow-glow {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}