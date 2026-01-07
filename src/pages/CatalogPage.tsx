import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getServices, getCategories } from '@/lib/api-client';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceCard } from '@/components/catalog/ServiceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Layers,
  Smartphone,
  ShieldCheck,
  Server,
  Cpu,
  X,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@shared/types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
const ICON_MAP: Record<string, any> = {
  Smartphone,
  ShieldCheck,
  Server,
  Cpu,
};
type SortOption = 'price-asc' | 'price-desc' | 'speed-asc';
export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll('category')
  );
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  // Sync state with URL changes (e.g., searching from Navbar)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cats = searchParams.getAll('category');
    setSearch(q);
    setSelectedCategories(cats);
  }, [searchParams]);
  const { data: services, isLoading: loadingServices } = useQuery<Service[]>({
    queryKey: ['services', search, selectedCategories],
    queryFn: () => getServices({ q: search, category: selectedCategories.length > 0 ? selectedCategories : undefined }),
  });
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const updateURL = (newSearch: string, newCats: string[]) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('q', newSearch);
    newCats.forEach(c => params.append('category', c));
    setSearchParams(params);
  };
  const toggleCategory = (id: string) => {
    const next = selectedCategories.includes(id) 
      ? selectedCategories.filter(c => c !== id) 
      : [...selectedCategories, id];
    setSelectedCategories(next);
    updateURL(search, next);
  };
  const handleSearchChange = (val: string) => {
    setSearch(val);
    // Debounce or immediate URL update? For this UI, immediate is fine or sync on blur/enter.
    // Let's sync with a small timeout or just keep local until query triggers.
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL(search, selectedCategories);
  };
  const sortedServices = useMemo(() => {
    if (!services) return [];
    return [...services].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'speed-asc') {
        const getMins = (s: string) => {
          const match = s.match(/\d+/);
          return match ? parseInt(match[0], 10) : 9999;
        };
        return getMins(a.deliveryTime) - getMins(b.deliveryTime);
      }
      return 0;
    });
  }, [services, sortBy]);
  const FilterList = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("space-y-2", mobile && "grid grid-cols-2 gap-3 space-y-0")}>
      <button
        onClick={() => {
          setSelectedCategories([]);
          updateURL(search, []);
        }}
        className={cn(
          "flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border",
          mobile ? "col-span-2" : "w-full",
          selectedCategories.length === 0
            ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20'
            : 'bg-background border-slate-200 dark:border-slate-800 text-muted-foreground hover:border-cyan-500/50 hover:text-cyan-500'
        )}
      >
        All Services
      </button>
      {loadingCategories ? (
        [1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-full rounded-xl" />)
      ) : (
        categories?.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Smartphone;
          const isActive = selectedCategories.includes(cat.id) || selectedCategories.includes(cat.slug);
          return (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.slug)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all border text-left",
                isActive
                  ? 'bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/10'
                  : 'bg-background border-slate-200 dark:border-slate-800 text-muted-foreground hover:border-cyan-500/30 hover:text-foreground'
              )}
            >
              <Icon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-white" : "text-cyan-500")} />
              <span className="truncate">{cat.name}</span>
            </button>
          );
        })
      )}
    </div>
  );
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <aside className="hidden lg:block w-64 space-y-8 shrink-0 sticky top-24">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                Filter by Cluster
              </h3>
              <FilterList />
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h4 className="text-xs font-bold mb-2">Bulk Discounts</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                Unlock wholesale pricing for orders exceeding 50 units per month.
              </p>
              <Button size="sm" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white text-[10px] font-bold h-8 rounded-lg">
                Contact Sales
              </Button>
            </div>
          </aside>
          <main className="flex-1 space-y-6 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center glass-premium p-3 rounded-2xl border shadow-sm">
                <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search model or IMEI..."
                    className="pl-12 h-12 border-none bg-slate-100 dark:bg-slate-800/50 focus-visible:ring-2 focus-visible:ring-cyan-500/20 rounded-xl text-sm"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </form>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                    <SelectTrigger className="h-12 w-full sm:w-[160px] rounded-xl bg-slate-100 dark:bg-slate-800/50 border-none text-xs font-bold uppercase tracking-widest focus:ring-cyan-500/20">
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="w-3 h-3 text-cyan-500" />
                        <SelectValue placeholder="Sort By" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="speed-asc">Delivery: Fastest</SelectItem>
                    </SelectContent>
                  </Select>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden h-12 w-12 p-0 rounded-xl bg-slate-100 dark:bg-slate-800/50 border-none">
                        <Filter className="w-4 h-4 text-cyan-500" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="rounded-t-3xl h-[70vh]">
                      <SheetHeader className="text-left mb-6">
                        <SheetTitle className="flex items-center gap-2 text-xl font-display font-bold">
                          <Layers className="w-5 h-5 text-cyan-500" />
                          Service Filters
                        </SheetTitle>
                      </SheetHeader>
                      <FilterList mobile />
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              {(selectedCategories.length > 0 || search) && (
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCategories.map(catId => (
                    <Badge key={catId} className="bg-cyan-500 text-white gap-1 pl-3 pr-1 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {categories?.find(c => c.id === catId || c.slug === catId)?.name || catId}
                      <button onClick={() => toggleCategory(catId)} className="hover:bg-white/20 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                  {search && (
                    <Badge variant="outline" className="gap-1 pl-3 pr-1 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white dark:bg-slate-900">
                      Search: {search}
                      <button onClick={() => { setSearch(''); updateURL('', selectedCategories); }} className="hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {(selectedCategories.length > 0 || search) && (
                    <button
                      onClick={() => { setSelectedCategories([]); setSearch(''); updateURL('', []); }}
                      className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-500 px-2"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              )}
            </div>
            <AnimatePresence mode="popLayout">
              {loadingServices ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Skeleton key={i} className="aspect-[4/5] w-full rounded-3xl" />
                  ))}
                </div>
              ) : sortedServices.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center glass-premium rounded-3xl"
                >
                  <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-full mb-6">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold">No matches found</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm px-6">
                    No services match your current filters. Try refining your search or expanding categories.
                  </p>
                  <Button
                    variant="link"
                    onClick={() => { setSearch(''); setSelectedCategories([]); updateURL('', []); }}
                    className="mt-4 text-cyan-600 font-bold"
                  >
                    Reset All Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6"
                >
                  {sortedServices.map((service) => (
                    <motion.div
                      layout
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
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