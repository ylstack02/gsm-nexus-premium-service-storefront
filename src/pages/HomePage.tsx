import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Service Categories</h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Choose from our specialized departments to find the exact solution for your device.
              </p>
            </div>
            <Link to="/catalog">
              <Button variant="outline" className="group">
                View Full Catalog
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
        <section className="bg-slate-900 py-20 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl">
              <div className="max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                  Need a custom enterprise solution?
                </h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  We provide API access and bulk pricing for repair shops and wholesalers.
                  Join 500+ professionals using GSM Nexus daily.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">Contact Sales</Button>
                  <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">Read API Docs</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white dark:bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="w-5 h-5 text-blue-600" />
                <span className="font-bold tracking-tight">GSM NEXUS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Premium digital solutions for the mobile repair industry. Global coverage, instant delivery.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/catalog">iPhone Unlocks</Link></li>
                <li><Link to="/catalog">FRP Removal</Link></li>
                <li><Link to="/catalog">Server Logs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Support</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#">Telegram Channel</a></li>
                <li><a href="#">X / Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} GSM Nexus. All rights reserved.
          </div>
        </div>
      </footer>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}