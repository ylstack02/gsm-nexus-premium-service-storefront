import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Cpu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/use-store';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
export function Navbar() {
  const cartCount = useStore(s => s.cart.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchVal)}`);
      setSearchVal('');
    }
  };
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
            <form onSubmit={handleSearch} className="hidden sm:block relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Find a service..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="h-9 w-48 lg:w-64 rounded-full bg-secondary pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all border border-transparent focus:border-input"
              />
            </form>
            <Link to="/checkout">
              <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-blue-600 border-2 border-background">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <ThemeToggle className="static" />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-8">
                  <SheetTitle className="flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    GSM NEXUS
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/catalog" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 font-medium"
                  >
                    Catalog
                    <Badge variant="outline">25+ Services</Badge>
                  </Link>
                  <Link 
                    to="/track" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 font-medium"
                  >
                    Track Order
                  </Link>
                  <Link 
                    to="/checkout" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-4 rounded-xl bg-blue-600 text-white font-medium flex justify-between items-center"
                  >
                    Cart
                    <span className="bg-white/20 px-2 py-0.5 rounded text-xs">{cartCount} Items</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}