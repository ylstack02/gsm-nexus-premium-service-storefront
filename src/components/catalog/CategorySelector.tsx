import React from 'react';
import { Check, ChevronDown, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceCategory } from '@shared/types';
import { Checkbox } from '@/components/ui/checkbox';
interface CategorySelectorProps {
  categories: ServiceCategory[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
}
export function CategorySelector({ categories, selectedIds, onToggle, onClear }: CategorySelectorProps) {
  const selectedCount = selectedIds.length;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="h-12 w-full sm:w-[220px] justify-between rounded-xl bg-slate-100 dark:bg-slate-800/50 border-none hover:bg-slate-200 dark:hover:bg-slate-800 transition-all px-4 group"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Layers className="w-4 h-4 text-cyan-500 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest truncate">
              {selectedCount === 0 ? "All Clusters" : `Clusters (${selectedCount})`}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-2 rounded-2xl glass-premium border-cyan-500/10 shadow-2xl" align="start">
        <div className="space-y-1">
          <button
            onClick={onClear}
            className={cn(
              "flex items-center w-full px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
              selectedCount === 0 
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
            )}
          >
            <div className="w-4 h-4 mr-3 flex items-center justify-center">
              {selectedCount === 0 && <Check className="w-3 h-3" />}
            </div>
            All Services
          </button>
          <div className="h-px bg-border my-1" />
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {categories.map((cat) => {
              const isActive = selectedIds.includes(cat.id) || selectedIds.includes(cat.slug);
              return (
                <div 
                  key={cat.id}
                  onClick={() => onToggle(cat.slug)}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-tight cursor-pointer transition-all mb-0.5",
                    isActive 
                      ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" 
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-muted-foreground"
                  )}
                >
                  <Checkbox 
                    checked={isActive} 
                    className="mr-3 border-muted-foreground/30 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                  />
                  <span className="truncate flex-1">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}