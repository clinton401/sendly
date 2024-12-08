"use client";
import { useState, FC } from "react";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "@/components/form-success";
import { LoadingButton } from "@/components/auth/loading-button";

export const RegisterForm: FC = () => {
  const [success, setSuccess] = useState<undefined | string>(undefined);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      address: undefined,
    },
  });

  const submitHandler = (values: z.infer<typeof RegisterSchema>) => {
    console.log(values);
    setIsPending(true);
    setTimeout(() => {
      
    setSuccess(`${values.name} registered successfully`);
    setIsPending(false);
    form.reset()
    }, 5000)
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Jane smith "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Start with country code e.g +234)</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="+23498765432"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address (optional)</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="123 Main Street, Apt 4B, Springfield, IL 62704"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="******"
                  type="password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {success && <FormSuccess message={success} />}
        <LoadingButton isPending={isPending} message="Create account" />
      </form>
    </Form>
  );
};
