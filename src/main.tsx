import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
// Placeholder components for Phase 2/3
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <p className="text-muted-foreground">{name} View Coming Soon</p>
  </div>
);
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/catalog",
    element: <Placeholder name="Catalog" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/service/:id",
    element: <Placeholder name="Service Detail" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/checkout",
    element: <Placeholder name="Checkout" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/track",
    element: <Placeholder name="Order Tracking" />,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)