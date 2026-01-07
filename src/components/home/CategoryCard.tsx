import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowUpRight } from 'lucide-react';
import { ServiceCategory } from '@shared/types';
import { Card } from '@/components/ui/card';
interface CategoryCardProps {
  category: ServiceCategory;
  icon: LucideIcon;
}
export function CategoryCard({ category, icon: Icon }: CategoryCardProps) {
  return (
    <Link to={`/catalog?category=${category.slug}`} className="block group">
      <Card className="p-6 h-full border hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden bg-white dark:bg-slate-900">
        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-5 h-5 text-cyan-500" />
        </div>
        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-cyan-600 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-cyan-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
      </Card>
    </Link>
  );
}