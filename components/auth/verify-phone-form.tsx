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
import { useParams, useRouter } from "next/navigation";
import { RegenerateButton } from "@/components/auth/regenerate-button";
import useCountdown from "@/hooks/use-countdown";
import { verifyNumber } from "@/actions/verify-number";
import { unknown_error } from "@/lib/variables";
import { regenerateNumberverificationCode } from "@/actions/regenerate-number-verification-code";
export const VerifyPhoneForm: FC = () => {
  const [isPending, setIsPending] = useState(false);
  const [isNewEmailPending, setIsNewEmailPending] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);
  const [success, setSuccess] = useState<undefined | string>(undefined);
  const { id } = useParams();
  const { push } = useRouter();
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
    try {
      setIsPending(true);
      setSuccess(undefined);
      setError(undefined);
      const response = await verifyNumber(values, userId);
      const { success, redirectUrl, error } = response;
      if (error || !success) {
        setError(error || unknown_error);
        return;
      }
      setSuccess(success);

      if (redirectUrl) {
        push(redirectUrl);
      }
      form.reset();
    } catch (error) {
      console.error(`Unable to verify phone number: ${error}`);
      setError(unknown_error);
      setSuccess(undefined);
    } finally {
      setIsPending(false);
    }
  };
  async function resendCode() {
    const userId = Array.isArray(id) ? id[0] : id;
    if (!userId || typeof userId !== "string") {
      setError("Invalid user ID");

      setSuccess(undefined);
      return;
    }
    try {
      setIsNewEmailPending(true);
      setIsResendClicked(false);
      setError(undefined);
      setSuccess(undefined);
      const response = await regenerateNumberverificationCode(userId);
      const { error, success, redirectUrl } = response;
      setError(error);

      setSuccess(success);
      if (redirectUrl) {
        push(redirectUrl);
      }
      if (success) {
        setIsResendClicked(true);
        form.reset()
      } else {
        setIsResendClicked(false);
      }
    } catch (error) {
      console.error(`Unable to regenerate new code: ${error}`);
      setError(unknown_error);
      setSuccess(undefined);
    } finally {
      setIsNewEmailPending(false);
    }
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
          {success && !error && <FormSuccess message={success} />}
          <LoadingButton
            message="Verify"
            disabled={isPending || isNewEmailPending}
            isPending={isPending}
          />
        </form>
      </Form>
      <div className="w-full gap-4 flex flex-col justify-center items-center pt-4">
        <p className="text-xs w-full text-center ">
          Didn&apos;t send code yet?
        </p>

        <RegenerateButton
          isNewEmailPending={isNewEmailPending}
          disabled={isNewEmailPending || isPending}
          isResendClicked={isResendClicked}
          resendCode={resendCode}
          resetCounter={resetCounter}
        />
      </div>
    </div>
  );
};
