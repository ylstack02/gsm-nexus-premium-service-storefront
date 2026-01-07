import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { ServiceSlider } from '@/components/home/ServiceSlider';
import { CategoryCard } from '@/components/home/CategoryCard';
import { MOCK_CATEGORIES } from '@shared/mock-data';
import { Toaster } from '@/components/ui/sonner';
import { Smartphone, ShieldCheck, Server, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const ICON_MAP: Record<string, any> = {
  Smartphone,
  ShieldCheck,
  Server,
  Cpu,
};
export function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <TrustBar />
        </div>
        <ServiceSlider />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold tracking-tight text-foreground">Service Catalog</h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Explore our full range of automated GSM solutions and server services.
              </p>
            </div>
            <Link to="/catalog">
              <Button variant="outline" className="group rounded-full glass-premium">
                Browse Full Catalog
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                icon={ICON_MAP[cat.iconName] || Smartphone}
              />
            ))}
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="relative rounded-3xl overflow-hidden glass-premium cyan-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />
            <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                  Premium Solutions <br /> for <span className="text-cyan-500">GSM Experts</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Join hundreds of mobile repair shops using our automated processing systems. 
                  Scale your business with bulk rates and direct server API access.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 rounded-full h-12 font-bold shadow-lg shadow-cyan-500/20">
                    Get Enterprise Access
                  </Button>
                  <Button variant="ghost" className="rounded-full h-12 font-bold px-8">
                    View API Docs
                  </Button>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {[
                  { label: "Uptime", value: "99.9%" },
                  { label: "API Res", value: "20ms" },
                  { label: "Success", value: "98.5%" },
                  { label: "Support", value: "24/7" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/10 text-center">
                    <div className="text-2xl font-bold text-cyan-500">{stat.value}</div>
                    <div className="text-xs uppercase font-bold tracking-widest text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-6 h-6 text-cyan-500" />
                <span className="text-xl font-bold tracking-tighter">GSM NEXUS</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Professional digital solutions for the mobile repair industry. Global coverage, instant delivery, 
                and server-side security you can trust.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6">Explore</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="/catalog" className="hover:text-cyan-500">Service Catalog</Link></li>
                <li><Link to="/track" className="hover:text-cyan-500">Order Tracking</Link></li>
                <li><Link to="/catalog" className="hover:text-cyan-500">Bulk Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-cyan-500">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-500">Support</Link></li>
                <li><Link to="/terms" className="hover:text-cyan-500">Terms & Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-6">Connect</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-cyan-500">Telegram Channel</a></li>
                <li><a href="#" className="hover:text-cyan-500">Twitter / X</a></li>
                <li><a href="#" className="hover:text-cyan-500">API Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} GSM Nexus. All rights reserved. Built for specialists.
            </p>
            <div className="flex gap-4">
              <div className="h-6 w-10 bg-slate-100 dark:bg-slate-800 rounded opacity-50" />
              <div className="h-6 w-10 bg-slate-100 dark:bg-slate-800 rounded opacity-50" />
              <div className="h-6 w-10 bg-slate-100 dark:bg-slate-800 rounded opacity-50" />
            </div>
          </div>
        </div>
      </footer>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}