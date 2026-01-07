import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices, getCategories } from '@/lib/api-client';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceCard } from '@/components/catalog/ServiceCard';
import { Input } from '@/components/ui/input';
import {
  Search,
  Layers,
  Smartphone,
  ShieldCheck,
  Server,
  Cpu,
  X
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@shared/types';
const ICON_MAP: Record<string, any> = {
  Smartphone,
  ShieldCheck,
  Server,
  Cpu,
};
export function CatalogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { data: services, isLoading: loadingServices } = useQuery<Service[]>({
    queryKey: ['services', search, activeCategory],
    queryFn: () => getServices({ q: search, category: activeCategory || undefined }),
  });
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <aside className="w-full md:w-64 space-y-8 shrink-0">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Categories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    !activeCategory ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-accent'
                  }`}
                >
                  All Services
                </button>
                {loadingCategories ? (
                  [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-9 w-full" />)
                ) : (
                  categories?.map((cat) => {
                    const Icon = ICON_MAP[cat.iconName] || Smartphone;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeCategory === cat.id ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {cat.name}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </aside>
          <main className="flex-1 space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services, models, or tasks..."
                  className="pl-10 h-11 border-none bg-slate-50 dark:bg-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-medium uppercase">
                  {services?.length ?? 0} Services Found
                </span>
              </div>
            </div>
            {loadingServices ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <Skeleton key={i} className="h-64 w-full rounded-2xl" />
                ))}
              </div>
            ) : !services || services.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No results found</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">
                  Try adjusting your search or category filters.
                </p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory(null); }}
                  className="mt-6 text-blue-600 font-bold hover:underline flex items-center gap-2"
                >
                  <X className="w-4 h-4" /> Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}