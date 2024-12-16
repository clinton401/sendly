"use server";
import { rateLimit } from "@/lib/rate-limits";
import getUserIpAddress from "@/hooks/get-user-ip-address";
import { createErrorResponse } from "@/lib/random-utils";
import { unknown_error } from "@/lib/variables";
import { UserModel } from "@/nobox/record-structures/user";
import { twillio } from "@/lib/twillio";
import { otpGenerator } from "@/lib/auth-utils";
import { NumberVerificationModel } from "@/nobox/record-structures/number-verification";

export const regenerateNumberverificationCode = async (id: string) => {
  try {
    const userIp = await getUserIpAddress();
    const { error } = rateLimit(userIp, false);
    if (error) {
      return createErrorResponse(error);
    }

    const user = await UserModel.findOne({ id });
    if (!user) return createErrorResponse("User not found.");
    if (user.isVerified) {
      return {
        success: "Email has already been registered",
        redirectUrl: `/login`,
        error: undefined,
      };
    }
    const { code, expiresAt } = otpGenerator(true);
    const isCodeAvailable = await NumberVerificationModel.findOne({userId: id });
    if (!isCodeAvailable) {
      const body = {
        code,
        expiresAt: expiresAt.toISOString(),
        userId: id,
      };
      await NumberVerificationModel.insertOne(body);
    } else {
      await NumberVerificationModel.updateOneById(isCodeAvailable.id, {
        code,
        expiresAt: expiresAt.toISOString(),
      });
    }
    const body = `Your Sendly verification code is ${code}. It will expire in 10 minutes. If you didn't request this, please ignore this message.`;
    await twillio(body, user.phone);
    return {
      success: "New verification code sent to your messages",
      redirectUrl: undefined,
      error: undefined,
    };
  } catch (err) {
    console.error(`Unable to regenerate number verification code: ${err}`);
    const errMsg = err instanceof Error ? err.message : unknown_error;
    return createErrorResponse(errMsg);
  }
};
