import React from 'react';
import { LucideIcon, ArrowLeft, ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
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
        <div className="w-20 h-20 rounded-3xl bg-cyan-600/10 flex items-center justify-center text-cyan-600 mb-8 floating shadow-lg shadow-cyan-500/10 border border-cyan-500/20">
          <Icon className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">{name} View</h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
          {description}
        </p>
        <Link to="/">
          <Button variant="outline" className="rounded-full px-8 glass-premium hover:border-cyan-500/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
export const CheckoutPlaceholder = () => (
  <Placeholder
    name="Checkout"
    icon={ShoppingCart}
    description="The secure checkout flow is being finalized. You will soon be able to pay via Crypto, PayPal, and Card."
  />
);
export const TrackingPlaceholder = () => (
  <Placeholder
    name="Order Tracking"
    icon={Search}
    description="Our real-time tracking engine is connecting to global server APIs. Live status updates coming soon."
  />
);