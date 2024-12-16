"use server";

import { rateLimit } from "@/lib/rate-limits";
import getUserIpAddress from "@/hooks/get-user-ip-address";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
import { createErrorResponse } from "@/lib/random-utils";
import { unknown_error, user_not_found } from "@/lib/variables";
import { twillio } from "@/lib/twillio";
import { UserModel } from "@/nobox/record-structures/user";
import { otpGenerator } from "@/lib/auth-utils";
import { NumberVerificationModel } from "@/nobox/record-structures/number-verification";
import { signIn } from "@/auth";
import { validatePassword } from "@/lib/password-utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const login = async(values: z.infer<typeof LoginSchema>) => {
    const userIp = await getUserIpAddress();
    const { error } = rateLimit(userIp, false);
    if (error) return createErrorResponse(error);
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
      return createErrorResponse("Invalid fields");
    }
    try{
        const {  phone, password } = validatedFields.data;
        const user = await UserModel.findOne({phone});
        if (!user) return createErrorResponse(user_not_found);
        if (user.isVerified === false) {
            const { code, expiresAt } = otpGenerator(true);
            const params = {
                userId: user.id,
              };
            const isCodeAvailable = await NumberVerificationModel.findOne(params);
            if (!isCodeAvailable) {
              const body = {
                code,
                expiresAt: expiresAt.toISOString(),
                userId: user.id,
              };
              await NumberVerificationModel.insertOne(body);
            } else {
              await NumberVerificationModel.updateOneById(isCodeAvailable.id, {
                code,
                expiresAt: expiresAt.toISOString(),
              });

            }

            const body = `Your Sendly verification code is ${code}. It will expire in 10 minutes. If you didn't request this, please ignore this message.`;
            await twillio(body, phone);
        
            return {
              success:
                "Please verify your phone number before signing in. A verification link has been sent to your messages ",
              redirectUrl: `/verify-number/${user.id}`,
              error: undefined,
              isTwoFA: false,
            };
          }
        

    const isPasswordValid = await validatePassword(password, user.password);
    
    if(!isPasswordValid) return createErrorResponse("Invalid credentials. Check password and try again");
    const result = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });
    
    if(!result || result.error) return createErrorResponse(unknown_error);
    return {
        success: "Login successful!",
        error: undefined,
        redirectUrl: DEFAULT_LOGIN_REDIRECT,
        isTwoFA: false,
      };
    }catch(err) {
        console.error(`Unable to login user: ${err}`);
        const errMsg = err instanceof Error ? err.message : unknown_error;
        return createErrorResponse(errMsg);
    }
}