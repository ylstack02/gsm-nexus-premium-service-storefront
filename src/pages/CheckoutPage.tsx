import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/use-store';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/lib/api-client';
import { toast } from 'sonner';
import { CheckCircle, CreditCard, Wallet, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
export function CheckoutPage() {
  const cart = useStore(s => s.cart);
  const clearCart = useStore(s => s.clearCart);
  const setLastOrderId = useStore(s => s.setLastOrderId);
  const lastOrderId = useStore(s => s.lastOrderId);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const mutation = useMutation({
    mutationFn: (data: { email: string; items: typeof cart }) => {
      // For simplicity in this demo, we'll just process the first item
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
      toast.success('Order placed successfully!');
    },
    onError: (error) => {
      toast.error('Failed to place order: ' + (error as Error).message);
    }
  });
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (email !== confirmEmail) {
      toast.error('Emails do not match');
      return;
    }
    mutation.mutate({ email, items: cart });
  };
  if (lastOrderId) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Received!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Your request has been queued for processing. Use the ID below to track your status.
          </p>
          <div className="bg-white dark:bg-slate-900 border rounded-2xl p-8 mb-8 shadow-sm">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">Tracking ID</div>
            <div className="text-4xl font-mono font-bold text-blue-600">{lastOrderId}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/track?id=${lastOrderId}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full px-8">
                Track Order Status
              </Button>
            </Link>
            <Link to="/catalog">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Back to Store
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
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">1. Guest Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmEmail">Confirm Email</Label>
                    <Input 
                      id="confirmEmail" 
                      type="email" 
                      placeholder="you@example.com"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Order status updates and final results will be sent to this address.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">2. Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'card', name: 'Card', icon: <CreditCard className="w-5 h-5" /> },
                    { id: 'paypal', name: 'PayPal', icon: <Wallet className="w-5 h-5" /> },
                    { id: 'crypto', name: 'Crypto', icon: <Smartphone className="w-5 h-5" /> },
                  ].map((method) => (
                    <div 
                      key={method.id}
                      className="border rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all bg-card"
                    >
                      <div className="text-blue-600">{method.icon}</div>
                      <span className="text-sm font-medium">{method.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Instant Verification Enabled</p>
                <p className="text-xs text-blue-700 dark:text-blue-300">Our servers will begin processing your IMEI verification within 60 seconds of payment.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary />
              <Button 
                onClick={handlePlaceOrder}
                disabled={cart.length === 0 || mutation.isPending}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 h-14 text-lg font-bold rounded-xl group"
              >
                {mutation.isPending ? 'Processing...' : 'Place Order'}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}