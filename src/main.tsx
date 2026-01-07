import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react'
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
import { CatalogPage } from '@/pages/CatalogPage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { ShoppingCart, Search } from 'lucide-react';
import { Placeholder } from '@/components/ui/Placeholder';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/catalog",
    element: <CatalogPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/service/:id",
    element: <ServiceDetailPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/checkout",
    element: <Placeholder name="Checkout" icon={ShoppingCart} description="Secure multi-gateway checkout flow coming soon." />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/track",
    element: <Placeholder name="Order Tracking" icon={Search} description="Global IMEI tracking engine coming soon." />,
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