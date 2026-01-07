import React from 'react';
import { LucideIcon, ArrowLeft, ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
interface PlaceholderProps {
  name: string;
  icon: LucideIcon;
  description: string;
}
export function Placeholder({ name, icon: Icon, description }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-[2rem] bg-cyan-600/10 flex items-center justify-center text-cyan-600 mb-8 floating shadow-2xl shadow-cyan-500/10 border border-cyan-500/20"
        >
          <Icon className="w-10 h-10" />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-display font-bold mb-4"
        >
          {name}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-lg mx-auto mb-10 text-lg leading-relaxed"
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/">
            <Button variant="outline" className="rounded-full px-10 h-12 glass-premium border-cyan-500/20 hover:border-cyan-500/50 font-bold uppercase tracking-widest text-xs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Nexus
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
export const CheckoutPlaceholder = () => (
  <Placeholder 
    name="Checkout" 
    icon={ShoppingCart} 
    description="The secure checkout flow is being finalized. You will soon be able to pay via Crypto, PayPal, and Card using our server-side transaction gateway." 
  />
);
export const TrackingPlaceholder = () => (
  <Placeholder 
    name="Order Tracking" 
    icon={Search} 
    description="Our real-time tracking engine is connecting to global carrier APIs. Live status updates and automated security reports coming soon." 
  />
);
export const InfoPlaceholder = ({ name, icon, description }: PlaceholderProps) => (
  <Placeholder 
    name={name} 
    icon={icon} 
    description={description} 
  />
);