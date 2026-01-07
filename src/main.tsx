import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { CatalogPage } from '@/pages/CatalogPage'
import { ServiceDetailPage } from '@/pages/ServiceDetailPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { TrackingPage } from '@/pages/TrackingPage'
import { InfoPlaceholder } from '@/components/ui/Placeholder';
import { FileText, ShieldCheck, HelpCircle } from 'lucide-react';
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
    element: <CheckoutPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/track",
    element: <TrackingPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/about",
    element: <InfoPlaceholder name="About Us" icon={HelpCircle} description="GSM Nexus is the leading provider of automated cellular unlocking and server-side repair solutions. Our global infrastructure ensures 99.9% uptime for professional technicians." />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/terms",
    element: <InfoPlaceholder name="Terms & Policy" icon={FileText} description="Our terms of service protect both the provider and the client. All server-side transmissions are encrypted and subject to our automatic refund guarantee." />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/contact",
    element: <InfoPlaceholder name="Technical Support" icon={ShieldCheck} description="Need assistance with a complex unlock? Our engineers are available via our secure Telegram gateway for enterprise-level troubleshooting." />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Toaster richColors position="bottom-right" />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)