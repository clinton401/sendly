"use client";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { LoadingButton } from "@/components/auth/loading-button";
import useCountdown from "@/hooks/use-countdown"
import { RegenerateButton } from "@/components/auth/regenerate-button";
export const ResetForm: FC = () => {
  const [isPending, setIsPending] = useState(false);
  const [isNewEmailPending, setIsNewEmailPending] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [success, setSuccess] = useState<undefined | string>(undefined);
  const [error, setError] = useState<undefined | string>(undefined);
    const {
      isNewClicked: isResendClicked,
      setIsNewClicked: setIsResendClicked,
      countdown: resetCounter,
    } = useCountdown();
  const form = useForm<z.infer<ReturnType<typeof ResetSchema>>>({
    resolver: zodResolver(ResetSchema(isCodeSent)),
    defaultValues: {
      phone: "",
      otp: isCodeSent ? "" : undefined,
      newPassword: isCodeSent ? "" : undefined,
    },
  });
  const resetHandler = async (
    values: z.infer<ReturnType<typeof ResetSchema>>
  ) => {
   console.log(values);
   setIsPending(true);
   
   setError(undefined); 
   setSuccess(undefined);
   if(!isCodeSent) {
    setIsCodeSent(true);
    setSuccess("Password reset request successful! OTP code sent to your phone.");
   } else {
    setSuccess("Password changed successfully");
    form.reset();
    
    setIsCodeSent(false);
   }
   setIsPending(false);
  };
  const regenerateCode = async() => {
    const phoneValue = form.watch('phone');
    if(!phoneValue || typeof phoneValue !== "string" ) {
      setError("Invalid email");
      
      setSuccess(undefined);
      return ;
    }
    setIsNewEmailPending(true);
      setIsResendClicked(false);
      setError(undefined); 
      setSuccess("New verification code sent to your phone");



      setIsNewEmailPending(false);
      setIsResendClicked(true);
  
  }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(resetHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
               
                  placeholder="+2349876543210"
                  disabled={isCodeSent || isPending}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {isCodeSent && (
          <>
            {" "}
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <Input
                   
                      placeholder="******"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input
                   
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <LoadingButton
          message={isCodeSent ? "Confirm" : "Verify"}
          isPending={isPending || isNewEmailPending}
        />
      </form>
    </Form>
    {isCodeSent &&  <div className="w-full gap-4 flex flex-col justify-center items-center pt-4">
        <p className="text-xs w-full text-center ">Didn&apos;t send code yet?</p>

    <RegenerateButton isNewEmailPending={isNewEmailPending || isPending} isResendClicked={isResendClicked} resendCode={regenerateCode} resetCounter={resetCounter} />
   
    </div>}
    </div>
  );
};
