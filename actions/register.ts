"use server";
import { rateLimit } from "@/lib/rate-limits";
import getUserIpAddress from "@/hooks/get-user-ip-address";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import { createErrorResponse } from "@/lib/random-utils";
import { unknown_error } from "@/lib/variables";
import { twillio } from "@/lib/twillio";
import { UserModel } from "@/nobox/record-structures/user";
import { otpGenerator } from "@/lib/auth-utils";
import { NumberVerificationModel } from "@/nobox/record-structures/number-verification";

import {genPasswordHash} from "@/lib/password-utils"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return createErrorResponse("Invalid fields");

  const userIp = await getUserIpAddress();
  try {
    const { error } = rateLimit(userIp, false);
    if (error) return createErrorResponse(error);
    const { phone } = validatedFields.data;

    const isNumberAvailable = await UserModel.findOne({ phone: values.phone });
    if (isNumberAvailable)
      return createErrorResponse(
        "Phone number already registered. Please use a different number or log in if you already have an account."
      );
      const hashedPassword = await genPasswordHash(values.password)
    const newUser = await UserModel.insertOne({ ...values,password: hashedPassword,  isVerified: false });
    const { code, expiresAt } = otpGenerator(true);
    const params = {
      userId: newUser.id,
    };
    const isCodeAvailable = await NumberVerificationModel.findOne(params);
    if (!isCodeAvailable) {
      const body = {
        code,
        expiresAt: expiresAt.toISOString(),
        userId: newUser.id,
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
      error: undefined,
      success:
        "Registration successful! Please check your messages for a verification code to confirm your number.",
      redirectUrl: `/verify-number/${newUser.id}`,
      // redirectUrl: undefined
    };
  } catch (err) {
    console.error(`Unable to register user: ${err}`);
    const errMsg = err instanceof Error ? err.message : unknown_error;
    return createErrorResponse(errMsg);
  }
};
