import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Service } from '@shared/types';
import { useStore } from '@/store/use-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface DynamicFormProps {
  service: Service;
}
export function DynamicForm({ service }: DynamicFormProps) {
  const addToCart = useStore(s => s.addToCart);
  const formSchema = useMemo(() => {
    const schemaShape: Record<string, any> = {};
    service.schema.fields.forEach(field => {
      let validator = z.string();
      if (field.required) {
        validator = validator.min(1, `${field.label} is required`);
      } else {
        validator = validator.optional() as any;
      }
      if (field.type === 'imei') {
        validator = validator.length(15, "IMEI must be exactly 15 digits").regex(/^\d+$/, "IMEI must only contain numbers");
      }
      if (field.validation?.pattern) {
        validator = validator.regex(new RegExp(field.validation.pattern), field.validation.message || "Invalid format");
      }
      schemaShape[field.name] = validator;
    });
    return z.object(schemaShape);
  }, [service.schema.fields]);
  type FormValues = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });
  const onSubmit = (data: FormValues) => {
    addToCart(service, data as Record<string, string>);
    toast.success('Added to order queue', {
      description: `${service.name} has been added to your cart.`
    });
  };
  return (
    <Card className="border-2 border-cyan-500/20 shadow-xl shadow-cyan-500/5 overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order Details</CardTitle>
          <div className="text-2xl font-bold text-cyan-600">
            ${service.price.toFixed(2)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <form id="service-order-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {service.schema.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="flex items-center justify-between">
                <span>{field.label} {field.required && <span className="text-red-500">*</span>}</span>
                {field.type === 'imei' && (
                  <span className="text-[10px] text-muted-foreground font-mono">Dial *#06# to find</span>
                )}
              </Label>
              {field.type === 'select' ? (
                <Select onValueChange={(val) => setValue(field.name, val)}>
                  <SelectTrigger className={errors[field.name] ? "border-red-500 bg-red-50/50" : "focus:ring-cyan-500/20"}>
                    <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'textarea' ? (
                <Textarea
                  {...register(field.name as any)}
                  placeholder={field.placeholder}
                  className={errors[field.name] ? "border-red-500 bg-red-50/50" : "focus-visible:ring-cyan-500/20"}
                />
              ) : (
                <Input
                  {...register(field.name as any)}
                  type={field.type === 'number' ? 'number' : 'text'}
                  placeholder={field.placeholder}
                  className={errors[field.name] ? "border-red-500 bg-red-50/50" : "focus-visible:ring-cyan-500/20"}
                />
              )}
              <AnimatePresence mode="wait">
                {errors[field.name] && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-xs text-red-500 flex items-center gap-1 mt-1 overflow-hidden"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors[field.name]?.message as string}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </form>
      </CardContent>
      <CardFooter className="bg-slate-50 dark:bg-slate-900/50 border-t flex flex-col gap-3 pt-6">
        <Button
          type="submit"
          form="service-order-form"
          className="w-full bg-cyan-500 hover:bg-cyan-600 h-12 text-md font-bold shadow-lg shadow-cyan-500/20"
          disabled={isSubmitting}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
          Secure GSM Protocol
        </p>
      </CardFooter>
    </Card>
  );
}