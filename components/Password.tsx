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
import { addWebServer } from "@/actions/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function Password() {
  const [cardAdded, setCardAdded] = useState(false);

  const user = useUser();
  const router = useRouter();

  const formSchema = z.object({
    url: z
      .string()
      .min(1, {
        message: "Url must be at least 1 character",
      })
      .max(50, {
        message: "Url must be at least 50 character",
      })
      .regex(
        /^(https?:\/\/)?(www\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$|^(https?:\/\/)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        {
          message: "Url must be starts with https/http/www format",
        }
      ),
    username: z
      .string()
      .min(1, {
        message: "Username must be at least 1 character",
      })
      .max(50, {
        message: "Username cannot exceed 50 digit",
      }),
    password: z
      .string()
      .min(1, {
        message: "Password must be at least 1 character",
      })
      .max(50, {
        message: "Password cannot exceed 50 character",
      }),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    if (user.user) {
      addWebServer(
        values.url,
        values.username,
        values.password,
        user?.user?.id
      );
      setCardAdded(true);
    }
  }

  useEffect(() => {
    if (cardAdded) {
      toast.success("Password Added!");
      form.reset();
      router.refresh();
      setCardAdded(false);
    }
  }, [cardAdded, form, router]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input placeholder="Website or App URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
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
