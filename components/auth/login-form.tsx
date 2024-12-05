"use client";
import { useState, FC } from "react";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import Link from "next/link";
import {Button} from "@/components/ui/button";
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

export const LoginForm: FC = () => {
  const [success, setSuccess] = useState<undefined | string>(undefined);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const submitHandler = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    setIsPending(true);
    setSuccess(`Login registered successfully`);
    setIsPending(false);
    form.reset()
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
      
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="+2349876543210"
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
<div className="flex items-center justify-end w-full">
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link
                href={`/reset`}
              >
                Forgot Password
              </Link>
            </Button>
          </div>
        {success && <FormSuccess message={success} />}
        <LoadingButton isPending={isPending} message="Create account" />
      </form>
    </Form>
  );
};
