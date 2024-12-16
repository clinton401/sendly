"use client";
import { useState, FC } from "react";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { register } from "@/actions/register";
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
import { unknown_error } from "@/lib/variables";
import { FormError } from "@/components/form-error";
import {useRouter} from "next/navigation";
export const RegisterForm: FC = () => {
  const [success, setSuccess] = useState<undefined | string>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
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
  const {push} = useRouter();

  const submitHandler = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      setIsPending(true);
      setSuccess(undefined);
      setError(undefined);
      const response = await register(values);
      const {error, success, redirectUrl} = response;
      if(error || !success) {
        setError(error || unknown_error);
        return ;
      }
      setSuccess(success);
     
      if(redirectUrl) {
        push(redirectUrl);
      }
      form.reset();
    } catch (err) {
      console.error(`Unable to register user: ${err}`);
      setError(unknown_error);
      setSuccess(undefined)
    } finally {
      setIsPending(false);
    }
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
              <FormLabel>
                Phone Number (Start with country code e.g +234)
              </FormLabel>
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

        {error && <FormError message={error} />}
        {success && !error && <FormSuccess message={success} />}
        <LoadingButton isPending={isPending} message="Create account" disabled={isPending} />
      </form>
    </Form>
  );
};
