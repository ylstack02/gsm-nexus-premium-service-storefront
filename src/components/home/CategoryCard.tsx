import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { ServiceCategory } from '@shared/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
interface CategoryCardProps {
  category: ServiceCategory;
  icon: LucideIcon;
}
export function CategoryCard({ category, icon: Icon }: CategoryCardProps) {
  return (
    <Link to={`/catalog?category=${category.slug}`} className="block group h-full">
      <Card className={cn(
        "p-4 md:p-6 h-full border border-slate-200/60 dark:border-white/10",
        "hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300",
        "hover:-translate-y-1 relative overflow-hidden bg-white dark:bg-slate-900",
        "group-hover:cyan-glow"
      )}>
        <div className="absolute top-0 right-0 p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-cyan-600 mb-4 md:mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <h3 className="text-sm md:text-lg font-bold text-foreground mb-1 md:mb-2 group-hover:text-cyan-600 transition-colors line-clamp-1">
          {category.name}
        </h3>
        <p className="text-[10px] md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
          {category.description}
        </p>
      </Card>
    </Link>
  );
}