# Cloudflare Workers Full-Stack Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ylstack02/gsm-nexus-premium-service-storefront)

A production-ready full-stack application template built on Cloudflare Workers, featuring a React frontend with Vite, shadcn/ui, and a backend powered by Hono with Durable Objects for scalable, stateful entity storage.

## Features

- **Zero-Cold-Start Backend**: Hono API routes with automatic hot-reloading.
- **Durable Objects Storage**: Multi-tenant entity system (Users, Chats, Messages) using a single Global Durable Object class for efficient storage and indexing.
- **Modern React Frontend**: Vite + React 18 + TypeScript + TanStack Query + React Router.
- **Beautiful UI**: shadcn/ui components, Tailwind CSS, Lucide icons, dark mode support.
- **Type-Safe API**: Shared types between frontend and worker, automatic API client.
- **Production-Ready**: Error boundaries, client error reporting, CORS, logging, SPA asset handling.
- **Scalable Architecture**: Indexed entity listing, CAS transactions, prefix indexes for pagination.
- **Easy Customization**: Add new entities/routes via `worker/entities.ts` and `worker/user-routes.ts`.
- **Seed Data**: Mock users/chats/messages auto-populate on first run.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Router, Zustand, Framer Motion, Lucide React
- **Backend**: Cloudflare Workers, Hono, Durable Objects, TypeScript
- **Build Tools**: Bun, Wrangler, Vitest (ES modules)
- **UI/UX**: Headless UI (Radix), Tailwind Animate, Sonner (toasts), Sidebar layout
- **Data**: Immer (immutable updates), UUID, Date-fns
- **Dev Tools**: ESLint, TypeScript 5.8, Cloudflare Vite Plugin

## Quick Start

1. **Prerequisites**:
   - [Bun](https://bun.sh/) installed
   - [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install/) installed and logged in (`wrangler login`)

2. **Install Dependencies**:
   ```bash
   bun install
   ```

3. **Run Development Server**:
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (frontend) with hot-reload. Backend API at `/api/*`.

4. **Type Generation** (for IntelliSense):
   ```bash
   bun cf-typegen
   ```

## Usage Examples

### API Endpoints (under `/api/`)

- `GET /api/users` - List users (paginated)
- `POST /api/users` - Create user `{ "name": "Alice" }`
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/deleteMany` - Bulk delete `{ "ids": ["id1", "id2"] }`

- `GET /api/chats` - List chats
- `POST /api/chats` - Create chat `{ "title": "My Chat" }`
- `GET /api/chats/:chatId/messages` - List messages
- `POST /api/chats/:chatId/messages` - Send message `{ "userId": "u1", "text": "Hello" }`

All responses: `{ success: true, data: ... }` or `{ success: false, error: "msg" }`.

### Frontend Customization

- Edit `src/pages/HomePage.tsx` for main UI.
- Use `AppLayout` from `src/components/layout/AppLayout.tsx` for sidebar.
- API calls via `src/lib/api-client.ts`: `api<User[]>('/api/users')`.
- Add pages to `src/main.tsx` router.

### Adding New Entities

1. Extend `IndexedEntity` in `worker/entities.ts`.
2. Add routes in `worker/user-routes.ts`.
3. Seed data via `static seedData`.
4. Frontend queries via TanStack Query.

Example: See `UserEntity` and `ChatBoardEntity`.

## Development Workflow

- **Frontend**: `bun dev` (Vite dev server + proxy to worker).
- **Backend Preview**: `wrangler dev` (full Workers emulator).
- **Linting**: `bun lint`
- **Build**: `bun build` (frontend only).
- **Type Check**: Auto via TSConfig project references.
- **Hot Reload**: Edit `worker/user-routes.ts` → auto-reloads without restart.

**Pro Tip**: Use VS Code with Cloudflare Workers extension for snippets and deployment.

## Deployment

Deploy to Cloudflare Workers in one command:

```bash
bun deploy
```

Or manually:

```bash
bun build  # Build frontend assets
wrangler deploy
```

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ylstack02/gsm-nexus-premium-service-storefront)

**Custom Domain**: Update `wrangler.jsonc` assets config. Assets served as SPA.

**Environment Variables**: Set via Wrangler dashboard or `wrangler secret put NAME`.

**Migrations**: Durable Objects auto-migrate via `wrangler.jsonc`.

## Project Structure

```
├── shared/          # Shared types & mocks
├── src/             # React frontend (Vite)
├── worker/          # Hono API + Durable Objects
├── tsconfig.*.json  # TypeScript project references
├── vite.config.ts   # Vite + Cloudflare plugin
├── wrangler.jsonc   # Workers config
└── package.json     # Bun workspaces ready
```

## Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Dev server (frontend + worker proxy) |
| `bun build` | Build frontend |
| `bun lint` | Lint codebase |
| `bun preview` | Preview production build |
| `bun deploy` | Build + deploy to Workers |
| `bun cf-typegen` | Generate Worker types |

## Contributing

1. Fork & clone.
2. `bun install`.
3. `bun dev`.
4. Add features in `worker/` & `src/`.
5. Test API with curl or frontend.
6. PR with clear description.

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ for Cloudflare Workers. Questions? Open an issue!