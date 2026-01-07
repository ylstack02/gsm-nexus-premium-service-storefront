import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { ServiceSlider } from '@/components/home/ServiceSlider';
import { CategoryCard } from '@/components/home/CategoryCard';
import { Partners } from '@/components/home/Partners';
import { OrderFlowGuide } from '@/components/home/OrderFlowGuide';
import { Testimonials } from '@/components/home/Testimonials';
import { MOCK_CATEGORIES } from '@shared/mock-data';
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
        <div className="mt-8">
          <Partners />
        </div>
        <div className="mt-16">
          <ServiceSlider />
        </div>
        <OrderFlowGuide />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-foreground">GSM Services</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg leading-relaxed">
              Professional automated solutions for mobile specialists and repair centers worldwide.
            </p>
            <div className="mt-8">
              <Link to="/catalog">
                <Button variant="outline" className="group rounded-full glass-premium border-cyan-500/20 hover:border-cyan-500/50 px-8 py-6 font-bold uppercase tracking-widest text-xs">
                  Browse Full Catalog
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {MOCK_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                icon={ICON_MAP[cat.iconName] || Smartphone}
              />
            ))}
          </div>
        </section>
        <Testimonials />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="relative rounded-4xl overflow-hidden glass-premium border-cyan-500/10 cyan-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent pointer-events-none" />
            <div className="p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
              <div>
                <h2 className="text-3xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight tracking-tighter">
                  Premium Solutions <br /> for <span className="text-cyan-500">GSM Experts</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Join hundreds of mobile repair shops using our automated processing systems.
                  Scale your business with bulk rates and secure GSM infrastructure.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Link to="/contact">
                    <Button size="xl" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full font-bold shadow-lg shadow-cyan-500/20">
                      Get Enterprise Access
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="xl" variant="ghost" className="rounded-full font-bold">
                      View API Docs
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {[
                  { label: "Uptime", value: "99.9%" },
                  { label: "Response", value: "20ms" },
                  { label: "Success", value: "98.5%" },
                  { label: "Support", value: "24/7" },
                ].map((stat, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 border border-white/10 text-center hover:border-cyan-500/30 transition-colors cursor-default">
                    <div className="text-3xl font-bold text-cyan-500">{stat.value}</div>
                    <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white dark:bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-16 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-cyan-500 p-1.5 rounded-lg">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tighter font-display">GSM NEXUS</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
                Professional digital solutions for the mobile repair industry. Global coverage, instant delivery,
                and secure service infrastructure you can trust.
              </p>
              <div className="flex gap-4">
                 {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 hover:border-cyan-500/50 transition-all cursor-pointer" />)}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-8 uppercase tracking-widest text-foreground">Explore</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="/catalog" className="hover:text-cyan-500 transition-colors">Service Catalog</Link></li>
                <li><Link to="/track" className="hover:text-cyan-500 transition-colors">Order Tracking</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-500 transition-colors">Bulk Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-8 uppercase tracking-widest text-foreground">Company</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-cyan-500 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-500 transition-colors">Support</Link></li>
                <li><Link to="/terms" className="hover:text-cyan-500 transition-colors">Terms & Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm mb-8 uppercase tracking-widest text-foreground">Connect</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-cyan-500 transition-colors">Telegram Channel</a></li>
                <li><a href="#" className="hover:text-cyan-500 transition-colors">Twitter / X</a></li>
                <li><Link to="/contact" className="hover:text-cyan-500 transition-colors">API Documentation</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground font-medium">
              © {new Date().getFullYear()} GSM Nexus. Secure Service Infrastructure.
            </p>
            <div className="flex gap-4 items-center">
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Secured By</span>
              <div className="h-6 w-10 bg-slate-100 dark:bg-slate-800 rounded opacity-50" />
              <div className="h-6 w-10 bg-slate-100 dark:bg-slate-800 rounded opacity-50" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}