import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/use-store';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/lib/api-client';
import { toast } from 'sonner';
import { CheckCircle, CreditCard, Wallet, Smartphone, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export function CheckoutPage() {
  const cart = useStore(s => s.cart);
  const clearCart = useStore(s => s.clearCart);
  const setLastOrderId = useStore(s => s.setLastOrderId);
  const lastOrderId = useStore(s => s.lastOrderId);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const mutation = useMutation({
    mutationFn: (data: { email: string; items: typeof cart }) => {
      const item = data.items[0];
      return createOrder({
        customerEmail: data.email,
        serviceId: item.service.id,
        formData: item.formData
      });
    },
    onSuccess: (data) => {
      setLastOrderId(data.trackingId);
      clearCart();
      toast.success('Transaction Successful');
    },
    onError: (error) => {
      toast.error('Processing error: ' + (error as Error).message);
    }
  });
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (email !== confirmEmail) {
      toast.error('Email verification mismatch');
      return;
    }
    mutation.mutate({ email, items: cart });
  };
  if (lastOrderId) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center relative">
          {/* Confetti Celebration Simulation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 4, 6], x: (i - 2.5) * 100, y: (i % 2 === 0 ? -100 : 100) }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="absolute left-1/2 top-1/2 w-8 h-8 rounded-full bg-cyan-500/10 blur-xl"
              />
            ))}
          </div>
          <CheckoutStepper currentStep={3} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center text-cyan-600 cyan-glow">
              <CheckCircle className="w-14 h-14" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-display font-bold mb-4">Transmission Successful!</h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
            Your request has been successfully dispatched to our secure API cluster. 
            Keep your tracking ID for status lookups.
          </p>
          <div className="glass-premium rounded-3xl p-10 mb-10 shadow-2xl relative">
            <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest">Global Order ID</div>
            <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Your Tracking ID</div>
            <div className="text-5xl font-mono font-bold text-cyan-600">{lastOrderId}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/track?id=${lastOrderId}`}>
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-10 h-14 shadow-lg shadow-cyan-500/20">
                Monitor Live Status
              </Button>
            </Link>
            <Link to="/catalog">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 glass-premium">
                New Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <CheckoutStepper currentStep={2} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-premium rounded-2xl overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center">1</span>
                  Recipient Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="specialist@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl focus-visible:ring-cyan-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmEmail" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Verify Email</Label>
                    <Input
                      id="confirmEmail"
                      type="email"
                      placeholder="Repeat email"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      className="h-12 rounded-xl focus-visible:ring-cyan-500/20"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-900/30 rounded-xl text-xs text-cyan-700 dark:text-cyan-400">
                  <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                  We use this address to send your finalized unlock codes and security reports.
                </div>
              </CardContent>
            </Card>
            <Card className="glass-premium rounded-2xl overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-800/20">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-white text-xs flex items-center justify-center">2</span>
                  Payment Gateway
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'card', name: 'Credit Card', icon: <CreditCard className="w-5 h-5" /> },
                    { id: 'paypal', name: 'PayPal', icon: <Wallet className="w-5 h-5" /> },
                    { id: 'crypto', name: 'Crypto', icon: <Smartphone className="w-5 h-5" /> },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all group",
                        paymentMethod === method.id 
                          ? "border-cyan-500 bg-cyan-500/5 cyan-glow shadow-inner" 
                          : "border-slate-100 dark:border-slate-800 hover:border-cyan-500/30 bg-card"
                      )}
                    >
                      <div className={cn(
                        "p-3 rounded-full transition-colors",
                        paymentMethod === method.id ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-muted-foreground group-hover:bg-cyan-500/20"
                      )}>
                        {method.icon}
                      </div>
                      <span className={cn("text-xs font-bold uppercase tracking-widest", paymentMethod === method.id ? "text-cyan-600" : "text-muted-foreground")}>
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary />
              <Button
                onClick={handlePlaceOrder}
                disabled={cart.length === 0 || mutation.isPending}
                className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 h-16 text-lg font-bold rounded-2xl group cyan-glow"
              >
                {mutation.isPending ? 'Processing...' : 'Complete Transmission'}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="mt-4 text-[10px] text-center text-muted-foreground uppercase tracking-[0.2em]">
                Protected by 256-bit SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}