"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addCardServer } from "@/actions/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function CreditCard() {
  const [cardAdded, setCardAdded] = useState(false);

  const formSchema = z.object({
    cardNumber: z
      .string()
      .min(16, {
        message: "Card number must be at least 16 digit",
      })
      .max(16, {
        message: "Card number cannot exceed 16 digit",
      })
      .regex(/^\d+$/, {
        message: "Card number must contain only digits",
      }),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: "Expiry date must be in MM/YY format.",
    }),
    cvv: z.coerce
      .number()
      .min(100, {
        message: "CVV must be at least 3 digits.",
      })
      .max(999, {
        message: "CVV cannot exceed 3 digits.",
      }),
  });

  const user = useUser();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (user.user) {
      addCardServer(
        values.cardNumber,
        values.expiryDate,
        values.cvv,
        user?.user?.id
      );
      setCardAdded(true);
    }
  }

  useEffect(() => {
    if (cardAdded) {
      toast.success("Card Added!");
      form.reset();
      router.refresh();
      setCardAdded(false);
    }
  }, [cardAdded, form, router]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Card Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Card CVV</FormLabel>
                  <FormControl>
                    <Input placeholder="Card Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
