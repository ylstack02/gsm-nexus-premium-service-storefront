import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/use-store';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
export function Navbar() {
  const cartCount = useStore(s => s.cart.length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(searchVal)}`);
      setSearchVal('');
      setMobileMenuOpen(false);
    }
  };
  const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={cn(
          "text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative py-1",
          isActive ? "text-cyan-500" : "text-muted-foreground hover:text-foreground"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-500 rounded-full" />
        )}
      </Link>
    );
  };
  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 border-b",
      scrolled
        ? "bg-background/80 backdrop-blur-xl border-border py-2 shadow-sm"
        : "bg-transparent border-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-cyan-500 rounded-xl p-1.5 transition-all group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-cyan-500/20">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold tracking-tighter text-foreground">
                GSM<span className="text-cyan-500">NEXUS</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/catalog">Catalog</NavLink>
              <NavLink to="/track">Tracking</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Find a service..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="h-10 w-48 lg:w-64 rounded-full bg-slate-100 dark:bg-slate-800 pl-9 pr-4 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all border border-transparent focus:bg-background focus:border-cyan-500/30"
              />
            </form>
            <div className="flex items-center gap-1">
              <Link to="/checkout">
                <Button variant="ghost" size="icon" className="relative hover:bg-cyan-500/10 group">
                  <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] font-bold bg-cyan-500 text-white border-2 border-background">
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
                <SheetContent side="right" className="w-[300px] rounded-l-3xl">
                  <SheetHeader className="text-left mb-8 border-b pb-4">
                    <SheetTitle className="flex items-center gap-2 font-display font-bold">
                      <Cpu className="w-5 h-5 text-cyan-500" />
                      GSM NEXUS
                    </SheetTitle>
                    <SheetDescription className="text-xs">
                      Navigate through our service categories and account features.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-3">
                    <form onSubmit={handleSearch} className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="search"
                        placeholder="Search services..."
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        className="w-full h-12 rounded-2xl bg-slate-50 dark:bg-slate-900 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </form>
                    <Link
                      to="/catalog"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 font-bold text-xs uppercase tracking-widest hover:text-cyan-500 transition-colors"
                    >
                      Browse Catalog
                      <Badge variant="outline" className="border-cyan-500 text-cyan-500 text-[10px]">LIVE</Badge>
                    </Link>
                    <Link
                      to="/track"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 font-bold text-xs uppercase tracking-widest hover:text-cyan-500 transition-colors"
                    >
                      Track Order
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-5 rounded-2xl bg-cyan-500 text-white font-bold flex justify-between items-center text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 mt-4"
                    >
                      Shopping Cart
                      <span className="bg-white/20 px-3 py-1 rounded-full text-[10px]">{cartCount}</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}