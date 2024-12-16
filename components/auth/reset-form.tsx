"use client";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas";
import {useRouter} from "next/navigation";
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
import useCountdown from "@/hooks/use-countdown";
import {reset} from "@/actions/reset";
import { RegenerateButton } from "@/components/auth/regenerate-button";
import {regenerateResetCode} from "@/actions/regenerate-reset-code";
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
    const {push} = useRouter()
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
    try{
      setIsPending(true);
      setError(undefined); 
      setSuccess(undefined);
      const data = await reset(values, isCodeSent);
      const {error, success, redirectUrl, isOtpSent} = data;
    
        setError(error); 
    
      
        setSuccess(success); 
        if(isOtpSent) {
          setIsCodeSent(true);
        }
     
      if(redirectUrl) {
        
          push(redirectUrl);
    
      }
     }catch(error) {
      setSuccess(undefined);
      setError("An unexpected error occurred.");
      console.error(error)
    } finally {
      setIsPending(false);
    }
  };
  const regenerateCode = async() => {
    const phoneValue = form.watch('phone');
    if(!phoneValue || typeof phoneValue !== "string" ) {
      setError("Invalid number");
      
      setSuccess(undefined);
      return ;
    }
    try{
      setIsNewEmailPending(true);
      setIsResendClicked(false);
      setError(undefined); 
      setSuccess(undefined);
     const data =  await  regenerateResetCode(phoneValue);
     const {error, success} = data;
  
     setError(error); 

   
     setSuccess(success); 
    
  if(success) {
    setIsNewEmailPending(false);
    setIsResendClicked(true);
  } else {
    setIsNewEmailPending(false);
    setIsResendClicked(false);
  }
  
     
    } catch(error){
console.error(error);
setIsNewEmailPending(false);
setIsResendClicked(false);
    }
  
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
          disabled={isPending || isNewEmailPending}
          isPending={isPending}
        />
      </form>
    </Form>
    {isCodeSent &&  <div className="w-full gap-4 flex flex-col justify-center items-center pt-4">
        <p className="text-xs w-full text-center ">Didn&apos;t send code yet?</p>

    <RegenerateButton disabled={isNewEmailPending || isPending} isNewEmailPending={isNewEmailPending} isResendClicked={isResendClicked} resendCode={regenerateCode} resetCounter={resetCounter} />
   
    </div>}
    </div>
  );
};
