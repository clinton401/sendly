"use client";
import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OtpSchema } from "@/schemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { LoadingButton } from "@/components/auth/loading-button";
import { useParams } from "next/navigation";
import { RegenerateButton } from "@/components/auth/regenerate-button";
import useCountdown from "@/hooks/use-countdown";
export const VerifyPhoneForm: FC = () => {
  const [isPending, setIsPending] = useState(false);
  const [isNewEmailPending, setIsNewEmailPending] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const [success, setSuccess] = useState<undefined | string>(undefined);
  const { id } = useParams();
//   const { push } = useRouter();
//   const redirect = useGetRedirectUrl();
  const {
    isNewClicked: isResendClicked,
    setIsNewClicked: setIsResendClicked,
    countdown: resetCounter,
  } = useCountdown();
  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verifyHandler = async (values: z.infer<typeof OtpSchema>) => {
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId || typeof userId !== "string") {
      setError("Invalid user ID");

      setSuccess(undefined);
      return;
    }
    console.log(values)
    
    setIsPending(true);
    setError(undefined);
    setTimeout(() => {
      
      setSuccess(`Phone number verified successfully.`);
      setIsPending(false);
      
    form.reset()
      }, 5000)
   
  };
  async function resendCode() {
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId || typeof userId !== "string") {
      setError("Invalid user ID");

      setSuccess(undefined);
      return;
    }
    setIsNewEmailPending(true);
    setIsResendClicked(false);
    setError(undefined);
    setSuccess("New verification code sent to your phone");

    setIsResendClicked(true);

    setIsNewEmailPending(false);
      
     
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(verifyHandler)}
          className=" space-y-4"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full flex items-center justify-center ">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormDescription className="w-full text-center">
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <LoadingButton
            message="Verify"
            isPending={isPending || isNewEmailPending}
          />
        </form>
      </Form>
      <div className="w-full gap-4 flex flex-col justify-center items-center pt-4">
        <p className="text-xs w-full text-center ">
          Didn&apos;t send code yet?
        </p>

        <RegenerateButton
          isNewEmailPending={isNewEmailPending || isPending}
          isResendClicked={isResendClicked}
          resendCode={resendCode}
          resetCounter={resetCounter}
        />
      </div>
    </div>
  );
};
