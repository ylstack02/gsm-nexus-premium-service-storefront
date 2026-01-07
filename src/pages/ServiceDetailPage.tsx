import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getServiceById } from '@/lib/api-client';
import { Navbar } from '@/components/layout/Navbar';
import { DynamicForm } from '@/components/service/DynamicForm';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  Clock, 
  ShieldCheck, 
  Lock, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
export function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, error } = useQuery({
    queryKey: ['service', id],
    queryFn: () => getServiceById(id!),
    enabled: !!id,
  });
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-[500px] w-full" />
          </div>
        </div>
      </div>
    );
  }
  if (error || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Service Not Found</h2>
          <Link to="/catalog" className="text-blue-600 hover:underline">Return to Catalog</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link 
          to="/catalog" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Catalog
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  {service.deliveryTime}
                </Badge>
                <Badge variant="outline" className="border-emerald-500/20 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Available
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                {service.name}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: <Clock className="w-5 h-5" />, title: "Delivery Time", desc: service.deliveryTime },
                  { icon: <ShieldCheck className="w-5 h-5" />, title: "Success Rate", desc: "99.9% Guaranteed" },
                  { icon: <Lock className="w-5 h-5" />, title: "Secure", desc: "Server-side processing" },
                  { icon: <Zap className="w-5 h-5" />, title: "Instant Status", desc: "Automatic API tracking" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border bg-card">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck className="w-24 h-24" />
                </div>
                <h3 className="text-xl font-bold mb-2">Our Performance Guarantee</h3>
                <p className="text-slate-400 text-sm max-w-md">
                  If your service cannot be completed within the maximum estimated delivery time, 
                  a full refund is automatically issued to your account balance.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-start-3">
            <div className="sticky top-24">
              <DynamicForm service={service} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}