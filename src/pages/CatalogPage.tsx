import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getServices, getCategories } from '@/lib/api-client';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceCard } from '@/components/catalog/ServiceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Search,
  Layers,
  Smartphone,
  ShieldCheck,
  Server,
  Cpu,
  X,
  Filter
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@shared/types';
import { motion, AnimatePresence } from 'framer-motion';
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
  const FilterList = () => (
    <div className="space-y-2">
      <button
        onClick={() => setActiveCategory(null)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
          !activeCategory ? 'bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20' : 'hover:bg-accent text-muted-foreground'
        }`}
      >
        All Services
      </button>
      {loadingCategories ? (
        [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-full rounded-xl" />)
      ) : (
        categories?.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Smartphone;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all ${
                activeCategory === cat.id ? 'bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20' : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          );
        })
      )}
    </div>
  );
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 space-y-8 shrink-0 sticky top-24">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                <Layers className="w-3 h-3" />
                Categories
              </h3>
              <FilterList />
            </div>
          </aside>
          <main className="flex-1 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center glass-premium p-4 rounded-2xl border shadow-sm">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for a service or model..."
                    className="pl-12 h-12 border-none bg-slate-100 dark:bg-slate-800/50 focus-visible:ring-2 focus-visible:ring-cyan-500/20 rounded-xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Mobile Filter Trigger */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="md:hidden flex-1 rounded-xl h-12 gap-2">
                        <Filter className="w-4 h-4" /> Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px]">
                      <SheetHeader className="text-left mb-6">
                        <SheetTitle className="flex items-center gap-2">
                          <Layers className="w-5 h-5 text-cyan-500" />
                          Filters
                        </SheetTitle>
                      </SheetHeader>
                      <FilterList />
                    </SheetContent>
                  </Sheet>
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    {services?.length ?? 0} Services
                  </div>
                </div>
              </div>
              {activeCategory && (
                <div className="flex items-center gap-2">
                  <Badge className="bg-cyan-500 text-white gap-1 pl-3 pr-1 py-1 rounded-full text-[10px] font-bold">
                    {categories?.find(c => c.id === activeCategory)?.name}
                    <button onClick={() => setActiveCategory(null)} className="hover:bg-white/20 rounded-full p-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                  {search && (
                    <Badge variant="outline" className="gap-1 pl-3 pr-1 py-1 rounded-full text-[10px] font-bold">
                      "{search}"
                      <button onClick={() => setSearch('')} className="hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <AnimatePresence mode="popLayout">
              {loadingServices ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Skeleton key={i} className="h-64 w-full rounded-3xl" />
                  ))}
                </div>
              ) : !services || services.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-24 text-center glass-premium rounded-3xl"
                >
                  <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-full mb-6">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">No results found</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm">
                    Try adjusting your filters or search keywords.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => { setSearch(''); setActiveCategory(null); }}
                    className="mt-4 text-cyan-600 font-bold"
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {services.map((service) => (
                    <motion.div
                      layout
                      key={service.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ServiceCard service={service} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}