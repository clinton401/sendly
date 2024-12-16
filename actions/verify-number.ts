"use server";
import { rateLimit } from "@/lib/rate-limits";
import getUserIpAddress from "@/hooks/get-user-ip-address";
import { OtpSchema } from "@/schemas";
import { z } from "zod";
import { createErrorResponse } from "@/lib/random-utils";
import { unknown_error } from "@/lib/variables";
import { UserModel } from "@/nobox/record-structures/user";
import { hasExpired } from "@/lib/auth-utils";
import { NumberVerificationModel } from "@/nobox/record-structures/number-verification";

export const verifyNumber = async(values: z.infer<typeof OtpSchema>, id: string) => {
    const validatedFields = OtpSchema.safeParse(values);
    const userIp = await getUserIpAddress();
  
    if (!validatedFields.success) {
      return createErrorResponse("Invalid fields");
    }
try{
    const { error } = rateLimit(userIp, false);
    if (error) {
      return createErrorResponse(error);
    }
    const { otp } = validatedFields.data;
    const params = {
        id
    }
    const user = await UserModel.findOne(params);
    if (!user) return createErrorResponse("User not found.");
    if (user.isVerified) {
        return {
          success: "Phone Number has already been registered",
          redirectUrl: `/login`,
          error: undefined,
        };
      }
      const foundToken = await NumberVerificationModel.findOne({userId: id});
      if (!foundToken) return createErrorResponse("No verification token available for user.");
      console.log(new Date(foundToken.expiresAt))
      console.log(foundToken.expiresAt)
    const isExpired = hasExpired(new Date(foundToken.expiresAt));
    if (isExpired) {
      return createErrorResponse("Code has expired, generate a new one");
    }
    const isOtpValid = otp === foundToken.code;
    if (!isOtpValid) return createErrorResponse("Invalid code");
    const dataToBeUpdated = {
        isVerified: true,
      };
const updatedUser = await UserModel.updateOneById(user.id, dataToBeUpdated );
if (!updatedUser) return createErrorResponse(unknown_error);
await NumberVerificationModel.deleteOneById(foundToken.id);
return {
    success: "Phone number verified successfully.",
    redirectUrl: `/login`,
    error: undefined,
  };
}  catch(err) {
    console.error(`Unable to verify user number: ${err}`);
    const errMsg = err instanceof Error ? err.message : unknown_error;
    return createErrorResponse(errMsg);
}
}