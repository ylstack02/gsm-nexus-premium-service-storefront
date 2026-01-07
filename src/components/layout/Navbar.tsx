import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, Cpu, ChevronDown, Layers, Globe, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/use-store';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
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
  const NavLink = ({ to, children, isActive: manualActive }: { to: string, children: React.ReactNode, isActive?: boolean }) => {
    const isActive = manualActive ?? location.pathname === to;
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
  const menuItems = [
    { title: "Apple Unlocks", desc: "Factory iPhone removals", slug: "apple-unlocks", icon: Shield },
    { title: "Samsung FRP", desc: "Instant Google locks", slug: "samsung-frp", icon: Activity },
    { title: "Server Checks", desc: "Full GSX & carrier logs", slug: "server-logs", icon: Layers },
  ];
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
              <NavigationMenu>
                <NavigationMenuList className="gap-6">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent h-auto p-0 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground data-[state=open]:text-cyan-500 focus:bg-transparent">
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px] glass-premium border-cyan-500/10 rounded-2xl">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md"
                              to="/catalog"
                            >
                              <Cpu className="h-8 w-8 text-white" />
                              <div className="mb-2 mt-4 text-lg font-bold text-white">Full Catalog</div>
                              <p className="text-sm leading-tight text-white/80">
                                Explore all 500+ GSM server-side gateways and remote solutions.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {menuItems.map((item) => (
                          <li key={item.slug}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/catalog?category=${item.slug}`}
                                className="block select-none space-y-1 rounded-xl p-3 leading-none no-underline outline-none transition-colors hover:bg-cyan-500/5 hover:text-cyan-600 focus:bg-cyan-500/5 focus:text-cyan-600"
                              >
                                <div className="text-sm font-bold leading-none flex items-center gap-2">
                                  <item.icon className="w-3.5 h-3.5 text-cyan-500" />
                                  {item.title}
                                </div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                  {item.desc}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavLink to="/track">Tracking</NavLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <a href="#resellers" className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-cyan-500 transition-all">
                      Resellers
                    </a>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden sm:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search GSM services..."
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
                <SheetContent side="right" className="w-[320px] rounded-l-[2rem] border-l border-cyan-500/10">
                  <SheetHeader className="text-left mb-8 border-b pb-4">
                    <SheetTitle className="flex items-center gap-2 font-display font-bold">
                      <Cpu className="w-5 h-5 text-cyan-500" />
                      GSM NEXUS
                    </SheetTitle>
                    <SheetDescription className="text-xs">
                      Professional GSM Service Gateway v2.4
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-4">
                    <form onSubmit={handleSearch} className="relative mb-4">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="search"
                        placeholder="Search gateways..."
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        className="w-full h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                      />
                    </form>
                    <div className="space-y-2">
                      <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Main Modules</p>
                      <Link
                        to="/catalog"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 font-bold text-xs uppercase tracking-widest hover:text-cyan-500 transition-colors border border-transparent hover:border-cyan-500/20"
                      >
                        Browse Catalog
                        <Badge variant="outline" className="border-cyan-500 text-cyan-500 text-[10px]">LIVE</Badge>
                      </Link>
                      <Link
                        to="/track"
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 font-bold text-xs uppercase tracking-widest hover:text-cyan-500 transition-colors border border-transparent hover:border-cyan-500/20"
                      >
                        Track Order
                      </Link>
                      <a
                        href="#resellers"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 font-bold text-xs uppercase tracking-widest hover:text-cyan-500 transition-colors border border-transparent hover:border-cyan-500/20"
                      >
                        <Globe className="w-4 h-4 text-cyan-500" />
                        Reseller Network
                      </a>
                    </div>
                    <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">System</p>
                      <Link to="/checkout" onClick={() => setMobileMenuOpen(false)} className="p-5 rounded-2xl bg-cyan-500 text-white font-bold flex justify-between items-center text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20">
                        Order Queue
                        <span className="bg-white/20 px-3 py-1 rounded-full text-[10px]">{cartCount}</span>
                      </Link>
                    </div>
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