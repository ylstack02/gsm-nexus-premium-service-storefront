import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getServices, getCategories } from '@/lib/api-client';
import { Navbar } from '@/components/layout/Navbar';
import { ServiceCard } from '@/components/catalog/ServiceCard';
import { CategorySelector } from '@/components/catalog/CategorySelector';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  X, 
  ArrowUpDown, 
  FilterX 
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Service } from '@shared/types';
import { motion, AnimatePresence } from 'framer-motion';
type SortOption = 'price-asc' | 'price-desc' | 'speed-asc';
export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll('category')
  );
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
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
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL(search, selectedCategories);
  };
  const resetAll = () => {
    setSearch('');
    setSelectedCategories([]);
    setSearchParams(new URLSearchParams());
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
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12">
        <div className="space-y-8">
          <header className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center glass-premium p-3 rounded-2xl md:rounded-[2rem] border border-cyan-500/10 shadow-sm transition-all">
              <div className="flex w-full md:w-auto gap-2 md:gap-4 shrink-0">
                <CategorySelector 
                  categories={categories || []} 
                  selectedIds={selectedCategories}
                  onToggle={toggleCategory}
                  onClear={() => {
                    setSelectedCategories([]);
                    updateURL(search, []);
                  }}
                />
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="h-12 w-[160px] md:w-[180px] rounded-xl bg-slate-100 dark:bg-slate-800/50 border-none text-[10px] md:text-xs font-bold uppercase tracking-widest focus:ring-cyan-500/20 px-4">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-3.5 h-3.5 text-cyan-500" />
                      <SelectValue placeholder="Sort" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-cyan-500/10">
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="speed-asc">Delivery: Fastest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search GSM Services..."
                  className="pl-12 h-12 border-none bg-slate-100 dark:bg-slate-800/50 focus-visible:ring-2 focus-visible:ring-cyan-500/20 rounded-xl text-sm font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
            {(selectedCategories.length > 0 || search) && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-2 px-2"
              >
                {selectedCategories.map(catId => (
                  <Badge key={catId} className="bg-cyan-500 text-white gap-1 pl-3 pr-1 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/10">
                    {categories?.find(c => c.id === catId || c.slug === catId)?.name || catId}
                    <button onClick={() => toggleCategory(catId)} className="hover:bg-white/20 rounded-full p-0.5 ml-1 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                {search && (
                  <Badge variant="outline" className="gap-1 pl-3 pr-1 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-white dark:bg-slate-900 border-cyan-500/20">
                    Query: {search}
                    <button onClick={() => { setSearch(''); updateURL('', selectedCategories); }} className="hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5 ml-1 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                <button 
                  onClick={resetAll}
                  className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-cyan-500 px-2 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </header>
          <main className="w-full">
            <AnimatePresence mode="popLayout">
              {loadingServices ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <Skeleton key={i} className="aspect-[3/4] md:aspect-[4/5] w-full rounded-2xl md:rounded-3xl" />
                  ))}
                </div>
              ) : sortedServices.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-32 text-center glass-premium rounded-[2.5rem] border-dashed border-cyan-500/20"
                >
                  <div className="bg-cyan-500/5 p-8 rounded-full mb-6 ring-1 ring-cyan-500/10 cyan-glow shadow-cyan-500/20 shadow-xl">
                    <FilterX className="w-12 h-12 text-cyan-500/40" />
                  </div>
                  <h3 className="text-2xl font-display font-bold">No services found</h3>
                  <p className="text-muted-foreground mt-2 max-w-sm px-6">
                    We couldn't find any GSM services matching your current filters. Try resetting your search.
                  </p>
                  <Button 
                    variant="link" 
                    onClick={resetAll}
                    className="mt-6 text-cyan-600 font-bold uppercase tracking-widest text-xs"
                  >
                    Reset All Filters
                  </Button>
                </motion.div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                  {sortedServices.map((service) => (
                    <motion.div 
                      layout
                      key={service.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
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