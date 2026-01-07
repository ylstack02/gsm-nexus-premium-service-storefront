import React from 'react';
import { useStore } from '@/store/use-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tag, ShoppingBag } from 'lucide-react';
export function OrderSummary() {
  const cart = useStore(s => s.cart);
  const total = cart.reduce((acc, item) => acc + item.service.price, 0);
  return (
    <Card className="border-2 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-cyan-600" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Your cart is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.service.id}-${idx}`} className="space-y-1">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold leading-none">{item.service.name}</h4>
                    <div className="mt-2 space-y-0.5">
                      {Object.entries(item.formData).map(([key, value]) => (
                        <div key={key} className="text-[10px] text-muted-foreground uppercase flex gap-2">
                          <span className="font-bold">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm font-bold">${item.service.price.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Transaction Fee</span>
            <span className="text-emerald-600 font-bold">FREE</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-3">
            <span>Total</span>
            <span className="text-cyan-600">${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
            <Tag className="w-3 h-3 text-cyan-600" />
            Promo Code
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 bg-white dark:bg-slate-800 border rounded-lg px-3 py-1.5 text-xs outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <button type="button" className="text-xs font-bold text-cyan-600 px-2 hover:text-cyan-700">Apply</button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}