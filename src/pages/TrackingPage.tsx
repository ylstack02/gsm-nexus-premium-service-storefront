import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { StatusTimeline } from '@/components/tracking/StatusTimeline';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getOrderByTrackingId } from '@/lib/api-client';
import { Search, Loader2, AlertCircle, FileSearch } from 'lucide-react';
export function TrackingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [searchVal, setSearchVal] = useState(initialId);
  const { data: order, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['order', initialId],
    queryFn: () => getOrderByTrackingId(initialId),
    enabled: !!initialId,
    retry: false
  });
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      setSearchParams({ id: searchVal.trim() });
    }
  };
  useEffect(() => {
    if (initialId) {
      refetch();
    }
  }, [initialId, refetch]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-bold mb-4">Track Your Order</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Enter your Tracking ID or IMEI number to get real-time status updates directly from our servers.
          </p>
        </div>
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative flex gap-2 p-1.5 bg-white dark:bg-slate-900 border rounded-2xl shadow-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="e.g. NEX-123456 or IMEI" 
                  className="h-14 pl-12 border-none bg-transparent text-lg focus-visible:ring-0"
                />
              </div>
              <Button type="submit" className="h-14 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-md font-bold">
                Lookup Status
              </Button>
            </div>
          </div>
        </form>
        <div className="space-y-12">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <p className="text-sm text-muted-foreground">Checking server databases...</p>
            </div>
          )}
          {isError && (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mx-auto mb-4">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Order Not Found</h3>
              <p className="text-muted-foreground text-sm">
                We couldn't find an order with that ID. Please check the ID and try again, or contact our support team if the problem persists.
              </p>
            </div>
          )}
          {!isLoading && !isError && order && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-6 bg-blue-600 rounded-2xl text-white">
                <div>
                  <div className="text-xs font-medium uppercase tracking-widest opacity-80 mb-1">Order Summary</div>
                  <h2 className="text-2xl font-bold">Service Tracking</h2>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-xs font-medium uppercase tracking-widest opacity-80 mb-1">Current Status</div>
                  <div className="text-2xl font-mono font-bold">{order.status.toUpperCase()}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <StatusTimeline order={order} />
                </div>
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                      <FileSearch className="w-4 h-4 text-blue-600" />
                      Details
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Tracking ID</span>
                        <span className="font-mono font-bold">{order.trackingId}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Submitted</span>
                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span>{order.customerEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!initialId && !isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-muted-foreground mb-4">
                <FileSearch className="w-8 h-8" />
              </div>
              <p className="text-muted-foreground text-sm max-w-xs">
                Your Tracking ID can be found in your order confirmation email.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}