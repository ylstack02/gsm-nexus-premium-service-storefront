import React, { useState } from 'react';
import { Check, ChevronDown, Cpu, Smartphone, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ServiceCategory } from '@shared/types';
import { Checkbox } from '@/components/ui/checkbox';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';
interface CategorySelectorProps {
  categories: ServiceCategory[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
}
export function CategorySelector({ categories, selectedIds, onToggle, onClear }: CategorySelectorProps) {
  const isMobile = useIsMobile();
  const selectedCount = selectedIds.length;
  const [open, setOpen] = useState(false);
  const triggerContent = (
    <div className="flex items-center gap-2 overflow-hidden">
      <Smartphone className="w-4 h-4 text-cyan-500 shrink-0" />
      <span className="text-xs font-bold uppercase tracking-widest truncate">
        {selectedCount === 0 ? "All Services" : `GSM Services (${selectedCount})`}
      </span>
    </div>
  );
  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-12 w-full sm:w-[220px] justify-between rounded-xl bg-slate-100 dark:bg-slate-800/50 border-none hover:bg-slate-200 dark:hover:bg-slate-800 transition-all px-4 group"
          >
            {triggerContent}
            <ChevronDown className="w-4 h-4 text-muted-foreground group-data-[state=open]:rotate-180 transition-transform" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[280px] p-2 rounded-2xl glass-premium border-cyan-500/10 shadow-2xl" align="start">
          <div className="space-y-1">
            <button
              onClick={() => { onClear(); setOpen(false); }}
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
              View All Services
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
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-full justify-between rounded-xl bg-slate-100 dark:bg-slate-800/50 border-none px-4"
        >
          {triggerContent}
          <div className="flex items-center gap-1">
             {selectedCount > 0 && (
               <div className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[10px] flex items-center justify-center font-bold">
                 {selectedCount}
               </div>
             )}
             <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-[2.5rem] px-6 pb-10 border-t border-cyan-500/10">
        <SheetHeader className="mb-6 flex flex-row items-center justify-between">
          <SheetTitle className="text-left font-display font-bold text-xl flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-500" />
            GSM Services
          </SheetTitle>
          <SheetDescription className="sr-only">
            Filter GSM services by category
          </SheetDescription>
          <SheetClose className="rounded-full bg-slate-100 dark:bg-slate-800 p-2">
            <X className="w-4 h-4" />
          </SheetClose>
        </SheetHeader>
        <div className="space-y-6">
          <button
            onClick={() => { onClear(); setOpen(false); }}
            className={cn(
              "w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all border-2",
              selectedCount === 0
                ? "bg-cyan-500 border-cyan-500 text-white shadow-xl shadow-cyan-500/20"
                : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-muted-foreground"
            )}
          >
            All Services
          </button>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => {
              const isActive = selectedIds.includes(cat.id) || selectedIds.includes(cat.slug);
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onToggle(cat.slug)}
                  className={cn(
                    "flex flex-col items-start gap-2 p-4 rounded-2xl border-2 transition-all text-left h-full",
                    isActive
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-cyan-400"
                      : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                    isActive ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-slate-800"
                  )}>
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </motion.div>
                      ) : (
                        <div className="w-1 h-1 rounded-full bg-slate-400" />
                      )}
                    </AnimatePresence>
                  </div>
                  <span className="text-[10px] font-bold uppercase leading-tight">
                    {cat.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <div className="pt-4">
            <Button
              className="w-full h-14 rounded-2xl bg-slate-900 text-white font-bold text-xs uppercase tracking-widest"
              onClick={() => { onClear(); setOpen(false); }}
            >
              Apply Selection
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}