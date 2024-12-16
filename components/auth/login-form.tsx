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
import { FormError } from "@/components/form-error";

import { unknown_error } from "@/lib/variables";
import {login} from "@/actions/login"
export const LoginForm: FC = () => {
  const [success, setSuccess] = useState<undefined | string>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function submitHandler(values: z.infer<typeof LoginSchema>) {
    try{
      setIsPending(true);
      setError(undefined); 
      setSuccess(undefined);
      const data = await login(values);
      const {error, success, redirectUrl} = data;
      if(error || !success) {
        setError(error || unknown_error);
        return ;
      }
      setSuccess(success);
    
        setSuccess(success); 
      
     
      if(redirectUrl) {
   
        window.location.href = redirectUrl;
      }
     }catch(error) {
      console.error(error)
      setSuccess(undefined);
      setError("An unexpected error occurred.");
      console.error(error)
    } finally {
      setIsPending(false);
    }
  
}
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
        {error && <FormError message={error} />}
        {success && !error && <FormSuccess message={success} />}
        <LoadingButton isPending={isPending} disabled={isPending} message="Login" />
      </form>
    </Form>
  );
};
