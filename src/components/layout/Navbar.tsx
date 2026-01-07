import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/use-store';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
export function Navbar() {
  const cart = useStore((s) => s.cart);
  const cartCount = cart.length;
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary rounded-lg p-1.5 transition-transform group-hover:scale-110">
                <Cpu className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                GSM<span className="text-blue-600">NEXUS</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/catalog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Catalog
              </Link>
              <Link to="/track" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Track Order
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:block relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Find a service..."
                className="h-9 w-64 rounded-full bg-secondary pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-input"
              />
            </div>
            <Link to="/checkout">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-blue-600">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <ThemeToggle className="static" />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}